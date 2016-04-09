import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Link} from 'react-router'
import {colors,Footer,Head,TitleBar} from '../home/main'
import {Cart,Stack,User,PushPin,UserTie,Airplane,Home,Drawer,FilesEmpty} from '../lib/icons'
import Radium from 'radium'
import store from 'store'
import Ajax from '../lib/Ajax'

export class Box extends Component{
	render(){
		return (
			<div>
				<TitleBar text>{this.props.title}</TitleBar>
				<div style={{padding:"50px 100px"}}>
					<div style={{minHeight:600}}>
							{this.props.children}
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}

export class  MenuPanel extends Component{
	state={choosed:0}
	render(){
		return(
			<div>
				<ul style={{marginBottom:30,listStyle:"none",fontSize:20,borderBottom:"1px solid "+colors.line}}>
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

@Radium
class NavItem extends Component{
	render(){
		return(
			<Link to={this.props.to}>
				<div onClick={this.props.onClick} style={[{padding:"10px 30px 0 30px",":hover":{background:"#333"}},this.props.active?{background:"#333"}:{}]}>
					<div style={{color:"#fff",fontSize:20,lineHeight:"50px",padding:"0 30px",borderBottom:"1px solid rgba(255,255,255,0.5)"}}>
						<this.props.icon style={{fill:"#fff",width:20,height:20,marginRight:25}} />
						{this.props.children}
					</div>
				</div>
			</Link>
		)
	}
}

@Radium
export default class extends Component{
	state={choosed:0,list:[]}
	render(){
		var list=[
			{text:"用户中心",link:"/user.html",icon:User},
			//{text:"购物车",link:"/user.html/chart.html",icon:Cart},
			//{text:"我的订单",link:"/user.html/deal.html",icon:Stack},
			//{text:"售后服务",link:"/user.html/serve.html",icon:UserTie},
			//{text:"消费足迹",link:"/user.html/track.html",icon:PushPin},
			//{text:"物流信息",link:"/user.html/diliver.html",icon:Airplane},
			{text:"文件管理",link:"/user.html/files.html",icon:FilesEmpty}
		]
		var list2=[
			{text:"用户中心",link:"/user.html",icon:User},
			{text:"店铺管理",link:"/user.html/shop.html",icon:Home},
			//{text:"订单管理",link:"/user.html/deal.html",icon:Stack},
			//{text:"客户服务",link:"/user.html/serve.html",icon:UserTie},
			//{text:"物流管理",link:"/user.html/diliver.html",icon:Airplane},
			{text:"文件管理",link:"/user.html/files.html",icon:FilesEmpty}
		]
		var list3=[
			{text:"用户中心",link:"/user.html",icon:User},
			{text:"网站管理",link:"/user.html/web.html",icon:Home},
			//{text:"购物车",link:"/user.html/chart.html",icon:Cart},
			//{text:"我的订单",link:"/user.html/deal.html",icon:Stack},
			//{text:"售后服务",link:"/user.html/serve.html",icon:UserTie},
			//{text:"消费足迹",link:"/user.html/track.html",icon:PushPin},
			//{text:"物流信息",link:"/user.html/diliver.html",icon:Airplane},
			{text:"文件管理",link:"/user.html/files.html",icon:FilesEmpty},
			{text:"店铺管理",link:"/user.html/shop.html",icon:Home},
			//{text:"订单管理",link:"/user.html/deal.html",icon:Stack}
		]
		return (
			<div>
				<Head />
				<div style={{position:"relative"}}>
					<div ref="nav" style={{width:250,overflowX:"hidden",transition:"all 0.5s",position:"absolute",top:0,bottom:0,background:"#555",overflow:"auto"}}>
						<div style={{width:250}}>
							{this.state.list.map((it,i)=>{
								return <NavItem active={this.state.choosed==i} onClick={()=>this.setState({choosed:i})} to={it.link} icon={it.icon}>{it.text}</NavItem>
							})}
						</div>
					</div>
					<div style={{marginLeft:250,transition:"all 0.5s"}}>
						{this.props.children}
					</div>
					<Ajax auto url={"/users/info?token="+store.get("token")} onSuccess={user=>{
						if(user.target=="saler")
							this.setState({list:list2})
						if(user.target=="buyer")
							this.setState({list:list})
						if(user.target=="admin")
							this.setState({list:list3})
					}} />
				</div>
			</div>
		)
	}
}
