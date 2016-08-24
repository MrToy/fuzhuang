<template lang="jade">
	.section
		.btns
			a(v-link=`{path:"/saler/createProduct"}`)
				ui-button(color="primary") 发布商品
		.table
			table
				thead
					tr
						th 名称
						th 价格
						th 库存
						th 是否上架
						th 发布时间
						th 操作
				tbody
					tr(v-for="product in products.data" transition="right-in" stagger="100")
						td {{product.name}}
						td {{product.price}}
						td {{product.inventory}}
						td
							i.material-icons(v-if="product.active") check
							i.material-icons(v-else) close
						td {{product.date|moment "past"}}
						td
							a(v-link=`{path:"/saler/editProduct/"+product.id}`)
								ui-button(color="primary") 修改
							ui-button(color="danger" v-on:click="delbox={show:true,id:product.id}") 删除
		ui-pagination(v-bind:total="Math.ceil(products.total/10)" v-bind:current="index||1" v-bind:on-paging="onPaging")
		ui-confirm(header="确定删除" type="danger" confirm-button-text="确定" confirm-button-icon="delete" deny-button-text="取消" v-on:confirmed="delProduct" v-bind:show.sync="delbox.show" close-on-confirm) 确定删除该商品？
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
	import {GetProducts,DelProductById} from './store/product'
	import {GetMyShop} from './store/shop'
	import store from "store"
	export default {
		data(){
			return {
				products:{},
				delbox:{
					show:false,
					id:null
				},
				index:1
			}
		},
		components:{
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton'),
			'ui-switch': require('keen-ui/lib/UiSwitch'),
			'ui-confirm': require('keen-ui/lib/UiConfirm'),
			'ui-pagination':require('./components/Pagination')
		},
		async ready(){
			this.getProducts()
		},
		methods:{
			async getProducts(){
				try{
					var shop=await GetMyShop(store.get("token"))
				}catch(err){
					return this.$dispatch("toast","获取店铺信息失败，请稍后重试","error")
				}
				try{
					var products=await GetProducts({shop:shop.id,skip:((this.index||1)-1)*10,limit:10})
				}catch(err){
					return this.$dispatch("toast","获取商品信息失败，请稍后重试","error")
				}
				this.products=products
			},
			async delProduct(){
				try{
					await DelProductById(this.delbox.id,store.get("token"))
				}catch(err){
					return this.$dispatch("toast","删除失败","error")
				}
				this.$dispatch("toast","删除成功","success")
				this.getProducts()
			},
			onPaging(i){
				this.index=i
				this.getProducts()
			}
		}
	}
</script>