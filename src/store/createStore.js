import { persistStore } from 'redux-persist'
import {
  applyMiddleware,
  compose,
  createStore as createReduxStore
} from 'redux'
import thunk from 'redux-thunk'

import makeRootReducer from './reducers'
import saga, { cancelTask, injectSaga, runSaga, rootSaga } from './sagas'

const createStore = (initialState = {}) => {
  // Middleware Configuration
  const middleware = [thunk, saga]

  // Store Enhancers
  const enhancers = []
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  // Store Instantiation and HMR Setup
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  )

  // Manual store enhancers
  // TODO: move these to middleware
  store.asyncReducers = {}
  store.cancelTask = cancelTask
  store.injectSaga = injectSaga
  store.runSaga = runSaga

  runSaga(rootSaga)
  const persistor = persistStore(store)
  return { store, persistor }
}

export default createStore
