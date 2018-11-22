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
import { green, red } from '@material-ui/core/colors';

import AppState from './store/appStore'
import App from './views/App'

const initialState = window.__INITIAL__STATE__ || {}   // eslint-disable-line
console.log(666, window.__INITIAL__STATE__);// eslint-disable-line

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
    primary: green,
    accent: red,
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

// 使用 ReactDOM.render() 来混合服务端渲染的容器已经被弃用，并且会在React 17 中删除。使用hydrate() 来代替。
ReactDOM.hydrate(

  <Provider appState={new AppState(initialState.appState)}>
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
