import React,{Component} from "react"
import {Box} from './'
import {FormGroup} from '../lib/Input'
import {FormImageButton} from '../lib/ImageFileModal'
import Button from '../lib/Button'
import Ajax from '../lib/Ajax'
import store from 'store'

export default class extends Component{
	state={imgs1:[],imgs2:[]}
	onData(it){
		if(it&&it.data&&it.data.imgs1){
			this.refs.imgs1.setState({checked:it.data.imgs1})
			this.setState({imgs1:it.data.imgs1})
		}
		if(it&&it.data&&it.data.imgs2){
			this.refs.imgs2.setState({checked:it.data.imgs2})
			this.setState({imgs2:it.data.imgs2})
		}
	}
	render(){
		return(
			<Box>
				<FormGroup horizontal label="主页主轮播图片">
					<FormImageButton ref="imgs1"  onCheck={imgs=>this.setState({imgs1:imgs})}  />
				</FormGroup>
				<FormGroup horizontal label="主页次轮播图片">
					<FormImageButton ref="imgs2"  onCheck={imgs=>this.setState({imgs2:imgs})} />
				</FormGroup>
				<FormGroup horizontal>
					<Button collapse onClick={()=>this.refs.post.request()}>保存</Button>
				</FormGroup>
				<Ajax auto ref="get" url={"/configs/index"} onSuccess={this.onData.bind(this)} />
				<Ajax ref="post" url={"/configs/index?token="+store.get("token")} method="post" data={JSON.stringify({data:{imgs1:this.state.imgs1,imgs2:this.state.imgs2}})}  alert />
			</Box>
		)
	}
}