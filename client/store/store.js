import AppStateClass from './appStore'

export const AppState = AppStateClass

export default {
  AppState,
}

// 给服务端渲染使用
export const createStoreMap = () => ({
  appState: new AppState(),
})
