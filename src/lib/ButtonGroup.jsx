import React,{Component} from "react"
import Radium from 'radium'

@Radium
export default class extends Component{
	static propTypes ={
		onCheck:React.PropTypes.func
	}
	state={checked:0}
	render(){
		var ctx=this
		return(
			<div style={[{display:"inline-block"},this.props.style]}>
				{React.Children.map(this.props.children,function(child,i){
					return React.cloneElement(child, {
						collapse:true,
						style:{marginRight:-1},
						border:true,
						onClick:()=>{
							ctx.setState({checked:i},()=>ctx.props.onCheck&&ctx.props.onCheck(i))
						},
						active:ctx.state.checked==i
					})
				})}
			</div>
		)
	}
}
