# Sagas

## Root saga

```js
import { combineSagas } from 'redux-saga-watch-actions'

import actionNameHereSaga from './actionNameHereSaga'

const rootSaga = combineSagas(
  actionNameHereSaga
)

export default rootSaga
```

## Child sagas

```js
import { call, put } from 'redux-saga/effects'
import { watchActions } from 'redux-saga-watch-actions'

import {
  ACTION_NAME_HERE
} from '../constants'

import {
  beginActionNameHere,
  receiveActionNameHereError,
  receiveActionNameHereData,
  endActionNameHere,
} from '../actions'

import { fetchAction } from '../../utils/api'

const actionNameHereSaga = watchActions({
  [ACTION_NAME_HERE]: function*(action) {
    yield put(beginActionNameHere)
    const { data, error } = yield call(fetchAction(action))
    if (error) {
      yield put(receiveActionNameHereError(error))
    }
    if (data) {
      yield put(receiveActionNameHereData(data))
    }
    yield put(endActionNameHere)
  }
}, {})

export default actionNameHereSaga
```
