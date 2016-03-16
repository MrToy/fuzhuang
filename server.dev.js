var koa = require('koa')
var serve = require('koa-static')
var logger = require('koa-logger')
var webpack = require('webpack')
var request = require("co-request")
var rewrite = require('koa-rewrite')

var config = require('./webpack.config.dev')
var compiler = webpack(config)
var app = koa()
app.use(logger())
app.use(require("koa-webpack-dev-middleware")(compiler, {
	noInfo: true, publicPath: config.output.publicPath
}))
app.use(require("koa-webpack-hot-middleware")(compiler))
app.use(rewrite('/*.html','/index.html'))
app.use(serve("public"))

app.listen(80)
