<template lang="jade">
	div
		ui-search-bar
		ui-nav-bar
		.box
			info-bar(text="订单信息")
			table
				thead
					tr
						th 商品
						th 商品规格
						th 商品数量
						th 商品单价
						th 创建时间
				tbody
					tr
						th
							a(v-for="item in deal.items" v-link=`{path:"/product/"+item.id}`) {{item.id}}
						th
							div(v-for="item in deal.items") {{item.spec}}
						th
							div(v-for="item in deal.items") {{item.quantity}}
						th 0
						th {{deal.date|moment "past"}}
			.right
				span 总计:
				span.price {{deal.price}}
			info-bar(text="支付方式")
			.payway
				img(src="./assets/alipay.png")
			info-bar(text="确认付款")
			.btns
				ui-button(color="primary") 确认付款
</template>
<style lang="stylus" scoped>
	.right
		text-align:right
	.box
		padding:20px 0;width:1200px;margin:0 auto
		&:after
			display: block; content: ''; clear: both; visibility: hidden;
	.price
		font-size: 30px;color: #c40000;font-family: Arial;
		&:before
			content:"￥";font-size: 18px
	.btns
		text-align:right
	.payway
		border: 2px solid #0E90D2;margin: 10px 0 30px 0;padding: 10px;display:inline-block
	table
		text-align:center;width:100%;border-collapse: collapse
	thead th
		border:1px solid #ddd;color:#000
	tbody th
		border:1px solid #ddd
	th,td
		padding:8px
	td:last-child
		width:190px
</style>
<script>
	import {GetDealById} from './store/deal'
	export default {
		data(){
			return {
				deal:{}
			}
		},
		components:{
			'ui-search-bar': require('./components/SearchBar'),
			'ui-nav-bar': require('./components/NavBar'),
			'info-bar':require('./components/InfoBar'),
			'ui-button':require('keen-ui/lib/UiButton')
		},
		async ready(){
			this.deal=await GetDealById(this.$route.params.id)
		}
	}
</script>