import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { preloadReady } from 'react-loadable'

import App from './App'
// import registerServiceWorker from './registerServiceWorker'

const rootElement = document.getElementById('root')
const shouldHydrate = rootElement.children.length > 0

preloadReady().then(() => {
  ReactDOM[shouldHydrate ? 'hydrate' : 'render'](
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElement
  )
})
// registerServiceWorker()
