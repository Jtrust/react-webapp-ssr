import {
  observable,
  // computed,
  toJS,
  // action,
} from 'mobx'

export default class AppState {
  constructor({ user = {} } = { }) {
    this.user = user
  }

  @observable user

  toJson() {
    return {
      user: toJS(this.user),
    }
  }
}


/*
const appState = new AppState()
// autorun接收一个方法，一旦AppState更新就执行此方法
autorun(() => {
  // console.log(appState.msg);
})

setInterval(() => {
  appState.add()
}, 1000)

export default appState
*/
