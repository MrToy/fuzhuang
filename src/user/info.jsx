import React,{Component} from "react"
import ReactDOM from "react-dom"
import {MenuPanel,Box} from './'
import {Link} from 'react-router'
import store from 'store'
import Input,{FormGroup} from '../lib/Input'
import Button from '../lib/Button'
import Ajax from '../lib/Ajax'

class UserInfo extends Component{
	state={}
	render(){
		return(
			<div {...this.props}>
				<Input value={this.state.nickname} onChange={e=>this.setState({nickname:e.target.value})} horizontal label="昵称"/>
				<Input value={this.state.account} horizontal disable label="账号"/>
				<FormGroup horizontal label="密码">
					<Button collapse onClick={()=>alert("暂不支持的功能")}>重置密码</Button>
				</FormGroup>
				<FormGroup horizontal>
					<Button collapse onClick={()=>this.refs.ajax.request()}>保存</Button>
				</FormGroup>
				<Ajax ref="ajax" url={"/users?token="+store.get("token")} data={JSON.stringify({nickname:this.state.nickname})}
					method="put" alert />
				<Ajax auto url={"/users/info?token="+store.get("token")} onSuccess={user=>this.setState(user)} />
			</div>
		)
	}
}

class AccountInfo extends Component{
	render(){
		return(
			<div {...this.props}>
				<FormGroup horizontal label="账户余额">
					<Input disable value="￥0" />
				</FormGroup>
			</div>
		)
	}
}
export default class extends Component{
	render(){
		return(
			<Box title="用户中心">
				<MenuPanel>
					<UserInfo title="个人资料" />
					<AccountInfo title="账户信息" />
				</MenuPanel>
			</Box>
		)
	}
}