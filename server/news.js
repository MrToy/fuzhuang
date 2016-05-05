import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()

router.get('/',async ctx=>{
	var {limit,skip,sortKey,sortValue}=ctx.query
	var total=await ctx.mongo.collection("news").find().count()
	var data=await ctx.mongo.collection("news").find()
		.sort({[sortKey||"createTime"]:parseInt(sortValue||-1)})
		.limit(parseInt(limit)||20)
		.skip(parseInt(skip)||0)
		.toArray()
	ctx.body={total,data}
})

router.post('/',async ctx=>{
	var {nickname,account,target}=await getUser(ctx)
	if(target!="admin")throw "无权限"
	var {title,data}=await parse.json(ctx)
	await ctx.mongo.collection("news").insert({title,data,author:nickname||account,createTime:new Date()})
	ctx.body={success:true}
})

router.get('/:id',async ctx=>{
	var id=ObjectID(ctx.params.id)
	ctx.body=await ctx.mongo.collection("news").findOne({_id:id})
})


router.delete('/:id',async ctx=>{
	var {target}=await getUser(ctx)
	if(target!="admin")throw "无权限"
	var id=ObjectID(ctx.params.id)
	await ctx.mongo.collection("news").remove({"_id":id})
	ctx.body={success:true}
})
router.put('/:id',async ctx=>{
	var {target}=await getUser(ctx)
	if(target!="admin")throw "无权限"
	var {title,data}=await parse.json(ctx)
	var id=ObjectID(ctx.params.id)
	await ctx.mongo.collection("news").updateOne({"_id":id},{"$set":{title,data}})
	ctx.body={success:true}
})
export default router
