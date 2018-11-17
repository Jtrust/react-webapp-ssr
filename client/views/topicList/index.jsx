import React from 'react'
import {
  observer, // 将 React 组件转变成响应式组件
  inject, // 把Provider提供的数据 注入到组件内部
} from 'mobx-react'
import PropTypes from 'prop-types';
import AppState from '../../store/appStore';

// 在组件上使用 <Provider appState={appState}></Provider>传下来的数据

@inject('appState') @observer
class TopicList extends React.Component {
  componentDidMount() {

  }

  /**
   * 函数名自定义  在服务端调用asyncBootstrap方法时，会先执行此异步方法，然后渲染
   * 此方法常用于 数据初始化
   * @returns {Promise<any>}
   */
  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.count = 3
        resolve(true)
      }, 1000)
    })
  }

  changeName(e) {
    const { appState } = this.props
    appState.changeName(e.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input type="text" onChange={this.changeName.bind(this)} />
        <span>{appState.msg}</span>

      </div>
    )
  }
}

// TopicList.PropTypes = {  //千万别写成大写PropTypes 坑啊
TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
