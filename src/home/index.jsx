import React,{Component} from 'react'
import {Link} from 'react-router'
import store from 'store'

import Carouse from '../lib/Carouse'
import Image from '../lib/Image'
import Ajax from '../lib/Ajax'
import Tipbar from '../lib/Tipbar'
import Card from '../lib/Card'
import Button from '../lib/Button'

import GoodsList from './lib/GoodsList'
import Header from './lib/Header'
import TitleBar from './lib/TitleBar'
import Footer from './lib/Footer'
import MenuBar from './lib/MenuBar'
import Flag from '../lib/IconMoon/Flag'

class NoticePanel extends Component{
	render(){
		return (
			<Card full>
				<p style={{fontSize:20,textAlign:"center"}}>公告</p>
				<ul style={{fontSize:12,margin:"1em 0 0 1em",lineHeight:"20px",color:"#555"}}>
					<Link to="#"><li>「美丽说」一键上传功能上线</li></Link>
					<Link to="#"><li>广告服务介绍「档口篇」</li></Link>
					<Link to="#"><li>新手指引「买手篇」</li></Link>
					<Link to="#"><li>新手指引「档口篇」</li></Link>
					<Link to="#"><li>联系我们</li></Link>
				</ul>
			</Card>
		)
	}
}

class UserPanel extends Component{
	constructor(props){
		super(props)
		var tt
		var t=new Date().getHours()
		if(t>6&&t<=9){
			tt="早上"
		}else if(t>9&&t<=11){
			tt="上午"
		}else if(t>11&&t<=12){
			tt="中午"
		}else if(t>12&&t<=19){
			tt="下午"
		}else{
			tt="晚上"
		}
		this.state={tt,user:null}
	}
	logout(){
		store.remove('token')
		location.reload()
	}
	render(){
		return (
			<Card full color="red" style={{textAlign:"center",marginBottom:"1em"}}>
				<p style={{fontSize:20}}>Hi， {this.state.user?(this.state.user.nickname||this.state.user.account):(this.state.tt+"好")}</p>
				<p style={{color:"#AAA",fontSize:15,margin:"16px 0 30px 0"}}>欢迎来到第壹印象</p>
				{
					this.state.user?(
						<div>
							<Link to="/user.html">
								<Button  color="red">用户中心</Button>
							</Link>
							<Button style={{marginRight:0}} color="default" onClick={()=>this.logout()}>注销</Button>
						</div>
					):(
						<div>
							<Link to="/login.html">
								<Button color="red">登录</Button>
							</Link>
							<Link to="/register.html">
								<Button color="red" style={{marginRight:0}}>注册</Button>
							</Link>
						</div>
					)
				}
				<Ajax auto={store.get("token")!=null} url={"/users/info?token="+store.get("token")} onSuccess={user=>this.setState({user:user})} />
			</Card>
		)
	}
}


class ItemList extends Component{
	render(){
		return(
			<div style={{width:1200,margin:"0 auto"}}>
				<div style={{borderBottom:"2px solid #C81624",marginBottom:20}}>			
					<strong style={{display:"inline-block",padding:"0 10px",height:23,color:"#C81624",lineHeight:"1.5em",textAlign:"center"}}>
						<Flag />
						<span style={{marginLeft:10}}>{this.props.title||"#"}</span>
					</strong>
					<Link to="/search.html" style={{float:"right",marginRight:10}}>more</Link>
				</div>
				<div style={{width:1200}}>{this.props.children}</div>
				<div style={{clear:"both"}}></div>
			</div>
		)
	}
}

class InfoBar extends Component {
	state={data:[],data2:[]}
	render(){
		return (
			<div style={{width:1200,margin:"0 auto 20px auto",paddingLeft:180}}>
				<div style={{display:"inline-block",verticalAlign:"top",width:780,height:370,padding:"20px 0 0 20px"}}>
					<Carouse style={{height:350,width:760}} button list>
						{this.state.data.map(it=>{
							return <Image full src={it.path} />
						})}
					</Carouse>
				</div>
				<div style={{display:"inline-block",width:240,padding:"20px 0 0 20px"}}>
						<UserPanel />
						<NoticePanel />
				</div>
				<div style={{width:240,padding:"20px 0 0 20px"}}>
					<Carouse style={{height:200,width:1000}} button total={5}>
						{this.state.data2.map(it=>{
							return (
								<Link to={{pathname:"/item.html",query:{id:it._id}}}>
									<Image full src={"/files/image"+it.imgs[0].path+"?w=190&h=190"} style={{padding:10}} />
								</Link>
							)
						})}
					</Carouse>
				</div>
				<Ajax auto url={"/configs/主页主轮播图片"} onSuccess={it=>this.setState({data:it.data})} />
				<Ajax auto url={"/configs/主页次轮播商品"} onSuccess={it=>this.setState({data2:it.data})} />
			</div>
		)
	}
}

export default class extends Component{
	render(){
		return (
			<div>
				<Header />
				<TitleBar />
				<MenuBar active />
				<InfoBar />
				<ItemList title="每日新款">
					<GoodsList url="/configs/每日新款" />
				</ItemList>
				<ItemList title="潮流单品">
					<GoodsList url="/configs/潮流单品" />
				</ItemList>
				<ItemList title="当季促销">
					<GoodsList url="/configs/当季促销" />
				</ItemList>
				<Footer />
			</div>
		)
	}	
}

