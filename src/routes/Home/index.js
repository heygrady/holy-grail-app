import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'
import withLoadData from '../../utils/withLoadData'
import Loading from '../../components/Loading'

const loadData = async (store, match, location) =>
  console.log('loadData HomeView', { store, match, location })

export const View = Loadable({
  loader: () =>
    import(/* webpackChunkName = "HomeView" */ './components/HomeView'),
  loading: Loading,
  timeout: 5000
})

const route = {
  path: '/',
  exact: true,
  component: withLoadData(loadData, Loading)(View)
}

export const createRoute = props => <Route {...route} {...props} />

export default route
