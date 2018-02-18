import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'

const Loading = ({ error, pastDelay, timedOut }) => {
  if (error) {
    return <div>Error!</div>
  } else if (timedOut) {
    return <div>Taking a long time...</div>
  } else if (pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}
Loading.propTypes = {
  error: PropTypes.object,
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool
}

const LoadableHome = Loadable({
  loader: () => import('./components/HomeView'),
  loading: Loading
})

const HomeRoute = () => <Route path="/" exact component={LoadableHome} />

export default HomeRoute
