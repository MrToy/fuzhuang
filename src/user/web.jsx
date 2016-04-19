import React,{Component} from "react"
import {Box} from './'
import FormGroup from '../lib/FormGroup'
import FileModalButton from '../lib/FileModalButton'
import GoodsModalButton from '../lib/GoodsModalButton'
import Button from '../lib/Button'
import Ajax from '../lib/Ajax'
import store from 'store'

export default class extends Component{
	state={s1:[],s2:[],s3:[],s4:[],s5:[]}
	render(){
		return(
			<Box title="网站管理">
				<FormGroup horizontal label="主页主轮播图片">
					<FileModalButton checked={this.state.s1}  onCheck={s1=>this.setState({s1})} >图片选择</FileModalButton>
				</FormGroup>
				<FormGroup horizontal label="主页次轮播商品">
					<GoodsModalButton checked={this.state.s2}  onCheck={s2=>this.setState({s2})} >商品选择</GoodsModalButton>
				</FormGroup>
				<FormGroup horizontal label="每日新款">
					<GoodsModalButton checked={this.state.s3}  onCheck={s3=>this.setState({s3})} >商品选择</GoodsModalButton>
				</FormGroup>
				<FormGroup horizontal label="潮流单品">
					<GoodsModalButton checked={this.state.s4} onCheck={s4=>this.setState({s4})} >商品选择</GoodsModalButton>
				</FormGroup>
				<FormGroup horizontal label="当季促销">
					<GoodsModalButton checked={this.state.s5}  onCheck={s5=>this.setState({s5})} >商品选择</GoodsModalButton>
				</FormGroup>
				<FormGroup horizontal>
					<Button collapse onClick={()=>this.refs.post.request()}>保存</Button>
				</FormGroup>
				<Ajax auto ref="get" url={"/configs/index"} onSuccess={it=>this.setState({...it})} />
				<Ajax ref="post" url={"/configs/index?token="+store.get("token")} method="post" data={JSON.stringify({...this.state})}  alert />
			</Box>
		)
	}
}