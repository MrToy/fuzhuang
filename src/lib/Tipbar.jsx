import React,{Component} from "react"
import {sizes,colors} from './values'

export default class extends Component{
	static propTypes ={
		title:React.PropTypes.string,
		size:React.PropTypes.string,
		color:React.PropTypes.string
	}
	render(){
		var size=this.props.size?sizes[this.props.size]:sizes["default"]
		var color=this.props.color?colors[this.props.color]:colors["primary"]
		return(
			<div style={{borderBottom:"2px solid "+color.backgroundColor,marginBottom:20}}>
				<strong style={{display:"inline-block",padding:"0 20px",height:23,...color,lineHeight:"1.5em",fontSize:size,textAlign:"center"}}>{this.props.title||"#"}</strong>
			</div>
		)
	}
}