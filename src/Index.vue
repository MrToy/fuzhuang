<template lang="jade">
	div
		ui-search-bar
		ui-nav-bar
		.box
			p 广告轮播【待完善
			p 各种展示信息【待完善
</template>
<style lang="stylus" scoped>
	.box
		padding:5px 0;width:1300px;margin:0 auto
</style>
<script>
	export default{
		components:{
			'ui-search-bar': require('./components/SearchBar'),
			'ui-nav-bar': require('./components/NavBar')
		}
	}
</script>