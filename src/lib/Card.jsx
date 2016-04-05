import React,{Component} from "react"
import Radium from 'radium'
import {colors,sizes} from './values'

@Radium
export default class extends Component{
	static propTypes ={
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		title:React.PropTypes.any
	}
	render(){
		var color=colors[this.props.color||"primary"]
		var size=sizes[this.props.size||"default"]
		return (
			<div {...this.props} style={[{width:size*15,height:size*20,border:"1px solid "+color.backgroundColor},this.props.boxStyle]}>
				{this.props.title&&(<div style={{...color,height:"2em",lineHeight:2,fontSize:size*1.5,textAlign:"center"}}>{this.props.title}</div>)}
				<div style={[{padding:"1em"},this.props.style]}>{this.props.children}</div>
			</div>
		)
	}
}