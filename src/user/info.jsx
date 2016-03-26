import React,{Component} from "react"
import ReactDOM from "react-dom"
import {colors} from '../home/main'
import {Box} from './'
import Radium from 'radium'
import {Link} from 'react-router'

class MenuPanel extends Component{
	constructor(props){
		super(props)
		this.state={choosed:0}
	}
	render(){
		return(
			<div>
				<ul style={{marginBottom:30,listStyle:"none",fontSize:20,borderBottom:"1px solid "+colors.line}}>
					{React.Children.map(this.props.children,(it,i)=>{
						var lineColor=this.state.choosed==i?"#000":"rgba(0,0,0,0)"
						var fontColor=this.state.choosed==i?"#000":"#AAA"
						return <li onClick={()=>this.setState({choosed:i})} style={{cursor:"pointer",display:"inline-block",padding:"10px 20px",borderBottom:"2px solid "+lineColor,color:fontColor}}>{it.props.title}</li>
					})}
				</ul>
				{this.props.children instanceof Array?this.props.children[this.state.choosed]:this.props.children}
			</div>
		)
	}
}

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
				<div style={{margin:"50px 100px",padding:50,border:"1px solid "+colors.line,background:"#fff"}}>
					<MenuPanel>
						<UserInfo title="个人资料" />
						<AccountInfo title="账户信息" />
					</MenuPanel>
				</div>	
			</Box>
		)
	}
}