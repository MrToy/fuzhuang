<template lang="jade">
	.ui-saler
		admin-box(title="用户中心" v-bind:menus="menus")
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
			'admin-box': require('./components/AdminBox')
		}
	}
</script>