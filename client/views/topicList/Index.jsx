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
import { TopicStore } from '../../store/store';

import Container from '../layout/Container'
import TopicListItem from './ListItem'
import { TABS } from '../../util/variable-define'

// 在组件上使用 <Provider appState={appState}></Provider>传下来的数据

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});


@inject(({ appState, topicState }) => ({ appState, topicState })) @observer
// @inject(stores => ({ appState: stores.appState, topicState: stores.topicState })) @observer
class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  // constructor() {
  //   super()
  // }

  componentDidMount() {
    this.fetchTopic()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.fetchTopic(nextProps.location)
    }
  }

  /**
   * 函数名自定义  在服务端调用asyncBootstrap方法时，会先执行此异步方法，然后渲染
   * 此方法常用于 数据初始化
   * @returns {Promise<any>}
   */
  bootstrap() {
    const query = parse(this.props.location.search)
    const { tab } = query
    return this.props.topicState.fetchTopics(tab || 'all').then(() => true).catch(() => false)
  }

  fetchTopic(location) {
    const { topicState } = this.props
    const search = location ? location.search : undefined
    const tab = this.getTab(search)

    topicState.fetchTopics(tab)
  }

  changeTab = (e, value) => {
    const { router } = this.context
    router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    })
  }


  goToTopic(id) {
    // const { appState } = this.props
    const { router } = this.context
    router.history.push(`/detail/${id}`)
  }

  getTab(search) {
    const param = search || this.props.location.search
    const query = parse(param)
    return query.tab || 'all'
  }

  render() {
    const { topicState } = this.props
    const { syncing } = topicState

    const tabValue = this.getTab()


    return (
      <Container>
        <Helmet>
          <title>topicList</title>
          <meta name="description" content="this is topicList" />
        </Helmet>
        <Tabs value={tabValue} onChange={this.changeTab}>
          {
            Object.keys(TABS).map(t => <Tab key={t} label={TABS[t]} value={t} />)
          }
        </Tabs>
        <List>
          {topicState.topics.map(item => (
            <TopicListItem
              key={item.id}
              onClick={() => {
                this.goToTopic(item.id)
              }}
              topic={item}
            />
          ))}
        </List>

        {syncing ? (
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '40px 0',
          }}
          >
            <CircularProgress />
          </div>
        ) : null}


      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  // appState: PropTypes.instanceOf(AppState),
  topicState: PropTypes.instanceOf(TopicStore).isRequired,
}
TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicList);
