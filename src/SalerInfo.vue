<template lang="jade">
	.section
		ui-textbox(v-bind:value.sync="shopInfo.name" name="name" label="店铺名" placeholder="name" validation-rules="required|min:1|max:20")
		ui-textbox(v-bind:value.sync="shopInfo.info" name="info" label="店铺简介" placeholder="info" v-bind:multi-line="true")
		ui-switch(name="active" v-bind:value.sync="shopInfo.active" ) 店铺营业中
		ui-button(color="primary" v-on:click="editShop") 修改
		ui-button(v-on:click="getShop") 重置
</template>
<style lang="stylus" scoped>
	.ui-button
		margin:20px 10px 0 0
</style>
<script>
	import {GetMyShop,EditMyShop} from './store/shop'
	import store from "store"
	export default {
		data(){
			return {
				shopInfo:{}
			}
		},
		components:{
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton'),
			'ui-switch': require('keen-ui/lib/UiSwitch'),
		},
		async ready(){
			this.getShop()
		},
		methods:{
			async editShop(){
				try{
					await EditMyShop(store.get("token"),this.shopInfo)
				}catch(err){
					return this.$dispatch("toast","修改失败 "+err,"error")
				}
				this.$dispatch("toast","修改成功","success")
			},
			async getShop(){
				try{
					var info=await GetMyShop(store.get("token"))
				}catch(err){
					return this.$dispatch("toast","获取店铺信息失败，请稍后重试","error")
				}
				this.shopInfo=info
			}
		}
	}
</script>