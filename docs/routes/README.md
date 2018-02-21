# Routes

```
- src/routes/
  - RouteNameHere/
    - components/
      - RouteNameHereView/
        - RouteNameHereView.module.scss
        - RouteNameHereView.spec.js
        - RouteNameHereView.js
        - index.js
    - modules/
    - routes/
    - index.js
  - index.js
```

## `src/routes/index.js`

```js
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
```

## `src/routes/RouteNameHere/index.js`

```js
import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'
import withLoadData from '@comfy/with-load-data'
import withModule from '@comfy/with-module'

import Loading from '../../components/DefaultLoading'
import routes from './routes'

const loadData = async (store, match, location) => {
  // select from state and dispatch actions
  // return a promise and resolve when data loading is complete
}

export const View = Loadable({
  loader: () =>
    import(/* webpackChunkName = "HomeView" */ './components/RouteNameHereView'),
  loading: Loading,
  timeout: 1000
})

const route = {
  path: '/',
  exact: true,
  component: withLoadData(loadData, Loading, { timeout: 1000 })(View),
  routes // <-- child routes go here
}

export const createRoute = props => <Route {...route} {...props} />

export default route
```
