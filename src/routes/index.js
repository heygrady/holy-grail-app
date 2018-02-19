import React from 'react'
import { Switch, Route } from 'react-router-dom'

import homeRoute from './Home'
import aboutRoute from './About'

// used by index.server
export const routes = [homeRoute, aboutRoute]

// used by App
const Routes = () => (
  <Switch>
    <Route {...homeRoute} />
    <Route {...aboutRoute} />
  </Switch>
)

export default Routes
