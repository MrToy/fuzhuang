import React,{Component} from "react"
import Radium from 'radium'

@Radium
export default class extends Component{
	static propTypes ={
		circle:React.PropTypes.bool
	}
	render(){
		return (
			<img {...this.props} style={[
				{width:"100%",height:"100%",display:"inline-block",padding:2},
				this.props.circle&&{borderRadius:"50%"},
				this.props.border&&{border:"1px solid #DDD"},
				this.props.style
			]} />
		)
	}
}