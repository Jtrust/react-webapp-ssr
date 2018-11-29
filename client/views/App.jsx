import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Routes from '../config/router'
import AppBar from './layout/AppBar'


export default class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div>
          <Link to="/">首页123</Link>
          <br />
          <Link to="/detail">详情页</Link>
          <AppBar />
        </div>
        <Routes />
      </div>
    )
  }
}
