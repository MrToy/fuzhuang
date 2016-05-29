import Router from 'koa-router'
import parse from 'co-body'
import fetch from "isomorphic-fetch"
import validator from 'validator'
import querystring from "querystring"
import dateformat from "dateformat"
import crypto from "crypto"

var router=new Router()

async function smsSend(tel,code){
	var alidayu=require("../key/alidayu.json")
	var query={
		app_key:alidayu.id,
		format:"json",
		method:"alibaba.aliqin.fc.sms.num.send",
		timestamp:dateformat(new Date(),"yyyy-mm-dd HH:MM:ss"),
		v:"2.0",
		sign_method:"md5",
		"sms_type":"normal",
		"sms_free_sign_name":'第一印象',
		"rec_num":tel,
		"sms_template_code":"SMS_8985981",
		"sms_param":JSON.stringify({code,"product":"第一印象"})
	}
	var queryArray=[]
	for(let i in query)
		queryArray.push(i+query[i])
	var key=alidayu.pass
	query.sign = crypto.createHash('md5').update(key+queryArray.sort().join('')+key,'utf-8').digest('hex').toUpperCase()
	var res=await fetch("http://gw.api.taobao.com/router/rest",{
		method:"POST",
		headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"},
		body:querystring.stringify(query)
	})
	var data=await res.json()
	if(data.error_response)
		throw data.error_response.sub_msg
}

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