<template lang="jade">
	.section
		a.logo(v-link=`{path:"/"}`)
			img(src="../assets/logo.png")
		.search
			.input(v-on:keyup.enter="search")
				input(placeholder="请输入关键词" v-model="word")
			.btn(v-on:click="search")
				i.material-icons search
				span 搜索
</template>
<script>
	export default{
		data(){
			return {
				word:this.$route.query.word
			}
		},
		methods:{
			search(){
				this.$route.router.go({path:"/search",query:{word:this.word}})
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.material-icons
		vertical-align:middle
	.section
		padding:5px 0;width:1200px;margin:0 auto;
	.logo
		vertical-align:middle;margin:0 30px;display:inline-block
		img
			width:100px;height:100px
	.search
		vertical-align:middle;display:inline-block;margin-left:180px
		.input
			vertical-align:middle;border-width:2px 0 2px 2px;border-style:solid;border-color:#c81624;display:inline-block;height:36px
		input
			font-size:16px;outline:none;width:400px;border:none;padding: 4px 0 0 10px;line-height:30px
		.btn
			cursor:pointer;vertical-align:middle;display: inline-block;background-color: rgb(200, 22, 36);
			color:#fff;line-height:40px;padding:0 20px;font-size:18px
</style>