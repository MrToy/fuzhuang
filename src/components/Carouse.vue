<template lang="jade">
	.carouse(v-bind:style='{width:width+"px",height:height+"px"}')
		.item(v-for="(i,item) in items" v-bind:class="{active:index==i}")
			img(v-bind:src="item.img")
		.dots
			.dot(v-for="(i,item) in items" v-bind:class="{active:index==i}" v-on:click="index=i")
</template>
<style lang="stylus" scoped>
	.carouse
		position:relative;overflow:hidden
		.item
			position:absolute;z-index:1;opacity:0;transition:all 0.5s ease
			img
				width:100%;height:100%
			&.active
				z-index:3;opacity:1
		.dots
			z-index:233;position:absolute;bottom:20px;right:20px
			.dot
				float: left;margin-right: 10px;cursor: pointer;width: 16px;height: 16px;overflow: hidden;
				border-radius: 8px;background:rgba(200,200,200,0.8);transition:all 0.1s ease
				&:hover
					transform:scale(1.2)
				&.active
					background:#327ff1
		.arrow
			.left,.right
				z-index:233;color:rgba(255,255,255,0.9);font-weight:bold;font-size:30px;background:rgba(0,0,0,0.5);width:40px;height:40px;text-align:center;
				line-height:40px;position:absolute;top:45%;cursor:pointer;transition:all 0.1s ease
				&:hover
					color:#327ff1;font-size:35px
			.left
				left:0
			.right
				right:0
</style>
<script>
	export default{
		props:{
			items:Array,
			width:{type:Number,default:500},
			height:{type:Number,default:200},
		},
		data(){
			return {
				index:-1
			}
		},
		ready(){
			this.index=0
		},
		destroyed() {
			clearInterval(this.handle)
		},
		watch:{
			'index':function(i){
				clearTimeout(this.handle)
				this.handle=setTimeout(()=>{
					this.index+2>this.items.length?this.index=0:this.index++
				},3000)
			}
		}
	}
</script>