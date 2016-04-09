import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()

router.post('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {amount,goods,addr}=await parse.json(ctx)
	if(typeof amount!='number')
		throw "数量有误"
	var goods=await ctx.mongo.collection("goods").findOne({_id:ObjectID(goods)})
	if(!goods)
		throw "商品不存在"
	if(!goods.onSale)
		throw "该商品未上架"
	var addr=await ctx.mongo.collection("addrs").findOne({_id:ObjectID(addr)})
	if(!addr)
		throw "地址不存在"
	var res=await ctx.mongo.collection("deals").insert({amount,goods,addr,buyer:_id,status:"待付款",createTime:new Date()})
	ctx.body={success:true,id:res.ops[0]['_id']}
})
router.get('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {limit,skip,sort,shop}=ctx.query
	var config={buyer:_id}
	if(shop&&shop!=""){
		var shop=await ctx.mongo.collection("shops").findOne({owner:_id})
		config={shop:shop._id}
	}
	var total=await ctx.mongo.collection("deals").find(config).count()
	var data=await ctx.mongo.collection("deals").find(config).sort({createTime:-1}).limit(parseInt(limit)||20).skip(parseInt(skip)||0).toArray()
	ctx.body={total,data}
})
router.get('/:id',async ctx=>{
	try{
		ctx.body=await ctx.mongo.collection("deals").findOne({_id:ObjectID(ctx.params.id)})
	}catch(err){
		ctx.throw("获取失败",403)
	}
})
export default router
