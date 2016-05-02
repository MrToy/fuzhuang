import React,{Component} from 'react'
import Radium from 'radium'
import {Link} from 'react-router'
import Ajax from '../lib/Ajax'
import store from 'store'

export default class extends Component{
	state={user:null}
	render(){
		return (
			<div style={{background:"#F6F6F6",borderBottom:"1px solid #CCC"}}>
				<div style={{width:1200,margin:"0 auto",lineHeight:2,fontSize:14,color:"#666"}}>
					<span>
						欢迎光临<Link to="/" style={{color:"inherit"}}>郑州第壹印象网络服装批发平台</Link>
					</span>
					{this.state.user&&<Link to="/user/info.html" style={{color:"inherit"}}  style={{marginLeft:20}}>Hi, {this.state.user.nickname||this.state.user.account}</Link>}
					{!this.state.user&&<Link to="/login.html" style={{color:"inherit"}}  style={{marginLeft:20}}>登录</Link>}
					{!this.state.user&&<Link to="/register.html" style={{color:"inherit",marginLeft:20}}>注册</Link>}
					<span style={{float:"right"}}>
						{this.state.user&&<Link to="/user/info.html" style={{color:"inherit"}}  style={{marginLeft:20}}>用户中心</Link>}
						<Link to="/" style={{color:"inherit",marginLeft:20}}>搜藏夹</Link>
						<Link to="/" style={{color:"inherit",marginLeft:20}}>帮助中心</Link>
						<Link to="/" style={{color:"inherit",marginLeft:20}}>在线客服</Link>
					</span>
				</div>
				<Ajax auto={store.get("token")!=null} url={"/users/info?token="+store.get("token")} onSuccess={user=>this.setState({user})} />
			</div>
		)
	}
}