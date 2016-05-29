import React,{Component} from 'react'
import Radium from 'radium'
import {Link} from 'react-router'
import Ajax from 'toy-ui/Ajax'

					// {
					// 	this.state.data.map(ii=>{
					// 		return (
					// 			<div key={ii} style={{margin:"10px 0",height:35,listStyle:"none"}}>
					// 				<Link to={{pathname:"search.html",query:{word:ii}}} key={ii+".child"} style={{textAlign:"center",fontWeight:"normal",width:"100%",lineHeight:"35px",float:"left",color:"#fff",":hover":{color:"#C81624"},fontSize:16}} >{ii}</Link>
					// 			</div>
					// 		)
					// 	})
					// }
@Radium
class MenuLeft extends Component{
	state={data:[]}
	render(){
		return (
			<div ref="box" style={[{display:"inline-block",position:"relative",":hover":{}},this.props.style]}>
				<div style={{width:200,textAlign:"center",float:"left",listStyle:"none",fontWeight:"bold",lineHeight:"35px",color:"#fff",fontSize:16,background:"#A1121E"}} >所有商品分类</div>
				<div style={{overflow:"hidden",transition:"all 0.5s",position:"absolute",left:0,top:35,zIndex:4,width:200,height:(Radium.getState(this.state,'box',':hover')||this.props.active)?510:0,display:"inline-block",background:"#C81624"}}>
					{this.state.data.filter(it=>it.parent==null).map(it=>(
						<div key={it.text} style={{padding:"15px 0px 15px 10px",color:"#fff",":hover":{background:"#fff",color:"#C81624"},margin:"0 2px"}}>
							<div><Link to={{pathname:"search.html",query:{word:it.text}}} style={{fontWeight:"bold",color:"inherit"}}>{it.text}</Link></div>
							{this.state.data.filter(a=>a.parent==it.text).map(itit=>(
								<Link to={{pathname:"search.html",query:{word:itit.text}}} style={{display:"inline-block",fontSize:13,width:52,height:20,color:"inherit",margin:"5px 10px 0 0"}}>{itit.text}</Link>
							))}
						</div>
					))}
				</div>
				<Ajax auto url={"/configs/菜单"} onSuccess={data=>this.setState({data})} />
			</div>
		)
	}
}

@Radium
export default class extends Component{
	state={data:[]}
	render(){
		return (
			<div style={{background:"#C81624"}}>
				<div style={{width:1200,height:35,margin:"0 auto 20px auto"}}>
					<MenuLeft active={this.props.active} style={{float:"left",marginRight:20}} />	
					{[{text:"首页",link:"/"},...this.state.data.map(it=>({text:it,link:"search.html?word="+it}))].map((it,i)=>{
						return (
							<div key={i} style={{":hover":{background:"#A1121E"},display:"inline-block"}}>
								<Link to={it.link} style={{fontWeight:"bold",display:"block",lineHeight:"35px",color:"#fff",padding:"0 20px",fontSize:16}}>{it.text}</Link>
							</div>
						)
					})}
					<Ajax auto url={"/configs/首页横向菜单"} onSuccess={data=>this.setState({data})} />
				</div>
			</div>
		)
	}
}