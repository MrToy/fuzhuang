import Router from 'koa-router'
import {getUser} from './users'
import formidable from 'formidable'
import Path from 'path'
import fs from 'fs'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
var router=new Router()

async function parseFile(ctx){
	return new Promise((resolve,reject)=>{
		var form = new formidable.IncomingForm({uploadDir:"upload",keepExtensions:true})
		form.parse(ctx.req,function(err,fields,files){
			err?reject(err):resolve({fields,files})
		})
	})
}

router.post('/',async ctx=>{
	var user=await getUser(ctx)
	var pid
	try{
		if(ctx.query.pid)
			pid=ObjectID(ctx.query.pid)
	}catch(err){}
	try{
		if(ctx.query.target=="folder"){
			await ctx.mongo.collection("files").insert({name:"新建文件夹",type:"folder",pid,owner:user["_id"]})
		}else{
			if(!fs.existsSync(Path.join(__dirname,"../upload")))fs.mkdirSync(Path.join(__dirname,"../upload"))
			var {fields,files}=await parseFile(ctx)
			for(var i in files){
				var {path,size,name,type}=files[i]
				path="/"+Path.relative("upload",path)
				await ctx.mongo.collection("files").insert({path,size,name,type,pid,owner:user["_id"],createTime:new Date()})
			}
		}
	}catch(err){
		ctx.throw("文件操作失败")
	}
	ctx.body={success:true}
})

router.get('/',async ctx=>{
	var user=await getUser(ctx)
	ctx.body=await ctx.mongo.collection("files").find({owner:user["_id"]}).toArray()
})

router.get('/image/:name',async ctx=>{
	var name=ctx.params.name
})

router.delete('/:id',async ctx=>{
	var user=await getUser(ctx)
	try{
		var id=ObjectID(ctx.params.id)
		async function recur(id){
			await ctx.mongo.collection("files").remove({"_id":id})
			var arr=await ctx.mongo.collection("files").find({pid:id}).toArray()
			for(var i=0;i<arr.length;i++){
				await recur(arr[i]["_id"])
			}
		}
		await recur(id)
	}catch(err){
		ctx.throw("删除失败")
	}
	ctx.body={success:true}
})
router.put('/:id',async ctx=>{
	var user=await getUser(ctx)
	var data=await parse.json(ctx)
	try{
		var id=ObjectID(ctx.params.id)
		if(data&&data.name)
			await ctx.mongo.collection("files").update({"_id":id,owner:user._id},{"$set":{name:data.name}})
	}catch(err){
		ctx.throw("修改失败")
	}
	ctx.body={success:true}
})
export default router
