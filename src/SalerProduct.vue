<template lang="jade">
	.section
		.right
			label 模板选择: 
			select(v-model="product")
				option(v-for="it in templet" v-bind:value="it") {{it.name}}
			span.del(v-on:click="delTemplet") 删除
		ui-textbox(v-bind:value.sync="product.name" name="name" label="商品名" placeholder="name" validation-rules="required|min:1|max:20")
		.label 商品图片
		.field
			image-uploader(v-for="i in 5" v-bind:url.sync="product.images[i]" track-by="$index" v-bind:title="i==0?'主图':null")
		ui-textbox(v-bind:value.sync="product.price" name="price" type="number" label="商品价格" placeholder="price")
		ui-textbox(v-bind:value.sync="product.inventory" type="number" name="inventory" label="商品库存" placeholder="inventory")
		.label 商品属性
		.field
			div(v-for="it in product.props")
				ui-icon-button.inline-box(icon="remove" type="flat" v-on:click="product.props.$remove(it)")
				ui-textbox.inline-box(name="name" placeholder="属性" v-bind:value.sync="it.name")
				ui-textbox.inline-box(v-if="!this.multil" name="value" placeholder="值" v-bind:value.sync="it.value")
			ui-icon-button(icon="add" type="flat" v-on:click="product.props.push({})")
		.label 商品规格
		.field
			div(v-for="it in product.spec")
				ui-icon-button.inline-box(icon="remove" type="flat" v-on:click="product.spec.$remove(it)")
				ui-textbox.inline-box(name="name" placeholder="属性" v-bind:value.sync="it.name")
				.field
					div(v-for="item in it.value" track-by="$index")
						ui-icon-button.inline-box(icon="remove" type="flat" v-on:click="it.value.$remove(item)")
						ui-textbox.inline-box(name="name" placeholder="值" v-bind:value.sync="item")
					ui-icon-button(icon="add" type="flat" v-on:click="it.value.push('')")
			ui-icon-button(icon="add" type="flat" v-on:click="product.spec.push({value:[]})")
		.label 商品详情
		.field
			html5-editor(v-bind:content.sync="product.info")
		ui-switch(name="active" v-bind:value.sync="product.active" ) 商品上架
		ui-button(color="primary" v-on:click="editProduct"  v-if="$route.params.id") 修改并发布商品	
		ui-button(v-else color="primary" v-on:click="createProduct") 发布商品
		ui-button(v-on:click="saveEdit") 保存为模板
</template>
<style lang="stylus" scoped>
	@import '../node_modules/font-awesome/css/font-awesome.css'
	.ui-button
		margin:20px 20px 0 0
	.field
		padding:10px 30px
	.label
		font-size: 14px;margin-bottom: 2px;color: rgba(0,0,0,.54);
	.inline-box
		display:inline-block;margin-right:10px;vertical-align:middle
	.right
		float:right
		&:after
			content:"."; display:block; height:0; visibility:hidden; clear:both
	.del
		color:#e96900;margin-left:5px;cursor:pointer
</style>
<script>
	import Vue from 'vue'
	import VueHtml5Editor from 'vue-html5-editor'
	import store from "store"
	import {CreateProduct,GetProductById,EditProductById} from './store/product'
	import {UploadFile} from './store/upload'
	Vue.use(VueHtml5Editor,{image:{server:'http://upload.ikey.pub/editor'}})
	export default {
		data(){
			var templet=store.get("productTemplet")||[]
			var product={
				name:"",
				images:[null,null,null,null,null],
				props:[],
				spec:[]
			}
			return {product,templet}
		},
		components:{
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton'),
			'ui-switch': require('keen-ui/lib/UiSwitch'),
			'image-uploader':require('./components/ImageUploader'),
			'ui-checkbox':require('keen-ui/lib/UiCheckbox'),
			'ui-icon-button':require('keen-ui/lib/UiIconButton'),
		},
		async ready(){
			if(this.$route.params.id){
				var product=await GetProductById(this.$route.params.id)
				product.images=product.images||this.product.images
				this.product=product
			}
		},
		methods:{
			async createProduct(){
				try{
					await CreateProduct(store.get("token"),this.product)
				}catch(err){
					return this.$dispatch("toast",err,"error")
				}
				this.$dispatch("toast","发布成功","success")
				this.$route.router.go({path:"/saler/products"})
			},
			async editProduct(){
				try{
					await EditProductById(this.$route.params.id,store.get("token"),this.product)
				}catch(err){
					return this.$dispatch("toast",err,"error")
				}
				this.$dispatch("toast","发布成功","success")
				this.$route.router.go({path:"/saler/products"})
			},
			saveEdit(){
				if(!this.product.name)
					return this.$dispatch("toast","需要填写商品名","warning")
				var tmp=store.get("productTemplet")||[]
				tmp=tmp.filter(it=>it.name!=this.product.name)
				store.set("productTemplet",[...tmp,this.product])
				this.$dispatch("toast","保存成功","success")
				this.templet=store.get("productTemplet")||[]
			},
			delTemplet(){
				var tmp=store.get("productTemplet")||[]
				store.set("productTemplet",tmp.filter(it=>it.name!=this.product.name))
				this.$dispatch("toast","删除成功","success")
				this.templet=store.get("productTemplet")||[]
			}
		}
	}
</script>