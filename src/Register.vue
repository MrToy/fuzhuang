<template lang="jade">
	div
		.section
			.logo
				img(src="./assets/logo.png")
			.box(v-on:keyup.enter="Register(account,pass)")
				.title 用户注册
				ui-textbox(v-bind:value.sync="account" name="account" label="用户名" placeholder="account" icon="person_outline")
				ui-textbox(v-bind:value.sync="pass" name="password" label="密码" placeholder="password" type="password" icon="vpn_key")
				ui-button(color="primary" v-on:click="Register(account,pass)") 注册
</template>
<script>
	import {register,getInfo} from './store/user'
	import store from 'store'
	export default {
		data(){
			return {
				account:"",
				pass:""
			}
		},
		components:{
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton')
		},
		vuex:{
			actions:{
				async Register({dispatch},account,pass){
					try{
						var token=await register(account,pass)
					}catch(err){
						return this.$dispatch("toast",err,"error")
					}
					store.set("token",token)
					this.$dispatch("toast","注册成功","success")
					try{
						var info=await getInfo(token)
					}catch(err){
						return this.$dispatch("toast",err,"error")
					}
					dispatch("SET_USER",info)
					this.$route.router.go({path:"/"})
				},
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.section
		width:1000px;margin:0 auto;position:relative
	.logo
		position: absolute;top:200px;left:130px
		img
			width:260px;height:260px
	.box
		border: 1px solid #ededed;width: 300px;padding:20px 40px 40px 40px;position: absolute;right: 150px;
		top: 200px;background: #FFFFFF;box-shadow: 0 0 25px rgba(187,196,205,0.1);
		font-family: "Microsoft YaHei";font-size: 14px
		.title
			font-size:20px;text-align:center;border-bottom:1px solid;margin-bottom:20px;line-height:2;
			color:#2196f3
		.ui-button
			width:100%
</style>