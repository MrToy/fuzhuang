import React,{Component} from "react"
import {Link} from 'react-router'
import AvgGrid from '../../lib/AvgGrid'
import Card from '../../lib/Card'
import Image from '../../lib/Image'
import Ajax from '../../lib/Ajax'

export default class extends Component{
	state={data:[]}
	render(){
		return (
			<AvgGrid sm={5}>
				{(this.props.data||this.state.data).map(it=>(
					<Link to={{pathname:"/item.html",query:{id:it._id}}}>
						<Card color="default" boxStyle={{width:"100%",height:"auto",lineHeight:2}} >
							<div style={{height:190,position:"relative"}}>
								<Image src={"/files/image"+(it.imgs[0]||{}).path+"?w=80&h=80"} style={{maxWidth:"100%",height:"auto",width:"auto",maxHeight:"100%",position:"absolute",top:0,bottom:0,left:0,right:0,margin:"auto"}}/>
							</div>
							<p style={{fontSize:"1.2em",color:"#C81624"}}>￥{it.price}</p>
							<p style={{color:"#000"}}>{it.name}</p>
						</Card>
					</Link>				
				))}
				{this.props.url&&(
					<Ajax auto ref="get" url={this.props.url} onSuccess={it=>this.setState({data:it.data})} />
				)}
			</AvgGrid>
		)
	}
}
