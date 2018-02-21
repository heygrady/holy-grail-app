# React router container

```js
import { connect } from '@comfy/react-router-container'

import My from './My'

// Read from history
// disables push/replace
const mapHistoryStateToProps = (getHistoryStore, ownProps) => {
  const { getParams, getHashState, getLocationState, getQuery } = getHistoryStore()
  const { id } = getParams()
  const { toggled } = getHashState()
  const { username } = getLocationState()
  const { keyword } = getQuery()
  return {
    id,
    toggled,
    username,
    keyword
  }
}

// Update history
// enables push/replace
const mapHistoryPushToProps = (getHistoryStore, ownProps) => {
  const { getParams, pushHash, pushLocationState, pushSearch, push } = getHistoryStore()
  const { id } = getParams()
  return {
    onToggle: (toggled) => {
      // merges, works like setState in a react component
      pushHash({ toggled })
    },
    onSomething: () => {
      pushLocationState({ username: 'not so secret!' })
    },
    onSubmit: (formData) => {
      // overwrites
      pushSearch(formData, true)
    },
    onClickAbout: (formData) => {
      // exactly history.push
      push({ pathname: '/about' })
    }
  }
}

const MyContainer = connect(mapHistoryStateToProps, mapHistoryPushToProps)(My)
export default MyContainer
```
