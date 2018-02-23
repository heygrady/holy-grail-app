import { createLocation, createPath } from 'history'

// unwrapping <StaticRouter />
// @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/StaticRouter.js

const normalizeLocation = object => {
  const { pathname = '/', search = '', hash = '', query } = object

  return {
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash,
    query // allow query since express already parsed it for us
  }
}

const addLeadingSlash = path => {
  return path.charAt(0) === '/' ? path : `/${path}`
}

const addBasename = (basename, location) => {
  if (!basename) return location

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname
  }
}

const stripBasename = (basename, location) => {
  if (!basename) return location

  const base = addLeadingSlash(basename)

  if (location.pathname.indexOf(base) !== 0) return location

  return {
    ...location,
    pathname: location.pathname.substr(base.length)
  }
}

const createLocationFromUrl = url =>
  typeof url === 'string' ? createLocation(url) : normalizeLocation(url)

const createURL = location =>
  typeof location === 'string' ? location : createPath(location)

const staticHandler = methodName => () => {
  console.warn('You cannot %s with staticHistory', methodName)
}

const noop = () => {}

const createHref = basename => path =>
  addLeadingSlash(basename + createURL(path))

const handlePush = (context, basename) => location => {
  context.action = 'PUSH'
  context.location = addBasename(basename, createLocation(location))
  context.url = createURL(context.location)
}

const handleReplace = (context, basename) => location => {
  context.action = 'REPLACE'
  context.location = addBasename(basename, createLocation(location))
  context.url = createURL(context.location)
}

const handleListen = () => noop

const handleBlock = () => noop

const createStaticHistory = (url = '/', context = {}, basename = '') => ({
  getStaticContext: () => context,
  createHref: createHref(basename),
  action: 'POP',
  location: stripBasename(basename, createLocationFromUrl(url)),
  push: handlePush(context, basename),
  replace: handleReplace(context, basename),
  go: staticHandler('go'),
  goBack: staticHandler('goBack'),
  goForward: staticHandler('goForward'),
  listen: handleListen,
  block: handleBlock
})

export default createStaticHistory
