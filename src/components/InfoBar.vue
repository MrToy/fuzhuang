<template lang="jade">
	.info-bar(v-bind:style='{color:color}')
		strong(v-bind:style='{background:color}') {{text}}
</template>
<style lang="stylus" scoped>
	.info-bar
		border-bottom: 2px solid;margin-bottom: 20px
	strong
		display:inline-block;padding:4px 20px 0 20px;height:23px;color:#fff
</style>
<script>
	export default {
		props:{
			text:String,
			color:{
				type:String,
				default:"#0E90D2"
			}
		}
	}
</script>