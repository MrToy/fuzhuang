import React,{Component} from "react"
import UserBox from '../components/UserBox'
import Table from '../lib/Table'
import Paging from '../lib/Paging'
import Modal from '../lib/Modal'

class NewsModal extends Component{
	render(){
		return (
			<div></div>
		)
	}
}

export default class extends Component{
	state={selected:{}}
	render(){
		return(
			<UserBox title="新闻管理">
				<Table border center keys={["商品名","货号","价格","剩余数量","主图","关键词","创建时间","操作"]}
					data={this.state.data.map(it=>{
						var {_id,name,price,info,imgs,onSale,itemCode,cate,createTime,remain}=it
						return [
						]
					}
				)} />
				<Paging  style={{marginTop:20}} total={this.state.pages} onPaging={i=>this.setState({index:i},()=>this.refs.get.request())} />
			</UserBox>
		)
	}
}