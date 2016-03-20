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
var menuData=[{text:"首页",link:"/"},{text:"批发市场",link:"#"},{text:"每日新款",link:"#"},{text:"款式搜索",link:"#"}]

var z={img:require("./logo.png"),text:"潮流单品",price:300,id:"233"}
var testItems=[z,z,z,z,z,z,z,z,z,z]
export {colors,menuData,testItems}

export class Head extends Component{
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
export class Search extends Component{
	constructor(props){
		super(props)
		this.state={value:""}
	}
	set(val){
		this.refs.input.value=val||""
	}
	render(){
		return(
			<div style={[{width:600,height:40,border:"3px solid "+colors.primary,display:"inline-block",background:"#fff"},this.props.style]}>
				<input ref="input" onKeyUp={e=>this.setState({value:e.target.value})} placeholder="输入产品名称" style={{fontSize:20,display:"inline",width:470,marginLeft:30,height:40,verticalAlign:"middle",border:"none"}}></input>
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

export class LogoBar extends Component{
	render(){
		return (
			<div style={{background:colors.bg}}>
				<div style={{width:1200,height:110,margin:"0 auto"}}>
					<span style={{height:"100%",display:"inline-block",verticalAlign:"middle"}}></span>
					<Link to="/">
						<img style={{verticalAlign:"middle",width:100,height:100,margin:"0 30px"}} src={require("./logo.png")} />
					</Link>
					<Search ref="search" style={{verticalAlign:"middle",margin:"0 80px"}} />
				</div>
			</div>
		)
	}
}

@Radium
export class Footer extends Component{
	render(){
		return(
			<div style={[{color:"#888",padding:30,background:colors.bg,height:80,borderTop:"1px solid "+colors.line,textAlign:"center"},this.props.style]}>
				<ul style={{listStyle:"none",marginBottom:20}}>
					<Link to="/">
						<li style={{display:"inline-block",fontSize:14,padding:10}}>首页</li>
					</Link>
					{["关于我们","联系我们","知识产权","著作权与商标声明","法律声明","服务条款","隐私声明"].map(it=>{
						return (
							<Link to="#">
								<li style={{display:"inline-block",fontSize:14,padding:10}}>{it}</li>
							</Link>
						)
					})}
					<Link to="/admin.html">
						<li style={{display:"inline-block",fontSize:14,padding:10}}>后台管理</li>
					</Link>
				</ul>
				<p>Copyright © 2016-2020 www.zzwlpf.com 渝 ICP 备 00000000 号</p>
			</div>
		)
	}
}

export class BodyStyle extends Component{
	render(){
		return <style>{'*{margin:0px;padding:0px}body{font-family:Microsoft YaHei,SimSun,Tahoma,Geneva,sans-serif !important;min-width:1200px}a,a:link,a:visited{color:#555;text-decoration:none}a:hover{color:'+colors.primary+'}'}</style>
	}
}

@Radium
class MenuLeft extends Component{
	render(){
		return (
			<div ref="box" style={[{display:"inline-block",position:"relative",":hover":{}},this.props.style]}>
				<div style={{width:180,textAlign:"center",float:"left",listStyle:"none",fontWeight:"bold",lineHeight:"35px",color:"#fff",fontSize:16,background:colors.secondary}} >所有商品分类</div>
				<ul style={{overflow:"hidden",transition:"all 0.5s",position:"absolute",left:0,top:35,zIndex:4,width:178,height:(Radium.getState(this.state,'box',':hover')||this.props.active)?549:0,display:"inline-block",background:colors.bg,borderLeft:"1px solid "+colors.line,borderRight:"1px solid "+colors.line,borderBottom:"1px solid "+colors.line}}>
					{
						["精品男装","淘款市场","国际名流","意法男装","中纺服饰","一号基地","二号基地","男衬衫","品牌折扣","外贸原单","三号基地","更多市场"].map(ii=>{
							return (
								<li key={ii} style={{margin:"10px 0",height:35,listStyle:"none"}}>
									<Link to={{pathname:"search.html",query:{word:ii}}} key={ii+".child"} style={{textAlign:"center",fontWeight:"normal",width:"100%",lineHeight:"35px",float:"left",color:"#000",":hover":{color:colors.primary},fontSize:16}} href={"/target/"+ii}>{ii}</Link>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}
@Radium
export class MenuBar extends Component{
	render(){
		return (
			<div style={{background:colors.primary}}>
				<ul style={{width:1200,height:35,margin:"0 auto"}}>
					<MenuLeft active={this.props.active} style={{marginRight:100,float:"left"}} />	
					{(this.props.data||[]).map((it,i)=>{
						return (
							<li key={i} style={{height:35,float:"left",listStyle:"none",":hover":{background:colors.secondary}}} >
								<Link to={it.link} style={{fontWeight:"bold",float:"left",lineHeight:"35px",color:"#fff",padding:"0px 15px",fontSize:16}}>{it.text}</Link>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}
class TitleBar extends Component{
	render(){
		return (
			<div style={{borderBottom:"2px solid "+colors.primary,marginBottom:20}}>
				<strong style={{display:"inline-block",padding:"0 20px",height:23,background:colors.primary,lineHeight:"23px",fontSize:14,color:"#fff",textAlign:"center"}}>{this.props.title||"#"}</strong>
			</div>
		)
	}
}

@Radium
class ItemPanel extends Component{
	render(){
		return (
			<div style={{padding:10,float:"left",width:202,margin:"0 20px 20px 0",height:280,border:"1px solid "+colors.line}}>
				<Link to={{pathname:"/item.html",query:{id:this.props.id}}} style={{height:"100%"}}>
					<p style={{marginBottom:10,height:200,position:"relative"}}>
						<img src={this.props.img} style={{maxWidth:"100%",maxHeight:"100%",position:"absolute",top:0,bottom:0,margin:"auto"}}/>
					</p>
				</Link>
				<Link to={{pathname:"/item.html",query:{id:this.props.id}}}>
					<p style={{padding:10,overflow:"hidden",textOverflow:"ellipsis"}}>{this.props.text}</p>
				</Link>
				<p style={{padding:10,overflow:"hidden",textOverflow:"ellipsis",color:colors.primary}}>
					<b>￥</b>
					<span>{this.props.price}</span>
				</p>
			</div>
		)
	}
}
@Radium
export class ItemList extends Component{
	render(){
		return(
			<div style={[{width:1200,margin:"0 auto"},this.props.style]}>
				{this.props.title?<TitleBar title={this.props.title} />:null}
				<div style={{width:1220}}>
					{(this.props.data||[]).map((it,index)=>{
						return <ItemPanel key={index} {...it} />
					})}
				</div>
				<div style={{clear:"both"}}></div>
			</div>
		)
	}
}
