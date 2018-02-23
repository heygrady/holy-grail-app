import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { preloadReady } from 'react-loadable'

import App from './App'

const rootElement = document.getElementById('root')
const shouldHydrate = rootElement.children.length > 0

// Preload react-loadable bundles
const ready = preloadReady()

// Expose mainApp init on window for deferred style loading
let timeout
window.mainApp = () => {
  ready.then(() => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }

    // Hydrate only if the root has server-generated html in it
    ReactDOM[shouldHydrate ? 'hydrate' : 'render'](
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootElement
    )
  })
}

// If style loading is taking too long, kick off the app anyway
timeout = setTimeout(() => {
  timeout = undefined
  window.mainApp()
}, 200)
