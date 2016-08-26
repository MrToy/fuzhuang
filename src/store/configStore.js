import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'

export default {
	state:store.get("configs")||{},
	mutations:{
		SET_CONFIG:(state,name,value)=>state[name]=value,
		DEL_CONFIG:(state,name)=>state[name]=null
	}
}