import Router from 'koa-router'
import {getUser} from './users'
import formidable from 'formidable'
import Path from 'path'
import fs from 'fs'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
import {execFileSync} from 'child_process'
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
	if(ctx.query.pid&&ctx.query.pid!="")
		pid=ObjectID(ctx.query.pid)
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
	ctx.body={success:true}
})

router.get('/',async ctx=>{
	var user=await getUser(ctx)
	ctx.body=await ctx.mongo.collection("files").find({owner:user["_id"]}).toArray()
})

router.get('/image/:name',async (ctx,next)=>{
	var name=ctx.params.name
	var t=Path.extname(name).replace(".","")
	if(t!="jpg"||t!="png")
		return ctx.redirect("/"+name)
	var {w=0,h=0}=ctx.query
	var filename=w+"x"+h+"_"+name
	var filepath=Path.join(__dirname,"../upload",filename)
	var imgpath=Path.join(__dirname,"../upload",name)
	if(!fs.existsSync(filepath)){
		if(fs.existsSync(imgpath)){
			var img=fs.readFileSync(imgpath)
			var stdout=execFileSync(Path.join(__dirname,"image/resize"),["-w="+w,"-h="+h,"-t="+t],{input:img,maxBuffer: 20*1024*1024})
			fs.writeFileSync(filepath,stdout)
		}else{
			return next()
		}

	}
	ctx.redirect("/"+filename)
})

router.get('/:id',async (ctx,next)=>{
	var data=await ctx.mongo.collection("files").findOne({_id:ObjectID(ctx.params.id)})
	data?ctx.redirect(data.path):next()

})

router.delete('/:id',async ctx=>{
	var user=await getUser(ctx)
	var id=ObjectID(ctx.params.id)
	async function recur(id){
		await ctx.mongo.collection("files").remove({"_id":id})
		var arr=await ctx.mongo.collection("files").find({pid:id}).toArray()
		for(var i=0;i<arr.length;i++){
			await recur(arr[i]["_id"])
		}
	}
	await recur(id)
	ctx.body={success:true}
})
router.put('/:id',async ctx=>{
	var user=await getUser(ctx)
	var data=await parse.json(ctx)
	if(data&&data.name)
		await ctx.mongo.collection("files").update({"_id":ObjectID(ctx.params.id),owner:user._id},{"$set":{name:data.name}})
	if(data&&data.pid&&ctx.params.id!=data.pid)
		await ctx.mongo.collection("files").update({"_id":ObjectID(ctx.params.id),owner:user._id},{"$set":{pid:ObjectID(data.pid)}})
	if(data&&data.pid===null)
		await ctx.mongo.collection("files").update({"_id":ObjectID(ctx.params.id),owner:user._id},{"$set":{pid:null}})
	ctx.body={success:true}
})
export default router
