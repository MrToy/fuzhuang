import React,{Component} from "react"
export default class extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em",margin:"-0.1em 0.1em 0.1em 0.1em",verticalAlign:"middle"}} viewBox="0 0 16 16">
				<path d="M16 0h-6.5l2.5 2.5-3 3 1.5 1.5 3-3 2.5 2.5z"></path>
				<path d="M16 16v-6.5l-2.5 2.5-3-3-1.5 1.5 3 3-2.5 2.5z"></path>
				<path d="M0 16h6.5l-2.5-2.5 3-3-1.5-1.5-3 3-2.5-2.5z"></path>
				<path d="M0 0v6.5l2.5-2.5 3 3 1.5-1.5-3-3 2.5-2.5z"></path>
			</svg>
		)
	}
}