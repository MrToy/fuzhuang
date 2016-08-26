<template lang="jade">
	div
		search-bar
		nav-bar
		.box
			.left
				.menus
					span 菜单 暂无
			.right
				.left
					ui-carouse(v-bind:items="carouse" v-bind:width="800" v-bind:height="325")
				.right
					.user-box
						div(v-if="user")
							.title Hi,{{user.account}}
							.small 欢迎来到第一印像
							.btns
								a(v-link=`{path:"/user"}`)
									ui-button(color="primary") 个人中心
								ui-button(v-on:click="Logout") 注销
						div(v-else)
							.title 您好
							.small 欢迎来到第一印像
							.btns
								a(v-link=`{path:"/login"}`)
									ui-button(color="primary") 登录
								a(v-link=`{path:"/register"}`)
									ui-button(color="primary") 注册
					.news-box
						.title 公告
						p 暂无
		.box
			info-bar(text="每日新款" color="#c81624")
			.products
				product-profile(v-for="it in configs.products_new" v-bind:data="it")
			info-bar(text="潮流单品" color="#c81624")
			.products
				product-profile(v-for="it in configs.products_cheap" v-bind:data="it")
			info-bar(text="当季促销" color="#c81624")
			.products
				product-profile(v-for="it in configs.products_pop" v-bind:data="it")
</template>
<style lang="stylus" scoped>
	.box
		padding:20px 0;width:1300px;margin:0 auto
		&>.left
			float:left;width:220px
		&>.right
			margin-left:240px
			&>.left
				width:800px;float:left
			&>.right
				margin-left:820px
	.menus
		height:285px;background:#c81624;color:#fff;padding:20px
	.user-box
		color:#C81624
	.news-box
		color:#0E90D2;margin-top:20px
	.user-box,.news-box
		height:120px;border: 1px solid;padding:15px
		.title
			font-size:20px;text-align:center
		.small
			text-align:center;color:#AAA;margin-top:10px
		.btns
			text-align:center;margin-top:10px
			.ui-button
				margin:5px
	.products
		height:292px
</style>
<script>
	import {UserActions} from "./store/userStore"
	import {GetProducts} from './store/product'
	var {Logout}=UserActions
	export default{
		data(){
			return {
				carouse:[
					{img:require('./assets/c1.jpg')},
					{img:require('./assets/c2.jpg')},
				]
			}
		},
		components:{
			'search-bar': require('./components/SearchBar'),
			'nav-bar': require('./components/NavBar'),
			'ui-carouse':require('./components/Carouse'),
			'ui-button':require('keen-ui/lib/UiButton'),
			'info-bar':require('./components/InfoBar'),
			'product-profile':require('./components/ProductProfile')
		},
		ready(){
			this.getProductsNew()
			this.getProductsPop()
			this.getProductsCheap()
		},
		vuex:{
			getters:{
				user:state=>state.user.userInfo,
				configs:state=>state.configs
			},
			actions:{
				Logout:Logout,
				async getProductsNew({dispatch}){
					var products=await GetProducts({sort:"-date",limit:5,active:true})
					dispatch("SET_CONFIG","products_new",products.data)
				},
				async getProductsPop({dispatch}){
					var products=await GetProducts({sort:"-inventory",limit:5,active:true})
					dispatch("SET_CONFIG","products_pop",products.data)
				},
				async getProductsCheap({dispatch}){
					var products=await GetProducts({sort:"price",limit:5,active:true})
					dispatch("SET_CONFIG","products_cheap",products.data)
				}
			}
		}
	}
</script>