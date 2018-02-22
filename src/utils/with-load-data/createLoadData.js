// NOTE: this is in place of an async function.
/*

If you are targeting environments that support async, prefer asnyc functions.
If you need to support IE 11 and other browsers without async, prefer this.
Babel will use the regenerator polyfill to transform async for old browsers.
Using this creator will be a much smaller footprint at the expense of not being
able to really do convenient async.

Prefer:
const loadData = async (store, location, match) => {
  const data = await fetch('https://www.reddit.com/r/reactjs.json')
  store.dispatch(receiveData(data))
}

Fallback:
import { createLoadData } from 'with-load-data'
const loadData = createLoadData((store, location, match) => {
  return fetch('https://www.reddit.com/r/reactjs.json')
  .then((data) => {
    store.dispatch(receiveData(data))
  })
})

*/

const createLoadData = func => (store, location, match) =>
  new Promise((resolve, reject) => {
    try {
      const result = func(store, location, match)
      if (result && typeof result.then === 'function') {
        result.then(resolve, reject).catch(reject)
      } else {
        resolve(result)
      }
    } catch (e) {
      reject(e)
    }
  })

export default createLoadData
