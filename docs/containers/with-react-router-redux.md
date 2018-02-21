# Connecting

```js
import { connect } from 'react-router-redux'

import My from './My'

import { selectToppings, selectPancake } from './selectors'
import { addTopping } from './actions'

const mapStateToProps = (state, ownProps, getHistoryStore) => {
  const { getParams, getQuery } = getHistoryStore()
  const { id } = getParams()
  const { keyword } = getQuery()
  const name = selectPersonName(id)(state)
  return {
    name,
    keyword
  }
}

const mapDispatchToProps = (dispatch, ownProps, getHistoryStore) => {
  const { getParams, pushQuery, push } = getHistoryStore()
  const { id } = getParams()

  return {
    onSearch: (keyword) => {
      pushQuery({ keyword })
    },
    onClickDetail: () => {
      push({
        name: 'pancake-detail',
        params: { id: toId }
      }))
    }
  }
}

const MyContainer = connect(mapStateToProps, mapDispatchToProps)(My)
export default MyContainer
```
