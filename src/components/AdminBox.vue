<template lang="jade">
	.ui-box2
		ui-toolbar(type="colored" text-color="white" v-bind:title="title" nav-icon="home")
		.box
			.left
				a(v-for="item in menus||[]" href="#" v-link="item.link" v-bind:class="{active:$route.path==item.link.path}") {{item.text}}
			.right
				router-view
</template>
<script>
	export default{
		props:{
			title:String,
			menus:Array
		},
		components:{
			'ui-toolbar': require('keen-ui/lib/UiToolbar'),
			'ui-menu': require('keen-ui/lib/UiMenu')
		},
		events:{
			'nav-icon-clicked':function(){
				this.$route.router.go({path:'/'})
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.box
		width:100%
	.left
		width: 200px;padding-top:10px;float:left
		a
			display:block;font-size:15px;padding:10px 20px;color:#000
			&:hover
				color:#2196f3
			&.active
				color:#2196f3
	.right
		margin-left:200px;padding:20px;border-left:1px solid rgba(0,0,0,.2);min-height:760px
</style>