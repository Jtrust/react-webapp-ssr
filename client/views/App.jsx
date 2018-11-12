import React, { Component } from 'react'

import { BrowserRouter, Link } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Routes from '../config/router'
import appState from '../store/appStore'


export default class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Provider appState={appState}>
        <BrowserRouter>
          <div>
            <div>
              <Link to="/">首页</Link>
              <br />
              <Link to="/detail">详情页</Link>
            </div>
            <Routes />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
