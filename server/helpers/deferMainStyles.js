// <noscript>
// <link rel="stylesheet" type="text/css" href="$1" />
// </noscript>

module.exports = file => {
  const match = file.match(
    /<link href="(.*main(?:\.\w+)?\.css)" rel="stylesheet">/
  )
  if (!match) {
    return {}
  }
  return {
    link: match[0],
    url: `lCss('${match[1]}', 'all');`
  }
}
