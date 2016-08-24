<template lang="jade">
	vue-toast(v-ref:toast)
</template>
<script>
	import VueToast from 'vue-toast'
	export default{
		components:{
			'vue-toast':VueToast
		},
		ready(){
			this.$refs.toast.setOptions({
				position:'bottom right'
			})
		},
		events:{
			'toast':function(msg,type){
				var theme=type||"default"
				if(type=="success")
					type="check_circle"
				if(type)
					msg=`<i class="material-icons">`+type+`</i> `+msg
				this.$refs.toast.showToast(msg,{theme})		
			}
		}
	}
</script>
<style lang="stylus">
	.vue-toast_message
		font-size:16px;padding:12px 20px
</style>