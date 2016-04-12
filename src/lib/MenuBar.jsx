import React,{Component} from "react"
import {sizes,getColor} from './values'
export default class extends Component{
	static propTypes ={
		onChange:React.PropTypes.func,
		color:React.PropTypes.string,
		size:React.PropTypes.string
	}
	render(){
		var {data,current,onChange}=this.props
		var size=this.props.size?sizes[this.props.size]:sizes["xl"]
		var color=getColor(this.props.color||"default")
		return(
			<ul style={{marginBottom:30,listStyle:"none",fontSize:size,borderBottom:"1px solid #EEE"}}>
				{(this.props.data||[]).map(it=>{
					return <li onClick={()=>onChange(it)} style={{cursor:"pointer",display:"inline-block",padding:"10px 20px",borderBottom:"2px solid "+(it==current?"#000":"rgba(0,0,0,0)"),color:(it==current?"#000":"#AAA")}}>{it}</li>
				})}
			</ul>
		)
	}
}