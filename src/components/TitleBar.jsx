import React,{Component} from "react"
import {Link} from 'react-router'

export default class extends Component{
	render(){
		return (
			<div style={{borderBottom:"2px solid #C81624",marginBottom:20}}>
				<div style={{width:1200,margin:"0 auto",padding:10}}>
					<Link to="/">
						<img style={{verticalAlign:"middle",width:100,height:100,margin:"0 30px"}} src={require("./logo.png")} />
					</Link>
					<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:20,color:"#888",fontSize:35}}>{this.props.title}</div>
				</div>
			</div>
		)
	}
}