<template lang="jade">
	.ui-saler
		admin-box(title="卖家中心" v-bind:menus="menus")
</template>
<script>
	export default{
		data(){
			return {
				menus:[
					{text:"店铺信息",link:{path:"/saler"}},
					{text:"商品信息",link:{path:"/saler/products"}},
					{text:"订单信息",link:{path:"/saler/orders"}},
				]
			}
		},
		components:{
			'admin-box': require('./components/AdminBox')
		}
	}
</script>