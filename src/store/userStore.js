import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'
import {login,register,isExist,getInfo} from './user'


export const UserStore={
	state:store.get("user")||{},
	mutations:{
		SET_USER:(state,data)=>state.userInfo=data,
		DEL_USER:state=>state.userInfo=null
	}
}

export const UserActions={
	async Refresh({dispatch}){
		var token=store.get("token")
		if(!token)
			return
		try{
			var info=await getInfo(token)
		}catch(err){
			this.$dispatch("toast",err,"error")
			dispatch("DEL_USER")
			return
		}
		dispatch("SET_USER",info)
	},
	Logout({dispatch}){
		store.clear("token")
		dispatch("DEL_USER")
		this.$dispatch("toast","注销成功","success")
		this.$route.router.go({path:"/"})
	}
}