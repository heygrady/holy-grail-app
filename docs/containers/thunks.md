# Using thunks in containers

```js
import { connect } from 'react-redux'

import { selectName, selectIsLoaded, selectIsLoading } from '../modules/moduleNameHere/selectors'
import { loadName } from '../modules/moduleNameHere/actions'
import My from './My'

const mapStateToProps = (state) => {
  const name = selectName(state)
  const isLoading = selectIsLoading(state)
  const isLoaded = selectIsLoaded(state)
  return {
    isLoading,
    isLoaded,
    name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  const { id } = ownProps
  return {
    onMount: (event) => {
      dispatch((_, getState) => {
        const state = getState()
        const isLoading = selectIsLoading(state)
        const isLoaded = selectIsLoaded(state)
        if (!isLoaded && !isLoading) {
          dispatch(loadName(id))
        }
      })
    }
  }
})

const MyContainer = connect(mapStateToProps, mapDispatchToProps)(My)
export default MyContainer
```
