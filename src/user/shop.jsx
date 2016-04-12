import React,{Component} from "react"
import {Box,MenuPanel} from './'
import Button from '../lib/Button'
import store from 'store'
import Ajax from '../lib/Ajax'
import Card from '../lib/Card'
import Input from '../lib/Input'
import FormGroup from '../lib/FormGroup'
import {Home} from '../lib/icons'
import Col from '../lib/Col'
import ButtonGroup from '../lib/ButtonGroup'
import Table from '../lib/Table'
import Paging from '../lib/Paging'
import Modal from '../lib/Modal'
import {FormImageButton} from '../lib/ImageFileModal'
import Image from '../lib/Image'
import dateFormat from 'dateformat'
import {Link} from 'react-router'

class Config extends Component{
	static propTypes ={
		data:React.PropTypes.object.isRequired
	}
	state=this.props.data
	render(){
		return (
			<div {...this.props}>
				<FormGroup horizontal label="店铺名" >
					<Input value={this.state.name} onChange={e=>this.setState({name:e.target.value})}/>
				</FormGroup>
				<FormGroup horizontal label="店铺介绍" >
					<Input value={this.state.info} onChange={e=>this.setState({info:e.target.value})} horizontal  type="textarea" />
				</FormGroup>
				<FormGroup horizontal>
					<Button collapse onClick={()=>this.refs.ajax.request()}>保存</Button>
				</FormGroup>
				<Ajax ref="ajax" url={"/shops?token="+store.get("token")} data={JSON.stringify({name:this.state.name,info:this.state.info})} method="put" alert />
			</div>
		)
	}
}

class Goods extends Component{
	state={addModal:false,_id:null,name:null,info:null,price:null,imgs:[],data:[],pages:0,index:1,onSale:false,put:true}
	render(){
		var {_id,name,info,price,imgs,onSale}=this.state
		return (
			<div>
				<Button style={{marginBottom:20}} onClick={()=>this.setState({addModal:true,_id:null})}>添加</Button>
				<Modal isOpen={this.state.addModal} onRequestClose={()=>this.setState({addModal:false})}>
					<FormGroup label="商品名" >
						<Input full value={name} onChange={e=>this.setState({name:e.target.value})} />
					</FormGroup>
					<FormGroup label="价格">
						<Input full value={price} onChange={e=>this.setState({price:e.target.value})} type="number"  />
					</FormGroup>
					<FormGroup label="商品介绍">
						<Input full value={info} onChange={e=>this.setState({info:e.target.value})} type="textarea" />
					</FormGroup>
					<FormImageButton data={imgs} onCheck={imgs=>this.setState({imgs})} />
					<Col sm={4} offset={8}>
						<Button onClick={()=>{
							_id?this.refs.put.request():this.refs.post.request()
							this.setState({addModal:false})
						}}>确定</Button>
						<Button onClick={()=>this.setState({addModal:false})}>取消</Button>
					</Col>
				</Modal>
				<Table border keys={["商品名","价格","商品简介","主图","创建时间","操作"]} data={this.state.data.map(it=>{
					var {_id,name,price,info,imgs,onSale,createTime}=it
					return [
						(
							<Link to={"/item.html?id="+_id}>
								<Button color="link">{name}</Button>
							</Link>
						),
						price,
						(info||"").length>10?info.slice(0,10)+"...":info,
						<Image style={{width:100,height:100}} src={(imgs[0]||{}).path}/>,
						it.createTime&&dateFormat(it.createTime,"yyyy-mm-dd , HH:MM:ss"),
						(
							<div>
								<Button color={onSale?"default":"primary"} onClick={()=>this.setState({_id,name,price,info,imgs,onSale:!onSale,put:false},()=>this.refs.put.request())}>
									{onSale?"下架":"上架"}
								</Button>
								<Button onClick={()=>this.setState({_id,name,info,price,imgs,onSale,addModal:true,put:true})}>修改</Button>	
								<Button color="danger" onClick={()=>this.setState({_id},()=>this.refs.del.request())} >删除</Button>	
							</div>
						)
					]
				})} />
				<Paging  style={{marginTop:20}} total={this.state.pages} onPaging={i=>this.setState({index:i},()=>this.refs.get.request())} />
				<Ajax ref="post" method="post" alert
					url={"/goods?token="+store.get("token")}
					data={JSON.stringify({name,info,price,imgs})}
					onSuccess={()=>this.setState({addModal:false},()=>this.refs.get.request())} />
				<Ajax ref="del" method="delete"  alert
					url={"/goods/"+_id+"?token="+store.get("token")}
					onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="put" method="put" alert={this.state.put}
					url={"/goods/"+_id+"?token="+store.get("token")}
					data={JSON.stringify({name,info,price,imgs,onSale})}
					onSuccess={()=>this.refs.get.request()} />
				<Ajax auto ref="get" 
					url={"/goods?sort=createTime,-&shop="+this.props.data._id+"&limit=5&skip="+(this.state.index-1)*5} 
					onSuccess={it=>this.setState({data:it.data,pages:Math.ceil(it.total/5)})} />
			</div>
		)
	}
}

class Apply extends Component{
	state={active:false,name:"",info:""}
	render(){
		return this.state.active?(
			<Card title="店铺申请" size="xl" >
				<FormGroup label="店铺名">
					<Input onChange={e=>this.setState({name:e.target.value})}  />
				</FormGroup>
				<FormGroup  label="简介">
					<Input onChange={e=>this.setState({info:e.target.value})} type="textarea" />
				</FormGroup>
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