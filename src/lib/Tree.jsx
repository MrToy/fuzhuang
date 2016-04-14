import React,{Component} from "react"
import Radium from 'radium'

import Home from './IconMoon/Home'
import Plus from './IconMoon/Plus'
import Minus from './IconMoon/Minus'

@Radium
class TreeNode extends Component{
	static propTypes ={
		name:React.PropTypes.string,
		type:React.PropTypes.string,
		onClick:React.PropTypes.func
	}
	state={isOpen:true}
	render(){
		return (
			<div style={{marginLeft:15}}>
				{this.props.children&&(
					<span style={{fontSize:"0.7em",marginLeft:-16,cursor:"pointer",whiteSpace:"nowrap"}}
						onClick={()=>this.setState({isOpen:!this.state.isOpen})} >
						{this.state.isOpen?<Minus />:<Plus />}
					</span>
				)}
				<span style={[
					{cursor:"pointer",padding:"2px 5px",lineHeight:1.5},
					this.props.active?{background:"#FFE6B0",border:"1px solid #FFB951"}:{border:"1px solid transparent"}
				]} onClick={this.props.onClick}>{this.props.name}</span>
				{this.props.children&&(
					<div style={!this.state.isOpen?{display:"none"}:{}}>{this.props.children}</div>
				)}
			</div>
		)
	}
}

export default class extends Component{
	static propTypes ={
		selected:React.PropTypes.string,

	}
	state={selected:2}
	recur(data,parent){
		var res=[]
		var selected=this.props.selected||this.state.selected
		data.forEach(it=>{
			if(it.parent==parent)
				res.push(
					<TreeNode active={selected==it.key} {...it}
						onClick={()=>{
							this.setState({selected:it.key})
							this.props.onSelect&&this.props.onSelect()
						}} >
						{it.type=="folder"&&this.recur(data,it.key)}
					</TreeNode>
				)
		})
		return res
	}
	render(){
		var data=[{key:1,name:"test1",parent:null,type:"folder"},{key:2,name:"test2",parent:1,type:"folder"},{key:3,name:"test3",parent:4,type:"image/jpeg"},{key:4,name:"test4",parent:1,type:"folder"}]
		return <div>{this.recur(data)}</div>
	}
}