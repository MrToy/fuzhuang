import React,{Component} from "react"
import Radium from 'radium'
import {getColor,sizes} from './values'

@Radium
export default class extends Component{
	static propTypes ={
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		title:React.PropTypes.any,
		full:React.PropTypes.bool
	}
	render(){
		var color=getColor(this.props.color||"primary")
		var size=sizes[this.props.size||"default"]
		return (
			<div {...this.props} style={[
				{border:"1px solid "+color.backgroundColor,color:color.backgroundColor},
				!this.props.full&&{
					width:size*15,
					height:size*20,
					display:"inline-block",
					margin:"0 1em 1em 0"
				},
				!this.props.title&&{padding:"1em"},
				this.props.style
			]}>
				{this.props.title?(
					<div>
						<div style={{height:"2em",lineHeight:2,fontSize:size*1.5,textAlign:"center",...color}}>{this.props.title}</div>
						<div style={{padding:"1em"}}>{this.props.children}</div>
					</div>
				):this.props.children}
			</div>
		)
	}
}