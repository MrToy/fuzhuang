import Router from 'koa-router'

var router=new Router()


// function* checkAdmin(next){
// 	try{
// 		var decoded=jwt.verify(this.query.token,"testKey")
// 		if(!decoded.isAdmin){
// 			this.body={error:"no right"}
// 			return
// 		}
// 		yield next
// 	}catch(err){
// 		this.body=err
// 	}
// }
// app.use(route.get('/check',checkAdmin))

router.get('/auth',ctx=>{
	ctx.body={success:true,token:jwt.sign({user:"toy"},"testKey",{expiresIn:"7d"})}
})
router.get('/check',ctx=>{
	ctx.body="ok"
})
router.get('/test',ctx=>{
	ctx.body="23333"
})
export default router