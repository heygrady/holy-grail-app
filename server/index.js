const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')
const { preloadModules } = require('../build/static/server/main')
const reactApp = require('./react-app')

const PORT = process.env.PORT || 3001
const app = express()

app.use(serveStatic(path.join(__dirname, '../build'), { index: false }))
app.use(reactApp)

preloadModules().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`)
  })
})
