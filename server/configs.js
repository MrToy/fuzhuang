import Router from 'koa-router'
import {getUser} from './users'
import parse from 'co-body'
var router=new Router()
router.get('/:name',async ctx=>{
	try{
		ctx.body=await ctx.mongo.collection("configs").findOne({name:ctx.params.name})
	}catch(err){
		ctx.throw("获取失败")
	}
})
router.post('/:name',async ctx=>{
	var {target}=await getUser(ctx)
	if(target!="admin")
		ctx.throw("无权限",403)
	var {imgs1,imgs2}=await parse.json(ctx)
	try{
		await ctx.mongo.collection("configs").ensureIndex({name:1},{unique: true})
		ctx.body=await ctx.mongo.collection("configs").update({name:ctx.params.name},{"$set":{imgs1,imgs2}},{upsert:true})
	}catch(err){
		ctx.throw("修改失败")
	}
})
export default router
