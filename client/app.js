import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import App from './views/App'

// 使用 ReactDOM.render() 来混合服务端渲染的容器已经被弃用，并且会在React 17 中删除。使用hydrate() 来代替。
ReactDOM.hydrate(
  <App />,
  document.getElementById('root'),
)
if (module.hot) {
  module.hot.accept();
}
