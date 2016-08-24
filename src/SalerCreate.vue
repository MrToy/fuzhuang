<template lang="jade">
	.section
		ui-textbox(v-bind:value.sync="name" name="name" label="店铺名" placeholder="name" validation-rules="required|min:1|max:20")
		ui-textbox(v-bind:value.sync="info" name="info" label="店铺简介" placeholder="info" v-bind:multi-line="true")
		ui-button(color="primary" v-on:click="createShop") 创建店铺
</template>
<script>
	import store from "store"
	import {CreateShop} from './store/shop'
	import {UserActions} from './store/userStore'
	export default {
		data(){
			return {
				name:"",
				info:""
			}
		},
		components:{
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton')
		},
		methods:{
			async createShop(){
				try{
					await CreateShop(this.name,this.info,store.get("token"))
				}catch(err){
					return this.$dispatch("toast",err,"error")
				}
				await this.Refresh()
				this.$route.router.go({path:"/saler"})
			}
		},
		vuex:{
			actions:{
				Refresh:UserActions.Refresh
			}
		}
	}
</script>