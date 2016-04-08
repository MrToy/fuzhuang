import React,{Component} from 'react'
import {colors,BodyStyle,Head,Footer,TitleBar} from './main'
import Radium from 'radium'
import {Link,browserHistory} from 'react-router'
import {LinkButton} from './index'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'

import Ajax from '../lib/Ajax'
import Input,{FormGroup} from '../lib/Input'
import Button from '../lib/Button'
import store from 'store'

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

class RegForm extends Component{
	state={account:"",pass:"",repass:"",captcha:""}
	render(){
		var {account,pass,repass,captcha}=this.state
		var {target}=this.props
		return(
			<div onKeyDown={e=>{e.keyCode==13&&this.refs.post.request()}}>
				<Input label="手机号" horizontal
					color={account.length==0?"default":(account.length!=11?"danger":"success")} 
					onChange={e=>this.setState({account:e.target.value})} />
				<Input label="密码" type="password" horizontal
					color={pass.length==0?"default":(pass.length>=6&&pass.length<=30?"success":"danger")} 
					onChange={e=>this.setState({pass:e.target.value})}  />
				<Input label="确认密码" type="password" horizontal
					color={repass.length==0?"default":(pass==repass?"success":"danger")}
					onChange={e=>this.setState({repass:e.target.value})}  />
				<Input label="短信验证码" horizontal
					color={captcha.length==0?"default":(captcha.length==4?"success":"danger")}
					onChange={e=>this.setState({captcha:e.target.value})}  />
				<FormGroup horizontal>
					<Button onClick={()=>this.refs.post.request()}>注册</Button>
				</FormGroup>
				<Ajax ref="post" method="post" url={"/users"} data={JSON.stringify({account,pass,repass,captcha,target})} onSuccess={data=>{
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
				<BodyStyle />
				<Head />
				<TitleBar text>注册</TitleBar>
				<div style={{position:"relative",height:600,width:1200,margin:"0 auto"}}>
					<div style={{margin:100,height:550,padding:"50px 100px",border:"1px solid "+colors.line}}>
						<SwitchTap>
							<RegForm target="buyer" />
							<RegForm target="saler" />
						</SwitchTap>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}