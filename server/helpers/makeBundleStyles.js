const makeBundleStyles = bundles =>
  bundles.filter(bundle => bundle.file.endsWith('.css')).reduce(
    (result, style) => {
      result.links += `<link rel="stylesheet" type="text/css" href="/dist/${
        style.file
      }" media="all" />`
      result.urls += `lCss('/dist/${style.file}', 'all');`
      return result
    },
    { links: '', urls: [] }
  )

module.exports = makeBundleStyles
