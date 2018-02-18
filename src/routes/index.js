import React from 'react'
import { Switch, Route } from 'react-router-dom'

import homeRoute from './Home'
import aboutRoute from './About'

export const routes = [homeRoute, aboutRoute]

const Routes = () => (
  <Switch>
    <Route {...homeRoute} />
    <Route {...aboutRoute} />
  </Switch>
)

export default Routes
