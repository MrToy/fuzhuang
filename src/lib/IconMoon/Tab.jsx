import React,{Component} from "react"
export default class extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em",margin:"0px 0.2em 0.2em 0.2em",verticalAlign:"middle"}} viewBox="0 0 16 16">
				<path d="M15 0h1v8h-1v-8z"></path>
				<path d="M0 8h1v8h-1v-8z"></path>
				<path d="M5 11h11v2h-11v2.5l-3.5-3.5 3.5-3.5v2.5z"></path>
				<path d="M11 5h-11v-2h11v-2.5l3.5 3.5-3.5 3.5z"></path>
			</svg>
		)
	}
}