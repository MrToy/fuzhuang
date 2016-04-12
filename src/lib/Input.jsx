import React,{Component} from "react"
import Radium from 'radium'
import {getColor,sizes} from './values'

@Radium
export default class extends Component{
	static propTypes ={
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		disable:React.PropTypes.bool,
		full:React.PropTypes.bool,
		addLeft:React.PropTypes.any,
		addRight:React.PropTypes.any,
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
					":focus":{
						borderColor:color.backgroundColor,
						boxShadow:"0px 0px 5px "+color.backgroundColor
					},
					transition:"all 0.2s ease",
				},
				this.props.disable&&{
					backgroundColor:"#EEE",
					cursor:"not-allowed"
				},
				this.props.full?{
					width:"100%"
				}:{
					marginRight:"1em",
					display:"inline-block"
				}
			],
			input:[
				{
					padding:"0.5em",
					fontSize:size,
					border:"none"	
				},
				this.props.full&&{
					width:"100%"
				},
				this.props.style
			],
			label:{...color,fontSize:size,padding:"0.5em",transition:"all 0.2s ease"}
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
