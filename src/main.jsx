import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import Color from 'color'
var colors={
	bg:Color().rgb(246,246,246).hexString(),
	primary:Color().rgb(200,22,36).hexString(),
	secondary:Color().rgb(200,22,36).darken(0.5).hexString()
}

class Head extends Component{
	render(){
		return (
			<div style={{background:colors.bg,borderBottom:"1px solid #CCC"}}>
				<div style={{width:1200,height:40,margin:"0 auto",lineHeight:"40px",fontSize:14}}>
					<p>
						<span style={{color:colors.primary}}>欢迎光临郑州第一印象网络服装批发平台</span>
					</p>
				</div>
			</div>
		)
	}
}

@Radium
class Search extends Component{
	render(){
		return(
			<div style={[{width:600,height:40,border:"3px solid"+colors.primary,display:"inline-block"},this.props.style]}>
				<div style={{display:"inline-block",width:100,height:"100%",verticalAlign:"middle"}}></div>
				<input style={{display:"inline",width:400,height:40,verticalAlign:"middle",border:"none"}}></input>
				<button style={{display:"inline",width:100,height:40,verticalAlign:"middle",border:"none",background:colors.primary,color:"#fff",fontHeight:"bolder",fontSize:20}}>搜索</button>
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
					<img style={{verticalAlign:"middle"}} src={require("./logo.gif")} />
					<Search style={{verticalAlign:"middle",margin:"0 120px"}} />
				</div>
			</div>
		)
	}
}

@Radium
class MenuBar extends Component{
	render(){
		return (
			<div style={{background:colors.primary}}>
				<ul style={{width:1200,height:35,margin:"0 auto"}}>
					{["所有商品分类","网站首页","批发市场","每日新款","款式搜索"].map(it=>{
						return (
							<li key={it} style={{height:35,float:"left",listStyle:"none",":hover":{background:colors.secondary}}} >
								<a style={{fontWeight:"bold",float:"left",lineHeight:"35px",color:"#fff",padding:"0px 15px",fontSize:16}} href={"/target/"+it}>{it}</a>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}
class App extends Component{
	render(){
		return (
			<div>
				<style>{"*{margin:0px;padding:0px}body{font-family:'Microsoft Yahei' !important}a{text-decoration:none}"}</style>
				<Head />
				<LogoBar />
				<MenuBar />
			</div>
		)
	}
}
ReactDOM.render(<App />,document.getElementById('app'))
