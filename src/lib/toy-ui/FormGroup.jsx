import React,{Component} from "react"
import Radium from 'radium'
import {sizes} from './values'
import Col from './Col'

export default class extends Component{
	static propTypes ={
		horizontal:React.PropTypes.bool,
		label:React.PropTypes.string
	}
	render(){
		var size=sizes[this.props.size||"default"]
		var styles={
			label:{
				fontWeight:700,
				marginBottom:5,
				display:"inline-block",
				fontSize:size
			}
		}
		return this.props.horizontal?(
			<div style={{marginBottom:"2em"}}>
				<Col sm={2}>
					{this.props.label&&<label style={[styles.label,{paddingTop:"0.6em",float:"right"}]}>{this.props.label}</label>}
				</Col>
				<Col sm={10}>{this.props.children}</Col>
			</div>
		):(
			<div style={{marginBottom:"2em"}}>
				{this.props.label&&<label style={styles.label}>{this.props.label}</label>}
				<div>{this.props.children}</div>
			</div>
		)
	}
}