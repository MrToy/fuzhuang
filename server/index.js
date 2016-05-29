import Koa from 'koa'
import convert from 'koa-convert'
import send from 'koa-send'
import mongo from 'koa-mongo'
import favicon from 'koa-favicon'
import cache from 'koa-static-cache'
import serve from 'koa-static'
import Router from 'koa-router'
import logger from 'koa-logger'

import users from './users'
import files from './files'
import shops from './shops'
import goods from './goods'
import configs from './configs'
import deals from './deals'
import addrs from './addrs'
import news from './news'
import captcha from './captcha'

var router=new Router()
router.get('/',ctx=>send(ctx,'./public/index.html'))
router.get('/*.html',ctx=>send(ctx,'./public/index.html'))
router.use('/users',users.routes(),users.allowedMethods())
router.use('/files',files.routes(),files.allowedMethods())
router.use('/shops',shops.routes(),shops.allowedMethods())
router.use('/goods',goods.routes(),goods.allowedMethods())
router.use('/configs',configs.routes(),configs.allowedMethods())
router.use('/deals',deals.routes(),deals.allowedMethods())
router.use('/addrs',addrs.routes(),addrs.allowedMethods())
router.use('/news',news.routes(),news.allowedMethods())
router.use('/captcha',captcha.routes(),captcha.allowedMethods())

var app = new Koa()
app.use(async (ctx,next)=>{
	try{
		await next()
	}catch(err){
		console.error(err)
		if(typeof err == 'string'){
			ctx.body={error:err}
			ctx.status=403
		}
		if(typeof err == 'object'){
			ctx.body={error:err.message}
			ctx.status=err.status||403
		}
	}
})
if(process.env.NODE_ENV=="debug"){
	var webpack = require('webpack')
	var config = require('../webpack.config')
	var compiler = webpack(config)
	app.use(convert(require("koa-webpack-dev-middleware")(compiler, {noInfo: true, publicPath: config.output.publicPath})))
	app.use(convert(require("koa-webpack-hot-middleware")(compiler)))
}
app.use(convert(logger()))
app.use(convert(mongo({
	host:process.env['MONGO_PORT_27017_TCP_ADDR']||'localhost',
	port:27017,
	db:"main"
})))
app.use(convert(cache("public",{maxAge:365*24*60*60})))
app.use(convert(serve("public")))
app.use(convert(favicon('./src/favicon.ico')))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(80)
