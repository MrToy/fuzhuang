import React,{Component} from "react"
import AvgGrid from './AvgGrid'
import Col from './Col'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Input,{FormGroup} from './Input'
import Table from './Table'
import Image from './Image'
import Sticky from './Sticky'
import {FilesEmpty} from './icons'
import {FormImageButton,ImageLine} from './ImageFileModal'
import Carouse from './Carouse'
import Paging from './Paging'
import Ajax from './Ajax'
import store from 'store'

export default class extends Component{
	render(){
		return(
			<div>
				<div style={{border:"1px solid #000"}}>
					<Col sm={2} md={3} offset={1} style={{border:"1px solid #000"}}>233</Col>
					<Col sm={2} md={3} offset={4} style={{border:"1px solid #000"}}>2333</Col>
				</div>
				<AvgGrid title="2" sm={4}>
					<div style={{background:"yellow"}}>233</div>
					<div style={{background:"yellow"}}>233</div>
					<div style={{background:"yellow"}}>233</div>
					<div style={{background:"yellow"}}>233</div>
					<div style={{background:"yellow"}}>233</div>
				</AvgGrid>
				<Sticky>
					<Button>确定</Button>
				</Sticky>
				<ButtonGroup>
					<Button>2333</Button>
					<Button icon={FilesEmpty}>文件</Button>
					<Button active>2333</Button>
				</ButtonGroup>
				<Input size="xl" label="用户名" horizontal placeholder="输入用户名" />
				<Input type="password" horizontal  label="密码" placeholder="密码" />
				<FormImageButton />
				<FormGroup>
					<Button>确定</Button>
				</FormGroup>
				<Input type="textarea" label="简介" placeholder="简介" />
				<Input color="success" icon={FilesEmpty} />
				<div>
					<Col sm={4}><Input /></Col>
					<Col sm={4}><Input /></Col>
					<Col sm={3}><Button>登录</Button></Col>
				</div>
				<div style={{width:"20%"}}>
					<Image src={require("../home/404.jpg")} circle />
				</div>
				<Table border keys={["a","b","c"]} data={[{a:1,b:2,c:"fvwntvrewbf87ybe8wrv7"},{a:2,b:3,c:5}]} />
				<Carouse style={{height:200,width:800}} total={3} button list>
					<Image src={require("../home/404.jpg")} />
					<Image src={require("../home/404.jpg")} />
					<Image src={require("../home/404.jpg")} />
					<Image src={require("../home/404.jpg")} />
					<Image src={require("../home/404.jpg")} />
					<Image src={require("../home/404.jpg")} />
				</Carouse>
				<Paging  total={100} />
				<Ajax url={"/users/info?token="+store.get("token")} onSuccess={data=>console.log(data)} />
			</div>
		)
	}
}