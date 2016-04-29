import React,{Component} from "react"
import Radium from 'radium'
import {Link} from 'react-router'
import AvgGrid from '../lib/AvgGrid'
import Card from '../lib/Card'
import Ajax from '../lib/Ajax'

@Radium
class Goods extends Component{
	render(){
		var {_id,imgs,price,name}=this.props
		return (
			<Link to={{pathname:"/item.html",query:{id:_id}}}>
				<div style={{border:"1px solid #EDEDED",":hover":{boxShadow:"0px 0px 15px #DDD"}}}>
					<img src={"/files/image"+(imgs&&imgs[0]?imgs[0]:{}).path+"?w=222&h=222"} style={{width:222,height:222}}/>
					<div style={{padding:"5px 10px"}}>
						<p style={{color:"#C81624",marginBottom:4,fontSize:"1.3em"}}>￥{price}</p>
						<p style={{lineHeight:"20px",color:"#666",height:"40px",overflow:"hidden"}}>{name}</p>
					</div>
				</div>
			</Link>	
		)
	}
}


export default class extends Component{
	state={data:[]}
	render(){
		return (
			<AvgGrid sm={5}>
				{(this.props.data||this.state.data).map(it=><Goods {...it} />)}
				{this.props.url&&(
					<Ajax auto ref="get" url={this.props.url} onSuccess={data=>this.setState({data})} />
				)}
			</AvgGrid>
		)
	}
}
