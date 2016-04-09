import React,{Component} from 'react'
import {Head,Footer,TitleBar} from './main'
import Ajax from '../lib/Ajax'
import store from 'store'
import Table from '../lib/Table'
import Button from '../lib/Button'
import TipBar from '../lib/Tipbar'

export default class extends Component{
	state={deal:{}}
	render(){
		var id=this.props.location.query.id
		return(
			<div>
				<Head />
				<TitleBar text>收银台</TitleBar>
				<div style={{height:700,width:1000,margin:"0 auto",paddingTop:50}}>
					{JSON.stringify(this.state)}
					<TipBar title="订单信息" />
				</div>
				<Footer />
				<Ajax auto url={"/deals/"+id} onSuccess={deal=>this.setState({deal})} />
			</div>
		)
	}
}