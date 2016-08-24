<template lang="jade">
	div
</template>
<script>
	import "bootstrap/js/modal"
	import "bootstrap/js/dropdown"
	import "bootstrap/js/tooltip"
	import "summernote-webpack-fix/dist/summernote"
	export default{
		data(){
			return {
			}
		},
		props:{
			content:{
				twoWay:true
			},
			config:Object
		},
		ready(){
			this.box=$(this.$el)
			var config={
				minHeight:200,
				...this.config,
				callbacks:{
					onInit:()=>{
						this.box.summernote("code",this.content)
					}
				}
			}
			this.box.summernote(config).on("summernote.change",()=>{
				if(!this.isChanging){
					this.isChanging=true
					var code=this.box.summernote("code")
					this.content=(code === null || code.length === 0 ? null : code)
					this.$nextTick(()=>{
						this.isChanging=false
					})
				}
			})
		},
		watch:{
			'content':function(v){
				if(!this.isChanging){
					this.isChanging = true
					this.box.summernote("code",v===null?"":v)
					this.isChanging = false
				}
			}
		}
	}
</script>
<style lang="stylus">
	@import '../node_modules/summernote/dist/summernote.css'
	@import '../node_modules/codemirror/lib/codemirror.css'
	@import '../node_modules/bootstrap/dist/css/bootstrap.css'
	.modal-backdrop.in
		display:none
	a
		color:#666
		&:hover
			color:#ffa200
		&,&:hover,&:visited,&:active,&:focus
			text-decoration:none
</style>