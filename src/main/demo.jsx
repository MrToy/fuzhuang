import React,{Component} from "react"
import {Link} from 'react-router'
import Button from '../lib/Button'
import ButtonGroup from '../lib/ButtonGroup'
import Input from '../lib/Input'
import Col from '../lib/Col'
import Tipbar from '../lib/Tipbar'
import AvgGrid from '../lib/AvgGrid'
import Card from '../lib/Card'
import FormGroup from '../lib/FormGroup'
import Carouse from '../lib/Carouse'
import Paging from '../lib/Paging'
import Sticky from '../lib/Sticky'
import NavBar from '../lib/NavBar'
import FileButton from '../lib/FileButton'
import {Tree,InlineTree} from '../lib/Tree'
import FileManager,{FileBar} from '../lib/FileManager'
import FileModalButton from '../components/FileModalButton'
import GoodsModalButton from '../components/GoodsModalButton'
import Editor from '../components/Editor'
import List from '../lib/List'
import Popover from '../lib/Popover'
import Icon from '../lib/Icon'
import BackToTop from '../lib/BackToTop'

export default class extends Component{
	render(){
		return(
			<div style={{padding:20}}>
				<Tipbar title="Button" color="random" />
				<div>
					<Button>测试</Button>
					<Button disable>测试</Button>
					<Button><Icon name="home" />测试</Button>
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
				<Tipbar title="Icon" color="random" />
				<div style={{color:"red"}}>
					<Icon name="home" />
				</div>
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
					<Input placeholder="测试"  addRight={<Icon name="home" />} color="random" />
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
					{key:"3",name:"test3.jpg",parent:"4",type:"image/jpeg"},
					{key:"5",name:"test5.jpg",parent:"1",type:"image/jpeg"},
					{key:"4",name:"test4",parent:null,type:"folder"}
				]} />
				<br /><br /><br />
				<Tipbar title="FileBar" color="random" />
				<FileBar data={[
					{key:"1",name:"test1",parent:null,type:"folder"},
					{key:"2",name:"test2",parent:"1",type:"folder"},
					{key:"3",name:"test3.jpg",parent:"4",type:"image/jpeg"},
					{key:"5",name:"test5.jpg",parent:"1",type:"image/jpeg"}
				]} />
				<br /><br /><br />
				<Tipbar title="FileModalButton" color="random" />
				<FileModalButton>选择图片</FileModalButton>
				<br /><br /><br />
				<Tipbar title="Popover" color="random" />
				<Popover direction="right" content={"233"}>
					<Button>测试</Button>
				</Popover>
				<Popover content={"233"}>
					<Button>测试</Button>
				</Popover>
				<Popover direction="top" content={"233"}>
					<Button>测试</Button>
				</Popover>
				<Popover direction="left" content={"233"}>
					<Button>测试</Button>
				</Popover>
				<br /><br /><br />
				<Tipbar title="GoodsModalButton" color="random" />
				<GoodsModalButton>选择商品</GoodsModalButton>
				<br /><br /><br />
				<Tipbar title="Editor" color="random" />
				<Editor style={{width:1200}} onChange={data=>console.log(data)} />
				<br /><br /><br />
				<Tipbar title="List" color="random" />
				<Card>
					<List data={["233","123","测试","23","1","a","v","ver","32s","azz","zasd","1231x","zxasd","2131s sdcd","sda dwqd","r3edwsa"]} />
				</Card>
				<Card>
					<List data={["233","123","测试","23","1","a","v","ver","32s","azz","zasd","1231x","zxasd","2131s sdcd","sda dwqd","r3edwsa"]} />
				</Card>
				<Card>
				<List data={["233","123","测试","23","1","a","v","ver","32s","azz","zasd","1231x","zxasd","2131s sdcd","sda dwqd","r3edwsa"]} />
				</Card>
				<BackToTop />
			</div>
		)
	}
}