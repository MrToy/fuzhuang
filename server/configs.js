import Router from 'koa-router'
import {getUser} from './users'
import parse from 'co-body'
var router=new Router()
router.get('/:name',async ctx=>{
	ctx.body=await ctx.mongo.collection("configs").findOne({name:ctx.params.name})
})
router.post('/:name',async ctx=>{
	var {target}=await getUser(ctx)
	if(target!="admin")
		throw "无权限"
	var {s1,s2,s3,s4,s5}=await parse.json(ctx)
	await ctx.mongo.collection("configs").ensureIndex({name:1},{unique: true})
	ctx.body=await ctx.mongo.collection("configs").update({name:ctx.params.name},{"$set":{s1,s2,s3,s4,s5}},{upsert:true})
})
export default router
