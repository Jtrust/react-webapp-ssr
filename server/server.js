const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

// 引入服务端代码
const serverEntry = require('../dist/server-entry').default
// 同步读取
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')  // 指定'utf8',读出来才是string类型

const app = express()


// 如果请求 public目录下的静态资源，则 全部映射到  dist目录
app.use('/public',express.static(path.join(__dirname,'../dist')))




// 客户端的任何请求 都返回服务端代码
app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    let str = template.replace('<app></app>', appString)
    console.log(str);
    res.send(template.replace('<app></app>', appString))
})
app.listen(3333, function () {
    console.log('server is listening on 3333');
})