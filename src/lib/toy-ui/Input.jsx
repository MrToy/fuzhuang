import React,{Component} from "react"
import Radium from 'radium'
import {getColor,sizes} from './values'
import Color from 'color'
import Button from './Button'

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
						boxShadow:"0px 0px 5px "+Color((color.color=="#444"?getColor("primary"):color).backgroundColor).lighten(0.7).hexString()
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
					padding:"0.5em",
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
					padding:this.props.labelCollapse?"0":"0.4em 0.5em",
					transition:"all 0.2s ease"
				},
				this.props.full&&{
					display:"table-cell"
				}
			]
		}
		var MyInput=<input disabled={this.props.disable}  {...this.props} style={styles.input} />
		if(this.props.type=="textarea"){
			MyInput=<textarea disabled={this.props.disable} {...this.props} style={styles.input} />
		}
		if(this.props.type=="file"){
			MyInput=(
				<Button {...this.props} onClick={()=>this.refs.file.click()}>
					{this.props.children}
					<input ref="file" type="file" multiple={this.props.multiple} onChange={e=>this.props.onFile&&this.props.onFile(e.target.files)} style={{display:"none"}}></input>
				</Button>
			)
		}
		return (
			<div style={styles.box}>
				{this.props.addLeft&&<label style={styles.label}>{this.props.addLeft}</label>}
				{MyInput}
				{this.props.addRight&&<label style={styles.label}>{this.props.addRight}</label>}
			</div>
		)
	}
}
