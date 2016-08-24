<template lang="jade">
	div
		ui-header
		router-view.container
		ui-toast(v-ref:toast)
		ui-footer
</template>
<style lang="stylus">
	@import '../node_modules/material-design-icons/iconfont/material-icons.css'
	@import '../node_modules/vue-toast/dist/vue-toast.min.css'
	a
		color:#666;text-decoration:none
		&:hover
			color:#c81624;cursor:pointer
	body
		color:#666;font: 12px/1.5 tahoma,arial,SimSun
	.ui-textbox-input
		box-sizing:border-box
	.material-icons
		vertical-align:middle
	.container
		min-height:850px
	button,li
		outline:none
</style>
<script>
	import store from "./store"
	import {UserActions} from "./store/userStore"
	export default{
		components:{
			'ui-toast':require("./components/Toast"),
			'ui-footer':require('./components/Footer'),
			'ui-header': require('./components/Header')
		},
		events:{
			'toast':function(...msg){
				this.$refs.toast.$emit("toast",...msg)
			}
		},
		vuex:{
			actions:UserActions
		},
		ready(){
			this.Refresh()
		},
		store
	}
</script>