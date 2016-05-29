import React,{Component} from "react"

import FormGroup from 'toy-ui/FormGroup'
import FileModalButton from 'my-components/FileModalButton'
import GoodsModalButton from 'my-components/GoodsModalButton'
import Button from 'toy-ui/Button'
import Ajax from 'toy-ui/Ajax'
import store from 'store'
import List from 'toy-ui/List'
import Popover from 'toy-ui/Popover'
import Input from 'toy-ui/Input'
import Card from 'toy-ui/Card'
import Menus from 'my-components/Menus'

class AjaxForm extends Component{
	state={data:[]}
	render(){
		var {label}=this.props
		return (
			<FormGroup horizontal label={label}>
				{React.cloneElement(this.props.children,{
					checked:this.state.data,
					data:this.state.data,
					onCheck:data=>this.setState({data},()=>this.refs.post.request()),
					onChange:data=>this.setState({data},()=>this.refs.post.request())
				})}
				<Ajax auto url={"/configs/"+label} onSuccess={data=>this.setState({data})} />
				<Ajax ref="post" url={"/configs/"+label+"?token="+store.get("token")} method="post" data={JSON.stringify(this.state.data)} />
			</FormGroup>
		)
	}
}


class MutilMenus extends Component{
	state={selected:null}
	render(){
		var {label,data=[]}=this.props
		data=data.filter(it=>!(it.parent&&!data.find(itit=>itit.text==it.parent)||it.text==it.parent))
		var list=[]
		var recur= selected=>{
			selected=selected||{}
			let item=data.find(it=>it.text==selected.text&&it.parent==selected.parent)
			list.unshift({data:data.filter(it=>it.parent==(item?item.text:null)).map(it=>it.text),parent:selected.text})
			if(item){
				recur(data.find(it=>it.text==item.parent))
			}
		}
		recur(this.state.selected)
		return (
			<div>
				{list.map(it=>(
					<Menus data={it.data}
						onSelect={text=>this.setState({selected:{text,parent:it.parent}})}
						onChange={arr=>{
							this.setState({selected:data.find(itit=>itit.text==it.parent)})
							this.props.onChange([...data.filter(itit=>itit.parent!=it.parent),...arr.map(itit=>({text:itit,parent:it.parent}))])
						}} />
				))}
			</div>
		)
	}
}

export default class extends Component{
	render(){
		return(
			<div>
				<AjaxForm label="主页主轮播图片">
					<FileModalButton>选择</FileModalButton>
				</AjaxForm>
				<AjaxForm label="主页次轮播商品">
					<GoodsModalButton>选择</GoodsModalButton>
				</AjaxForm>
				<AjaxForm label="菜单">
					<MutilMenus />
				</AjaxForm>
				<AjaxForm label="首页横向菜单">
					<Menus />
				</AjaxForm>
			</div>
		)
	}
}