const ReactDomServer = require('react-dom/server')
const asyncBootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const Helmet = require('react-helmet').default
const serialize = require('serialize-javascript')

// import { SheetsRegistry } from 'jss';
const { SheetsRegistry } = require('jss')

const sheetsRegistry = new SheetsRegistry();


const getStoreState = stores => Object.keys(stores).reduce((result, storeName) => {
  result[storeName] = stores[storeName].toJson()
  return result
}, {})
module.exports = (bundle, template, req, res) => new Promise((resolve, reject) => {
  const { createStoreMap } = bundle
  const createApp = bundle.default
  const routerContext = {}
  const stores = createStoreMap()
  const appCompt = createApp(stores, routerContext, req.url, sheetsRegistry)

  asyncBootstrap(appCompt).then(() => {
    if (routerContext.url) { // 如果 客户请求有重定向，则react-router会给routerContext添加一个url属性
      // 如果重定向  那么直接在服务端redirect
      res.status(302).setHeader('Location', routerContext.url) // 设置属性  让浏览器自动跳转
      res.end()
      return
    }
    const helmet = Helmet.rewind()
    const state = getStoreState(stores)
    const content = ReactDomServer.renderToString(appCompt)
    const css = sheetsRegistry.toString()

    // res.send(template.replace('<!-- app -->', content))
    const html = ejs.render(template, {
      appString: content,
      initialState: serialize(state),
      meta: helmet.meta.toString(),
      title: helmet.title.toString(),
      style: helmet.style.toString(),
      link: helmet.link.toString(),
      materialCss: css,
    })

    res.send(html)
    resolve()
  }).catch(reject)
})
