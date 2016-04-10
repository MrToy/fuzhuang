import React,{Component} from "react"

export default class extends Component{
	state={choosed:0}
	render(){
		return(
			<div {...this.props}>
				<ul style={{marginBottom:30,listStyle:"none",fontSize:20,borderBottom:"1px solid #EEE"}}>
					{React.Children.map(this.props.children,(it,i)=>{
						var lineColor=this.state.choosed==i?"#000":"rgba(0,0,0,0)"
						var fontColor=this.state.choosed==i?"#000":"#AAA"
						return <li onClick={()=>this.setState({choosed:i})} style={{cursor:"pointer",display:"inline-block",padding:"10px 20px",borderBottom:"2px solid "+lineColor,color:fontColor}}>{it.props.title}</li>
					})}
				</ul>
				{this.props.children instanceof Array?this.props.children[this.state.choosed]:this.props.children}
			</div>
		)
	}
}