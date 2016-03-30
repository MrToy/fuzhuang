import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import parse from 'co-body'
import validator from 'validator'
import crypto from 'crypto'
import {ObjectID} from 'mongodb'

var jwtKey="testKey"
var router=new Router()
router.post('/auth',async ctx=>{
	var data=await parse.json(ctx)
	console.log(data)
	var account=data.account+""
	var pass=data.pass+""
	var sum=crypto.createHash('sha1')
	sum.update(pass)
	pass=sum.digest('hex')
	var res=await ctx.mongo.collection("users").findOne({account,pass})
	if(!res)
		ctx.throw("登录失败，请检查账号密码是否正确",400)
	ctx.body={token:jwt.sign({id:res._id},jwtKey,{expiresIn:"7d"})}  
})

export async function getUser(ctx){
	try{
		var decoded=jwt.verify(ctx.query.token,jwtKey)
	}catch(err){
		ctx.throw("登录过期",400)
	}
	var res=await ctx.mongo.collection("users").findOne({_id:ObjectID(decoded.id)})
	if(!res)
		ctx.throw("请尝试重新登录",400)
	return res
}

router.get('/info',async ctx=>{
	try{
		ctx.body=await getUser(ctx)
	}catch(err){
		ctx.throw(err,400)
	}
})
router.post('/',async ctx=>{
	var data=await parse.json(ctx)
	var account=data.account+""
	var pass=data.pass+""
	var captcha=data.captcha+""
	var target=data.target+""
	if(!validator.isLength(account,{min:6,max:30})||!validator.isLength(pass,{min:6,max:30}))
		ctx.throw("账号/密码长度应为6到30位",400)
	if(!validator.isMobilePhone(account,"zh-CN"))
		ctx.throw("手机号错误",400)
	if(captcha!="1234")
		ctx.throw("验证码错误",400)
	var sum=crypto.createHash('sha1')
	sum.update(pass)
	pass=sum.digest('hex')
	await ctx.mongo.collection("users").ensureIndex({account:1},{unique: true})
	try{
		var res=await ctx.mongo.collection("users").insert({account,pass,target})
	}catch(err){
		ctx.throw("该账号已被注册",400)
	}
	ctx.body={token:jwt.sign({id:res.ops[0]['_id']},jwtKey,{expiresIn:"7d"})}
})
export default router