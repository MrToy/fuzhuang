import React,{Component} from "react"
import ReactDOM from "react-dom"
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
	render(){
		return (
			<div>
				<Col sm={2} offset={10}>
					<Button>添加</Button>
					<Button>删除</Button>
				</Col>
				<Table border keys={["a","b","c"]} data={[{a:1,b:2,c:"fvw"},{a:2,b:3,c:5},{a:2},{a:2},{a:2},{a:2},{a:2},{a:2},{a:2},{a:2},{a:2},{a:2},{a:2}]} />
				<Paging  style={{marginTop:20}} total={100} />
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
				<Ajax auto url={"/shops/info?token="+store.get("token")} onData={info=>this.setState({info})} />
			</Box>
		)
	}
}