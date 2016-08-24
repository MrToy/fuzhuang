import fetch from 'isomorphic-fetch'
import querystring from 'querystring'
import jsontile from 'jsontile'

const domain="http://business.ikey.pub"
/**
 * @param token string,product{name,info string,inventory,price int}
 * @return null
 */
export async function CreateProduct(token,product){
	var res=await fetch(`${domain}/products?token=${token}`,{
		method:"post",
		body:querystring.stringify(jsontile(product)),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
}

/**
 * @param config{skip,limit int,shop string,active bool}
 * @return products []Product{}
 */
export async function GetProducts(config){
	var query=config?"?"+querystring.stringify(config):""
	var res=await fetch(`${domain}/products${query}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}

/**
 * @param config{skip,limit int,shop string,active bool}
 * @return products []Product{}
 */
export async function GetProductsMeta(config){
	config.meta=true
	var query=config?"?"+querystring.stringify(config):""
	var res=await fetch(`${domain}/products${query}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}

/**
 * @param id string
 * @return shop Shop{}
 */
export async function GetProductById(id){
	var res=await fetch(`${domain}/products/${id}`)
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data
}

/**
 * @param id,token string
 * @return null
 */
export async function DelProductById(id,token){
	var res=await fetch(`${domain}/products/${id}?token=${token}`,{
		method:"delete"
	})
	if(!res.ok)
		throw await res.text()
}

/**
 * @param id,token string,product{name,info,token string,inventory,price int}
 * @return null
 */
export async function EditProductById(id,token,product){
	var res=await fetch(`${domain}/products/${id}?token=${token}`,{
		method:"put",
		body:querystring.stringify(jsontile(product)),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
}