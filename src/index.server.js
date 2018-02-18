import React from 'react'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

import App from './App'

export default ({ context, url }) => {
  const body = renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  )
  const helmet = Helmet.renderStatic()
  return { body, helmet }
}
