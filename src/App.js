import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import { withRouter } from 'react-router-dom'

import TopNav from './components/TopNav'
import Routes from './routes'
import logo from './logo.svg'

import globalStyles from './index.css'
import styles from './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <style type="text/css" media="all">
            {globalStyles.toString()}
          </style>
          <style type="text/css" media="all">
            {styles.toString()}
          </style>
        </Helmet>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <TopNav />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Routes />
      </div>
    )
  }
}

export default withRouter(App)
