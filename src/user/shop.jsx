import React,{Component} from "react"
import {Box,MenuPanel} from './'
import Button from '../lib/Button'
import store from 'store'
import Ajax from '../lib/Ajax'
import Card from '../lib/Card'
import Input,{FormGroup} from '../lib/Input'
import {Home} from '../lib/icons'
import Col from '../lib/Col'
import ButtonGroup from '../lib/ButtonGroup'
import Table from '../lib/Table'
import Paging from '../lib/Paging'
import Modal from '../lib/Modal'
import {FormImageButton} from '../lib/ImageFileModal'
import Image from '../lib/Image'
import dateFormat from 'dateformat'

class Config extends Component{
	static propTypes ={
		data:React.PropTypes.object.isRequired
	}
	state=this.props.data
	render(){
		return (
			<div {...this.props}>
				<Input value={this.state.name} onChange={e=>this.setState({name:e.target.value})} horizontal label="店铺名" />
				<Input value={this.state.info} onChange={e=>this.setState({info:e.target.value})} horizontal label="店铺介绍" type="textarea" />
				<FormGroup horizontal>
					<Button collapse onClick={()=>this.refs.ajax.request()}>保存</Button>
				</FormGroup>
				<Ajax ref="ajax" url={"/shops?token="+store.get("token")} data={JSON.stringify({name:this.state.name,info:this.state.info})} method="put" alert />
			</div>
		)
	}
}

class Goods extends Component{
	state={addModal:false,name:"",info:"",price:9999,imgs:[],data:[],pages:0,index:1,put:{}}
	render(){
		return (
			<div>
				<Button style={{marginBottom:20}} onClick={()=>this.setState({addModal:true})}>添加</Button>
				<Modal isOpen={this.state.addModal} onRequestClose={()=>this.setState({addModal:false})}>
					<Input onChange={e=>this.setState({name:e.target.value})} label="商品名" />
					<Input onChange={e=>this.setState({price:e.target.value})} type="number" label="价格" />
					<Input onChange={e=>this.setState({info:e.target.value})} label="商品介绍" type="textarea" />
					<FormImageButton onCheck={imgs=>this.setState({imgs})} />
					<Col sm={4} offset={8}>
						<Button onClick={()=>this.refs.post.request()}>确定</Button>
						<Button onClick={()=>this.setState({addModal:false})}>取消</Button>
					</Col>
				</Modal>
				<Table border keys={["ID","商品名","价格","商品简介","主图","创建时间","操作"]} data={this.state.data.map(it=>({
					id:it._id,name:it.name,
					price:it.price,info:it.info.length>10?it.info.slice(0,10)+"...":it.info,img:(
						<Image style={{width:100,height:100}} src={(it.imgs[0]||{}).path}/>
					),createTime:it.createTime&&dateFormat(it.createTime,"yyyy-mm-dd , HH:MM:ss"),buttons:(
						<div>
							<Button color={it.onSale?"default":"primary"} onClick={()=>{
								this.setState({put:{onSale:!it.onSale}},()=>{
									this.refs.put.request("/goods/"+it._id+"?token="+store.get("token"))
									this.refs.get.request()				
								})
							}}>{it.onSale?"下架":"上架"}</Button>
							<Button color="danger" onClick={()=>{
								this.refs.del.request("/goods/"+it._id+"?token="+store.get("token"))
								this.refs.get.request()
							}}>删除</Button>	
						</div>
					)})
				)} />
				<Paging  style={{marginTop:20}} total={this.state.pages} onPaging={i=>this.setState({index:i},()=>this.refs.get.request())} />
				<Ajax ref="post" url={"/goods?token="+store.get("token")} method="post" data={JSON.stringify({name:this.state.name,info:this.state.info,imgs:this.state.imgs,price:this.state.price})} onSuccess={()=>this.setState({addModal:false},()=>this.refs.get.request())} alert />
				<Ajax ref="del" method="delete"  alert />
				<Ajax ref="put" method="put" data={JSON.stringify(this.state.put)} />
				<Ajax auto ref="get" url={"/goods?shop="+this.props.data._id+"&limit=5&skip="+(this.state.index-1)*5} onSuccess={it=>this.setState({data:it.data,pages:Math.ceil(it.total/5)})} />
			</div>
		)
	}
}

class Apply extends Component{
	state={active:false,name:"",info:""}
	render(){
		return this.state.active?(
			<Card title="店铺申请" size="xl" >
				<Input onChange={e=>this.setState({name:e.target.value})} label="店铺名" />
				<Input onChange={e=>this.setState({info:e.target.value})} label="简介" type="textarea" />
				<Button onClick={()=>this.refs.ajax.request()}>提交申请</Button>
				<Ajax ref="ajax" url={"/shops?token="+store.get("token")} method="post" data={JSON.stringify({name:this.state.name,info:this.state.info})} alert></Ajax>
			</Card>
		):(
			<Card title={<Home />} style={{textAlign:"center"}}>
				<div style={{margin:"80px 0"}}>申请店铺进行中</div>
				<Button collapse onClick={()=>this.setState({active:true})}>申请店铺</Button>
			</Card>
		)
	}
}

export default class extends Component{
	state={info:null}
	render(){
		return(
			<Box title="店铺管理">
				{this.state.info?(
					<MenuPanel>
						<Goods title="商品管理" data={this.state.info} />
						<Config title="店铺设置" data={this.state.info} />
					</MenuPanel>
				):(
					<Apply />
				)}
				<Ajax auto url={"/shops/info?token="+store.get("token")} onSuccess={info=>this.setState({info})} />
			</Box>
		)
	}
}