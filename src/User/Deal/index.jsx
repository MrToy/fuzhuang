import React,{Component} from "react"
import ReactDOM from "react-dom"
import MenuBar from 'toy-ui/MenuBar'
import Table from 'toy-ui/Table'
import Ajax from 'toy-ui/Ajax'
import store from 'store'
import Button from 'toy-ui/Button'
import {Link} from 'react-router'
// <MenuBar onChange={type=>this.setState({type})} current={this.state.type} data={["所有订单","待付款订单","等待发货订单","待收货的订单","已完成的订单","取消的订单"]} />
				
export default class extends Component{
	state={type:"所有订单",data:[]}
	render(){
		return(
			<div>
				<Table center border keys={["订单号","商品名","单价","数量","实付款","交易状态","操作"]} data={this.state.data.map(it=>{
					var {_id,goods,amount,status}=it
					return [_id,
						<p>{goods.name}</p>,
						goods.price,amount,goods.price*amount,status,
						status=="待付款"&&(
							<div>
								<Link to={"/cashier.html?id="+it._id}>
									<Button>立即付款</Button>
								</Link>
								<Button color="default" onClick={()=>{
									this.refs.cancle.request()
								}}>取消订单</Button>
							</div>
						)
					]
				})} />
				<Ajax ref="get" auto
					url={"/deals?token="+store.get("token")}
					onSuccess={it=>this.setState({data:it.data})} />
				<Ajax ref="cancle" method="put"
					url={"/deals?token="+store.get("token")+"&intent=cancle"}
					onSuccess={()=>this.refs.get.request()} />
			</div>
		)
	}
}