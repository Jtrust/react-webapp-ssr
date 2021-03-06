const axios = require('axios')
const path = require('path')
const MemoryFs = require('memory-fs') // 在内存中读写
const webpack = require('webpack')

const proxy = require('http-proxy-middleware')


// 启动webpack-dev-server开发过程中  模板文件是不会编译到银盘的，所以要实时获取
const getTemplate = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:8888/public/server.ejs')
    .then((res) => {
      resolve(res.data)
    })
    .catch(reject)
})


const mfs = new MemoryFs()

const NativeModule = require('module')
const vm = require('vm')
const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render')

// webpack.config.server.js配置了externals,使得依赖模块并未打包到 bundle中
// 所以需要把读取的bundle字符串文件转成模块，以便拿到可执行的js
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename,
    displayError: true,
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}
// 启动一个编译器compiler
const serverCompiler = webpack(serverConfig)
// outputFileSystem 是webpack提供的配置项
serverCompiler.outputFileSystem = mfs // 把webpack指向内存读写

let serverBundle
// 这个compiler监听entry下依赖的文件是否变化，有变化则重新编译，所以拿到的serverBundle也是实时的新文件
serverCompiler.watch({}, (err, stats) => { // stats是webpack打包过程输出的信息
  if (err) {
    throw err
  }
  stats = stats.toJson() //eslint-disable-line
  stats.errors.forEach(error => console.error(error))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename,
  )
  // 读取bundle文件
  const bundle = mfs.readFileSync(bundlePath, 'utf8')

  // const Module = module.constructor // module对应module.exports的module。拿到它的构造方法
  // const m = new Module()
  // m._compile(bundle,'server-entry.js') //动态编译模块时，要指定文件名
  // m._compile(bundle, serverConfig.output.filename) //eslint-disable-line

  const m = getModuleFromString(bundle, serverConfig.output.filename)
  serverBundle = m.exports
})


module.exports = function (app) {
  app.use('/public', proxy({ // express的代理中间件
    target: 'http://localhost:8888',
  }))

  app.get('*', (req, res, next) => {
    if (!serverBundle) {
      return res.send('waiting for compile, refresh later')
    }

    getTemplate()
      .then(template => serverRender(serverBundle, template, req, res))
      .catch(next)
  })
}
