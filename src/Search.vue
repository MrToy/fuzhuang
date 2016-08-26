<template lang="jade">
	div
		search-bar
		nav-bar
		.box
			.products
				product-profile(v-for="it in products.data" v-bind:data="it" transition="fade" stagger="100")
			ui-pagination(v-bind:total="Math.ceil(products.total/perpage)" v-bind:current="parseInt($route.query.page)||1" v-bind:on-paging="onPaging")
</template>
<style lang="stylus" scoped>
	.products
		height:852px;overflow:hidden
	.box
		padding:5px 0;width:1300px;margin:0 auto
	.fade
		&-transition
			transition:all .5s
		&-leave,&-enter
			opacity:0
</style>
<script>
	import {GetProducts} from './store/product'
	export default{
		data(){
			return{
				products:{},
				current:1,
				perpage:15,
			}
		},
		methods:{
			onPaging(i){
				this.$route.router.go({query:{...this.$route.query,page:i}})
			}
		},
		components:{
			'search-bar': require('./components/SearchBar'),
			'nav-bar': require('./components/NavBar'),
			'product-profile':require('./components/ProductProfile'),
			'ui-pagination':require('./components/Pagination')
		},
		route:{
			async data(route){
				var config={
					word:route.to.query.word,
					skip:((route.to.query.page||1)-1)*this.perpage,
					limit:this.perpage,
					active:true
				}
				var products=await GetProducts(config)
				this.products=products
			}
		}
	}
</script>