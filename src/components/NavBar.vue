<template lang="jade">
	.section
		.wrapper
			.item
				a.text(v-link=`{path:"/"}`) 首页
			.item
				a.text(v-link=`{path:"/search",query:{word:"每日新品"}}`) 每日新品
			.item
				a.text(v-link=`{path:"/search",query:{word:"潮流前线"}}`) 潮流前线
			.item
				a.text(v-link=`{path:"/search",query:{word:"当季促销"}}`) 当季促销
</template>
<style lang="stylus" scoped>
	.wrapper
		width:1200px;margin:0 auto
	.section
		background:#c81624
	.text
		display:inline-block;padding:0 20px;line-height:35px;color:#fff
		&:hover
			background:rgb(161,18,30)
	.item
		display:inline-block;font-size: 14px;font-weight: bold
		&:first-child
			margin-left:60px
</style>