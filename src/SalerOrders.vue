<template lang="jade">
	.section
		.table
			table
				thead
					tr
						th 买家
						th 商品
						th 商品规格
						th 商品数量
						th 商品单价
						th 总价
						th 状态
						th 时间
						th 操作
				tbody
					tr(v-for="it in deals.data" transition="right-in" stagger="100")
						td {{it.buyer}}			
						td 
							a(v-for="item in it.items" v-link=`{path:"/product/"+item.id}`) {{item.name}}
						td
							div(v-for="item in it.items") {{item.spec}}
						td
							div(v-for="item in it.items") {{item.quantity}}
						td
							div(v-for="item in it.items") {{item.price}}
						td {{it.price}}
						td {{it.state}}
						td {{it.date|moment "past"}}
						td
</template>
<style lang="stylus" scoped>
	.ui-button
		margin:0px 10px 10px 0
	.btns
		text-align:right
	.table
		height:705px;overflow:hidden
	table
		text-align:center;width:100%;border-collapse: collapse
	thead tr
		border-bottom:2px solid #ddd
	tbody tr
		border-bottom:1px solid #ddd
		&:last-child
			border:none
	th,td
		padding:8px
	td:last-child
		width:190px
	.right-in
		&-transition
			transition:all 0.5s
		&-enter
			transform:translateX(50px)
		&-leave
			opacity:0
</style>
<script>
	import {GetDeals} from './store/deal'
	import store from 'store'
	export default {
		data(){
			return {
				deals:{}
			}
		},
		components:{
			'ui-button':require('keen-ui/lib/UiButton'),
			'ui-pagination':require('./components/Pagination')
		},
		async ready(){
			this.deals=await this.getDeals()
		},
		methods:{
			async getDeals(){
				var deals=await GetDeals(store.get('token'),"shoper")
				return deals
			}
		}
	}
</script>