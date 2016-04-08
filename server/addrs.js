import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()
router.post('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {name,addr,fullAddr,postcode,tel}=await parse.json(ctx)
	await ctx.mongo.collection("addrs").insert({name,addr,fullAddr,postcode,tel,def:false,owner:_id ,createTime:new Date()})
	ctx.body={success:true}
})
router.put('/def/:id',async ctx=>{
	var {_id}=await getUser(ctx)
	await ctx.mongo.collection("addrs").update({owner:_id},{$set:{def:false}},{multi:true})
	await ctx.mongo.collection("addrs").update({"_id":ObjectID(ctx.params.id),owner:_id},{$set:{def:true}})
	ctx.body={success:true}
})
router.put('/:id',async ctx=>{
	var {_id}=await getUser(ctx)
	var {name,addr,fullAddr,postcode,tel}=await parse.json(ctx)
	await ctx.mongo.collection("addrs").update({"_id":ObjectID(ctx.params.id),owner:_id},{$set:{name,addr,fullAddr,postcode,tel}})
	ctx.body={success:true}
})

router.get('/:id',async ctx=>{
	ctx.body=await ctx.mongo.collection("addrs").findOne({_id:ObjectID(ctx.params.id)})
})
router.get('/',async ctx=>{
	var {_id}=await getUser(ctx)
	ctx.body=await ctx.mongo.collection("addrs").find({owner:_id}).sort({createTime:-1}).toArray()
})
router.delete('/:id',async ctx=>{
	var {_id}=await getUser(ctx)
	await ctx.mongo.collection("addrs").remove({"_id":ObjectID(ctx.params.id),owner:_id})
	ctx.body={success:true}
})
export default router
