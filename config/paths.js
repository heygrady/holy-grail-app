const path = require('path')
const fs = require('fs')
const url = require('url')
const findPkg = require('find-pkg')
const globby = require('globby')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/')
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${path}/`
  } else {
    return path
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
  return ensureSlash(servedUrl, true)
}

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appServer: resolveApp('server/app'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.client.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json'))
}

let checkForMonorepo = true

module.exports.srcPaths = [module.exports.appSrc]

const findPkgs = (rootPath, globPatterns) => {
  const globOpts = {
    cwd: rootPath,
    strict: true,
    absolute: true
  }
  return globPatterns
    .reduce(
      (pkgs, pattern) =>
        pkgs.concat(globby.sync(path.join(pattern, 'package.json'), globOpts)),
      []
    )
    .map(f => path.dirname(path.normalize(f)))
}

const getMonorepoPkgPaths = () => {
  const monoPkgPath = findPkg.sync(path.resolve(appDirectory, '..'))
  if (monoPkgPath) {
    // get monorepo config from yarn workspace
    const pkgPatterns = require(monoPkgPath).workspaces
    if (pkgPatterns == null) {
      return []
    }
    const pkgPaths = findPkgs(path.dirname(monoPkgPath), pkgPatterns)
    // only include monorepo pkgs if app itself is included in monorepo
    if (pkgPaths.indexOf(appDirectory) !== -1) {
      return pkgPaths.filter(f => fs.realpathSync(f) !== appDirectory)
    }
  }
  return []
}

if (checkForMonorepo) {
  // if app is in a monorepo (lerna or yarn workspace), treat other packages in
  // the monorepo as if they are app source
  Array.prototype.push.apply(module.exports.srcPaths, getMonorepoPkgPaths())
}
