const makeBundleStyles = bundles =>
  bundles
    .filter(bundle => bundle.file.endsWith('.css'))
    .map(style => `<link href="/dist/${style.file}" rel="stylesheet"/>`)
    .join('')

module.exports = makeBundleStyles
