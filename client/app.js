import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import AppState from './store/appStore'

import App from './views/App'

const initialState = window.__INITIAL__STATE__ || {}   // eslint-disable-line
console.log(666, window.__INITIAL__STATE__);// eslint-disable-line
// 使用 ReactDOM.render() 来混合服务端渲染的容器已经被弃用，并且会在React 17 中删除。使用hydrate() 来代替。
ReactDOM.hydrate(

  <Provider appState={new AppState(initialState.appState)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,


  document.getElementById('root'),
)
if (module.hot) {
  module.hot.accept();
}
