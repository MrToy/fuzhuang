import React,{Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import TitleBar from './TitleBar'

import {Link} from 'react-router'
// import Cart from '../lib/IconMoon/Cart'
// import Stack from '../lib/IconMoon/Stack'
// import User from '../lib/IconMoon/User'
// import Pushpin from '../lib/IconMoon/Pushpin'
// import UserTie from '../lib/IconMoon/UserTie'
// import Airplane from '../lib/IconMoon/Airplane'
// import Home from '../lib/IconMoon/Home'
// import Drawer from '../lib/IconMoon/Drawer'
// import FilesEmpty from '../lib/IconMoon/FilesEmpty'
import Icon from '../lib/Icon'
import Radium from 'radium'
import store from 'store'
import Ajax from '../lib/Ajax'


@Radium
class NavItem extends Component{
	render(){
		return(
			<Link to={this.props.to}>
				<div onClick={this.props.onClick} style={[{padding:"10px 30px 0 30px",":hover":{background:"#333"}},this.props.active?{background:"#333"}:{}]}>
					<div style={{color:"#fff",fontSize:20,lineHeight:"50px",padding:"0 30px",borderBottom:"1px solid rgba(255,255,255,0.5)"}}>
						{this.props.icon}
						{this.props.children}
					</div>
				</div>
			</Link>
		)
	}
}

@Radium
export default class extends Component{
	state={list:[]}
	render(){
		var list=[
			{text:"用户中心",link:"/user/info.html",icon:<Icon name="account_circle" />},
			//{text:"购物车",link:"/user.html/chart.html",icon:"shopping_cart"},
			{text:"我的订单",link:"/user/deal.html",icon:<Icon name="loyalty" />},
			//{text:"售后服务",link:"/user.html/serve.html",icon:UserTie},
			//{text:"消费足迹",link:"/user.html/track.html",icon:PushPin},
			//{text:"物流信息",link:"/user.html/diliver.html",icon:Airplane},
			//{text:"文件管理",link:"/user.html/files.html",icon:FilesEmpty}
		]
		var list2=[
			{text:"用户中心",link:"/user/info.html",icon:<Icon name="account_circle" />},
			{text:"店铺管理",link:"/user/shop.html",icon:<Icon name="home2" />},
			//{text:"订单管理",link:"/user.html/deal.html",icon:Stack},
			//{text:"客户服务",link:"/user.html/serve.html",icon:UserTie},
			//{text:"物流管理",link:"/user.html/diliver.html",icon:Airplane},
			{text:"文件管理",link:"/user.html/files.html",icon:<Icon name="insert_drive_file" />}
		]
		var list3=[
			{text:"用户中心",link:"/user/info.html",icon:<Icon name="account_circle" />},
			{text:"网站管理",link:"/user/config.html",icon:<Icon name="home2" />},
			{text:"新闻管理",link:"/user/news.html",icon:<Icon name="newspaper-o" />},
			//{text:"购物车",link:"/user.html/chart.html",icon:"shopping_cart"},
			{text:"我的订单",link:"/user/deal.html",icon:<Icon name="loyalty" />},
			//{text:"售后服务",link:"/user.html/serve.html",icon:UserTie},
			//{text:"消费足迹",link:"/user.html/track.html",icon:PushPin},
			//{text:"物流信息",link:"/user.html/diliver.html",icon:Airplane},
			{text:"文件管理",link:"/user/files.html",icon:<Icon name="insert_drive_file" />},
			{text:"店铺管理",link:"/user/shop.html",icon:<Icon name="home2" />},
			//{text:"订单管理",link:"/user.html/deal.html",icon:Stack}
		]
		return (
			<div>
				<Header />
				<div style={{position:"relative"}}>
					<div ref="nav" style={{width:250,overflowX:"hidden",transition:"all 0.5s",position:"absolute",top:0,bottom:0,background:"#555",overflow:"auto"}}>
						<div style={{width:250}}>
							{this.state.list.map((it,i)=>{
								return <NavItem active={it.link==location.pathname} to={it.link} icon={it.icon}>{it.text}</NavItem>
							})}
						</div>
					</div>
					<div style={{marginLeft:250}}>
						<TitleBar title={this.props.title} />
						<div style={{padding:"0 50px",minHeight:660}}>{this.props.children}</div>
						<Footer />
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
