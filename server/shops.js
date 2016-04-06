import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()

router.post('/',async ctx=>{
	var {_id}=await getUser(ctx)
	try{
		var {name,info}=await parse.json(ctx)
		await ctx.mongo.collection("shops").ensureIndex({owner:1},{unique: true})
		await ctx.mongo.collection("shops").insert({owner:_id,name,info})
	}catch(err){
		ctx.throw("创建失败",403)
	}
	ctx.body={success:true}
})

router.get('/info',async ctx=>{
	var {_id}=await getUser(ctx)
	try{
		ctx.body=await ctx.mongo.collection("shops").findOne({owner:_id})
	}catch(err){
		ctx.throw("获取失败",403)
	}
})

router.put('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {name,info}=await parse.json(ctx)
	try{
		await ctx.mongo.collection("shops").updateOne({owner:_id},{"$set":{name,info}})
	}catch(err){
		ctx.throw("修改失败",403)
	}
	ctx.body={success:true}
})

export default router
