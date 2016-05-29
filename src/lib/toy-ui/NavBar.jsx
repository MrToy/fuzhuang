import React,{Component} from "react"
import {getColor,sizes} from './values'

export default class extends Component{
	state={choosed:0}
	render(){
		var color=getColor(this.props.color||"primary")
		var size=sizes[this.props.size||"xl"]
		return(
			<ul style={{
				marginBottom:"2em",
				listStyle:"none",
				fontSize:size,
				borderBottom:"1px solid #EEE"
			}}>
				{React.Children.map(this.props.children,(it,i)=>{
					var lineColor=this.state.choosed==i?color.backgroundColor:"transparent"
					var fontColor=this.state.choosed==i?color.backgroundColor:"#AAA"
					return (
						<li onClick={()=>this.setState({choosed:i})} style={{
							cursor:"pointer",
							display:"inline-block",
							padding:"10px 20px",
							borderBottom:"2px solid "+lineColor,
							color:fontColor+" !important"
						}}>{it}</li>
					)
				})}
			</ul>
		)
	}
}