import React,{Component} from "react"
import Radium from 'radium'

@Radium
export default class extends Component{
	static propTypes ={
		circle:React.PropTypes.bool,
		border:React.PropTypes.bool,
		full:React.PropTypes.bool
	}
	render(){
		return (
			<img {...this.props} style={[
				{padding:2},
				this.props.border&&{border:"1px solid #DDD"},
				this.props.circle&&{borderRadius:"50%"},
				this.props.style,
				this.props.full&&{
					width:"100%",height:"100%",display:"block"
				}
			]} />
		)
	}
}