import { combineSagas } from 'redux-saga-watch-actions'
import createSagaMiddleware from 'redux-saga'
import createSagaMiddlewareHelpers from 'redux-saga-watch-actions/lib/middleware'

// Array of root sagas
import { sagas } from '../modules'

const sagaMiddleware = createSagaMiddleware()
const { injectSaga, cancelTask, runSaga } = createSagaMiddlewareHelpers(
  sagaMiddleware
)

export const rootSaga = combineSagas(...sagas)

export { injectSaga, cancelTask, runSaga }
export default sagaMiddleware
