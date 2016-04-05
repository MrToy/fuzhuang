import React,{Component} from "react"
import Radium from 'radium'
import {colors,sizes} from './values'
import Col from './Col'
import {FilesEmpty} from '../lib/icons'

@Radium
export default class extends Component{
	static propTypes ={
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		icon:React.PropTypes.func,
		disable:React.PropTypes.bool,
		label:React.PropTypes.string,
		inline:React.PropTypes.bool,
		horizontal:React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.bool
		])
	}
	setValue(str){
		this.refs.input.value=str
	}
	getValue(){
		return this.refs.input.value
	}
	render(){
		var size=this.props.size?sizes[this.props.size]:sizes["default"]
		var color=this.props.color?colors[this.props.color]:colors["default"]
		var styles={
			input:[
				{
					display:"block",
					width:"100%",
					padding:"0.5em",
					borderWidth:1,
					borderStyle:"solid",
					borderColor:color.backgroundColor,
					fontSize:size,
					":focus":{
						borderColor:"#3BB4F2",
						boxShadow:"0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 5px rgba(59, 180, 242, 0.3)"
					},
					transition:"all 0.2s ease"
				},
				this.props.radius?{
					borderRadius:4
				}:null,
				this.props.disable?{
					backgroundColor:"#EEE",
					cursor:"not-allowed"
				}:null,
				this.props.style
			],
			label:{
				fontWeight:700,
				marginBottom:5,
				display:"inline-block",
				fontSize:size
			}
		}
		var horizontalLabel=this.props.label?(
			<label style={[styles.label,{paddingTop:"0.6em",float:"right"}]}>{this.props.label}</label>
		):null
		var defaultLabel=this.props.label?(
			<label style={styles.label}>{this.props.label}</label>
		):null
		var LabelIcon=this.props.icon
		var defaultInput=LabelIcon?(
			<div style={{display:"table",width:"100%"}}>
				<span style={{display:"table-cell",width:"1%",padding:"0 1em",verticalAlign:"middle",textAlign:"center",...color,fill:color.color}}>
					<LabelIcon style={{height:size}} />
				</span>
				<input ref="input" disabled={this.props.disable}  {...this.props} style={styles.input} />
			</div>
		):(
			<input ref="input" disabled={this.props.disable}  {...this.props} style={styles.input} />
		)
		if(this.props.type=="textarea"){
			defaultInput=(
				<textarea ref="input" disabled={this.props.disable} {...this.props} style={styles.input} />
			)
		}
		defaultInput=this.props.horizontal?(
			<div>
				<Col sm={this.props.horizontal[0]||2}>{horizontalLabel}</Col>
				<Col sm={this.props.horizontal[1]||10}>{defaultInput}</Col>
			</div>
		):(
			<div>
				{defaultLabel}
				{defaultInput}
			</div>
		)
		defaultInput=this.props.inline?(
			<div style={[{display:"inline-block",verticalAlign:"middle"},this.props.style]}>{defaultInput}</div>
		):(
			<div style={{marginBottom:15}}>{defaultInput}</div>
		)
		return defaultInput
	}
}

export class FormGroup extends Component{
	static propTypes ={
		horizontal:React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.bool
		]),
		label:React.PropTypes.string
	}
	render(){
		var size=this.props.size?sizes[this.props.size]:sizes["default"]
		var styles={
			label:{
				fontWeight:700,
				marginBottom:5,
				display:"inline-block",
				fontSize:size
			}
		}
		return this.props.horizontal?(
			<div style={{marginBottom:15}}>
				<Col sm={this.props.horizontal[0]||2}>
					{this.props.label&&<label style={[styles.label,{paddingTop:"0.6em",float:"right"}]}>{this.props.label}</label>}
				</Col>
				<Col sm={this.props.horizontal[0]||10}>{this.props.children}</Col>
			</div>
		):(
			<div style={{marginBottom:15}}>
				{this.props.label&&<label style={styles.label}>{this.props.label}</label>}
				<div>{this.props.children}</div>
			</div>
		)
	}
}