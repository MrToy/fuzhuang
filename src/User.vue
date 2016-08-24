<template lang="jade">
	.ui-saler
		ui-box2(title="用户中心" v-bind:menus="menus")
</template>
<script>
	export default{
		data(){
			return {
				menus:[
					{text:"个人资料",link:{path:"/user"}},
					{text:"购物车",link:{path:"/user/cart"}},
					{text:"商品订单",link:{path:"/user/orders"}},
				]
			}
		},
		components:{
			'ui-box2': require('./components/Box2')
		}
	}
</script>