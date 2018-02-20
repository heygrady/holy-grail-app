import { matchPath } from 'react-router-dom'

const preloadRoute = (route, store, match, location) => {
  const { loadData } = route.component
  if (typeof loadData === 'function') {
    return loadData.call(route.component, store, match, location)
  }
  return undefined
}

const preloadChildren = (route, store, location) => {
  const routes = route.routes || route.switch
  if (routes && routes.length) {
    const childSwitch = !route.routes && !!route.switch
    const promises = preloadRoutes(routes, store, location, childSwitch)
    return promises
  }
  return undefined
}

// NOTE: mutates promises array :(
const matchRoute = (promises, store, location) => route => {
  const match = matchPath(location.pathname, route)
  if (!match) {
    return false
  }
  const result = preloadRoute(route, store, match, location)
  if (result && typeof result.then === 'function') {
    promises.push(result)
  }
  const childPromises = preloadChildren(route, store, location)
  if (childPromises && childPromises.length) {
    promises.push.apply(promises, childPromises)
  }
  return !!match
}

const preloadRoutes = (routes, store, location, useSwitch = false) => {
  if (!Array.isArray(routes)) {
    // TODO: invariant
    return undefined
  }
  const promises = []
  if (useSwitch) {
    routes.some(matchRoute(promises, store, location))
  } else {
    routes.forEach(matchRoute(promises, store, location))
  }
  return promises
}

// defaults to useSwitch true, returns a promise
export default (routes, store, location, useSwitch = true) => {
  const promises = preloadRoutes(routes, store, location, useSwitch)
  if (promises && promises.length) {
    return Promise.all(promises)
  }
  return Promise.resolve()
}
