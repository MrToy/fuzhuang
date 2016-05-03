import React,{Component} from 'react'
import "svgxuse"

export default class extends Component{
	render(){
		return (
			<svg style={{width:"1em",height:"1em",margin:"-0.1em 0.2em 0.1em 0.2em",verticalAlign:"middle",fill:"currentColor"}}>
				<use xlinkHref={require("./svg-symbols.svg")+"#"+this.props.name}></use>
			</svg>
		)
	}
} 