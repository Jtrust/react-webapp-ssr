import React from 'react'
import {
  observer, // 将 React 组件转变成响应式组件
  inject, // 把Provider提供的数据 注入到组件内部
} from 'mobx-react'
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import Helmet from 'react-helmet';
// import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { AppState, TopicStore } from '../../store/store';

import Container from '../layout/Container'
import TopicListItem from './ListItem'
import { tabs } from '../../util/variable-define'

// 在组件上使用 <Provider appState={appState}></Provider>传下来的数据

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});


@inject(({ appState, topicStore }) => ({ appState, topicStore })) @observer
class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.clickListItem = this.clickListItem.bind(this)
  }

  componentDidMount() {
    this.doSearch()
  }

  doSearch() {
    const { topicStore } = this.props
    const tab = this.getTab()
    topicStore.fetchTopics(tab)
  }

  changeTab = (e, value) => {
    const { router } = this.context
    router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }

  /**
   * 函数名自定义  在服务端调用asyncBootstrap方法时，会先执行此异步方法，然后渲染
   * 此方法常用于 数据初始化
   * @returns {Promise<any>}
   */
  bootstrap() {
    const { appState } = this.props
    console.log(appState);
    /* return new Promise((resolve) => {
      setTimeout(() => {
        const { appState } = this.props
        appState.count = 3
        resolve(true)
      }, 1000)
    }) */
  }


  clickListItem() {
    const { appState } = this.props
    console.log(appState);
  }

  getTab() {
    const { location } = this.props
    const query = parse(location.search)


    return query.tab || 'share'
  }

  render() {
    const { topicStore } = this.props
    const { syncing } = topicStore

    const tabIndex = this.getTab()


    return (
      <Container>
        <Helmet>
          <title>topicList</title>
          <meta name="description" content="this is topicList" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(t => <Tab key={t} label={tabs[t]} value={t} />)
          }
        </Tabs>
        <List>
          {topicStore.topics.map(item => (
            <TopicListItem
              key={item.id}
              // onClick={this.clickListItem}
              topic={item}
            />
          ))}
        </List>

        {syncing ? <div><CircularProgress /></div> : null}


      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}
TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicList);
