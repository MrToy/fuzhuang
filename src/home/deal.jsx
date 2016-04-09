import React,{Component} from 'react'
import {Head,Footer,TitleBar} from './main'

export default class extends Component{
	render(){
		return(
			<div>
				<Head />
				<TitleBar text>订单提交</TitleBar>
				<div style={{height:700,width:1000,margin:"0 auto",padding:"150px 100px"}}>
				</div>
				<Footer />
			</div>
		)
	}
}