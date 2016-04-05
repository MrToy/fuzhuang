import React,{Component} from "react"
import Radium from 'radium'

@Radium
export default class extends Component{
	static propTypes ={
		getChecked:React.PropTypes.func
	}
	state={checked:0}
	getChecked(){
		return this.state.checked
	}
	render(){
		var ctx=this
		return(
			<div style={{display:"inline-block"}}>
				{React.Children.map(this.props.children,function(child,i){
					return React.cloneElement(child, {
						collapse:true,
						style:{marginRight:-1},
						border:true,
						onClick:()=>{
							ctx.setState({checked:i})
						},
						active:ctx.state.checked==i
					})
				})}
			</div>
		)
	}
}
