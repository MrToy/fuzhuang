import Router from 'koa-router'
import {getUser} from './users'
import formidable from 'formidable'
import serve from 'koa-static'
import convert from 'koa-convert'
import Path from 'path'
import fs from 'fs'
import {ObjectID} from 'mongodb'
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
				await ctx.mongo.collection("files").insert({path,size,name,type,pid,owner:user["_id"]})
			}
		}
	}catch(err){
		ctx.throw("文件操作失败")
	}
	ctx.body={success:true}
})

router.get('/',async ctx=>{
	var user=await getUser(ctx)
	try{
		ctx.body=await ctx.mongo.collection("files").find({owner:user["_id"]}).toArray()
	}catch(err){
		ctx.throw("上传失败")
	}
})

export default router
