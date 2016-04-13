import React,{Component} from 'react'
import Ajax from '../lib/Ajax'
import store from 'store'
import Table from '../lib/Table'
import Button from '../lib/Button'
import {browserHistory} from 'react-router'
import Tipbar from '../lib/Tipbar'

import Header from './lib/Header'
import TitleBar from './lib/TitleBar'
import Footer from './lib/Footer'

class Addr extends Component{
	render(){
		var {name,addr,fullAddr,tel,active,def}=this.props
		var color=active?"#0E90D2":"#DDD"
		return (
			<div onClick={this.props.onClick} style={{cursor:"pointer",width:300,height:120,border:"2px solid "+color,padding:"0 10px",lineHeight:2,display:"inline-block",margin:10}}>
				<p style={{borderBottom:"1px solid "+color}}>
					<b>{addr}</b>  ({name} 收) {def&&"默认"}
				</p>
				<p>详细地址: {fullAddr}</p>
				<p>联系方式: {tel}</p>
			</div>
		)
	}
}

export default class extends Component{
	state={addrs:[],addr:{},goods:{}}
	render(){
		var id=this.props.location.query.id
		var amount=parseInt(this.props.location.query.amount)||1
		return(
			<div>
				<Header />
				<TitleBar text="订单提交" />
				<div style={{height:700,width:1000,margin:"0 auto",paddingTop:50}}>
					<div>
						<Tipbar title="选择收货地址" />
						{this.state.addrs.map(it=><Addr active={it._id==this.state.addr._id} onClick={()=>this.setState({addr:it})} {...it} />)}
					</div>
					<div style={{marginTop:100}}>
						<Tipbar title="确定订单信息" />
						<Table border keys={["商品名","单价","数量","小计"]} data={[[this.state.goods.name,this.state.goods.price,amount,this.state.goods.price*amount]]}/>
					</div>
					<div style={{textAlign:"right",marginTop:50}}>
						<span style={{marginRight:100}}>需付款<b style={{color:"#C81624",fontSize:30}}>￥{this.state.goods.price*amount}</b></span>
						<Button onClick={()=>this.refs.post.request()}>提交订单</Button>
					</div>
				</div>
				<Ajax auto
					url={"/addrs?token="+store.get("token")}
					onSuccess={it=>{
						var addr={}
						it.forEach(itit=>{
							if(itit.def)addr=itit
						})
						this.setState({addrs:it,addr})
					}} />
				<Ajax auto url={"/goods/"+id} onSuccess={it=>this.setState({goods:it})} />
				<Ajax ref="post" method="post" errorAlert
					data={JSON.stringify({amount,goods:id,addr:this.state.addr._id})}
					url={"/deals?token="+store.get("token")}
					onSuccess={it=>{
						browserHistory.push("/cashier.html?id="+it.id)
					}} />
				<Footer />
			</div>
		)
	}
}