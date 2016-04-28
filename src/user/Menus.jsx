import React,{Component} from "react"
import List from '../lib/List'
import Ajax from '../lib/Ajax'
import Popover from '../lib/Popover'
import Input from '../lib/Input'
import Button from '../lib/Button'
import Card from '../lib/Card'
import store from 'store'


class MenuList extends Component{
	state={value:""}
	render(){
		return (
			<Card title={this.props.noAction?null:(
				<div>
					<Popover ref="pop" style={{width:380}} content={(
						<Input color="primary" boxStyle={{marginRight:0}} value={this.state.value} onChange={e=>this.setState({value:e.target.value})} addRight={<Button style={{marginRight:0}} onClick={()=>{
							this.refs.pop.onHide()
							this.props.onAdd(this.state.value)
						}}>确定</Button>} />
					)}>
						<Button>添加</Button>
					</Popover>
					<Button style={{marginRight:0}}  onClick={()=>this.props.onDel()}>删除</Button>
				</div>
			)}>
				<List {...this.props} />
			</Card>
		)
	}
}

export default class extends Component{
	static propTypes ={
		noAction:React.PropTypes.bool,
		onChange:React.PropTypes.func,
		selected:React.PropTypes.string
	}
	state={data:[],selected:null}
	render(){
		var list=[]
		var selected=this.props.onChange?this.props.selected:this.state.selected
		var onChange=this.props.onChange?selected=>this.props.onChange(selected):selected=>this.setState({selected})
		function removeNode(data,selected){
			if(!selected)return data
			data=data.filter(it=>it.text!=selected)
			data.filter(it=>it.parent==selected).forEach(it=>{
				data=removeNode(data,it.text)
			})
			return data
		}
		var recur= (parent,selected)=>{
			var item=this.state.data.find(it=>it.text==parent)||{}
			var config={
				selected,
				onChange,
				onAdd:value=>{
					if(!this.state.data.find(it=>it.text==value))
						this.setState({data:[...this.state.data,{text:value,parent}]},()=>this.refs.post.request())
					else
						alert("出现重复菜单项")
				},
				onDel:()=>this.setState({data:removeNode(this.state.data,selected),selected:parent},()=>this.refs.post.request()),
				data:this.state.data.filter(it=>it.parent==item.text).map(it=>it.text),
				noAction:this.props.noAction
			}
			list.unshift(config)
			if(item.text)
				recur(item.parent,item.text)
		}
		recur(selected)
		if(this.props.noAction&&list.length&&list[list.length-1].data.length==0)
			list.pop()
		return (
			<div>
				{list.map(config=><MenuList {...config} />)}
				<Ajax auto url={"/configs/菜单"} onSuccess={it=>this.setState({data:it.data})} />
				<Ajax ref="post" url={"/configs/菜单?token="+store.get("token")} method="post" data={JSON.stringify(this.state.data)} />
			</div>
		)
	}
}