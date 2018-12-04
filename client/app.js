import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'

import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

import { AppState, TopicStore } from './store/store'
import App from './views/App'

const initialState = window.__INITIAL__STATE__ || {}   // eslint-disable-line
// console.log(666, window.__INITIAL__STATE__);// eslint-disable-line

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    // console.log(11, jssStyles, jssStyles.parentNode);
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#37474F',
    },
    // primary: '#1b5e20',
    // secondary: '#37474F',
    accent: pink,
    green: '#80bd01',
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

// 使用 ReactDOM.render() 来混合服务端渲染的容器已经被弃用，并且会在React 17 中删除。使用hydrate() 来代替。
ReactDOM.hydrate(

  <Provider appState={appState} topicStore={topicStore}>
    <BrowserRouter>
      {/* <App /> */}
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Main />
        </MuiThemeProvider>
      </JssProvider>
    </BrowserRouter>
  </Provider>,


  document.getElementById('root'),
)
if (module.hot) {
  module.hot.accept();
}
