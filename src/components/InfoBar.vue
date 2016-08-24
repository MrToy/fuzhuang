<template lang="jade">
	.info-bar
		strong {{text}}
</template>
<style lang="stylus" scoped>
	.info-bar
		border-bottom: 2px solid #0E90D2;margin-bottom: 20px
	strong
		display:inline-block;padding:4px 20px 0 20px;height:23px;background:#0E90D2;color:#fff
</style>
<script>
	export default {
		props:{
			text:String
		}
	}
</script>