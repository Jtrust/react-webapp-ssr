import AppState from './appStore'
import TopicStore from './topicStore'

export { AppState, TopicStore }

export default {
  AppState, TopicStore,
}

// 给服务端渲染使用
export const createStoreMap = () => ({
  appState: new AppState(),
  topicState: new TopicStore(),
})
