import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import parse from 'co-body'
import validator from 'validator'
import crypto from 'crypto'
import {ObjectID} from 'mongodb'

var jwtKey="testKey"
var router=new Router()
router.post('/auth',async ctx=>{
	var {account,pass}=await parse.json(ctx)
	var sum=crypto.createHash('sha1')
	sum.update(pass)
	pass=sum.digest('hex')
	var res=await ctx.mongo.collection("users").findOne({account,pass})
	if(!res)
		throw "登录失败，请检查账号密码是否正确"
	ctx.body={token:jwt.sign({id:res._id},jwtKey,{expiresIn:"7d"})}  
})

export async function getUser(ctx){
	try{
		var decoded=jwt.verify(ctx.query.token,jwtKey)
	}catch(err){
		throw "鉴权失败，请尝试重新登录"
	}
	var res=await ctx.mongo.collection("users").findOne({_id:ObjectID(decoded.id)})
	if(!res)
		throw "用户不存在"
	return res
}

router.get('/info',async ctx=>{
	ctx.body=await getUser(ctx)
})
router.post('/',async ctx=>{
	var {account,pass,repass,captcha,target}=await parse.json(ctx)
	if(!validator.isMobilePhone(account,"zh-CN"))
		throw "手机号错误"
	if(!validator.isLength(pass,{min:6,max:30}))
		throw "密码长度应为6到30位"
	if(pass!=repass)
		throw "两次密码输入不一致"
	var data=await ctx.mongo.collection("captcha").findOne({tel:account})
	if(!data||data.code!=captcha)
		throw "验证码错误"
	var sum=crypto.createHash('sha1')
	sum.update(pass)
	pass=sum.digest('hex')
	await ctx.mongo.collection("users").ensureIndex({account:1},{unique: true})
	try{
		var res=await ctx.mongo.collection("users").insert({account,pass,target,createTime:new Date()})
	}catch(err){
		if(err.code==11000)
			err.message="该用户已被注册，请尝试直接登录"
		throw err
	}
	ctx.body={token:jwt.sign({id:res.ops[0]['_id']},jwtKey,{expiresIn:"7d"})}
})

router.put('/',async ctx=>{
	var user=await getUser(ctx)
	var data=await parse.json(ctx)
	var nickname=data.nickname+""
	if(!validator.isLength(nickname,{max:30}))
		ctx.throw("昵称最长为30位",400)
	try{
		var id=ObjectID(user["_id"])
		await ctx.mongo.collection("users").updateOne({"_id":id},{"$set":{nickname}})
	}catch(err){
		ctx.throw("修改失败")
	}
	ctx.body={success:true}
})

export default router