import React,{Component} from "react"
import Radium from 'radium'
import {getAdapt} from './utils'
import {colors,sizes} from './values'
import Color from 'color'

@Radium
export default class extends Component{
	static propTypes ={
		sm:React.PropTypes.number,
		md:React.PropTypes.number,
		lg:React.PropTypes.number,
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		icon:React.PropTypes.func,
		radius:React.PropTypes.bool,
		border:React.PropTypes.bool,
		active:React.PropTypes.bool,
		disable:React.PropTypes.bool,
		collapse:React.PropTypes.bool
	}
	render(){
		var color=this.props.color||"primary"
		var size=this.props.size||"default"
		var Icon=this.props.icon
		var activeColor=Color(colors[color].backgroundColor).darken(0.3).rgbString()
		var focusColor=Color(colors[color].backgroundColor).darken(0.2).rgbString()
		var disableColor=Color(colors[color].backgroundColor).lighten(0.8).rgbString()
		return(
			<button type="button" {...this.props} onClick={this.props.disable?null:this.props.onClick} style={[
				{
					textAlign:"left",
					padding:"0.5em 1em",
					display:this.props.block?"block":"inline-block",
					marginLeft:5,
					fontSize:sizes[size],
					...colors[color],
					cursor:"pointer",
					lineHeight:1.2,
					borderWidth:1,
					borderStyle:"solid",
					borderColor:colors[color].backgroundColor,
					transition:"background-color 0.3s ease-out 0s,border-color 0.3s ease-out 0s"
				},
				this.props.radius?{
					borderRadius:4
				}:null,
				this.props.border?{
					borderColor:activeColor
				}:null,
				this.props.active?{
					boxShadow:"0px 3px 5px rgba(0, 0, 0, 0.15) inset",
					backgroundColor:activeColor,
					borderColor:activeColor
				}:null,
				this.props.disable?{
					cursor: "not-allowed",
					backgroundColor:disableColor,
					borderColor:disableColor
				}:{	
					":focus":{
						outline:"thin dotted "+colors[color].color,
						outlineOffset:-2,
						backgroundColor:focusColor,
						borderColor:activeColor
					},
					":hover":{
						backgroundColor:focusColor
					},
					":active":{
						boxShadow:"0px 3px 5px rgba(0, 0, 0, 0.15) inset",
						backgroundColor:activeColor
					}
				},
				this.props.collapse&&{marginLeft:0},
				this.props.style
			]} >
				{Icon?(
					<Icon style={{
						height:sizes[size],
						fill:colors[color].color,
						verticalAlign:"bottom"
					}} />
				):null}
				{this.props.children?(
					<span style={{
						margin:"0 0.2em",
						verticalAlign:"bottom"
					}}>{this.props.children}</span>
				):null}
			</button>
		)
	}
}