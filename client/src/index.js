import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import * as serviceWorker from './serviceWorker'
import App from './App'
import theme from './theme'

injectGlobal`
  body {
    color: ${theme.color};
    background: ${theme.background};
    font-family: 'Inconsolata', sans-serif;
    margin: 0;
    padding: 0;
  }
`

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(<AppWithRouter />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
