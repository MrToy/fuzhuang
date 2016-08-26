<template lang="jade">
	.section
		.info
			.text 欢迎光临第壹印象
			span(v-if="user")
				span {{user.account}}
				a.text(v-on:click="Logout") 注销
			span(v-else)
				a.text(v-link=`{path:"/login"}`) 登录
				a.text(v-link=`{path:"/register"}`) 注册	
		ul
			li
				a.text(v-link=`{path:"/"}`) 首页
			li.pop
				a.text(v-link=`{path:"/user"}`)
					i.material-icons person_outline
					span 个人中心
					i.material-icons.arrow arrow_drop_down
				.popover.user
					a.text(v-link=`{path:"/user/orders"}`) 待付款
					a.text(v-link=`{path:"/user/orders"}`) 待发货
			li.pop
				a.text
					i.material-icons favorite_border
					span 收藏夹
					i.material-icons.arrow arrow_drop_down
				.popover.favor
					a.text 收藏的商品
					a.text 收藏的店铺
			li
				a.text
					i.material-icons shopping_cart
					span 购物车
			li
				a.text(v-link=`{path:"/saler"}`)
					i.material-icons local_offer
					span 卖家中心
			li
				a.text
					i.material-icons menu
					span 网站导航
					i.material-icons.arrow arrow_drop_down
</template>
<style lang="stylus" scoped>
	.material-icons
		vertical-align:middle;font-size:16px;padding:0 1px
	.section
		width:1200px;margin:0 auto
		&:after
			content:' ';clear:both
	.line
		width:100%;position:fixed;left:0;height:1px;background-color:#eee;
	.info
		display:inline
	.links
		float:right
	ul
		list-style:none;float:right;margin:0
		li
			display:inline-block
	.pop
		position:relative;z-index:2
		.popover
			display:none;position:absolute;right:0;width:100px;text-align:center;border:1px solid #eee;top:29px;background:#fff
			&.favor
				width:92px
			&.user
				width:104px
		&>.text
			z-index:3;position:relative;border-width:0 1px;border-style:solid;border-color:transparent
		.arrow
			transition:all 0.2s
		&:hover
			&>.text
				border-color:#eee;background:#fff
			.popover
				display:block
			.arrow
				transform:rotate(180deg)
	.text
		display:inline-block;padding:0 10px;line-height:30px
</style>
<script>
	import {UserActions} from "../store/userStore"
	export default {
		vuex:{
			getters:{
				user:state=>state.user.userInfo
			},
			actions:UserActions
		}
	}
</script>