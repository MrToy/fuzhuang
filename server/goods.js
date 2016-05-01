import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()

router.post('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {name,info,imgs,price,cate,itemCode,colors,sizes}=await parse.json(ctx)
	var shop=await ctx.mongo.collection("shops").findOne({owner:_id})
	if(!shop)
		throw "还未创建店铺"
	await ctx.mongo.collection("goods").insert({shop:shop._id,onSale:false,createTime:new Date(),name,info,imgs,price,cate,itemCode,colors,sizes})
	ctx.body={success:true}
})

router.get('/:id',async ctx=>{
	var id=ObjectID(ctx.params.id)
	ctx.body=await ctx.mongo.collection("goods").findOne({_id:id})
})

async function getCateReg(ctx,word){
	var cates=((await ctx.mongo.collection("configs").findOne({name:"菜单"}))||{}).data||[]
	var res=[]
	function recur(word){
		res.push(word)
		cates.filter(it=>it.parent==word).forEach(it=>recur(it.text))
	}
	recur(word)
	return "["+res.toString()+"]"
}

router.get('/',async ctx=>{
	var {shop,limit,skip,onSale,word,sort}=ctx.query
	var config={}
	if(shop)
		config.shop=ObjectID(shop)
	if(onSale)
		config.onSale=true
	if(word){
		var reg=await getCateReg(ctx,word)
		config.cate={$regex:reg,$options:'i'}
	}
	var sortConfig={}
	if(sort){
		var [k,v]=sort.split(",")
		if(k&&k!="")
			sortConfig[k]=(v=="-"?-1:1)
	}
	var total=await ctx.mongo.collection("goods").find(config).count()
	var data=await ctx.mongo.collection("goods").find(config).sort(sortConfig).limit(parseInt(limit)||20).skip(parseInt(skip)||0).toArray()
	ctx.body={total,data}
})
router.delete('/:id',async ctx=>{
	var {_id}=await getUser(ctx)
	var id=ObjectID(ctx.params.id)
	var shop=await ctx.mongo.collection("shops").findOne({owner:_id})
	await ctx.mongo.collection("goods").remove({"_id":id,shop:shop._id})
	ctx.body={success:true}
})
router.put('/:id',async ctx=>{
	var {_id}=await getUser(ctx)
	var {name,info,imgs,price,cate,itemCode,colors,sizes}=await parse.json(ctx)
	var id=ObjectID(ctx.params.id)
	var shop=await ctx.mongo.collection("shops").findOne({owner:_id})
	await ctx.mongo.collection("goods").updateOne({"_id":id,shop:shop._id},{"$set":{name,info,imgs,price,cate,itemCode,colors,sizes}})
	ctx.body={success:true}
})
export default router
