import React from 'react'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Capture, preloadAll } from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'

import App from './App'

export const preloadModules = preloadAll

export default async ({ context, url, stats }) => {
  await Promise.resolve()
  const modules = []
  const body = renderToString(
    <Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Capture>
  )
  const helmet = Helmet.renderStatic()
  debugger
  const bundles = getBundles(stats, modules)
  return { body, helmet, bundles }
}
