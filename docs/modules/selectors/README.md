# Selectors

```js
import { createSelector, composeSelectors } from '@comfy/redux-selectors'

export const selectRoot = createSelector('moduleNameHere')
export const selectData = composeSelectors(selectRoot, 'data')
export const selectError = composeSelectors(selectRoot, 'error')
export const selectMeta = composeSelectors(selectRoot, 'meta')
export const selectIsLoading = composeSelectors(selectMeta, 'loading')
export const selectIsLoaded = composeSelectors(selectMeta, 'loaded')
```
