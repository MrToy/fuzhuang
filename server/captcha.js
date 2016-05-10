import Alidayu from 'alidayu-node'
import Router from 'koa-router'
import parse from 'co-body'
import validator from 'validator'
var router=new Router()

async function smsSend(tel,code){
	return new Promise((resolve,reject)=>{
		var app=new Alidayu('23361783','2554ae11cf420866e55ae9e6545e6a51')
		app.smsSend({sms_free_sign_name:'第一印象',sms_param: JSON.stringify({code,"product":"第一印象"}),rec_num:tel,sms_template_code:'SMS_8985981'},res=>{
			if(res.error_response){
				if(res.error_response.sub_code=="isv.BUSINESS_LIMIT_CONTROL")
					reject("请求过于频繁，请稍后再试")
				else
					reject(res.error_response.sub_msg)
			}else
				resolve()
		})
	})
};

router.post('/',async ctx=>{
	var {tel}=await parse.json(ctx)
	if(!validator.isMobilePhone(tel,"zh-CN"))
		throw "错误的手机号"
	var code=Math.random().toString().slice(2,8)
	await ctx.mongo.collection("captcha").ensureIndex({expire:1},{expireAfterSeconds:5*60})
	await ctx.mongo.collection("captcha").update({tel},{tel,code,expire:new Date()},{upsert:true})
	await smsSend(tel,code)
	ctx.body={success:true}
})

export default router