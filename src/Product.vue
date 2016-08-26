<template lang="jade">
	div
		ui-search-bar
		ui-nav-bar
		.box
			.left
				images-zoom(v-bind:data="product.images||[]")
			.right
				.tariff
					.title {{product.name}}
					.content
						div
							.key 批发价 :
							span.price {{product.price}}
				.spec(v-for="it in product.spec")
					.key {{it.name}}
					.list
						.item(v-for="item in it.value" v-on:click="setSpec(it.name,item)" v-bind:class="{active:spec[it.name]==item}") {{item}}
				.spec
					.key 数量
					ui-textbox(name="num" type="number" v-bind:min="0" v-bind:max="product.inventory" v-bind:value.sync="quantity")
					span 库存：{{product.inventory}}
				.btns
					ui-button(color="primary" v-bind:disabled="!canBuy" v-on:click="addDeal") 立即下单
					ui-button(v-bind:disabled="!canBuy") 加入购物车
		.box
			.info
				.title 商品详情
				.props
					.item(v-for="it in product.props")
						.key {{it.name}}
						.value {{it.value}}
				.content {{{xss(product.info)}}}
</template>
<style lang="stylus" scoped>
	.box
		padding:20px 0;width:1200px;margin:0 auto
		&:after
			display: block; content: ''; clear: both; visibility: hidden;
	.left
		width:400px;float:left
	.right
		margin-left:450px
	.tariff
		.title
			padding:5px 30px;font-size:20px;color:#000
		.content
			background:#eee;padding:20px 30px
			.key
				width:60px;display:inline-block
		.price
			font-size: 30px;color: #c40000;font-family: Arial;
			&:before
				content:"￥";font-size: 18px
	.info
		margin-bottom:50px
		.title
			background:#eee;padding:5px 30px;font-size:15px;border:1px solid #ccc;color:#000
		.props
			padding:20px 30px;border-left:1px solid #ccc;border-right:1px solid #ccc;
			&:after
				display: block; content: ''; clear: both; visibility: hidden;
			.item
				float:left;margin:5px 10px
				.value,.key
					display:inline-block;width:100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
				.key
					color:#999;width:70px
					&:after
						content:':'
		.content
			border:1px solid #ccc;padding:20px
	.spec
		margin:30px 0
		.key
			width:50px;display:inline-block;vertical-align:top
		.list
			display:inline-block;vertical-align:top
		.item
			float:left;display: block;white-space: nowrap;min-width: 10px;max-width: 405px;padding:7px 20px;color: #000;
			border: 1px solid #e2e1e3;overflow: hidden;text-overflow: ellipsis;margin-right:10px;cursor:pointer;position:relative
			&:hover
				border:2px solid #c81624;margin:-1px 9px -1px -1px
			&.active
				border:2px solid #c81624;margin:-1px 9px -1px -1px
				&:after
					font-family:Material Icons;content:"check_box";position:absolute;bottom:0;right:0;width:9px;height:11px;color:#c81624
		.ui-textbox
			display:inline-block;width:100px;margin-right:20px
	.btns
		margin-left:50px
		.ui-button
			margin-right:20px
</style>
<script>
	import xss from 'xss'
	import {GetProductById} from './store/product'
	export default{
		data(){
			return {
				product:{},
				quantity:1,
				spec:{}
			}
		},
		computed:{
			selected:function(){
				return {product:this.product.id,shop:this.product.shop,quantity:this.quantity,spec:this.spec}
			},
			canBuy:function(){
				var spec=(this.product.spec||[]).length==Object.keys(this.spec).length
				var quantity=this.quantity>0&&this.quantity<this.product.inventory
				return spec&&quantity
			}
		},
		methods:{
			setSpec(k,v){
				this.$set(`spec['${k}']`,v)
			},
			xss(v){
				return xss(v)
			},
			specify(spec){
				var arr=[]
				for(var i in spec){
					arr.push(i+':'+spec[i])
				}
				return arr.join(' , ')
			},
		},
		components:{
			'ui-search-bar': require('./components/SearchBar'),
			'ui-nav-bar': require('./components/NavBar'),
			'images-zoom':require('./components/ImagesZoom'),
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton')
		},
		async ready(){
			this.product=await GetProductById(this.$route.params.id)
		},
		vuex:{
			actions:{
				addDeal({dispatch}){
					var it={shop:this.product.shop,data:[{
						name:this.product.name,
						price:this.product.price,
						quantity:this.quantity,
						spec:this.specify(this.spec),
						id:this.product.id
					}]}
					dispatch("SET_CURRENT",it)
					this.$route.router.go({path:"/deal"})
				}
			}
		}
	}
</script>