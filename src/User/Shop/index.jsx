import React,{Component} from "react"

import MenuPanel from 'toy-ui/MenuPanel'
import Button from 'toy-ui/Button'
import store from 'store'
import Ajax from 'toy-ui/Ajax'
import Card from 'toy-ui/Card'
import Input from 'toy-ui/Input'
import FormGroup from 'toy-ui/FormGroup'
import Icon from 'toy-ui/Icon'
import Col from 'toy-ui/Col'
import ButtonGroup from 'toy-ui/ButtonGroup'
import Table from 'toy-ui/Table'
import Paging from 'toy-ui/Paging'
import Modal from 'toy-ui/Modal'
import FileModalButton from 'my-components/FileModalButton'
import dateFormat from 'dateformat'
import {Link} from 'react-router'
import Menus from 'my-components/Menus'
import Editor from 'my-components/Editor'

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
//<Input full value={info} onChange={e=>this.setState({selected:{...this.state.selected,info:e.target.value}})} type="textarea" />
class Goods extends Component{
	state={addModal:false,selected:{},data:[],pages:0,index:1}
	render(){
		var {name,info,price,imgs,onSale,cate,sizes,colors,itemCode,remain}=this.state.selected
		return (
			<div>
				<Button style={{marginBottom:20}} onClick={()=>this.setState({addModal:true,selected:{}})}>添加</Button>
				<Modal isOpen={this.state.addModal} onRequestClose={()=>this.setState({addModal:false})} style={{width:1200}}>
					<div style={{maxHeight:500,overflow:"auto"}}>
						<FormGroup label="商品名" >
							<Input full value={name} onChange={e=>this.setState({selected:{...this.state.selected,name:e.target.value}})} />
						</FormGroup>
						<FormGroup label="关键词">
							<Input full value={cate} onChange={e=>this.setState({selected:{...this.state.selected,cate:e.target.value}})} />
						</FormGroup>
						<FormGroup label="价格">
							<Input full value={price} onChange={e=>this.setState({selected:{...this.state.selected,price:e.target.value}})} type="number"  />
						</FormGroup>
						<FormGroup label="剩余数量">
							<Input full value={remain} onChange={e=>this.setState({selected:{...this.state.selected,remain:e.target.value}})} type="number"  />
						</FormGroup>
						<FormGroup label="货号">
							<Input full value={itemCode} onChange={e=>this.setState({selected:{...this.state.selected,itemCode:e.target.value}})}  />
						</FormGroup>
						<FileModalButton checked={imgs||[]} onCheck={imgs=>this.setState({selected:{...this.state.selected,imgs}})} >展示缩略图</FileModalButton>
						<FormGroup horizontal label="尺寸列表">
							<Menus data={sizes||[]} onChange={sizes=>this.setState({selected:{...this.state.selected,sizes}})}  />
						</FormGroup>
						<FormGroup horizontal label="颜色列表">
							<Menus data={colors||[]} onChange={colors=>this.setState({selected:{...this.state.selected,colors}})}  />
						</FormGroup>
						<FormGroup label="商品介绍">
							<Editor style={{minHeight:400}} value={info} onChange={info=>this.setState({selected:{...this.state.selected,info}})} />
						</FormGroup>	
					</div>
					<Col sm={4} offset={8} style={{marginTop:20}}>
						<Button onClick={()=>{
							this.state.selected._id?this.refs.put.request():this.refs.post.request()
							this.setState({addModal:false})
						}}>保存</Button>
						<Button onClick={()=>this.setState({addModal:false})}>取消</Button>
					</Col>
				</Modal>
				<Table border center keys={["商品名","货号","价格","剩余数量","主图","关键词","创建时间","操作"]}
					data={this.state.data.map(it=>{
						var {_id,name,price,info,imgs,onSale,itemCode,cate,createTime,remain}=it
						return [
							(
								<Link to={"/item.html?id="+_id}>
									<Button color="link">{name}</Button>
								</Link>
							),
							itemCode,
							price,
							remain,
							<img style={{width:100,height:100}} src={((imgs||[])[0]||{}).path}/>,
							cate,
							it.createTime&&dateFormat(it.createTime,"yyyy-mm-dd , HH:MM:ss"),
							(
								<div>
									<Button color={onSale?"default":"primary"} onClick={()=>this.setState({selected:{...it,onSale:!onSale}},()=>this.refs.put.request())}>
										{onSale?"下架":"上架"}
									</Button>
									<Button onClick={()=>this.setState({addModal:true,selected:it})}>修改</Button>	
									<Button color="danger" onClick={()=>this.setState({selected:it},()=>this.refs.del.request())} >删除</Button>	
								</div>
							)
						]
					}
				)} />
				<Paging  style={{marginTop:20}} total={this.state.pages} onPaging={i=>this.setState({index:i},()=>this.refs.get.request())} />
				<Ajax ref="post" method="post" alert
					url={"/goods?token="+store.get("token")}
					data={JSON.stringify(this.state.selected)}
					onSuccess={()=>this.setState({addModal:false},()=>this.refs.get.request())} />
				<Ajax ref="del" method="delete"  alert
					url={"/goods/"+this.state.selected._id+"?token="+store.get("token")}
					onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="put" method="put"
					url={"/goods/"+this.state.selected._id+"?token="+store.get("token")}
					data={JSON.stringify(this.state.selected)}
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
			<Card title={<Icon name="home2" />} style={{textAlign:"center"}}>
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
			<div>
				{this.state.info?(
					<MenuPanel>
						<Goods title="商品管理" data={this.state.info} />
						<Config title="店铺设置" data={this.state.info} />
					</MenuPanel>
				):(
					<Apply />
				)}
				<Ajax auto url={"/shops/info?token="+store.get("token")} onSuccess={info=>this.setState({info})} />
			</div>
		)
	}
}