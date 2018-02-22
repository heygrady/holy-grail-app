import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { preloadReady } from 'react-loadable'

import App from './App'

const rootElement = document.getElementById('root')
const shouldHydrate = rootElement.children.length > 0

const ready = preloadReady()
let timeout
window.mainApp = () => {
  ready.then(() => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    ReactDOM[shouldHydrate ? 'hydrate' : 'render'](
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootElement
    )
  })
}
timeout = setTimeout(() => {
  timeout = undefined
  window.mainApp()
}, 200)
