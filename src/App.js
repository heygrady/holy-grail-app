import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import withCriticalStyles from './utils/with-critical-styles'

import TopNav from './components/TopNav'
import Routes from './routes'
import logo from './logo.svg'

import globalStyles from './index.css'
import styles from './App.css'

class App extends Component {
  componentWillMount() {
    const { onBeginFirstLoad } = this.props
    if (onBeginFirstLoad) {
      onBeginFirstLoad()
    }
  }
  componentDidMount() {
    const { onEndFirstLoad } = this.props
    if (onEndFirstLoad) {
      onEndFirstLoad()
    }
  }
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
App.propTypes = {
  onBeginFirstLoad: PropTypes.func,
  onEndFirstLoad: PropTypes.func
}

export default withCriticalStyles(globalStyles, styles)(App)
