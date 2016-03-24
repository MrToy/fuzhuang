import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import parse from 'co-body'
import validator from 'validator'
function checkAdmin(ctx,next){
	try{
		var decoded=jwt.verify(ctx.query.token,"testKey")
		if(!decoded.isAdmin){
			return ctx.body={error:"no right"}
		}
		return next()
	}catch(err){
		ctx.body=err
	}
}
var router=new Router()
router.post('/auth',async ctx=>{
	var data=await parse.json(ctx)
	var account=data.account+""
	var pass=data.pass+""
	var res=await ctx.mongo.collection("users").findOne({account,pass})
	if(res){
		ctx.body={account:res.account,target:res.target,token:jwt.sign(res,"testKey",{expiresIn:"7d"})}
	}else{
		ctx.throw("登录失败，请检查账号密码是否正确",400)
	}	
})
router.post('/users',async ctx=>{
	var data=await parse.json(ctx)
	var account=data.account+""
	var pass=data.pass+""
	var captcha=data.captcha+""
	var target=data.target+""
	if(target!="buyer"&&target!="saler")
		ctx.throw("请选择卖家或买家",400)
	if(!validator.isLength(account,{min:6,max:30})||!validator.isLength(pass,{min:6,max:30}))
		ctx.throw("账号/密码长度应为6到30位",400)
	if(!validator.isMobilePhone(account,"zh-CN"))
		ctx.throw("手机号错误",400)
	if(captcha!="1234")
		ctx.throw("验证码错误",400)
	await ctx.mongo.collection("users").ensureIndex({account:1},{unique: true})
	try{
		await ctx.mongo.collection("users").insert({account,pass,target})
		ctx.body={success:true,info:"注册成功"}
	}catch(err){
		ctx.throw("该账号已被注册",400)
	}
})
export default router