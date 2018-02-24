import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { preloadReady } from 'react-loadable'

import createStore from './store/createStore'
import AppContainer from './AppContainer'

const rootElement = document.getElementById('root')
const shouldHydrate = rootElement.children.length > 0

// Preload react-loadable bundles
const ready = preloadReady()
const initialState = window.__INITIAL_STATE__
const { store, persistor } = createStore(initialState)

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>,
      rootElement
    )
  })
}

// If style loading is taking too long, kick off the app anyway
timeout = setTimeout(() => {
  timeout = undefined
  window.mainApp()
}, 200)
