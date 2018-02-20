const makeBundleScripts = bundles =>
  bundles
    .filter(bundle => bundle.file.endsWith('.js'))
    .map(
      script =>
        `<script src="/${
          script.file
        }" defer="defer" crossorigin="anonymous"></script>`
    )
    .join('')

module.exports = makeBundleScripts
