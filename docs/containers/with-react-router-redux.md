# Connecting to a history store

**Note:** This is totally imaginary. It's here to show how you might consider react-router's history to be a store in its own right.

- `hashState` &mdash; comes from `history.location.hash`
- `query` &mdash; comes from  `history.location.search`
- `locationState` &mdash; comes from  `history.location.state`
- `params` &mdash; comes from `match.params`

```js
import Query from 'qs'

const hashState = Query.parse(history.location.hash)
const query = Query.parse(history.location.search)
const locationState = history.location.state
const params = match.params
```

```js
import { connect } from '@comfy/react-router-redux'

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
