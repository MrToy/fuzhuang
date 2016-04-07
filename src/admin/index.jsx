import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Link} from 'react-router'
import {BodyStyle,colors,Footer,Head,TitleBar} from '../home/main'
import {Cart,Stack,User,PushPin,UserTie,Airplane} from '../lib/icons'
import Radium from 'radium'
import store from 'store'

@Radium
class NavItem extends Component{
	render(){
		return(
			<Link to={this.props.to}>
				<div onClick={this.props.onClick} style={[{padding:"10px 30px 0 30px",":hover":{background:"#333"}},this.props.active?{background:"#333"}:{}]}>
					<div style={{color:"#fff",fontSize:20,lineHeight:"50px",borderBottom:"1px solid rgba(255,255,255,0.5)"}}>
						<this.props.icon style={{fill:"#fff",width:20,height:20,marginRight:20}} />
						{this.props.children}
					</div>
				</div>
			</Link>
		)
	}
}

class LeftNav extends Component{
	constructor(props){
		super(props)
		var user=store.get('user')
		var list=[
			{text:"个人信息",link:"/user.html",icon:User},
			{text:"购物车",link:"/user.html/chart.html",icon:Cart},
			{text:"我的订单",link:"/user.html/deal.html",icon:Stack},
			{text:"售后服务",link:"/user.html/serve.html",icon:UserTie},
			{text:"消费足迹",link:"/user.html/track.html",icon:PushPin},
			{text:"物流信息",link:"/user.html/diliver.html",icon:Airplane}
		]
		this.state={choosed:0,list}
	}
	render(){
		return (
			<div style={{width:250,padding:"30px 0",position:"absolute",top:0,bottom:0,background:"#555",overflow:"auto"}}>
				{this.state.list.map((it,i)=>{
					return <NavItem active={this.state.choosed==i} onClick={()=>this.setState({choosed:i})} to={it.link} icon={it.icon}>{it.text}</NavItem>
				})}
			</div>
		)
	}
}

export default class extends Component{
	render(){
		return(
			<div>
				<BodyStyle />
				<div style={{position:"relative"}}>
					<LeftNav />
					<div style={{marginLeft:250}}>
						{this.props.children}
					</div>
				</div>
  			</div>
		)
	}
}