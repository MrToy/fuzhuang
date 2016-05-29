import React,{Component} from "react"
import Button from 'toy-ui/Button'
import Ajax from 'toy-ui/Ajax'
import List from 'toy-ui/List'
import Popover from 'toy-ui/Popover'
import Input from 'toy-ui/Input'
import Card from 'toy-ui/Card'

export default class extends Component{
	state={value:"",selected:null}
	render(){
		var {data=[],onChange}=this.props
		return (
			<Card title={(
				<div>
					<Popover ref="pop" style={{width:450}} content={(
						<Input color="primary" boxStyle={{marginRight:0}} value={this.state.value} onChange={e=>this.setState({value:e.target.value})} addRight={(
							<span>
							<Button style={{marginRight:0}} onClick={()=>{
								this.refs.pop.onHide()
								if(this.state.value!=""&&!data.find(it=>it==this.state.value))
									onChange([...data,this.state.value])
							}}>确定</Button>
							<Button style={{marginRight:0}} onClick={()=>this.refs.pop.onHide()}>取消</Button>
							</span>
						)} />
					)}>
						<Button>添加</Button>
					</Popover>
					<Button style={{marginRight:0}}  onClick={()=>{
						onChange(data.filter(it=>it!=this.state.selected))
					}}>删除</Button>
				</div>
			)}>
				<List selected={this.state.selected} data={data} onChange={selected=>{
					this.setState({selected})
					this.props.onSelect&&this.props.onSelect(selected)
				}} />
			</Card>
		)
	}
}