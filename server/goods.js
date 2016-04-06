import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()

router.post('/',async ctx=>{
	var {_id}=await getUser(ctx)
	try{
		var {name,info,imgs,price}=await parse.json(ctx)
		var shop=await ctx.mongo.collection("shops").findOne({owner:_id})
		if(!shop)
			ctx.throw("还未创建店铺",403)
		await ctx.mongo.collection("goods").insert({shop:shop._id,name,info,imgs,price})
	}catch(err){
		ctx.throw("添加失败",403)
	}
	ctx.body={success:true}
})

router.get('/:id',async ctx=>{
	try{
		var id=ObjectID(ctx.params.id)
		ctx.body=await ctx.mongo.collection("goods").findOne({_id:id})
	}catch(err){
		ctx.throw("获取失败",403)
	}
})
router.get('/',async ctx=>{
	var {shop,limit,skip}=ctx.query
	var config={}
	if(shop)
		config.shop=ObjectID(shop)
	try{
		var total=await ctx.mongo.collection("goods").find(config).count()
		var data=await ctx.mongo.collection("goods").find(config).limit(parseInt(limit)||20).skip(parseInt(skip)||0).toArray()
		ctx.body={total,data}
	}catch(err){
		ctx.throw("获取失败",403)
	}
})
router.delete('/:id',async ctx=>{
	var user=await getUser(ctx)
	try{
		var id=ObjectID(ctx.params.id)
		await ctx.mongo.collection("goods").remove({"_id":id})
	}catch(err){
		ctx.throw("删除失败")
	}
	ctx.body={success:true}
})
export default router
