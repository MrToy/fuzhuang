import Vue from 'vue'
import Vuex from 'vuex'
import {UserStore} from './userStore'
import DealStore from './dealStore'
import ConfigStore from './configStore'
import store from 'store'

Vue.use(Vuex)

const saverPlugin =vueStore=>vueStore.subscribe((mutation,state)=>{
	for(var i in state){
		store.set(i,state[i])
	}
})

export default new Vuex.Store({
	modules:{
		user:UserStore,
		deals:DealStore,
		configs:ConfigStore,
	},
	plugins:[saverPlugin]
})