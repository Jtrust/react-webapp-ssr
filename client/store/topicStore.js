import {
  observable,
  // toJs,
  computed,
  action, extendObservable,
} from 'mobx'
import { get } from '../util/http'
import { topicSchema } from '../util/variable-define'

const createTopic = topic => Object.assign({}, topicSchema, topic)
class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing = false
}

class TopicStore {
  @observable topics

  @observable syncing

  @observable details

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  // 是否正在请求数据
  constructor({ syncing = false, topics = [], details = [] } = {}) {
  // constructor({ syncing, topics, details } = { syncing: false, topics: [], details: [] }) {
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createTopic(topic)))
    this.syncing = syncing
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
}

export default TopicStore
