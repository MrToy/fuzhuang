<template lang="jade">
	.section
		.wrapper
			.item
				.text 所有商品分类
			.item
				a.text 首页
			.item
				a.text 每日新品
			.item
				a.text 潮流前线
			.item
				a.text 当季促销
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
			margin-right:60px
</style>