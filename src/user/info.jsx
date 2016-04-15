import React,{Component} from "react"
import ReactDOM from "react-dom"
import {MenuPanel,Box} from './'
import {Link} from 'react-router'
import store from 'store'
import Input from '../lib/Input'
import FormGroup from '../lib/FormGroup'
import Button from '../lib/Button'
import Ajax from '../lib/Ajax'
import Modal from '../lib/Modal'
import {FormImageButton} from '../lib/ImageFileModal'
import Col from '../lib/Col'
import Table from '../lib/Table'
import Paging from '../lib/Paging'
import Demo from '../lib/demo'

class UserInfo extends Component{
	state={}
	render(){
		return(
			<div {...this.props}>
				<FormGroup horizontal label="昵称">
					<Input value={this.state.nickname} onChange={e=>this.setState({nickname:e.target.value})}/>
				</FormGroup>
				<FormGroup horizontal label="账号">
					<Input value={this.state.account} disable />
				</FormGroup>
				<FormGroup horizontal label="密码">
					<Button collapse onClick={()=>alert("暂不支持的功能")}>重置密码</Button>
				</FormGroup>
				<FormGroup horizontal>
					<Button onClick={()=>this.refs.ajax.request()}>保存</Button>
				</FormGroup>
				{this.state.target=="admin"&&<Demo />}
				<Ajax ref="ajax" url={"/users?token="+store.get("token")} data={JSON.stringify({nickname:this.state.nickname})}
					method="put" alert />
				<Ajax auto url={"/users/info?token="+store.get("token")} onSuccess={user=>this.setState(user)} />
			</div>
		)
	}
}

class AccountInfo extends Component{
	render(){
		return(
			<div {...this.props}>
				<FormGroup horizontal label="账户余额">
					<Input disable value="￥0" />
				</FormGroup>
			</div>
		)
	}
}

class AddressTable extends Component{
	state={addModal:false,data:[],_id:""}
	render(){
		var {_id,name,addr,fullAddr,postcode,tel}=this.state
		return (
			<div>
				<Button style={{marginBottom:20}} onClick={()=>this.setState({addModal:true,_id:""})}>添加</Button>
				<Modal isOpen={this.state.addModal} onRequestClose={()=>this.setState({addModal:false})}>
					<FormGroup label="收货人">
						<Input full value={name} onChange={e=>this.setState({name:e.target.value})} />
					</FormGroup>
					<FormGroup label="所在地区" >
						<Input full value={addr} onChange={e=>this.setState({addr:e.target.value})} />
					</FormGroup>
					<FormGroup label="详细地址">
						<Input full value={fullAddr} onChange={e=>this.setState({fullAddr:e.target.value})} type="textarea" />
					</FormGroup>
					<FormGroup label="邮编">
						<Input full value={postcode} onChange={e=>this.setState({postcode:e.target.value})} type="number" />
					</FormGroup>
					<FormGroup label="手机号" >
						<Input full value={tel} onChange={e=>this.setState({tel:e.target.value})} type="number" />
					</FormGroup>
					<Col sm={4} offset={8}>
						<Button onClick={()=>{
							_id==""?this.refs.post.request():this.refs.put.request()
							this.setState({addModal:false})
						}}>确定</Button>
						<Button onClick={()=>this.setState({addModal:false})}>取消</Button>
					</Col>
				</Modal>
				<Table border keys={["收货人","所在地区","详细地址","邮编","手机号","操作"]} data={this.state.data.map(it=>{
					var {_id,name,addr,fullAddr,postcode,tel,def}=it
					return [name,addr,fullAddr,postcode,tel,
						(
							<div>
								<Button color={def?"default":"primary"} onClick={()=>this.setState({_id},()=>this.refs.def.request())}>{def?"取消默认地址":"设为默认地址"}</Button>
								<Button onClick={()=>this.setState({addModal:true,_id,name,addr,fullAddr,postcode,tel})}>修改</Button>
								<Button color="danger" onClick={()=>this.setState({_id},()=>this.refs.del.request())}>删除</Button>	
							</div>
						)
					]
				})} />
				<Ajax ref="post" method="post"  alert
					url={"/addrs?token="+store.get("token")} 
					data={JSON.stringify({name,addr,fullAddr,postcode,tel})} 
					onSuccess={()=>this.setState({addModal:false},()=>this.refs.get.request())} />
				<Ajax ref="del" method="delete" alert
					url={"/addrs/"+_id+"?token="+store.get("token")}
					onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="put" method="put" alert
					url={"/addrs/"+_id+"?token="+store.get("token")}
					data={JSON.stringify({name,addr,fullAddr,postcode,tel})}
					onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="get" auto
					url={"/addrs?token="+store.get("token")}
					onSuccess={it=>this.setState({data:it})} />
				<Ajax ref="def" method="put"
					url={"/addrs/def/"+_id+"?token="+store.get("token")}
					onSuccess={()=>this.refs.get.request()} />
			</div>
		)
	}
}
export default class extends Component{
	render(){
		return(
			<Box title="用户中心">
				<MenuPanel>
					<UserInfo title="个人资料" />
					<AccountInfo title="账户信息" />
					<div title="收货地址">
						<AddressTable />
					</div>
				</MenuPanel>
			</Box>
		)
	}
}