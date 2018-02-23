import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import withCriticalStyles from './utils/with-critical-styles'

import TopNav from './components/TopNav'
import Routes from './routes'
import logo from './logo.svg'

import globalStyles from './index.css'
import styles from './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet titleTemplate="%s | Holy Grail">
          <meta charSet="utf-8" />
          <title>My Title</title>
        </Helmet>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span className="App-link">Learn React</span>
          <TopNav />
          <Routes />
        </header>
      </div>
    )
  }
}

export default withCriticalStyles(globalStyles, styles)(App)
