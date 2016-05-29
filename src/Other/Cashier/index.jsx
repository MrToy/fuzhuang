import React,{Component} from 'react'
import Ajax from 'toy-ui/Ajax'
import store from 'store'
import Table from 'toy-ui/Table'
import Button from 'toy-ui/Button'
import TipBar from 'toy-ui/Tipbar'
import MenuPanel from 'toy-ui/MenuPanel'
import {Link} from 'react-router'
import Modal from 'toy-ui/Modal'


class PayWay extends Component{
	render(){
		var {active,src}=this.props
		var color=active?"#0E90D2":"#DDD"
		return (
			<div onClick={this.props.onClick} style={{cursor:"pointer",padding:10,border:"2px solid "+color,display:"inline-block",margin:10}}>
				<img src={src} />
			</div>
		)
	}
}

export default class extends Component{
	state={deal:{},payway:"支付宝",modal:false}
	render(){
		var id=this.props.location.query.id
		var {goods={},addr={}}=this.state.deal
		return(
			<div>
				<div style={{height:700,width:1000,margin:"0 auto",paddingTop:50}}>
					<TipBar title="订单信息" />
					<div style={{lineHeight:1.5,marginBottom:50}}>
						<h4>{goods.name}</h4>
						<p>购买数量: {this.state.deal.amount}</p>
						<p>联系方式: {addr.tel}</p>
						<p>订单金额: <span style={{color:"#C81624",fontSize:30}}>￥{this.state.deal.amount*goods.price}</span></p>
					</div>
					<TipBar title="支付方式" />
					<div style={{paddingBottom:20}}>
						<PayWay onClick={()=>this.setState({payway:"支付宝"})} active={this.state.payway=="支付宝"} src={require("./alipay.png")} />
					</div>
					<TipBar title="确认支付" />
					<div style={{textAlign:"right",padding:20}}>
						<a href={"/deals/redirect?id="+id+"&payway="+this.state.payway} target="_blank">
							<Button disable={!this.state.payway} color="warning" onClick={()=>this.setState({modal:true})}>确认付款</Button>
						</a>
					</div>
					<Modal isOpen={this.state.modal} style={{width:500}} onRequestClose={()=>this.setState({addModal:false})}>
						<TipBar title="支付结果" />
						<div style={{textAlign:"center"}}>
							<Link to="/user/deal.html">
								<Button color="success">支付成功</Button>
							</Link>
							<Button color="default" onClick={()=>this.setState({modal:false})}>支付失败，继续尝试</Button>
						</div>
					</Modal>
				</div>
				<Ajax auto url={"/deals/"+id} onSuccess={deal=>this.setState({deal})} />
			</div>
		)
	}
}