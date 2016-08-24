<template lang="jade">
	.ui-saler
		ui-box2(title="卖家中心" v-bind:menus="menus")
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
			'ui-box2': require('./components/Box2')
		}
	}
</script>