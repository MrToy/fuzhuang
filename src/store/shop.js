import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const domain="http://business.ikey.pub"

/**
 * @param name,info,token string
 * @return null
 */
export async function CreateShop(name,info,token){
	var res=await fetch(`${domain}/shops?token=${token}`,{
		method:"post",
		body:querystring.stringify({name,info}),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
}

/**
 * @param config{skip,limit int}
 * @return shops []Shop{}
 */
export async function GetShops(config){
	var query=config?"?"+querystring.stringify(config):""
	var res=await fetch(`${domain}/shops${query}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}

/**
 * @param token string
 * @return shop Shop{}
 */
export async function GetMyShop(token){
	var res=await fetch(`${domain}/shops/myshop?token=${token}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}

/**
 * @param token string,config{name,info string,active bool}
 * @return null
 */
export async function EditMyShop(token,config){
	var res=await fetch(`${domain}/shops/myshop?token=${token}`,{
		method:"put",
		body:querystring.stringify(config),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
}

/**
 * @param id string
 * @return shop Shop{}
 */
export async function GetShopById(id){
	var res=await fetch(`${domain}/shops/${id}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}