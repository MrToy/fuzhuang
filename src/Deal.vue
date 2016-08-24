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
						th {{specify(it.spec)}}
						th {{it.price}}
						th {{it.quantity}}
						th {{it.price*it.quantity}}
			.total
				span 需付款:
				span.price {{total}}
				span
					ui-button(color="primary") 提交订单
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
	export default {
		components:{
			'ui-search-bar': require('./components/SearchBar'),
			'ui-nav-bar': require('./components/NavBar'),
			'info-bar':require('./components/InfoBar'),
			'ui-button':require('keen-ui/lib/UiButton')
		},
		methods:{
			specify(spec){
				var arr=[]
				for(var i in spec){
					arr.push(i+':'+spec[i])
				}
				return arr.join(' , ')
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
			},
		}
	}
</script>