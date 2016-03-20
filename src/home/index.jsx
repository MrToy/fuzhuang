import React,{Component} from 'react'
import Radium from 'radium'
import {VelocityComponent,velocityHelpers} from 'velocity-react'
import {colors,BodyStyle,Head,LogoBar,Footer,MenuBar,ItemList,menuData,testItems} from './main'
import {Link} from 'react-router'


class InfoPanel extends Component{
	render(){
		return (
			<div style={{display:"inline-block",verticalAlign:"top",width:218,height:528,margin:"20px 0 0 20px",border:"1px solid "+colors.line}}>
				<div style={{height:100,lineHeight:"100px",textAlign:"center",color:"#444"}}>
				
				</div>
				<div style={{height:40,background:colors.bg,borderTop:"1px solid "+colors.line,borderBottom:"1px solid "+colors.line}}>
					<a href="#" style={{color:"#444",display:"inline-block",width:108,height:"100%",borderRight:"1px solid "+colors.line,lineHeight:"40px",textAlign:"center"}}>登录</a>
					<a href="#" style={{color:"#444",display:"inline-block",width:109,lineHeight:"40px",textAlign:"center"}}>注册</a>
				</div>
			</div>
		)
	}
}

@Radium
class Carouse extends Component{
	constructor(props){
		super(props)
		this.state={index:0}
		this.start()
	}
	componentWillUnmount(){
		this.stop()
	}
	start(){
		this.t=setInterval(()=>{
			if(Radium.getState(this.state,'box',':hover'))return
			this.next()
		},5000)
	}
	stop(){
		clearInterval(this.t)
	}
	next(){
		this.stop()
		this.setState({index:this.state.index+2>this.props.data.length?0:this.state.index+1})
		this.start()
	}
	pre(){
		this.stop()
		this.setState({index:this.state.index<1?this.props.data.length-1:this.state.index-1})
		this.start()
	}
	render(){
		return (
			<div ref="box"  style={{":hover":{},height:350,marginBottom:20,position:"relative",overflow:"hidden"}}>
				<VelocityComponent animation={{marginLeft:-760*this.state.index}} duration={1000}>
					<ul style={{width:760*(this.props.data.length+1),height:"100%",listStyle:"none"}}>
						{this.props.data.map((it,i)=>{
							return (		
								<a href="#">
									<li key={it} style={{display:"inline-block",width:760,height:"100%"}}>
										<img src={require("./logo.png")} style={{width:"100%",height:"100%"}} />
									</li>
								</a>
							)
						})}
					</ul>
				</VelocityComponent>
				<svg key="left" onClick={()=>this.pre()} style={{fill:"#fff",":hover":{fill:colors.primary},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:10,position:"absolute",top:0,bottom:0,margin:"auto",width:50,height:50}} viewBox="0 0 16 16">
					<path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5z"></path>
					<path d="M10.457 4.957l-1.414-1.414-4.457 4.457 4.457 4.457 1.414-1.414-3.043-3.043z"></path>
				</svg>
				<svg key="right" onClick={()=>this.next()} style={{fill:"#fff",":hover":{fill:colors.primary},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:10,position:"absolute",right:0,top:0,bottom:0,margin:"auto",width:50,height:50}} viewBox="0 0 16 16">
					<path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
					<path d="M5.543 11.043l1.414 1.414 4.457-4.457-4.457-4.457-1.414 1.414 3.043 3.043z"></path>
				</svg>
				<ul style={{listStyle:"none",position:"absolute",bottom:20,right:20}}>
					{this.props.data.map((it,i)=>{
						return <li key={"item"+i} onClick={()=>this.setState({index:i})} style={{cursor:"pointer",width:18,height:18,border:"1px solid #fff",margin:"0 5px",borderRadius:10,display:"inline-block",background:this.state.index==i?colors.primary:"rgba(200,200,200,0.3)",":hover":this.state.index==i?{}:{background:"rgba(200,200,200,0.6)"}}}></li>
					})}
				</ul>
			</div>
		)
	}
}
class Carouse2 extends Component{
	render(){
		return (
			<div style={{height:160,background:colors.bg}}></div>
		)
	}
}
class MainBar extends Component{
	render(){
		return (
			<div style={{width:1020,margin:"0 auto",paddingBottom:20,paddingLeft:180}}>
				<div style={{display:"inline-block",verticalAlign:"top",width:760,height:530,margin:"20px 0 0 20px"}}>
					<Carouse data={[1,2,3,4,5]} />
					<Carouse2 />
				</div>
				<InfoPanel />
			</div>
		)
	}
}


export default class extends Component{
	render(){
		return (
			<div>
				<BodyStyle />
				<Head />
				<LogoBar />
				<MenuBar active data={menuData} />
				<MainBar />
				<ItemList title="潮流单品" data={testItems} />
				<ItemList title="当季促销" data={testItems} />
				<ItemList title="每日新款" data={testItems} />
				<Footer />
			</div>
		)
	}	
}

