import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

import Routes from '../config/router'
import AppBar from './layout/AppBar'


export default class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <AppBar />
        <Routes />
      </div>
    )
  }
}
