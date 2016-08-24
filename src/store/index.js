import Vue from 'vue'
import Vuex from 'vuex'
import {UserStore} from './userStore'
import DealStore from './dealStore'
import store from 'store'

Vue.use(Vuex)

const saverPlugin =vueStore=>vueStore.subscribe((mutation,{user,deals})=>{
	store.set("user",user)
	store.set("deals",deals)
})

export default new Vuex.Store({
	modules:{
		user:UserStore,
		deals:DealStore
	},
	plugins:[saverPlugin]
})