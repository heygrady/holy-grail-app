export default () => {
  var links = document.querySelectorAll('link.deferred-css')
  var styleSheets = document.styleSheets
  if (styleSheets.length && links.length) {
    var count = 0
    for (
      let i = 0, len = styleSheets.length, linksLen = links.length;
      i < len;
      i++
    ) {
      const sheet = styleSheets[i]
      const { ownerNode: link } = sheet
      if (link.tagName === 'link' && link.className === 'deferred-css') {
        sheet.disabled = true
        link.parentNode.removeChild(link)
        count += 1
      }
      if (count >= linksLen) {
        break
      }
    }
  } else if (links.length) {
    for (let i = 0, len = links.length; i < len; i++) {
      const link = links[i]
      link.parentNode.removeChild(link)
    }
  }
}
