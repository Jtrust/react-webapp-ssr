import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import {
  inject,
  observer,
} from 'mobx-react'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'
import CircularProgress from '@material-ui/core/CircularProgress';

import SimpleMDE from '../../components/simple-mde/index'

import Container from '../layout/Container'

import TopicStore from '../../store/topicStore'
import { topicDetailStyle } from './styles'

import Reply from './reply'
import formatDate from '../../util/date-format'

@inject((stores) => {
  console.log(999, stores);
  return {
    topicStore: stores.topicStore,
    appState: stores.appState,
  }
}) @observer
class TopicDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      newReply: '',
      showEditor: false,
    }
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this)
    this.goToLogin = this.goToLogin.bind(this)
    this.handleReply = this.handleReply.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    console.log('component did mount id:', id) // eslint-disable-line
    this.props.topicStore.getTopicDetail(id).catch((err) => {
      console.log('detail did mount error:', err) // eslint-disable-line
    })
    setTimeout(() => {
      this.setState({
        showEditor: true,
      })
    }, 1000)
  }

  getTopic() {
    const { id } = this.props.match.params
    console.log(110, id);
    console.log(111, this.props.topicStore.detailsMap);
    console.log(112, this.props.topicStore.detailsMap[id]);
    return this.props.topicStore.detailsMap[id]
  }

  asyncBootstrap() {
    console.log('topic detail invoked') // eslint-disable-line
    const { id } = this.props.match.params
    return this.props.topicStore.getTopicDetail(id).then(() => true).catch((err) => {
      throw err
    })
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    })
  }

  goToLogin() {
    this.context.router.history.push('/user/login')
  }

  handleReply() {
    // do reply here
    this.getTopic().doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        })
        this.props.appState.notify({ message: '评论成功' })
      })
      .catch(() => {
        this.props.appState.notify({ message: '评论失败' })
      })
    // axios.post('/api/')
  }

  render() {
    const topic = this.getTopic()
    const { classes } = this.props
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="primary" />
          </section>
        </Container>
      )
    }
    const { createdReplies } = topic
    const { user = {} } = this.props.appState
    console.log('user',user) // eslint-disable-line
    console.log('createdReplies',createdReplies) // eslint-disable-line
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} /> {/*eslint-disable-line*/}
          </section>
        </Container>

        {
          createdReplies && createdReplies.length > 0
            ? (
              <Paper elevation={4} className={classes.replies}>
                <header className={classes.replyHeader}>
                  <span>{' '}</span>
                  <span>我的最新回复</span>
                </header>
                {
                  createdReplies.map(reply => (
                    <Reply
                      reply={Object.assign({}, reply, {
                        author: {
                          avatar_url: user.info.avatar_url,
                          loginname: user.info.loginName,
                        },
                      })}
                      key={reply.id}
                    />
                  ))
                }
              </Paper>
            )
            : null
        }

        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${formatDate(topic.last_reply_at, 'yy年m月dd日')}`}</span>
          </header>
          {
            (this.state.showEditor && user.isLogin)
            && (
            <section className={classes.replyEditor}>
              <SimpleMDE
                onChange={this.handleNewReplyChange}
                value={this.state.newReply}
                options={{
                  toolbar: false,
                  autoFocus: true,
                  spellChecker: false,
                  placeholder: '添加你的精彩回复',
                }}
              />
              <Button fab variant="contained" color="primary" onClick={this.handleReply} className={classes.replyButton}>
                <IconReply />
              </Button>
            </section>
            )
          }
          {
            !user.isLogin
              ? (
                <section className={classes.notLoginButton}>
                  <Button raised="true" variant="contained" color="primary" onClick={this.goToLogin}>登录进行回复</Button>
                </section>
              )
              : null
          }
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
