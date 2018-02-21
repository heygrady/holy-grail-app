# `withLoadData`

Higher-order-component, meant to pair with react-router (v4) and react-loadable aware. Manages prefetching of required data before rendering a component. Optimized for server-side rendering and code-splitting. Solves the problem of "how to ensure the data we need is loaded".

```js
import withLoadData, { DefaultLoading } from '@comfy/with-load-data'

import My from './My'

const loadData = async (store, history, match) => {
  // ...
  // check if data exists in store
  // fetch data asynchronously
  // return a promise that resolves when data is "ready"
}

const MyContainer = withLoadData(loadData, DefaultLoading)(My)

export default MyContainer
```
