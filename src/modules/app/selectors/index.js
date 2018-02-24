import { composeSelectors, createSelector } from '@comfy/redux-selectors'

export const selectRoot = createSelector('app')
export const selectFirstLoad = composeSelectors(selectRoot, 'firstLoad')
