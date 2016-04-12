import React,{Component} from "react"
import {sizes,getColor} from './values'

export default class extends Component{
	static propTypes ={
		title:React.PropTypes.string,
		size:React.PropTypes.string,
		color:React.PropTypes.string
	}
	render(){
		var size=sizes[this.props.size||"default"]
		var color=getColor(this.props.color||"primary")
		return(
			<div style={{borderBottom:"2px solid "+color.backgroundColor,marginBottom:20}}>
				<strong style={{display:"inline-block",padding:"0 20px",height:23,...color,lineHeight:"1.5em",fontSize:size,textAlign:"center"}}>{this.props.title||"#"}</strong>
			</div>
		)
	}
}