import {
  observable,
  toJS,
  computed,
  action, extendObservable,
} from 'mobx'
import { get } from '../util/http'
import { topicSchema } from '../util/variable-define'

const createTopic = topic => Object.assign({}, topicSchema, topic)
class Topic {
  constructor(data) {
    // console.log (55,this);
    extendObservable(this, data)
  }

  // @observable syncing = false
}

class TopicStore {
  @observable topics

  @observable syncing

  @observable details

  @observable tab

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  // 是否正在请求数据
  constructor({
    syncing = false, topics = [], details = [], tab,
  } = {}) {
  // constructor({ syncing, topics, details } = { syncing: false, topics: [], details: [] }) {
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createTopic(topic)))
    this.syncing = syncing
    this.tab = tab
  }

  @computed get detailsMap() {
    return this.details.reduce((result, detail) => ({
      ...result,
      [detail.id]: detail,
    }),
    {})
  }

  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      if (this.tab === tab && this.topics.length > 0) { // 说明已经发送过请求
        resolve()
      } else {
        this.tab = tab
        this.syncing = true
        this.topics = []
        get('/topics', {
          mdrender: false,
          tab,
        }).then((resp) => {
          if (resp.success) {
            resp.data.forEach((topic) => {
              this.addTopic(topic)
            })

            resolve()
          } else {
            reject()
          }
          this.syncing = false
        }).catch((err) => {
          reject(err)
          this.syncing = false
        })
      }
    })
  }

  @action getTopicDetail(id) {
    console.log('get topic id:', id) // eslint-disable-line
    return new Promise((resolve, reject) => {
      if (this.detailsMap[id]) {
        resolve(this.detailsMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data), true)
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        }).catch((err) => {
          reject(err)
        })
      }
    })
  }

  toJson() {
    return {
      // page: this.page,
      topics: toJS(this.topics),
      syncing: toJS(this.syncing),
      details: toJS(this.details),
      // tab: toJS(this.tab),
      tab: this.tab,
    }
  }
}

export default TopicStore
