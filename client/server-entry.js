import React from 'react'
import { StaticRouter } from 'react-router-dom' // StaticRouter用于服务端渲染
import { Provider, useStaticRendering } from 'mobx-react' // useStaticRendering用于服务端渲染
// material-ui
// import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  // createGenerateClassName,
} from '@material-ui/core/styles';


import { pink } from '@material-ui/core/colors/index';
import App from './views/App'
import { createStoreMap } from './store/store'


// 让mobx在服务端渲染时 不会重复数据变化
useStaticRendering(true)


// Create a sheetsRegistry instance.
// const sheetsRegistry = new SheetsRegistry();
// Create a sheetsManager instance.
const sheetsManager = new Map();
// Create a theme instance.
const theme = createMuiTheme({
  // palette: {
  //   primary: green,
  //   accent: red,
  //   type: 'light',
  // },
  // typography: {
  //   useNextVariants: true,
  // },
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
    gray: '#e5e5e5',
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});
// Create a new class name generator.
// const generateClassName = createGenerateClassName();

export default (stores, routerContext, url, sheetsRegistry, generateClassName) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)
export { createStoreMap }
