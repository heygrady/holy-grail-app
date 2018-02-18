const fs = require('fs')
const path = require('path')
const router = require('express').Router()

const render = require('../build/static/server/main').default

router.get('*', (req, res) => {
  var fileName = path.join(__dirname, '../build', 'index.html')

  fs.readFile(fileName, 'utf8', (err, file) => {
    if (err) {
      throw err
    }

    const context = {}
    const { body, helmet } = render({ context, url: req.url })

    if (context.url) {
      res.redirect(301, context.url)
      return
    }

    const defaultNoscript = `
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>`

    res.write(
      file
        .replace('$htmlattributes', helmet.htmlAttributes.toString())
        .replace('<!-- $title -->', helmet.title.toString())
        .replace('<!-- $base -->', helmet.base.toString())
        .replace('<!-- $meta -->', helmet.meta.toString())
        .replace('<!-- $link -->', helmet.link.toString())
        .replace('<!-- $style -->', helmet.style.toString())
        .replace('$bodyattributes', helmet.bodyAttributes.toString())
        .replace('<!-- $noscript -->', helmet.noscript.toString() || defaultNoscript)
        .replace('<!-- $body -->', body)
        .replace('<!-- $script -->', helmet.script.toString())
        .replace('<!-- $footer -->', '')
    )
    res.end()
  })
})

module.exports = router
