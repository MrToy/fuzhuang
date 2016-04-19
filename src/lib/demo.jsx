import React,{Component} from "react"
import {Link} from 'react-router'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Input from './Input'
import Home from './IconMoon/Home'
import Col from './Col'
import Tipbar from './Tipbar'
import AvgGrid from './AvgGrid'
import Card from './Card'
import FormGroup from './FormGroup'
import Carouse from './Carouse'
import Image from './Image'
import Paging from './Paging'
import Sticky from './Sticky'
import NavBar from './NavBar'
import FileButton from './FileButton'
import {Tree,InlineTree} from './Tree'
import FileManager,{FileBar} from './FileManager'
import FileModalButton from './FileModalButton'
import GoodsModalButton from './GoodsModalButton'

export default class extends Component{
	render(){
		return(
			<div style={{padding:20}}>
				<Tipbar title="Button" color="random" />
				<div>
					<Button>测试</Button>
					<Button disable>测试</Button>
					<Button><Home />测试</Button>
					<Button size="xl">测试</Button>
					<Button color="success">测试</Button>
					<Button color="warning">测试</Button>
					<Button color="danger">测试</Button>
				</div>
				<br />
				<Button full>测试</Button>
				<br /><br /><br />
				<Tipbar title="FileButton" color="random" />
					<FileButton multiple>测试</FileButton>
				<br /><br /><br />
				<Tipbar title="ButtonGroup" color="random" />
				<ButtonGroup>
					<Button>测试</Button>
					<Button>测试</Button>
					<Button>测试</Button>
				</ButtonGroup>
				<br /><br /><br />
				<Tipbar title="Input" color="random" />
				<div>
					<Input placeholder="测试" />
					<Input placeholder="测试" disable />
					<Input placeholder="测试" size="xl" />
					<Input placeholder="测试"  type="textarea" />
				</div>
				<br />
				<div>
					<Input placeholder="测试"  addRight={<Home />} color="random" />
					<Input placeholder="测试"  addLeft={233} />
				</div>
				<br />
				<div>
					<Input placeholder="测试"  color="success" />
					<Input placeholder="测试"  color="warning" />
					<Input placeholder="测试"  color="danger" />
				</div>
				<br />
				<Input full placeholder="测试"  />
				<br /><br /><br />
				<Tipbar title="Colume" color="random" />
				<div>
					<Col sm={2}>测试2</Col>
					<Col sm={10}>测试7</Col>
					<Col center sm={3}>测试3 center</Col>
					<Col collapse sm={3}>测试collapse</Col>
				</div>
				<br /><br /><br />
				<Sticky>
					<Tipbar title="Sticky" color="random" />
				</Sticky>
				<br /><br /><br />
				<Tipbar title="AvgGrid" color="random" />
				<AvgGrid sm={3}>
					<div>测试3</div>
					<div>测试3</div>
					<div>测试3</div>
					<div>测试3</div>
					<div>测试3</div>
					<div>测试3</div>
				</AvgGrid>
				<AvgGrid sm={4} collapse>
					<div>测试 4 collapse</div>
					<div>测试 4 collapse</div>
					<div>测试 4 collapse</div>
					<div>测试 4 collapse</div>
					<div>测试 4 collapse</div>
					<div>测试 4 collapse</div>
				</AvgGrid>
				<br /><br /><br />
				<Tipbar title="Card" color="random" />
				<Card title="测试">测试</Card>
				<Card title="测试" color="random">测试</Card>
				<Card full>测试full</Card>
				<br /><br /><br />
				<Tipbar title="FormGroup" color="random" />
				<FormGroup label="测试">
					<Button>测试</Button>
				</FormGroup>
				<FormGroup label="测试">
					<Input placeholder="测试" />
				</FormGroup>
				<FormGroup label="测试" horizontal>
					<Input placeholder="测试" full />
				</FormGroup>
				<FormGroup label="测试" horizontal>
					<Input placeholder="测试" full type="textarea" />
				</FormGroup>
				<FormGroup horizontal>
					<Button>测试</Button>
				</FormGroup>
				<br /><br /><br />
				<Tipbar title="Carouse" color="random" />
				<Carouse button list>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
				</Carouse>
				<Carouse button list total={3} style={{height:150}}>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
					<div style={{border:"1px solid #000",height:"100%"}}>测试</div>
				</Carouse>
				<br /><br /><br />
				<Tipbar title="Image" color="random" />
				<Image src="" />
				<Image circle src="" />
				<div style={{width:100,height:100}}>
					<Image full src="" />
				</div>
				<br /><br /><br />
				<Tipbar title="Paging" color="random" />
				<Paging total={100} />
				<br /><br /><br />
				<Tipbar title="NavBar" color="random" />
				<NavBar>
					<Link to="#" style={{color:"inherit"}}>测试</Link>
					<Link to="#" style={{color:"inherit"}}>测试</Link>
					<Link to="#" style={{color:"inherit"}}>测试</Link>
				</NavBar>
				<br /><br /><br />
				<Tipbar title="Tree" color="random" />
				<Col sm={5}>
					<Tree data={[
						{key:null,name:"root",type:"folder",parent:"root"},
						{key:"1",name:"test1",parent:null,type:"folder"},
						{key:"2",name:"test2",parent:"1",type:"image/jpeg"},
					]} />
				</Col>
				<Col sm={7}>
					<InlineTree data={[
						{key:null,name:"root",type:"folder",parent:"root"},
						{key:"1",name:"test1",parent:null,type:"folder"},
						{key:"2",name:"test2",parent:"1",type:"image/jpeg"},
					]} selected="1" />
				</Col>
				<br /><br /><br />
				<Tipbar title="FileManager" color="random" />
				<FileManager style={{height:400}} color="black" data={[
					{key:"1",name:"test1",parent:null,type:"folder"},
					{key:"2",name:"test2",parent:"1",type:"folder"},
					{key:"3",name:"test3.jpg",parent:"4",type:"image/jpeg",url:require("../home/logo.png")},
					{key:"5",name:"test5.jpg",parent:"1",type:"image/jpeg"},
					{key:"4",name:"test4",parent:null,type:"folder"}
				]} />
				<br /><br /><br />
				<Tipbar title="FileBar" color="random" />
				<FileBar data={[
					{key:"1",name:"test1",parent:null,type:"folder"},
					{key:"2",name:"test2",parent:"1",type:"folder"},
					{key:"3",name:"test3.jpg",parent:"4",type:"image/jpeg",url:require("../home/logo.png")},
					{key:"5",name:"test5.jpg",parent:"1",type:"image/jpeg"}
				]} />
				<br /><br /><br />
				<Tipbar title="FileModalButton" color="random" />
				<FileModalButton>选择图片</FileModalButton>
				<br /><br /><br />
				<Tipbar title="GoodsModalButton" color="random" />
				<GoodsModalButton>选择商品</GoodsModalButton>
			</div>
		)
	}
}