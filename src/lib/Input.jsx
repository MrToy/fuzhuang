import React,{Component} from "react"
import Radium from 'radium'
import {getColor,sizes} from './values'
import Color from 'color'

@Radium
export default class extends Component{
	static propTypes ={
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		disable:React.PropTypes.bool,
		full:React.PropTypes.bool,
		addLeft:React.PropTypes.any,
		addRight:React.PropTypes.any,
		labelCollapse:React.PropTypes.bool,
		onChange:React.PropTypes.func
	}
	render(){
		var size=sizes[this.props.size||"default"]
		var color=getColor(this.props.color||"default")
		var styles={
			box:[
				{
					borderWidth:size/10,
					borderStyle:"solid",
					borderColor:color.backgroundColor,
					verticalAlign:"top",
					...color,
					":focus":{
						color:(color.color=="#444"?getColor("primary"):color).color,
						backgroundColor:(color.color=="#444"?getColor("primary"):color).backgroundColor,
						borderColor:(color.color=="#444"?getColor("primary"):color).backgroundColor,
						boxShadow:"0px 0px 5px "+Color((color.color=="#444"?getColor("primary"):color).backgroundColor).lighten(0.8).hexString()
					},
					transition:"all 0.2s ease",
				},
				this.props.disable&&{
					backgroundColor:"#EEE",
					cursor:"not-allowed"
				},
				this.props.full?{
					width:"100%",
					display:"table"
				}:{
					marginRight:"1em",
					display:"inline-block"
				},
				this.props.boxStyle
			],
			input:[
				{
					padding:"0.6em",
					fontSize:size,
					border:"none"	
				},
				this.props.full&&{
					width:"100%"
				},
				this.props.style
			],
			label:[
				{
					fontSize:size,
					padding:this.props.labelCollapse?"0":"0.5em",
					transition:"all 0.2s ease"
				},
				this.props.full&&{
					display:"table-cell"
				}
			]
		}
		return (
			<div style={styles.box}>
				{this.props.addLeft&&<label style={styles.label}>{this.props.addLeft}</label>}
				{this.props.type=="textarea"?(
					<textarea disabled={this.props.disable} {...this.props} style={styles.input} />
				):(
					<input disabled={this.props.disable}  {...this.props} style={styles.input} />
				)}
				{this.props.addRight&&<label style={styles.label}>{this.props.addRight}</label>}
			</div>
		)
	}
}
