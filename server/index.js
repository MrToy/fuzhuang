import Koa from 'koa'
import convert from 'koa-convert'
import serve from 'koa-static'
import rewrite from 'koa-rewrite'
import mongo from 'koa-mongo'
import favicon from 'koa-favicon'
import cache from 'koa-static-cache'
import Router from 'koa-router'
import logger from 'koa-logger'
import imgdata from './imgdata'
import users from './users'
import files from './files'
import shops from './shops'
import goods from './goods'

var app = new Koa()
var router=new Router()
if(process.env.NODE_ENV=="debug"){
	var webpack = require('webpack')
	var config = require('../webpack.config')
	var compiler = webpack(config)
	app.use(convert(require("koa-webpack-dev-middleware")(compiler, {noInfo: true, publicPath: config.output.publicPath})))
	app.use(convert(require("koa-webpack-hot-middleware")(compiler)))
}
app.use(convert(logger()))
app.use(convert(mongo({host:process.env['MONGO_PORT_27017_TCP_ADDR']||'localhost',port:27017,db:"main"})))
app.use(convert(cache("public",{maxAge:30*60*60})))
app.use(convert(rewrite('/*.html','/index.html')))
app.use(convert(serve("public")))
app.use(convert(serve("upload")))
app.use(convert(favicon('./src/favicon.ico')))
router.use('/imgdata',imgdata.routes(),imgdata.allowedMethods())
router.use('/users',users.routes(),users.allowedMethods())
router.use('/files',files.routes(),files.allowedMethods())
router.use('/shops',shops.routes(),shops.allowedMethods())
router.use('/goods',goods.routes(),goods.allowedMethods())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)
