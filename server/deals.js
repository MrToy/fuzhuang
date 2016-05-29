import Router from 'koa-router'
import {getUser} from './users'
import {ObjectID} from 'mongodb'
import parse from 'co-body'
import fetch from "node-fetch"
import querystring from "querystring"
import dateformat from "dateformat"
import crypto from "crypto"
import fs from "fs"
var router=new Router()

router.post('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {amount,goods,addr}=await parse.json(ctx)
	if(typeof amount!='number')
		throw "数量有误"
	var goods=await ctx.mongo.collection("goods").findOne({_id:ObjectID(goods)})
	if(!goods)
		throw "商品不存在"
	if(!goods.onSale)
		throw "该商品未上架"
	var addr=await ctx.mongo.collection("addrs").findOne({_id:ObjectID(addr)})
	if(!addr)
		throw "地址不存在"
	var res=await ctx.mongo.collection("deals").insert({amount,goods,addr,buyer:_id,status:"待付款",createTime:new Date()})
	ctx.body={success:true,id:res.ops[0]['_id']}
})
router.get('/',async ctx=>{
	var {_id}=await getUser(ctx)
	var {limit,skip,sort,shop}=ctx.query
	var config={buyer:_id}
	if(shop&&shop!=""){
		var shop=await ctx.mongo.collection("shops").findOne({owner:_id})
		config={shop:shop._id}
	}
	var total=await ctx.mongo.collection("deals").find(config).count()
	var data=await ctx.mongo.collection("deals").find(config).sort({createTime:-1}).limit(parseInt(limit)||20).skip(parseInt(skip)||0).toArray()
	ctx.body={total,data}
})

router.get('/redirect',async ctx=>{
	var {id}=ctx.query
	var deal=await ctx.mongo.collection("deals").findOne({_id:ObjectID(id)})
	if(!deal)
		throw "该订单不存在"
	if(deal.status!="待付款")
		throw "商品状态目前为 "+deal.status
	var query={
		partner:"2088221651662605",
		service:"create_direct_pay_by_user",
		_input_charset:"utf-8",
		timestamp:dateformat(new Date(),"yyyy-mm-dd HH:MM:ss"),
		version:"1.0",
		out_trade_no:id,
		total_fee:deal.goods.price*deal.amount,
		subject:deal.goods.name,
		payment_type:"1",
		seller_email:"1203111636@qq.com",
		notify_url:"http://www.zzwlpf.com/deals/notify"
	}
	var str=Object.keys(query).sort().map(i=>i+"="+query[i]).join('&')
	var key= fs.readFileSync('../key/private.pem').toString()
	query.sign = crypto.createSign('RSA-SHA1').update(str,'utf-8').sign(key,'base64')
	query.sign_type="RSA"
	var url="https://mapi.alipay.com/gateway.do?"+querystring.stringify(query)
	ctx.redirect(url)
})

const TradeStatus={
	WAIT_BUYER_PAY:"待付款",
	TRADE_CLOSED:"交易关闭",
	TRADE_SUCCESS:"待发货",
	TRADE_PENDING:"待收款",
	TRADE_FINISHED:"交易结束"
}

router.post('/notify',async ctx=>{
	var {out_trade_no,trade_status}=querystring.parse(await parse.text(ctx))
	trade_status=TradeStatus[trade_status]
	out_trade_no=ObjectID(out_trade_no)
	if(!trade_status||!out_trade_no)
		throw "交易异常"
	await ctx.mongo.collection("deals").update({_id:out_trade_no},{$set:{status:trade_status}})
	ctx.body="success"
})

router.get('/:id',async ctx=>{
	ctx.body=await ctx.mongo.collection("deals").findOne({_id:ObjectID(ctx.params.id)})
})
router.put('/:id',async ctx=>{
	var {intent}=ctx.query
	if(intent=="cancle")
		ctx.body=await ctx.mongo.collection("deals").update({_id:ObjectID(ctx.params.id)},{$set:{status:"已取消"}})
})
export default router
