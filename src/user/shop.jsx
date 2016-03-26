import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Box,MenuPanel} from './'


class Info extends Component{
	render(){
		return (
			<div {...this.props} style={{lineHeight:"50px",textAlign:"center"}}>
				<div style={{display:"inline-block",width:500,height:250,verticalAlign:"top"}}>
					<h3>店铺名</h3>
					<p>累计信用评价:0</p>
					<p>保证金金额：0</p>
				</div>
				<div style={{display:"inline-block",width:500,height:250,verticalAlign:"top"}}>
					<h4>店铺评分</h4>
					<span style={{marginRight:30}}>服务态度:0</span>
					<span style={{marginRight:30}}>物流服务:0</span>
					<span style={{marginRight:30}}>售后速度:0</span>
				</div>
			</div>
		)
	}
}

class Config extends Component{
	render(){
		return (
			<div {...this.props} style={{lineHeight:"50px"}}>
				<p>店铺名称 <input /></p>
				<p>联系地址 <input /></p>
				<p>店铺介绍 <textarea /></p>
			</div>
		)
	}
}
class Identity extends Component{
	render(){
		return (
			<div {...this.props} style={{lineHeight:"50px"}}>
				<h3>认证信息</h3>
				<p>姓名：xx</p>
				<p>电话：xxxxxxxxx</p>
				<p>地址：xxxxxxxxx</p>
				<p>证件号码：xxxxxxxxx</p>
				<p>认证有效期：xxxxxxxxx</p>
			</div>
		)
	}
}

export default class extends Component{
	render(){
		return(
			<Box title="店铺管理">
				<MenuPanel>
					<Info title="概览" />
					<Config title="设置" />
					<Identity title="认证" />
				</MenuPanel>
			</Box>
		)
	}
}