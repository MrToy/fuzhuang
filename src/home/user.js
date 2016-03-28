import store from 'store'

export async function getUser(token){
	var res=await fetch('/users/info?token='+token)
	if(!res.ok)
		throw await res.text()
	store.set('user',await res.json())
}

export async function auth(account,pass){
	var res=await fetch('/users/auth',{method:'post',body:JSON.stringify({account,pass})})
	if(!res.ok)
		throw await res.text()
	var j=await res.json()
	store.set('token',j.token)
	return j.token
}

export async function register(account,pass,target,captcha){
	var res=await fetch('/users',{method:'post',body:JSON.stringify({account,pass,target,captcha})})
	if(!res.ok)
		throw await res.text()
	var j=await res.json()
	store.set('token',j.token)
	return j.token
}

export function logout(){
	store.remove('token')
	store.remove('user')
}