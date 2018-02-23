import { matchPath } from 'react-router-dom'

const preloadRoute = (route, store, history, match) => {
  const { loadData } = route.component
  if (typeof loadData === 'function') {
    return loadData.call(route.component, store, history, match)
  }
  return undefined
}

const preloadChildren = (route, store, history) => {
  const routes = route.routes || route.switch
  if (routes && routes.length) {
    const childSwitch = !route.routes && !!route.switch
    const promises = preloadRoutes(routes, store, history, childSwitch)
    return promises
  }
  return undefined
}

// NOTE: mutates promises array :(
const matchRoute = (promises, store, history) => route => {
  const match = matchPath(history.location.pathname, route)
  if (!match) {
    return false
  }
  const result = preloadRoute(route, store, history, match)
  if (result && typeof result.then === 'function') {
    promises.push(result)
  }
  const childPromises = preloadChildren(route, store, history)
  if (childPromises && childPromises.length) {
    promises.push.apply(promises, childPromises)
  }
  return !!match
}

const preloadRoutes = (routes, store, history, useSwitch = false) => {
  if (!Array.isArray(routes)) {
    // TODO: invariant
    return undefined
  }
  const promises = []
  if (useSwitch) {
    routes.some(matchRoute(promises, store, history))
  } else {
    routes.forEach(matchRoute(promises, store, history))
  }
  return promises
}

// defaults to useSwitch true, returns a promise
export default (routes, store, history, useSwitch = true) => {
  const promises = preloadRoutes(routes, store, history, useSwitch)
  if (promises && promises.length) {
    return Promise.all(promises)
  }
  return Promise.resolve()
}
