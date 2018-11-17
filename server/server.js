const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

// 对post请求的请求体进行解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  maxAge: 10 * 60 * 1000, // 有效期，单位是毫秒
  name: 'tid', // 存cookie id到浏览器端
  resave: false, // 是否每次请求都重新生成cookie id
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  secret: 'react ssr', // 用来对session id相关的cookie进行签名

}));

// app.use(favicon(path.join(__dirname, 'public', '../favicon.ico')))  // 可配置publicPath
app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))


if (!isDev) {
  // 引入服务端代码
  const serverEntry = require('../dist/server-entry').default
  // 同步读取
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8') // 指定'utf8',读出来才是string类型
  // 如果请求 public目录下的静态资源，则 全部映射到  dist目录
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  // 客户端的任何请求 都返回服务端代码
  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    const str = template.replace('<!-- app -->', appString)

    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}


app.listen(3333, () => {
  console.log('server is listening on 3333');
})
