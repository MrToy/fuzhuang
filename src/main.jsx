import React,{Component} from 'react'
import Radium from 'radium'
import Color from 'color'
import {Link} from 'react-router'
var colors={
	bg:Color().rgb(246,246,246).hexString(),
	//primary:"green",
	primary:Color().rgb(200,22,36).hexString(),
	line:"#DDD"
}
colors.secondary=Color(colors.primary).darken(0.2).hexString()
export {colors}

class Head extends Component{
	render(){
		return (
			<div style={{background:colors.bg,borderBottom:"1px solid #CCC"}}>
				<div style={{width:1200,height:30,margin:"0 auto",lineHeight:"30px",fontSize:14}}>
					<p>
						<span style={{color:colors.primary}}>欢迎光临郑州第壹印象网络服装批发平台</span>
					</p>
				</div>
			</div>
		)
	}
}

@Radium
class Search extends Component{
	constructor(props){
		super(props)
		this.state={value:""}
	}
	render(){
		return(
			<div style={[{width:600,height:40,border:"3px solid "+colors.primary,display:"inline-block",background:"#fff"},this.props.style]}>
				<input onKeyUp={e=>this.setState({value:e.target.value})} placeholder="输入产品名称" style={{fontSize:20,display:"inline",width:470,marginLeft:30,height:40,verticalAlign:"middle",border:"none"}}></input>
				<Link to={{pathname:"/search.html",query:{word:this.state.value}}}>
					<button style={{cursor:"pointer",display:"inline",width:100,height:40,verticalAlign:"middle",border:"none",background:colors.primary,color:"#fff",fontHeight:"bolder",fontSize:20}}>
						<svg style={{fill:"#fff",width:20,height:20,margin:"0 5px",verticalAlign:"middle"}}  viewBox="0 0 16 16">
							<path d="M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path>
						</svg>
						<span>搜索</span>
					</button>
				</Link>
			</div>
		)
	}
}

class LogoBar extends Component{
	render(){
		return (
			<div style={{background:colors.bg}}>
				<div style={{width:1200,height:110,margin:"0 auto"}}>
					<span style={{height:"100%",display:"inline-block",verticalAlign:"middle"}}></span>
					<Link to="/">
						<img style={{verticalAlign:"middle",width:100,height:100,margin:"0 30px"}} src={require("./logo.png")} />
					</Link>
					<Search style={{verticalAlign:"middle",margin:"0 80px"}} />
				</div>
			</div>
		)
	}
}
class Footer extends Component{
	render(){
		return(
			<div style={{marginTop:20,background:colors.bg,height:200,borderTop:"1px solid "+colors.line}}></div>
		)
	}
}

export default class Main extends Component{
	render(){
		return (
			<div>
				<style>{"*{margin:0px;padding:0px}body{font-family:'Microsoft Yahei' !important}a{text-decoration:none}"}</style>
				<Head />
				<LogoBar />
				{this.props.children}
				<Footer />
			</div>
		)
	}
}