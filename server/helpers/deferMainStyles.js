// <noscript>
// <link rel="stylesheet" type="text/css" href="$1" />
// </noscript>

module.exports = file =>
  console.log(
    file.match(/<link href="(.*main(?:\.\w+)?\.css)" rel="stylesheet">/)
  )
