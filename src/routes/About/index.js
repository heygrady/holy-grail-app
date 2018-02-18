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

export const View = Loadable({
  loader: () => import('./components/AboutView'),
  loading: Loading
})

const route = {
  path: '/about',
  component: View
}

export const createRoute = props => <Route {...route} {...props} />

export default route
