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
							ui-button(color="primary" v-if="it.state=='待发货'" v-on:click="showDlg(it.id)") 发货
							ui-button(color="primary" v-if="it.state=='已发货'" v-on:click="showDlg(it.id)") 修改快递
		ui-modal(v-bind:show.sync="showDeliver"  header="发货订单")
			div
				ui-textbox(name="code" label="快递公司" v-bind:value.sync="express.code")
				ui-textbox(name="id" label="订单号" v-bind:value.sync="express.id")
			div(slot="footer")
				ui-button(color="primary" v-on:click="deliver") 确定
				ui-button(v-on:click="showDeliver = false")取消
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
	import {GetDeals,DeliverById} from './store/deal'
	import store from 'store'
	export default {
		data(){
			return {
				deals:{},
				showDeliver:false,
				express:{},
				current:null
			}
		},
		components:{
			'ui-modal': require('keen-ui/lib/UiModal'),
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton'),
			'ui-pagination':require('./components/Pagination')
		},
		ready(){
			this.getDeals()
		},
		methods:{
			showDlg(id){
				this.showDeliver=true
				this.current=id
			},
			async getDeals(){
				this.deals=await GetDeals(store.get('token'),"shoper")
			},
			async deliver(){
				try{
					await DeliverById(store.get('token'),this.current,this.express)
				}catch(err){
					return this.$dispatch("toast",err,"error")
				}
				this.showDeliver=false
				this.$dispatch("toast","成功","success")
				this.getDeals()
			}
		}
	}
</script>