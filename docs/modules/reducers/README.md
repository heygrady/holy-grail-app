# Reducers

## Root reducer

```js
import { combineReducers } from 'redux'

import childNameHere from './childNameHereReducer'

const rootReducer = combineReducers({
  childNameHere
})

export default rootReducer
```

## Child reducer

```js
import { handleActions } from 'redux-actions'

import {
  ACTION_NAME_HERE
} from '../constants'

const childNameHereReducer = handleActions({
  [ACTION_NAME_HERE]: (state, action) => {
    const value = action.payload
    return { ...state, value }
  }
}, { /* default state */ })

export default childNameHereReducer
```
