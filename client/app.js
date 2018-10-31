import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

// 使用 ReactDOM.render() 来混合服务端渲染的容器已经被弃用，并且会在React 17 中删除。使用hydrate() i来代替。
ReactDOM.hydrate(<App/>,document.getElementById('root'))