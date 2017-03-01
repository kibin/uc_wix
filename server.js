const express = require('express')
const path = require('path')
const webpack = require('webpack')
const {pathOr, map, forEach, merge} = require('ramda')
const {renderFile} = require('ejs')
const devConstructor = require('webpack-dev-middleware')
const hotConstructor = require('webpack-hot-middleware')

const {NODE_ENV, PORT} = require('./vars')

const isProd = NODE_ENV === 'production'

const defaultRoutes = require('./routes')
const config = require(`./webpack.config${isProd ? '.production' : ''}`)
const compiler = webpack(config)

const plugDevMiddleware = app =>
  app.use(devConstructor(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
  }))

const plugHotMiddleware = app => app.use(hotConstructor(compiler))

const plugHTMLParser = app =>
  app.set('view engine', 'ejs').engine('html', renderFile)

const plugAssets = app =>
  app.use(
    config.output.publicPath,
    express.static(path.join('dist'), {maxAge: '365d'})
  )

const getAssets = stats => map(route => merge(route, {
  params: merge(route.params, {
    js: pathOr(
      `${route.name}.js`,
      ['assetsByChunkName', route.name, 0],
      stats
    ),
    css: pathOr(
      `${route.name}.css`,
      ['assetsByChunkName', route.name, 1],
      stats
    ),
  }),
}), defaultRoutes)

const plugRouter = (app, stats) => {
  const routes = getAssets(stats)

  forEach(route => app.get(route.path, (_req, res) => {
    res.render(route.template, route.params)
  }), routes)
}

function startServer() {
  const app = express()

  plugHTMLParser(app)

  if (isProd) {
    const stats = require('./dist/stats.json')
    plugAssets(app)
    plugRouter(app, stats)
  } else {
    plugDevMiddleware(app)
    plugHotMiddleware(app)
    plugRouter(app)
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}


startServer()
