import {
  observable,
  computed,
  autorun,
  action,
} from 'mobx'

export class AppState {
  @observable count = 0

  @observable name = 'Tom'

  @computed get msg() {
    return `${this.name} says count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(value) {
    this.name = value
  }
}

const appState = new AppState()

// autorun接收一个方法，一旦AppState更新就执行此方法
autorun(() => {
  // console.log(appState.msg);
})

setInterval(() => {
  appState.add()
}, 1000)

export default appState
