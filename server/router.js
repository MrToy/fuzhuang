import Router from 'koa-router'
import jwt from 'jsonwebtoken'

function checkAdmin(ctx,next){
	try{
		var decoded=jwt.verify(ctx.query.token,"testKey")
		if(!decoded.isAdmin){
			return ctx.body={error:"no right"}
		}
		return next()
	}catch(err){
		ctx.body=err
	}
}
var router=new Router()
router.post('/auth',ctx=>{

})
// router.get('/auth',ctx=>{
// 	ctx.body={success:true,token:jwt.sign({user:"toy"},"testKey",{expiresIn:"7d"})}
// })
// router.get('/check',checkAdmin,ctx=>{
// 	ctx.body="ok"
// })
export default router