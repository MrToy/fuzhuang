import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'

export default {
	state:store.get("deals")||{current:{data:[],shop:null},cart:[]},
	mutations:{
		SET_CURRENT:(state,current)=>state.current=current,
		ADD_CART:(state,current)=>{
			let it=state.cart.find(it=>it.shop==current.shop)
			if(it)
				it.data.push(current.data)
			else
				state.cart.push(current)
		},
		REMOVE_CART:(state,shop)=>state.cart=state.cart.filter(it=>it.shop!=shop)
	}
}