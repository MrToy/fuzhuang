<template lang="jade">
	.ui-saler
		admin-box(title="后台管理" v-bind:menus="menus")
</template>
<script>
	export default{
		data(){
			return {
				menus:[
					{text:"网站信息",link:{path:"/admin/info"}},
					{text:"网站设置",link:{path:"/admin/config"}},
				]
			}
		},
		components:{
			'admin-box': require('./components/AdminBox')
		}
	}
</script>