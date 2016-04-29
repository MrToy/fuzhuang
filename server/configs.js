import Router from 'koa-router'
import {getUser} from './users'
import parse from 'co-body'
var router=new Router()
router.get('/:name',async (ctx,next)=>{
	var res=await ctx.mongo.collection("configs").findOne({name:ctx.params.name})
	res?ctx.body=res.data:next()
})
router.post('/:name',async ctx=>{
	var {target}=await getUser(ctx)
	if(target!="admin")
		throw "无权限"
	var data=await parse.json(ctx)
	await ctx.mongo.collection("configs").ensureIndex({name:1},{unique: true})
	ctx.body=await ctx.mongo.collection("configs").update({name:ctx.params.name},{"$set":{data}},{upsert:true})
})
export default router
