import fetch from 'isomorphic-fetch'
import querystring from 'querystring'
import jsontile from 'jsontile'

export const domain="http://business.ikey.pub"

export async function CreateDeal(token,current){
	current.items=current.data
	var res=await fetch(`${domain}/orders?token=${token}`,{
		method:"post",
		body:querystring.stringify(jsontile(current)),
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

export async function DeliverById(token,id,express){
	var res=await fetch(`${domain}/orders/deliver/${id}?token=${token}`,{
		method:"put",
		body:querystring.stringify(express),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
}

export async function CancleById(token,id){
	var res=await fetch(`${domain}/orders/cancle/${id}?token=${token}`,{
		method:"put"
	})
	if(!res.ok)
		throw await res.text()
}
export async function ConfirmById(token,id){
	var res=await fetch(`${domain}/orders/confirm/${id}?token=${token}`,{
		method:"put"
	})
	if(!res.ok)
		throw await res.text()
}