import React,{Component} from 'react'
import Radium from 'radium'
import {colors,BodyStyle,Head,TitleBar,Search,Footer,MenuBar,menuData,testItems} from './main'
import {Link,browserHistory} from 'react-router'
import store from 'store'

import Carouse from '../lib/Carouse'
import Image from '../lib/Image'
import Ajax from '../lib/Ajax'
import GoodsList from './GoodsList'

@Radium
class LinkButton extends Component{
	render(){
		return (
			<Link to={this.props.to}>
				<div style={[{display:"inline-block",padding:"8px 22px",color:"#fff",background:colors.primary},this.props.style]}>{this.props.children}</div>
			</Link>
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
			<div style={{padding:"15px 0",textAlign:"center",verticalAlign:"top",marginBottom:20,border:"1px solid "+colors.primary}}>
				<p style={{color:colors.primary,fontSize:20}}>Hi， {this.state.user?(this.state.user.nickname||this.state.user.account):(this.state.tt+"好")}</p>
				<p style={{color:"#AAA",fontSize:15,margin:20}}>欢迎来到第壹印象</p>
				{
					this.state.user?(
						<div>
							<LinkButton to="/user.html" style={{marginRight:8}}>用户中心</LinkButton>
							<div onClick={()=>this.logout()} style={{cursor:"pointer",display:"inline-block",padding:"8px 22px",color:"#fff",background:"#AAA"}}>注销</div>
						</div>
					):(
						<div>
							<LinkButton to="/login.html" style={{margin:8}}>登录</LinkButton>
							<LinkButton to="/register.html" style={{margin:8,background:"#AAA"}}>注册</LinkButton>
						</div>
					)
				}
				<Ajax auto url={"/users/info?token="+store.get("token")} onSuccess={user=>this.setState({user:user})} />
			</div>
		)
	}
}

class NoticePanel extends Component{
	render(){
		return (
			<div style={{border:"1px solid "+colors.line,height:180}}>
				<p style={{fontSize:20,lineHeight:"35px",textAlign:"center",color:"#AAA"}}>公告</p>
				<ul style={{fontSize:12,margin:20,lineHeight:"20px",color:"#555"}}>
					<Link to="#"><li>「美丽说」一键上传功能上线</li></Link>
					<Link to="#"><li>广告服务介绍「档口篇」</li></Link>
					<Link to="#"><li>新手指引「买手篇」</li></Link>
					<Link to="#"><li>新手指引「档口篇」</li></Link>
					<Link to="#"><li>联系我们</li></Link>
				</ul>
			</div>
		)
	}
}

class TipBar extends Component{
	render(){
		return (
			<div style={{borderBottom:"2px solid "+colors.primary,marginBottom:20}}>
				<strong style={{display:"inline-block",padding:"0 20px",height:23,background:colors.primary,lineHeight:"23px",fontSize:14,color:"#fff",textAlign:"center"}}>{this.props.title||"#"}</strong>
			</div>
		)
	}
}
@Radium
export class ItemList extends Component{
	render(){
		return(
			<div style={[{width:1200,margin:"0 auto"},this.props.style]}>
				{this.props.title?<TipBar title={this.props.title} />:null}
				<div style={{width:1220}}>{this.props.children}</div>
				<div style={{clear:"both"}}></div>
			</div>
		)
	}
}


export default class extends Component{
	state={imgs1:[],imgs2:[]}
	render(){
		return (
			<div>
				<Head />
				<TitleBar>
					<Search />
				</TitleBar>
				<MenuBar active data={menuData} />
				<div style={{width:1200,margin:"0 auto 20px auto",paddingLeft:180}}>
					<div style={{display:"inline-block",verticalAlign:"top",width:780,height:370,padding:"20px 0 0 20px"}}>
						<Carouse style={{height:350,width:760}} button list>
							{(this.state.imgs1||[]).map(it=>{
								return <Image src={it.path} />
							})}
						</Carouse>
					</div>
					<div style={{display:"inline-block",width:240,padding:"20px 0 0 20px"}}>
							<UserPanel />
							<NoticePanel />
					</div>
					<div style={{width:240,padding:"20px 0 0 20px"}}>
						<Carouse style={{height:160,width:1000}} button total={5} speed={2000}>
							{(this.state.imgs2||[]).map(it=>{
								return <Image src={it.path} />
							})}
						</Carouse>
					</div>
					<Ajax ref="config" auto url={"/configs/index"} onSuccess={it=>this.setState({imgs1:it.imgs1,imgs2:it.imgs2})} />
				</div>
				<ItemList title="潮流单品">
					<GoodsList url="/goods?limit=5" />
				</ItemList>
				<ItemList title="当季促销">
					<GoodsList url="/goods?limit=5&sort=price,+" />
				</ItemList>
				<ItemList title="每日新款">
					<GoodsList url="/goods?limit=5&sort=createTime,-" />
				</ItemList>
				<Footer />
			</div>
		)
	}	
}

