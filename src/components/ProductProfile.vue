<template lang="jade">
	.box
		a(v-link=`{path:"/product/"+data.id}`)
			img.img(v-bind:src="data.images?data.images[0]:null")
		.price ￥{{data.price}}
		a.name(v-link=`{path:"/product/"+data.id}`) {{data.name}}
</template>
<style lang="stylus" scoped>
	.box
		display:inline-block;padding:10px;width:300px;height:350px;vertical-align:top;overflow:hidden;border:1px solid transparent
		&:hover
			border:1px solid #e0e0e0;box-shadow: 0 10px 25px rgba(0,0,0,0.1);
	.img
		width:300px;height:300px
	.price
		font-size: 18px;color: #cf1f3f;font-family: "Arial"
	.name
		color: #444b55;font-family: "宋体";
		&:hover
			color: #444b55
</style>
<script>
	export default{
		props:{
			data:Object
		}
	}
</script>