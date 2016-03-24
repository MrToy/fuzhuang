import React,{Component} from 'react'
import {colors,BodyStyle,Head,Footer,TitleBar} from './main'
import Radium from 'radium'
import {Link} from 'react-router'
import {LinkButton} from './index'
class SwitchTap extends Component{
	constructor(props){
		super(props)
		this.state={target:0}
	}
	render(){
		return (
			<div>
				<div onClick={()=>this.setState({target:0})} style={{display:"inline-block",width:"50%",borderBottom:"2px solid "+(!this.state.target?colors.primary:"#AAA"),textAlign:"center",color:!this.state.target?colors.primary:"#AAA",fontSize:20,lineHeight:"50px",cursor:"pointer"}}>我是买家</div>
				<div onClick={()=>this.setState({target:1})} style={{display:"inline-block",width:"50%",borderBottom:"2px solid "+(this.state.target?colors.primary:"#AAA"),textAlign:"center",color:this.state.target?colors.primary:"#AAA",fontSize:20,lineHeight:"50px",cursor:"pointer"}}>我是卖家</div>
				<div style={{padding:30}}>{this.state.target?this.props.children[1]:this.props.children[0]}</div>
			</div>
		)
	}
}

@Radium
class FormInput extends Component{
	constructor(props){
		super(props)
		this.state={active:false}
	}
	getValue(){
		return this.refs.iu.value
	}
	render(){
		return (
			<div style={[{border:"1px solid "+(this.state.active?colors.primary:colors.line)},this.props.style]}>
				<label style={{padding:10,lineHeight:"40px",verticalAlign:"middle",color:this.state.active?colors.primary:"#888"}}>{this.props.title}</label>
				<input ref="iu" {...this.props} onFocus={()=>this.setState({active:true})} onBlur={()=>this.setState({active:false})} style={{lineHeight:"40px",fontSize:20,border:"none",verticalAlign:"middle",width:"70%"}}/>
			</div>
		)
	}
}

@Radium
class FormButton extends Component{
	render(){
		return (
			<div {...this.props} style={[{cursor:"pointer",textAlign:"center",lineHeight:"40px",color:"#fff",background:colors.primary},this.props.style]}>{this.props.children}</div>
		)
	}
}

class RegForm extends Component{
	async post(){
		var account=this.refs.account.getValue()
		var pass=this.refs.pass.getValue()
		var repass=this.refs.repass.getValue()
		var captcha=this.refs.captcha.getValue()
		var target=this.props.target
		console.log({account,pass,captcha,target})
		if(pass!=repass)return alert("两次输入密码不一致")
		var res=await fetch('/users',{method:'post',body:JSON.stringify({account,pass,captcha,target})})
		if(!res.ok)return alert(await res.text())
		alert("注册成功")
		if(this.props.onSuccess)this.props.onSuccess()
	}
	render(){
		return(
			<div>
				<FormInput ref="account" title="手机号"/>
				<FormInput ref="pass" type="password" title="密码" style={{marginTop:30}}/>
				<FormInput ref="repass" type="password" title="确认密码" style={{marginTop:30}}/>
				<FormInput ref="captcha" title="短信验证码" style={{marginTop:30}}/>
				<FormButton onClick={()=>this.post()} style={{marginTop:30}}>注册</FormButton>
			</div>	
		)
	}
}

export default class extends Component{
	render(){
		return(
			<div>
				<BodyStyle />
				<Head />
				<TitleBar text>注册</TitleBar>
				<div style={{position:"relative",height:600,width:1200,margin:"0 auto"}}>
					<div style={{margin:100,height:400,padding:"50px 200px",border:"1px solid "+colors.line}}>
						<SwitchTap>
							<RegForm target="buyer" onSuccess={()=>this.props.history.pushState(null,"/")} />
							<RegForm target="saler" onSuccess={()=>this.props.history.pushState(null,"/")}  />
						</SwitchTap>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}