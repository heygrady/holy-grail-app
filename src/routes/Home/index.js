import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'

import withLoadData from '../../utils/with-load-data'
import Loading from '../../components/Loading'

import loadData from './loadData'

const delay = 200
const timeout = 1000
export const View = withLoadData(loadData, Loading, { delay, timeout })(
  Loadable({
    loader: () =>
      import(/* webpackChunkName = "HomeView" */ './components/HomeView'),
    loading: Loading,
    delay,
    timeout
  })
)

const route = {
  path: '/',
  exact: true,
  component: View
}

export const createRoute = props => <Route {...route} {...props} />

export { loadData }
export default route
