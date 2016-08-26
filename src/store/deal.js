import fetch from 'isomorphic-fetch'
import querystring from 'querystring'
import jsontile from 'jsontile'

const domain="http://business.ikey.pub"

export async function CreateDeal(token,current){
	var res=await fetch(`${domain}/orders?token=${token}`,{
		method:"post",
		body:querystring.stringify(jsontile({items:current.data,shop:current.shop})),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
	return await res.json()
}

export async function GetDeals(token,target,config){
	config=config||{}
	config.token=token
	config.target=target
	var query=querystring.stringify(config)
	var res=await fetch(`${domain}/orders?${query}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}

export async function GetDealById(id){
	var res=await fetch(`${domain}/orders/${id}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}