import React,{Component} from "react"
import Radium from 'radium'

@Radium
export default class extends Component{
	static propTypes ={
		checked:React.PropTypes.number,
		onCheck:React.PropTypes.func
	}
	state={checked:0}
	render(){
		var checked=this.props.checked||this.state.checked
		return(
			<div style={[{display:"inline-block",marginRight:"1em"},this.props.style]}>
				{React.Children.map(this.props.children,(child,i)=>{
					return React.cloneElement(child, {
						style:{
							marginRight:-1,
						},
						border:true,
						onClick:()=>{
							this.setState({checked:i},()=>this.props.onCheck&&this.props.onCheck(i))
						},
						active:checked==i
					})
				})}
			</div>
		)
	}
}
