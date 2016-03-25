import Koa from 'koa'
import convert from 'koa-convert'
import serve from 'koa-static'
import rewrite from 'koa-rewrite'
import mongo from 'koa-mongo'
import router from './router'
import favicon from 'koa-favicon'
import cache from 'koa-static-cache'

var app = new Koa()

if(process.env.NODE_ENV=="debug"){
	var logger = require('koa-logger')
	var webpack = require('webpack')
	var config = require('../webpack.config')
	var compiler = webpack(config)
	app.use(convert(logger()))
	app.use(convert(require("koa-webpack-dev-middleware")(compiler, {noInfo: true, publicPath: config.output.publicPath})))
	app.use(convert(require("koa-webpack-hot-middleware")(compiler)))
}
app.use(convert(mongo({host:process.env['MONGO_PORT_27017_TCP_ADDR']||'localhost',port:27017,db:"main"})))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(convert(cache("public",{maxAge:30*60*60})))
app.use(convert(rewrite('/*.html','/index.html')))
app.use(convert(serve("public")))
app.use(convert(favicon('./src/favicon.ico')))
app.listen(80)
