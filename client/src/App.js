import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'

// Pages
import Home from './components/home'
import NotFoundPage from './components/error/404'

const Wrapper = styled.div`
  max-width: 1920px;
  margin: auto;
`

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route component={NotFoundPage} />
          </Switch>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App
