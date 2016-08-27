<template lang="jade">
	.section
		.table
			table
				thead
					tr
						th 商品
						th 商品规格
						th 商品数量
						th 商品单价
						th 总价
						th 状态
						th 收货方
						th 下单时间
						th 操作
				tbody
					tr(v-for="it in deals.data" transition="right-in" stagger="100")
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
						td
							div 姓名：{{it.contact.name}}
							div 电话：{{it.contact.phone}}
							div 地址：{{it.contact.addr}}
						td {{it.date|moment "past"}}	
						td
							a(v-link=`{path:"/pay/"+it.id}`)
								ui-button(color="primary" v-if="it.state=='待付款'") 去付款
							ui-button(v-if="it.state=='待付款'" v-on:click="cancleOrderPre(it.id)") 取消订单
							ui-button(color="primary" v-if="it.state=='已发货'" v-on:click="confirmOrder(it.id)") 确认收货
		ui-confirm(header="取消订单" type="danger" confirm-button-text="取消订单" confirm-button-icon="delete" deny-button-text="放弃" v-on:confirmed="cancleOrder" v-bind:show.sync="showCancle" close-on-confirm)
</template>
<style lang="stylus" scoped>
	.ui-button
		margin:0px 10px 10px 0
	.btns
		text-align:right
	.table
		overflow:hidden
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
	import {GetDeals,CancleById,ConfirmById} from './store/deal'
	import store from 'store'
	export default {
		data(){
			return {
				deals:{},
				showCancle:false,
				current:null
			}
		},
		components:{
			'ui-button':require('keen-ui/lib/UiButton'),
			'ui-pagination':require('./components/Pagination'),
			'ui-confirm':require('keen-ui/lib/UiConfirm')
		},
		ready(){
			this.getDeals()
		},
		methods:{
			async getDeals(){
				this.deals=await GetDeals(store.get('token'),"buyer")
				return deals
			},
			async cancleOrderPre(id){
				this.current=id
				this.showCancle=true
			},
			async cancleOrder(){
				try{
					await CancleById(store.get('token'),this.current)
				}catch(err){
					return this.$dispatch("toast",err,"error")
				}
				this.$dispatch("toast","成功取消订单","success")
				this.getDeals()
			},
			async confirmOrder(id){
				try{
					await ConfirmById(store.get('token'),id)
				}catch(err){
					return this.$dispatch("toast",err,"error")
				}
				this.$dispatch("toast","确认成功","success")
				this.getDeals()
			}
		}
	}
</script>