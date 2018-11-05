const axios = require('axios')
const path = require('path')
const MemoryFs = require('memory-fs') // 在内存中读写
const webpack = require('webpack')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')

// 启动webpack-dev-server开发过程中  模板文件是不会编译到银盘的，所以要实时获取
const getTemplate = () => {

    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const Module = module.constructor  // module对应module.exports的module。拿到它的构造方法
const mfs = new MemoryFs()

// 启动一个编译器compiler
const serverCompiler = webpack(serverConfig)
// outputFileSystem 是webpack提供的配置项
serverCompiler.outputFileSystem = mfs  // 把webpack指向内存读写

let serverBundle
// 这个compiler监听entry下依赖的文件是否变化，有变化则重新编译，所以拿到的serverBundle也是实时的新文件
serverCompiler.watch({}, (err, stats) => { // stats是webpack打包过程输出的信息
    if (err) {
        throw err
    }
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    // 读取bundle文件
    const bundle = mfs.readFileSync(bundlePath, 'utf8')
    const m = new Module

    // m._compile(bundle,'server-entry.js') //动态编译模块时，要指定文件名
    m._compile(bundle, serverConfig.output.filename)
    serverBundle = m.exports.default
})


module.exports = function (app) {

    app.use('/public', proxy({  // express的代理中间件
        target: 'http://localhost:8888'
    }))

    app.get('*', function (req, res) {
        getTemplate().then(template => {
            const appString = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->', appString))

        })
    })

}