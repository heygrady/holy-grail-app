import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'

import withLoadData from '../../utils/with-load-data'
import Loading from '../../components/Loading'

import loadData from './loadData'

const timeout = 1000
const delay = 200
export const View = Loadable({
  loader: () =>
    import(/* webpackChunkName = "HomeView" */ './components/HomeView'),
  loading: Loading,
  delay,
  timeout
})

const route = {
  path: '/',
  exact: true,
  component: withLoadData(loadData, Loading, { delay, timeout })(View)
}

export const createRoute = props => <Route {...route} {...props} />

export { loadData }
export default route
