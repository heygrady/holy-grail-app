const fs = require('fs')
const path = require('path')
const router = require('express').Router()

const deferMainStyles = require('./helpers/deferMainStyles')
const makeBundleScripts = require('./helpers/makeBundleScripts')
const makeBundleStyles = require('./helpers/makeBundleStyles')

const stats = require('../build/react-loadable.json')
const render = require('./app/main').default

const defaultNoscript = `
<noscript>
  You need to enable JavaScript to run this app.
</noscript>`

router.get('*', (req, res) => {
  const fileName = path.join(__dirname, '../build', 'index.html')

  fs.readFile(fileName, 'utf8', (err, file) => {
    if (err) {
      throw err
    }

    const context = {}
    render({ context, stats, url: req.url }).then(
      ({ body, helmet, bundles }) => {
        if (context.url) {
          res.redirect(301, context.url)
          return
        }

        const styles = makeBundleStyles(bundles)

        const scripts = makeBundleScripts(bundles).concat(
          helmet.script.toString()
        )

        // TODO: create the main css as a deferred style with a noscript fallback
        deferMainStyles(file)

        res.write(
          file
            .replace('$htmlattributes', helmet.htmlAttributes.toString())
            .replace('<!-- $title -->', helmet.title.toString())
            .replace('<!-- $base -->', helmet.base.toString())
            .replace('<!-- $meta -->', helmet.meta.toString())
            .replace('<!-- $link -->', helmet.link.toString())
            .replace('<!-- $style -->', helmet.style.toString().concat(styles))
            .replace('$bodyattributes', helmet.bodyAttributes.toString())
            .replace(
              '<!-- $noscript -->',
              helmet.noscript.toString() || defaultNoscript
            )
            .replace('<!-- $body -->', body)
            .replace(
              /(manifest.*?\.js" defer="defer" crossorigin="anonymous"><\/script>)/,
              `$1${scripts}`
            )
          // .replace(/(<\/body>)/, `${mainScript}$1`)
        )
        res.end()
      }
    )
  })
})

module.exports = router
