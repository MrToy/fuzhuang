import React,{Component} from "react"
import ReactDOM from "react-dom"
import {MenuPanel,Box} from './'
import {Link} from 'react-router'

class UserInfo extends Component{
	render(){
		return(
			<div {...this.props}>
				<div style={{margin:20}}>
					昵称：<input />
				</div>
				<div style={{margin:20}}>
					账号：<input disabled />
				</div>
				<div style={{margin:20}}>
					密码：<Link to="#">更改密码</Link>
				</div>
			</div>
		)
	}
}

class AccountInfo extends Component{
	render(){
		return(
			<div {...this.props}>
				<div style={{margin:20}}>
					账户余额：￥0
				</div>
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