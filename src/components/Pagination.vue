<template lang="jade">
	ul
		li(v-bind:class='{disabled:current-1<1}' v-on:click="current-1<1?null:onPaging(current-1)") «
		li(v-bind:class='{active:1==current}' v-on:click="onPaging(1)"  v-if="total>0") 1
		span.more(v-if="current-3>1") ...
		li(v-for="i in total" v-bind:class='{active:i+1==current}' v-on:click="onPaging(i+1)" v-if="i+1!=1&&i+1!=total&&(current-3 < i+1&&current+3 > i+1)") {{i+1}}
		span.more(v-if="current+3 < total") ...
		li(v-bind:class='{active:total==current}' v-on:click="onPaging(total)" v-if="total>1") {{total}}
		li(v-bind:class='{disabled:current+1>total}' v-on:click="current+1>total?null:onPaging(current+1)") »
</template>
<style lang="stylus" scoped>
	ul
		list-style-type:none;user-select:none;padding:0
	li
		display:inline;padding:7px 12px;margin-left:-1px;line-height:2;border: 1px solid #ddd;cursor:pointer
		&:hover:not(.active):not(.disabled)
			background:#eee
		&:not(.active):not(.disabled)
			color:#337ab7
	.active
		background:#0c81df;color:#fff
	.disabled
		cursor:not-allowed
	.more
		padding:7px 12px
</style>
<script>
	export default{
		props:{
			total:Number,
			current:Number,
			onPaging:Function
		}
	}
</script>