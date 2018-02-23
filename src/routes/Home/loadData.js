import { createLoadData } from '../../utils/with-load-data'

const loadData = createLoadData((store, history, match) => {
  console.log('preloaded HomeView')
  // const { dispatch, getState } = store
  // const state = getState()
  // const { params } = match
  // const { location } = history
  // const { hash, search, state: locationState } = location
  // const hashState = Query.parse(hash)
  // const query = Query.parse(search)
  return Promise.resolve('do something async')
})

export default loadData
