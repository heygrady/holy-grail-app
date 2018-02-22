const fs = require('fs')
const path = require('path')
const router = require('express').Router()

const deferMainStyles = require('./helpers/deferMainStyles')
const makeBundleScripts = require('./helpers/makeBundleScripts')
const makeBundleStyles = require('./helpers/makeBundleStyles')

const stats = require('../build/react-loadable.json')
const render = require('./app/main').default

const defaultNoscript =
  '<noscript>You need to enable JavaScript to run this app.</noscript>'

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

        let { links: cssLinks, urls: cssUrls } = makeBundleStyles(bundles)

        const scripts = makeBundleScripts(bundles).concat(
          helmet.script.toString()
        )

        const { link: mainLink, url: mainUrl } = deferMainStyles(file)
        if (mainLink) {
          file = file.replace(mainLink, '')
          cssLinks = mainLink + cssLinks
          cssUrls = mainUrl + cssUrls
        }

        // TODO: scan helmet links for styles and defer them
        // const helmetCssLinks = helmet.link.toString()
        // console.log(helmet.link)

        res.write(
          file
            .replace('$htmlattributes', helmet.htmlAttributes.toString())
            .replace('<!-- $title -->', helmet.title.toString())
            .replace('<!-- $base -->', helmet.base.toString())
            .replace('<!-- $meta -->', helmet.meta.toString())
            .replace('<!-- $link -->', helmet.link.toString())
            .replace('<!-- $style -->', helmet.style.toString())
            .replace('$bodyattributes', helmet.bodyAttributes.toString())
            .replace(
              '<!-- $noscript -->',
              helmet.noscript.toString() || defaultNoscript
            )
            .replace('<!-- $body -->', body)
            .replace(
              '<!-- $cssLinks -->',
              `<noscript class="deferred-css-noscript">${cssLinks}</noscript>`
            )
            .replace(/(dCss\(\){)/, `$1${cssUrls}`)
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
