import { combineReducers } from 'redux'

// Reducers
import { reducers } from '../modules'

export const makeRootReducer = (asyncReducers, disablePersist) => {
  const rootReducer = combineReducers({
    ...reducers,
    ...asyncReducers
  })
  return rootReducer
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
