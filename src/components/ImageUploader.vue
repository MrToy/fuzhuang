<template lang="jade">
	.image-uploader
		.progress
			ui-progress-linear(v-bind:show="progress!=0&&progress!=100" type="determinate" v-bind:value="progress")
			ui-progress-linear(v-bind:show="progress==100")
		.info(v-if="title") {{title}}
		.add(v-if="!url")
			i.material-icons(v-on:click="upload" v-show="progress==0") add
			i.material-icons(v-on:click="cancle" v-else) close
		img(v-else v-bind:src="url")
		.menus(v-show="url")
			i.material-icons.close(v-on:click="url=null") close
</template>
<style lang="stylus" scoped>
	.image-uploader
		background:#f6f6f6;width:100px;height:100px;position:relative;margin-right:10px;border:1px solid #cdcdcd;
		overflow:hidden;text-align:center;display:inline-block
		&:hover .menus
			top:0
	.info
		position:absolute;bottom:0;width:100%;background:rgba(33,33,33,.7);color:#fff;text-align:center;padding:2px 0
	.menus
		position:absolute;top:-20px;width:100%;background:rgba(255,255,255,.8);text-align:right;transition:all 0.2s
		i.close
			font-size:16px;margin:0 5px;cursor:pointer;color:#fa4a36	
	.add
		line-height:100px;
		i
			font-size:70px;color:#d7d7d7;cursor:pointer;transition:all .2s

	img
		width:100px;height:100px
	.progress
		position:absolute;top:0;width:100%
</style>
<script>
	import {UploadFiles} from '../store/upload'
	const imageDomain="http://toy-upload.img-cn-shanghai.aliyuncs.com"
	const imageStyle="@1e_1c_0o_0l_300h_300w_90q_1pr.jpg"
	export default {
		data(){
			return {
				progress:0,
				promise:null
			}
		},
		props:{
			title:String,
			url:{
				type:String,
				twoWay:true
			}
		},
		methods:{
			upload(){
				var input=document.createElement("input")
				input.setAttribute("type","file")
				input.setAttribute("accept","image/*")
				input.click()
				input.onchange=(e)=>{
					this.promise=UploadFiles(e.target.files,n=>this.progress=n*100)
					this.promise.then(data=>{	
						data=data.map(it=>`${imageDomain}/${it}${imageStyle}`)
						this.url=data[0]
					})
				}
			},
			cancle(){
				this.progress=0
				if(this.promise)
					this.promise.abort()
			}
		},
		components:{
			'ui-progress-linear':require('keen-ui/lib/UiProgressLinear')
		}
	}
</script>