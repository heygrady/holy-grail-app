import React from 'react'
import { Capture, preloadAll } from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'

import createStore from './store/createStore'
import App from './App'
import { routes } from './routes'
import createStaticHistory from './utils/staticHistory'
import preloadRoutes from './utils/preloadRoutes'

export const preloadModules = preloadAll

export default async ({ context, stats, url, initialState }) => {
  const { store } = createStore(initialState)
  const history = createStaticHistory(url, context)

  await preloadRoutes(routes, store, history, true)

  const modules = []
  const report = moduleName => modules.push(moduleName)
  const body = renderToString(
    <Capture report={report}>
      <Provider store={store}>
        <StaticRouter location={history.location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </Capture>
  )
  const helmet = Helmet.renderStatic()
  const bundles = getBundles(stats, modules)
  const state = store.getState()
  return { body, helmet, bundles, state }
}
