import React from 'react'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Capture, preloadAll } from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { createLocation } from 'history'

import App from './App'
import { routes } from './routes'
import preloadRoutes from './utils/preloadRoutes'

export const preloadModules = preloadAll

export default async ({ context, url, stats }) => {
  const store = {}
  const location = createLocation(url)

  await preloadRoutes(routes, store, location, true)

  const modules = []
  const report = moduleName => modules.push(moduleName)
  const body = renderToString(
    <Capture report={report}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Capture>
  )
  const helmet = Helmet.renderStatic()
  const bundles = getBundles(stats, modules)
  return { body, helmet, bundles }
}
