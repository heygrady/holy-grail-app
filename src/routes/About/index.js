import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'

import Loading from '../../components/Loading'

export const View = Loadable({
  loader: () => import('./components/AboutView'),
  loading: Loading,
  timeout: 5000
})

const route = {
  path: '/about',
  component: View
}

export const createRoute = props => <Route {...route} {...props} />

export default route
