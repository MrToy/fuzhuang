import React,{Component} from "react"
import ReactDOM from "react-dom"
import UserBox from '../components/UserBox'
import MenuBar from '../lib/MenuBar'
import Table from '../lib/Table'
import Ajax from '../lib/Ajax'
import store from 'store'
import Button from '../lib/Button'
import {Link} from 'react-router'

export default class extends Component{
	state={type:"所有订单",data:[]}
	render(){
		return(
			<UserBox title="我的订单">
				<MenuBar onChange={type=>this.setState({type})} current={this.state.type} data={["所有订单","待付款订单","等待发货订单","待收货的订单","已完成的订单","取消的订单"]} />
				<Table center border keys={["订单号","商品信息","单价","数量","实付款","交易状态","操作"]} data={this.state.data.map(it=>{
					var {_id,goods,amount,status}=it
					return [_id,
						(
							<div>
								<img style={{width:50,height:50}} src={goods.imgs[0].path} />
								<p>{goods.name}</p>
							</div>
						),
						goods.price,amount,goods.price*amount,status,
						status=="待付款"&&(
							<div>
								<Link to={"/cashier.html?id="+it._id}>
									<Button>立即付款</Button>
								</Link>
								<Link to={"/cashier.html?id="+it._id}>
									<Button color="default">取消订单</Button>
								</Link>
							</div>
						)
					]
				})} />
				<Ajax ref="get" auto
					url={"/deals?token="+store.get("token")}
					onSuccess={it=>this.setState({data:it.data})} />
				<Ajax ref="cancle" method="put"
					url={"/deals?token="+store.get("token")}
					onSuccess={()=>this.refs.get.request()} />
			</UserBox>
		)
	}
}