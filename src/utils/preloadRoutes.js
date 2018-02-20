import { matchPath } from 'react-router-dom'

const preloadRoute = (route, store, match, location) => {
  const { loadData } = route.component
  if (typeof loadData === 'function') {
    return loadData.call(route.component, store, match, location)
  }
  return undefined
}

const preloadChildren = (promises, route, store, location) => {
  const routes = route.routes || route.switch
  if (routes && routes.length) {
    const childSwitch = !route.routes && !!route.switch
    const childResult = preloadRoutes(routes, store, location, childSwitch)
    promises.push.apply(promises, childResult)
  }
}

const walkRoutes = (promises, store, location) => route => {
  const match = matchPath(location.pathname, route)
  if (!match) {
    return false
  }

  const result = preloadRoute(route, store, match, location)
  preloadChildren(promises, route, store, location)

  if (result && typeof result.then === 'function') {
    promises.push(result)
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
    routes.some(walkRoutes(promises, store, location))
  } else {
    routes.forEach(walkRoutes(promises, store, location))
  }
  return promises
}

export default (routes, store, location, useSwitch = true) => {
  const promises = preloadRoutes(routes, store, location, useSwitch)
  if (promises.length) {
    return Promise.all(promises)
  }
  return Promise.resolve()
}
