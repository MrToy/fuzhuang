import React,{Component} from 'react'
import {colors,BodyStyle,Head,Footer,TitleBar} from './main'
import Radium from 'radium'
import {Link} from 'react-router'
import store from 'store'
@Radium
class LoginPanel extends Component{
	async post(){
		var account=this.refs.account.value
		var pass=this.refs.pass.value
		var res=await fetch('/auth',{method:'post',body:JSON.stringify({account,pass})})
		if(!res.ok)
			return alert(await res.text())
		store.set('user',await res.json())
		alert("登录成功")
		if(this.props.onSuccess)this.props.onSuccess()
	}
	render(){
		return (
			<div style={[{padding:50,border:"1px solid "+colors.line,float:"right"},this.props.style]}>
				<div style={{border:"1px solid "+colors.line}}>
					<svg style={{fill:"#888",display:"inline",verticalAlign:"top",width:30,height:30,padding:10,background:colors.bg,borderRight:"1px solid "+colors.line}} viewBox="0 0 20 20">
						<path d="M9.5 20c-2.538 0-4.923-0.988-6.718-2.782s-2.782-4.18-2.782-6.717c0-2.538 0.988-4.923 2.782-6.718s4.18-2.783 6.718-2.783c2.538 0 4.923 0.988 6.718 2.783s2.782 4.18 2.782 6.718-0.988 4.923-2.782 6.717c-1.794 1.794-4.18 2.782-6.718 2.782zM9.5 2c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5z"></path>
						<path d="M6.5 8c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5-0.673 1.5-1.5 1.5zM6.5 6c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z"></path>
						<path d="M12.5 8c-0.827 0-1.5-0.673-1.5-1.5s0.673-1.5 1.5-1.5 1.5 0.673 1.5 1.5-0.673 1.5-1.5 1.5zM12.5 6c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5 0.5-0.224 0.5-0.5-0.224-0.5-0.5-0.5z"></path>
						<path d="M9.5 17c-3.584 0-6.5-2.916-6.5-6.5 0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5c0 3.033 2.467 5.5 5.5 5.5s5.5-2.467 5.5-5.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5c0 3.584-2.916 6.5-6.5 6.5z"></path>
					</svg>
					<input ref="account" style={{display:"inline",border:"none",height:50,fontSize:30,width:280,paddingLeft:10}} />
				</div>
				<div style={{border:"1px solid "+colors.line,marginTop:30}}>
					<svg style={{fill:"#888",display:"inline",verticalAlign:"top",width:30,height:30,padding:10,background:colors.bg,borderRight:"1px solid "+colors.line}} viewBox="0 0 20 20">
						<path d="M14.5 8h-0.5v-1.5c0-2.481-2.019-4.5-4.5-4.5s-4.5 2.019-4.5 4.5v1.5h-0.5c-0.827 0-1.5 0.673-1.5 1.5v8c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-8c0-0.827-0.673-1.5-1.5-1.5zM6 6.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v1.5h-7v-1.5zM15 17.5c0 0.276-0.224 0.5-0.5 0.5h-10c-0.276 0-0.5-0.224-0.5-0.5v-8c0-0.276 0.224-0.5 0.5-0.5h10c0.276 0 0.5 0.224 0.5 0.5v8z"></path>
					</svg>
					<input ref="pass" type="password" style={{display:"inline",border:"none",height:50,fontSize:30,width:280,paddingLeft:10}} />
				</div>
				<p style={{marginTop:30}}>
					<Link to="#">忘记密码？</Link>
					<Link to="/register.html" style={{float:"right"}}>注册</Link>
				</p>
				<div onClick={()=>this.post()} style={{cursor:"pointer",marginTop:30,background:colors.primary,color:"#fff",textAlign:"center",lineHeight:"50px",fontSize:20,fontWeight:"bold"}}>登 录</div>
			</div>
		)
	}
}

export default class extends Component{
	render(){
		console.log()
		return(
			<div>
				<BodyStyle />
				<Head />
				<TitleBar text>欢迎登录</TitleBar>
				<div style={{height:400,width:1000,margin:"0 auto",padding:"150px 100px"}}>
					<div style={{width:450,height:350,float:"left"}}>
						<img src={require("./logo.png")} style={{width:"100%",height:"100%"}} />
					</div>
					<LoginPanel onSuccess={()=>this.props.history.pushState(null,"/")} style={{width:350,height:250,float:"right"}} />
				</div>
				<Footer />
			</div>
		)
	}
}