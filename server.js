var koa = require('koa')
var serve = require('koa-static')
var logger = require('koa-logger')

var app = koa()
app.use(serve("public"))
app.listen(80)