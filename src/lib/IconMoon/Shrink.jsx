import React,{Component} from "react"
export default class extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em",margin:"0px 0.2em 0.2em 0.2em",verticalAlign:"middle"}} viewBox="0 0 16 16">
				<path d="M9 7h6.5l-2.5-2.5 3-3-1.5-1.5-3 3-2.5-2.5z"></path>
				<path d="M9 9v6.5l2.5-2.5 3 3 1.5-1.5-3-3 2.5-2.5z"></path>
				<path d="M7 9h-6.5l2.5 2.5-3 3 1.5 1.5 3-3 2.5 2.5z"></path>
				<path d="M7 7v-6.5l-2.5 2.5-3-3-1.5 1.5 3 3-2.5 2.5z"></path>
			</svg>
		)
	}
}