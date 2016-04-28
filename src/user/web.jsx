import React,{Component} from "react"
import {Box} from './'
import FormGroup from '../lib/FormGroup'
import FileModalButton from '../lib/FileModalButton'
import GoodsModalButton from '../lib/GoodsModalButton'
import Button from '../lib/Button'
import Ajax from '../lib/Ajax'
import store from 'store'
import Menus from './Menus'


class ConfigItem extends Component{
	state={data:[]}
	render(){
		var {ItemButton,label}=this.props
		return (
			<FormGroup horizontal label={label}>
				<ItemButton checked={this.state.data}  onCheck={data=>this.setState({data},()=>this.refs.post.request())} >选择</ItemButton>
				<Ajax auto url={"/configs/"+label} onSuccess={it=>this.setState({data:it.data})} />
				<Ajax ref="post" url={"/configs/"+label+"?token="+store.get("token")} method="post" data={JSON.stringify(this.state.data)} />
			</FormGroup>
		)
	}
}


export default class extends Component{
	render(){
		return(
			<Box title="网站管理">
				<ConfigItem ItemButton={FileModalButton} label="主页主轮播图片" />
				<ConfigItem ItemButton={GoodsModalButton} label="主页次轮播商品" />
				<ConfigItem ItemButton={GoodsModalButton} label="每日新款" />
				<ConfigItem ItemButton={GoodsModalButton} label="潮流单品" />
				<ConfigItem ItemButton={GoodsModalButton} label="当季促销" />
				<FormGroup horizontal label="菜单">
					<Menus />
				</FormGroup>
			</Box>
		)
	}
}