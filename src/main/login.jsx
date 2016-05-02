import React,{Component} from 'react'
import Radium from 'radium'
import {Link,browserHistory} from 'react-router'
import store from 'store'
import InfoBox from '../components/InfoBox'

import Input from '../lib/Input'
import Lock from '../lib/Linearicons/Lock'
import Smile from '../lib/Linearicons/Smile'
import Sad from '../lib/Linearicons/Sad'
import Button from '../lib/Button'
import Ajax from '../lib/Ajax'
import FormGroup from '../lib/FormGroup'

@Radium
class LoginPanel extends Component{
	state={account:"",pass:""}
	render(){
		var {account,pass}=this.state
		return (
			<div onKeyDown={event=>{if(event.keyCode==13)this.refs.post.request()}} style={[{padding:40,border:"1px solid #ccc",float:"right"},this.props.style]}>
				<FormGroup>
					<Input addLeft={account.length!=11&&account.length!=0?<Sad/>:<Smile />} size="lg" full
						color={account.length==0?"default":(account.length!=11?"danger":"success")} 
						onChange={e=>this.setState({account:e.target.value})} />
				</FormGroup>
				<FormGroup>
					<Input addLeft={<Lock />} type="password" size="lg" full
						color={pass.length==0?"default":(pass.length>=6&&pass.length<=30?"success":"danger")} 
						onChange={e=>this.setState({pass:e.target.value})}  />
				</FormGroup>
				<p style={{margin:30}}>
					<Link to="#">忘记密码？</Link>
					<Link to="/register.html" style={{float:"right"}}>注册</Link>
				</p>
				<Button full size="xl" onClick={()=>this.refs.post.request()}>登录</Button>
				<Ajax ref="post" method="post" url={"/users/auth"} data={JSON.stringify({account,pass})} onSuccess={data=>{
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
			<InfoBox title="登录">
				<div style={{height:700,width:1000,margin:"0 auto",padding:"150px 100px"}}>
					<div style={{width:350,height:350,float:"left"}}>
						<img src={require("./logo.png")} style={{width:"100%",height:"100%"}} />
					</div>
					<LoginPanel style={{width:440,height:350,float:"right"}} />
				</div>
			</InfoBox>
		)
	}
}