import React,{Component} from 'react'
import Radium from 'radium'
import {VelocityComponent,velocityHelpers} from 'velocity-react'
import {colors,BodyStyle,Head,TitleBar,Search,Footer,MenuBar,ItemList,menuData,testItems} from './main'
import {Link} from 'react-router'
import store from 'store'

@Radium
class LinkButton extends Component{
	render(){
		return (
			<Link to={this.props.to}>
				<div style={[{display:"inline-block",padding:"8px 25px",color:"#fff",background:colors.primary},this.props.style]}>{this.props.children}</div>
			</Link>
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
								<Link to="#">
									<li key={it} style={{display:"inline-block",width:760,height:"100%"}}>
										<img src={require("./logo.png")} style={{width:"100%",height:"100%"}} />
									</li>
								</Link>
							)
						})}
					</ul>
				</VelocityComponent>
				<svg key="left" onClick={()=>this.pre()} style={{background:"rgba(0,0,0,0.1)",fill:"#fff",":hover":{fill:colors.primary},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:10,position:"absolute",top:0,bottom:0,margin:"auto",width:50,height:50}} viewBox="0 0 16 16">
					<path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5z"></path>
					<path d="M10.457 4.957l-1.414-1.414-4.457 4.457 4.457 4.457 1.414-1.414-3.043-3.043z"></path>
				</svg>
				<svg key="right" onClick={()=>this.next()} style={{background:"rgba(0,0,0,0.1)",fill:"#fff",":hover":{fill:colors.primary},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:10,position:"absolute",right:0,top:0,bottom:0,margin:"auto",width:50,height:50}} viewBox="0 0 16 16">
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

@Radium
class MultiCarouse extends Component{
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
		},2000)
	}
	stop(){
		clearInterval(this.t)
	}
	next(){
		this.stop()
		this.setState({index:this.state.index+2>this.props.data.length-4?0:this.state.index+1})
		this.start()
	}
	pre(){
		this.stop()
		this.setState({index:this.state.index<1?this.props.data.length-1:this.state.index-1})
		this.start()
	}
	render(){
		return (
			<div ref="box" style={{":hover":{},height:160,overflow:"hidden",position:"relative",width:1000}}>
				<VelocityComponent animation={{marginLeft:-200*this.state.index}} duration={1000}>
					<ul style={{width:200*(this.props.data.length+1),height:"100%",listStyle:"none"}}>
						{this.props.data.map((it,i)=>{
							return (		
								<Link to="#">
									<li key={it} style={{display:"inline-block",width:190,height:"100%",margin:"0 5px"}}>
										<img src={require("./logo.png")} style={{width:"100%",height:"100%"}} />
									</li>
								</Link>
							)
						})}
					</ul>
				</VelocityComponent>
				<svg key="left" onClick={()=>this.pre()} style={{background:"rgba(0,0,0,0.1)",fill:"#fff",":hover":{fill:colors.primary},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:5,position:"absolute",top:0,bottom:0,margin:"auto",width:50,height:50}} viewBox="0 0 16 16">
					<path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5z"></path>
					<path d="M10.457 4.957l-1.414-1.414-4.457 4.457 4.457 4.457 1.414-1.414-3.043-3.043z"></path>
				</svg>
				<svg key="right"  onClick={()=>this.next()} style={{background:"rgba(0,0,0,0.1)",fill:"#fff",":hover":{fill:colors.primary},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:5,position:"absolute",right:0,top:0,bottom:0,margin:"auto",width:50,height:50}} viewBox="0 0 16 16">
					<path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
					<path d="M5.543 11.043l1.414 1.414 4.457-4.457-4.457-4.457-1.414 1.414 3.043 3.043z"></path>
				</svg>
			</div>
		)
	}
}

class UserPanel extends Component{
	constructor(props){
		super(props)
		var tt
		var t=new Date().getHours()
		if(t>6&&t<=9){
			tt="早上"
		}else if(t>9&&t<=11){
			tt="上午"
		}else if(t>11&&t<=12){
			tt="中午"
		}else if(t>12&&t<=19){
			tt="下午"
		}else{
			tt="晚上"
		}
		var user=store.get('user')
		this.state={tt,user}
	}
	logout(){
		store.remove('user')
		location.reload()
	}
	render(){
		return (
			<div style={{textAlign:"center",verticalAlign:"top",height:150,marginBottom:20,border:"1px solid "+colors.primary}}>
				<p style={{paddingTop:15,color:colors.primary,fontSize:20}}>Hi， {this.state.user?this.state.user.account:(this.state.tt+"好")}</p>
				<p style={{padding:15,color:"#AAA",fontSize:15}}>欢迎来到第壹印象</p>
				{
					this.state.user?(
						<div onClick={()=>this.logout()} style={{cursor:"pointer",display:"inline-block",padding:"8px 25px",color:"#fff",background:"#AAA"}}>注销</div>
					):(
						<div>
							<LinkButton to="/login.html" style={{margin:8}}>登录</LinkButton>
							<LinkButton to="/register.html" style={{margin:8,background:"#AAA"}}>注册</LinkButton>
						</div>
					)
				}
			</div>
		)
	}
}

class NoticePanel extends Component{
	render(){
		return (
			<div style={{padding:"10px 30px",border:"1px solid "+colors.line,height:150}}>
				<p style={{fontSize:20,lineHeight:"35px",textAlign:"center",color:"#AAA"}}>公告</p>
				<ul style={{fontSize:12,lineHeight:"20px",color:"#555"}}>
					<Link to="#"><li>「美丽说」一键上传功能上线</li></Link>
					<Link to="#"><li>广告服务介绍「档口篇」</li></Link>
					<Link to="#"><li>新手指引「买手篇」</li></Link>
					<Link to="#"><li>新手指引「档口篇」</li></Link>
					<Link to="#"><li>联系我们</li></Link>
				</ul>
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
				<TitleBar>
					<Search />
				</TitleBar>
				<MenuBar active data={menuData} />
				<div style={{width:1020,margin:"0 auto",paddingBottom:20,paddingLeft:180}}>
					<div style={{display:"inline-block",verticalAlign:"top",width:760,height:530,margin:"20px 0 0 20px"}}>
						<Carouse data={[1,2,3,4,5]} />
						<MultiCarouse data={[1,2,3,4,5,6,7,8,9,10]} />
					</div>
					<div style={{display:"inline-block",width:220,margin:"20px 0 0 20px"}}>
						<UserPanel />
						<NoticePanel />
					</div>
				</div>
				<ItemList title="潮流单品" data={testItems} />
				<ItemList title="当季促销" data={testItems} />
				<ItemList title="每日新款" data={testItems} />
				<Footer />
			</div>
		)
	}	
}

