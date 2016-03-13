var koa = require('koa')
var serve = require('koa-static')
var logger = require('koa-logger')
var route = require('koa-route')
var webpack = require('webpack')
var request = require("co-request")

var config = require('./webpack.config.dev')
var compiler = webpack(config)
var app = koa()
app.use(logger())
app.use(require("koa-webpack-dev-middleware")(compiler, {
	noInfo: true, publicPath: config.output.publicPath
}))
app.use(require("koa-webpack-hot-middleware")(compiler))
app.use(serve("public"))
app.listen(80)
