import React,{Component} from 'react'
import InfoBox from '../components/InfoBox'
import Ajax from '../lib/Ajax'
import store from 'store'
import Table from '../lib/Table'
import Button from '../lib/Button'
import TipBar from '../lib/Tipbar'
import MenuPanel from '../lib/MenuPanel'
import {Link} from 'react-router'
import Modal from '../lib/Modal'


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
	state={deal:{},pay:{},modal:false}
	render(){
		var id=this.props.location.query.id
		var {goods={},addr={}}=this.state.deal
		return(
			<InfoBox title="收银台">
				<div style={{height:700,width:1000,margin:"0 auto",paddingTop:50}}>
					<TipBar title="订单信息" />
					<div style={{lineHeight:1.5,marginBottom:50}}>
						<h4>{goods.name}</h4>
						<p>购买数量: {this.state.deal.amount}</p>
						<p>联系方式: {addr.tel}</p>
						<p>订单金额: <span style={{color:"#C81624",fontSize:30}}>￥{this.state.deal.amount*goods.price}</span></p>
					</div>
					<TipBar title="支付方式" />
					<MenuPanel style={{marginBottom:50,minHeight:160}}>
						<div title="支付平台">
							<PayWay onClick={()=>this.setState({pay:{name:"支付宝",url:"https://excashier.alipay.com/standard/auth.htm?payOrderId="}})} active={this.state.pay.name=="支付宝"} src={require("./alipay.png")} />
							<PayWay onClick={()=>this.setState({pay:{name:"微信",url:"https://pay.weixin.qq.com/index.php/home/login?return_url=%2F"}})} active={this.state.pay.name=="微信"} src={require("./wechat.png")} />
						</div>
						<div title="银行卡支付">
							<p>暂未开通</p>
						</div>
					</MenuPanel>
					<TipBar title="确认支付" />
					<div style={{textAlign:"right",padding:20}}>
						<a href={this.state.pay.url} target="_blank">
							<Button disable={!this.state.pay.url} color="warning" onClick={()=>this.setState({modal:true})}>同意协议并付款</Button>
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
			</InfoBox>
		)
	}
}