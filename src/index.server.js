import React from 'react'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Capture, preloadAll } from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'

import App from './App'
import { routes } from './routes'
import createStaticHistory from './utils/staticHistory'
import preloadRoutes from './utils/preloadRoutes'

export const preloadModules = preloadAll

export default async ({ context, stats, url }) => {
  const store = { getState: () => ({ client: true }) }
  const history = createStaticHistory(url, context)

  await preloadRoutes(routes, store, history, true)

  const modules = []
  const report = moduleName => modules.push(moduleName)
  const body = renderToString(
    <Capture report={report}>
      <StaticRouter location={history.location} context={context}>
        <App />
      </StaticRouter>
    </Capture>
  )
  const helmet = Helmet.renderStatic()
  const bundles = getBundles(stats, modules)
  const state = store.getState()
  return { body, helmet, bundles, state }
}
