import React,{Component} from "react"
import Radium from 'radium'
import {getColor,sizes} from './values'
import Color from 'color'

@Radium
export default class extends Component{
	static propTypes ={
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		active:React.PropTypes.bool,
		disable:React.PropTypes.bool,
		full:React.PropTypes.bool,
		border:React.PropTypes.bool,
		onClick:React.PropTypes.func
	}
	render(){
		var color=getColor(this.props.color||"primary")
		var size=sizes[this.props.size||"default"]
		var activeColor=color.backgroundColor=="transparent"?"transparent":Color(color.backgroundColor).darken(0.3).hexString()
		var focusColor=color.backgroundColor=="transparent"?"transparent":Color(color.backgroundColor).darken(0.2).hexString()
		return(
			<button onClick={!this.props.disable&&this.props.onClick} onMouseDown={!this.props.disable&&this.props.onMouseDown} style={[
				{
					textAlign:"left",
					padding:"0.4em 1em",
					display:this.props.block?"block":"inline-block",
					fontSize:size,
					...color,
					cursor:"pointer",
					lineHeight:1.2,
					borderWidth:1,
					borderStyle:"solid",
					borderColor:this.props.border?activeColor:color.backgroundColor,
					transition:"background-color 0.3s ease-out 0s,border-color 0.3s ease-out 0s"
				},
				this.props.active&&{
					boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.15) inset",
					backgroundColor:activeColor,
					borderColor:activeColor
				},
				this.props.disable?{
					cursor: "not-allowed",
					opacity:0.4
				}:{	
					":focus":{
						outline:"thin dotted "+color.color,
						outlineOffset:-2,
						backgroundColor:focusColor,
						borderColor:activeColor
					},
					":hover":{
						backgroundColor:focusColor
					},
					":active":{
						boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.15) inset",
						backgroundColor:activeColor
					}
				},
				this.props.full?{
					width:"100%",
					display:"block",
					textAlign:"center"
				}:{
					marginRight:"1em"
				},
				this.props.style
			]} >
				{this.props.children}
			</button>
		)
	}
}