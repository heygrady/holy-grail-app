import { createLoadData } from '../../utils/with-load-data'

const loadData = createLoadData((store, history, match) => {
  console.log('preloaded HomeView')
  return Promise.resolve('do something async')
})

export default loadData
