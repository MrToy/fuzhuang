import React,{Component} from "react"
import {Box} from './'
import FormGroup from '../lib/FormGroup'
import FileModalButton from '../lib/FileModalButton'
import Button from '../lib/Button'
import Ajax from '../lib/Ajax'
import store from 'store'

export default class extends Component{
	state={imgs1:[],imgs2:[]}
	render(){
		var {imgs1,imgs2}=this.state
		return(
			<Box title="网站管理">
				<FormGroup horizontal label="主页主轮播图片">
					<FileModalButton checked={imgs1} ref="imgs1"  onCheck={imgs=>this.setState({imgs1:imgs})} >图片选择</FileModalButton>
				</FormGroup>
				<FormGroup horizontal label="主页次轮播图片">
					<FileModalButton checked={imgs2} ref="imgs2"  onCheck={imgs=>this.setState({imgs2:imgs})} >图片选择</FileModalButton>
				</FormGroup>
				<FormGroup horizontal>
					<Button collapse onClick={()=>this.refs.post.request()}>保存</Button>
				</FormGroup>
				<Ajax auto ref="get" url={"/configs/index"} onSuccess={it=>this.setState({imgs1:it.imgs1,imgs2:it.imgs2})} />
				<Ajax ref="post" url={"/configs/index?token="+store.get("token")} method="post" data={JSON.stringify({imgs1:this.state.imgs1,imgs2:this.state.imgs2})}  alert />
			</Box>
		)
	}
}