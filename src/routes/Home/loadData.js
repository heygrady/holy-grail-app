import { createLoadData } from '../../utils/with-load-data'

const loadData = createLoadData((store, location, match) => {
  return Promise.resolve('do something async')
})

export default loadData
