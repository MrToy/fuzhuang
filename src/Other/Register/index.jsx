import React,{Component} from 'react'
import Radium from 'radium'
import {Link,browserHistory} from 'react-router'
import store from 'store'
import validator from 'validator'

import Ajax from 'toy-ui/Ajax'
import FormGroup from 'toy-ui/FormGroup'
import Button from 'toy-ui/Button'
import Input from 'toy-ui/Input'

class SwitchTap extends Component{
	state={target:0}
	render(){
		var colors={primary:'#C81624'}
		return (
			<div style={{marginTop:100,margin:"0 200px"}}>
				<div onClick={()=>this.setState({target:0})} style={{display:"inline-block",width:"50%",borderBottom:"2px solid "+(!this.state.target?colors.primary:"#AAA"),textAlign:"center",color:!this.state.target?colors.primary:"#AAA",fontSize:20,lineHeight:"50px",cursor:"pointer"}}>我是买家</div>
				<div onClick={()=>this.setState({target:1})} style={{display:"inline-block",width:"50%",borderBottom:"2px solid "+(this.state.target?colors.primary:"#AAA"),textAlign:"center",color:this.state.target?colors.primary:"#AAA",fontSize:20,lineHeight:"50px",cursor:"pointer"}}>我是卖家</div>
				<div style={{paddingTop:30}}>{this.state.target?this.props.children[1]:this.props.children[0]}</div>
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

class CaptchaButton extends Component{
	state={cd:0}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	render(){
		return (
			<Button onClick={()=>{
				this.refs.captcha.request()
				this.setState({cd:60})
				this.timer=setInterval(()=>{
					if(this.state.cd>0)
						this.setState({cd:this.state.cd-1})
					else
						clearInterval(this.timer)
				},1000)
			}} disable={!validator.isMobilePhone(this.props.tel,"zh-CN")||!!this.state.cd}>
				{this.state.cd?this.state.cd+'秒':'获取验证码'}
				<Ajax ref="captcha" method="post" url="/captcha" data={JSON.stringify({tel:this.props.tel})} alert />
			</Button>
		)
	}
}

class RegForm extends Component{
	state={account:"",pass:"",repass:"",captcha:""}
	render(){
		var {account,pass,repass,captcha}=this.state
		var {target}=this.props
		return(
			<div onKeyDown={e=>{e.keyCode==13&&this.refs.post.request()}}>
				<FormGroup label="手机号" horizontal>
					<Input full
						color={account.length==0?"default":(!validator.isMobilePhone(account,"zh-CN")?"danger":"success")} 
						onChange={e=>this.setState({account:e.target.value})} />
				</FormGroup>
				<FormGroup label="密码" horizontal>
					<Input type="password" full
						color={pass.length==0?"default":(pass.length>=6&&pass.length<=30?"success":"danger")} 
						onChange={e=>this.setState({pass:e.target.value})}  />
				</FormGroup>
				<FormGroup label="确认密码" horizontal>
					<Input type="password" full
						color={repass.length==0?"default":(pass==repass?"success":"danger")}
						onChange={e=>this.setState({repass:e.target.value})}  />
				</FormGroup>
				<FormGroup label="短信验证码" horizontal>
					<Input color={captcha.length==0?"default":(captcha.length!=6?"danger":"success")} 
						onChange={e=>this.setState({captcha:e.target.value})} />
					<CaptchaButton tel={account} />
				</FormGroup>
				<FormGroup horizontal>
					<Button onClick={()=>this.refs.post.request()}>注册</Button>
				</FormGroup>
				<Ajax ref="post" method="post" url="/users" data={JSON.stringify({account,pass,repass,captcha,target})} onSuccess={data=>{
					store.set('token',data.token)
					browserHistory.push("/")
				}} alert />
			</div>	
		)
	}
}

export default class extends Component{
	render(){
		return(
			<div>
				<SwitchTap>
					<RegForm target="buyer" />
					<RegForm target="saler" />
				</SwitchTap>
			</div>
		)
	}
}