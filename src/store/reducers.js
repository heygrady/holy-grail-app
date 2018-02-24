import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import localForage from 'localforage'

// Reducers
import { reducers } from '../modules'

export const ROOT_PERSIST_KEY = '@@holy-grail-app'

const config = {
  key: ROOT_PERSIST_KEY,
  storage: localForage
}

export const makeRootReducer = asyncReducers => {
  const rootReducer = combineReducers({
    ...reducers,
    ...asyncReducers
  })
  return persistReducer(config, rootReducer)
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
