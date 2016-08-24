import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const domain="http://user.ikey.pub"

/**
 * @param account,password string
 * @return token string
 */
export async function login(account,pass){
	var res=await fetch(`${domain}/login`,{
		method:"post",
		body:querystring.stringify({account,pass}),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data.token
}

/**
 * @param account,password string
 * @return token string
 */
export async function register(account,pass){
	var res=await fetch(`${domain}/register`,{
		method:"post",
		body:querystring.stringify({account,pass}),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data.token
}

/**
 * @param account string
 * @return isExist bool
 */
export async function isExist(account){
	var res=await fetch(`${domain}/isExist?`+querystring.stringify({account}))
	if(!res.ok)
		throw await res.text()
	var data=await res.json()
	return data.isExist
}

/**
 * @param token string
 * @return UserInfo User{}
 */
export async function getInfo(token){
	var res=await fetch(`${domain}/info?`+querystring.stringify({token}))
	if(!res.ok)
		throw await res.text()
	return await res.json()
}