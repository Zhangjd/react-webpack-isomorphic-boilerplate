import express from 'express'

import webpack from 'webpack'
import webpackConfig from '../../webpack.server.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import React from 'react'
import {renderToString} from 'react-dom/server'
import {RouterContext, match} from 'react-router'
import {Provider} from 'react-redux'

import configureStore from '../stores/store.js'
import routes from '../routes.jsx'

const app = express()
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Example</title>
        <link rel="stylesheet" type="text/css" href="/static/app.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

if(process.env.NODE_ENV !== 'production'){
  console.log('server stared in dev mode')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
  app.use(webpackHotMiddleware(compiler))
}else{
  console.log('server stared in production mode')
  app.use('/static', express.static(__dirname + '/../../dist'))
}

app.get('/*', function (req, res) {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`)
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = configureStore()
      const state = store.getState()

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      res.end(renderFullPage(html, store.getState()))
    } else {
      res.status(404).end('Not found')
    }
  })
})

const server = app.listen(process.env.SERVER_PORT || 3002, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
