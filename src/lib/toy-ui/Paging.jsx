import React,{Component} from "react"
import Button from './Button'
import Input from './Input'

export default class extends Component{
	static propTypes ={
		total:React.PropTypes.number,
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		index:React.PropTypes.number,
		onPaging:React.PropTypes.func
	}
	state={index:1,to:1}
	go(i){
		if(i<1||i>this.props.total)return
		this.setState({index:i})
		this.props.onPaging&&this.props.onPaging(i)
	}
	render(){
		var arr=[]
		var index=this.props.index||this.state.index
		for(var i=1;i<=this.props.total;i++){
			(i=>{
				arr.push(<Button style={{marginRight:0}} color={this.props.color} size={this.props.size} key={i} active={i==index} onClick={()=>this.go(i)}>{i}</Button>)
			})(i)
		}
		if(index>5){
			arr.splice(1,index-4,(<div style={{margin:"0 10px",display:"inline-block"}}>...</div>))
		}
		if(index<this.props.total-5){
			arr.splice(index>5?7:index+2,this.props.total-index-3,(<div style={{margin:"0 10px",display:"inline-block"}}>...</div>))
		}
		return (
			<div {...this.props}>
				<Button key="pre" color={this.props.color} size={this.props.size} disable={index==1} onClick={()=>this.go(index-1)} style={{marginRight:20}}>上一页</Button>
				{arr}
				<Button key="next" color={this.props.color} size={this.props.size} disable={index==this.props.total} onClick={()=>this.go(index+1)} style={{marginLeft:20}}>下一页</Button>
				<span style={{margin:"0 10px"}}>共{this.props.total}页</span>
				<span style={{marginRight:"1em"}}>到第</span>
				<Input color={this.props.color} size={this.props.size} type="number" value={this.state.to} onChange={e=>this.setState({to:parseInt(e.target.value)})}  style={{width:70}} />
				<span style={{marginRight:"1em"}}>页</span>
				<Button color={this.props.color} size={this.props.size} onClick={()=>this.go(this.state.to)}>确定</Button>
			</div>
		)
	}
}