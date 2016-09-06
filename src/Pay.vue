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
			.payway.qrcode
				img(src="./assets/qrpay.jpg")
			info-bar(text="确认付款")
			.btns
				a(v-bind:href="url" target="_blank")
					ui-button(color="primary" v-on:click="showDlg=true") 确认付款
		ui-modal(v-bind:show.sync="showDlg"  header="支付结果" body="支付已完成？")
			div(slot="footer")
				a(v-link=`{path:"/user/orders"}`)
					ui-button(color="primary") 已支付,查看订单
				ui-button(v-on:click="showDlg = false") 继续尝试支付
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
		border: 2px solid #0E90D2;margin: 10px 20px 30px 0;padding: 10px;display:inline-block;vertical-align:middle
		img
			max-height:30px
	.qrcode
		cursor:pointer
		img
			transition:all 0.5s
		&:hover img
			transform:scale(8) translateY(-17px)
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
	import {GetDealById,domain} from './store/deal'
	export default {
		data(){
			return {
				deal:{},
				showDlg:false
			}
		},
		computed:{
			url:function(){
				return `${domain}/pay/${this.$route.params.id}?notify=${domain}/pay`
			}
		},
		components:{
			'ui-modal': require('keen-ui/lib/UiModal'),
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