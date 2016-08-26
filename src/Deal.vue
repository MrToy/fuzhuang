<template lang="jade">
	div
		ui-search-bar
		ui-nav-bar
		.box
			info-bar(text="选择收货地址")
			info-bar(text="确定订单信息")
			table
				thead
					tr
						th 商品名
						th 样式
						th 单价
						th 数量
						th 小计
				tbody
					tr(v-for="it in current.data")
						th {{it.name}}
						th {{it.spec}}
						th {{it.price}}
						th {{it.quantity}}
						th {{it.price*it.quantity}}
			.total
				span 需付款:
				span.price {{total}}
				span
					ui-button(color="primary" v-on:click="createDeal") 提交订单
</template>
<style lang="stylus" scoped>
	.box
		padding:20px 0;width:1200px;margin:0 auto
		&:after
			display: block; content: ''; clear: both; visibility: hidden;
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
	.price
		font-size: 30px;color: #c40000;font-family: Arial;
		&:before
			content:"￥";font-size: 18px
	.total
		text-align:right;margin-top:20px
		span
			vertical-align:middle;margin-left:20px
</style>
<script>
	import {CreateDeal} from './store/deal'
	import store from 'store'
	export default {
		components:{
			'ui-search-bar': require('./components/SearchBar'),
			'ui-nav-bar': require('./components/NavBar'),
			'info-bar':require('./components/InfoBar'),
			'ui-button':require('keen-ui/lib/UiButton')
		},
		methods:{
			async createDeal(){
				try{
					var id=await CreateDeal(store.get("token"),this.current)
				}catch(err){
					return this.$dispatch("toast",err,"error")
				}
				this.$dispatch("toast","订单创建成功","success")
				this.$route.router.go({path:"/pay/"+id})
			}
		},
		computed:{
			total:function(){
				return this.current.data.reduce((pre,it)=>pre+it.price*it.quantity,0)
			}
		},
		vuex:{
			getters:{
				current:state=>state.deals.current
			}
		}
	}
</script>