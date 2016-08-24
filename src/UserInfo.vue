<template lang="jade">
	ui-tabs(type="icon-and-text")
		ui-tab(header="基本信息" icon="person")
			ui-textbox(name="account" v-bind:disabled="true" v-bind:value.sync="info.account" label="Account")
		ui-tab(header="收货地址" icon="airport_shuttle")
			ui-icon-button(icon="add" type="flat")
</template>
<script>
	import {getInfo} from './store/user'
	import store from 'store'
	export default{
		data(){
			return{
				info:{}
			}
		},
		async ready(){
			this.info=await getInfo(store.get("token"))
		},
		components:{
			'ui-tabs':require('keen-ui/lib/UiTabs'),
			'ui-tab':require('keen-ui/lib/UiTab'),
			'ui-textbox':require('keen-ui/lib/UiTextbox'),
			'ui-button':require('keen-ui/lib/UiButton'),
			'ui-icon-button':require('keen-ui/lib/UiIconButton'),
			'ui-modal':require('keen-ui/lib/UiModal')
		}
	}
</script>