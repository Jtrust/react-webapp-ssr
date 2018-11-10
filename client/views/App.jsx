import React, { Component } from 'react'

import { BrowserRouter, Link } from 'react-router-dom'
import Routes from '../config/router'


export default class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
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
    )
  }
}
