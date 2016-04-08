import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()

router.post('/',async ctx=>{
	var {_id}=await getUser(ctx)
	try{
		var {goodsId}=await parse.json(ctx)
		var goods=await ctx.mongo.collection("goods").findOne({_id:ObjectID(goodsId)})
		await ctx.mongo.collection("deals").insert({shop:goods.shop,goods:goods._id,buyer:_id,createTime:new Date()})
	}catch(err){
		ctx.throw("下单失败",403)
	}
	ctx.body={success:true}
})
router.get('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {limit,skip,sort,shop}=ctx.query
	var config={buyer:_id}
	if(shop&&shop!=""){
		try{
			var shop=await ctx.mongo.collection("shops").findOne({owner:_id})
			config={shop:shop._id}
		}catch(err){
			ctx.throw(err)
		}
	}
	try{
		var total=await ctx.mongo.collection("deals").find(config).count()
		var data=await ctx.mongo.collection("deals").find(config).sort({createTime:-1}).limit(parseInt(limit)||20).skip(parseInt(skip)||0).toArray()
		ctx.body={total,data}
	}catch(err){
		ctx.throw("获取失败",403)
	}
})
router.get('/:id',async ctx=>{
	try{
		ctx.body=await ctx.mongo.collection("deals").findOne({_id:ObjectID(ctx.params.id)})
	}catch(err){
		ctx.throw("获取失败",403)
	}
})
export default router
