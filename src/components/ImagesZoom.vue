<template lang="jade">
	.images-zoom
		img.big(v-bind:src="selected||data[0]")
		.little
			img(v-for="it in data" track-by="$index" v-bind:src="it" v-on:mouseenter="selected=it")
</template>
<style lang="stylus" scoped>
	.images-zoom
		width:400px;overflow:hidden
	.big
		width:400px;height:400px
	.little
		width:420px;margin-top:12.5px
		img
			width:70px;height:70px;margin-right:12.5px;float:left;cursor:pointer
	img
		display:block
</style>
<script>
	export default{
		props:{
			data:Array
		},
		data(){
			return{
				selected:null
			}
		}
	}
</script>