import React,{Component} from "react"
import {colors} from './values'
import Button from './Button'
import Input from './Input'

export default class extends Component{
	static propTypes ={
		total:React.PropTypes.number,
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		onPaging:React.PropTypes.func
	}
	state={index:1}
	pre(){
		this.go(this.state.index-1)
	}
	next(){
		this.go(this.state.index+1)
	}
	go(i){
		if(i<1||i>this.props.total)return
		this.setState({index:i})
		this.props.onPaging&&this.props.onPaging(i)
		this.refs.page.setValue(i)
	}
	render(){
		var arr=[]
		for(var i=1;i<=this.props.total;i++){
			(i=>{
				arr.push(<Button color={this.props.color} size={this.props.size} key={i} full={i==1||(this.state.index>5&&i==this.state.index-2)||(this.state.index<this.props.total-5&&i==this.props.total)} active={i==this.state.index} onClick={()=>this.go(i)}>{i}</Button>)
			})(i)
		}
		if(this.state.index>5){
			arr.splice(1,this.state.index-4,(<div style={{margin:"0 10px",display:"inline-block"}}>...</div>))
		}
		if(this.state.index<this.props.total-5){
			arr.splice(this.state.index>5?7:this.state.index+2,this.props.total-this.state.index-3,(<div style={{margin:"0 10px",display:"inline-block"}}>...</div>))
		}
		return (
			<div {...this.props}>
				<Button key="pre" color={this.props.color} size={this.props.size} disable={this.state.index==1} onClick={()=>this.pre()}  full style={{marginRight:20}}>上一页</Button>
				{arr}
				<Button key="next" color={this.props.color} size={this.props.size} disable={this.state.index==this.props.total} onClick={()=>this.next()} full style={{marginLeft:20}}>下一页</Button>
				<span style={{margin:"0 10px"}}>共{this.props.total}页</span>
				<span style={{marginRight:"1em"}}>到第</span>
				<Input color={this.props.color} size={this.props.size} ref="page" type="number" inline style={{width:70}} />
				<span style={{marginLeft:"1em"}}>页</span>
				<Button color={this.props.color} size={this.props.size} full onClick={()=>this.go(parseInt(this.refs.page.getValue()))}>确定</Button>
			</div>
		)
	}
}