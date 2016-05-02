import React,{Component} from 'react'
import {Link} from 'react-router'
import store from 'store'
import Carouse from '../lib/Carouse'
import Ajax from '../lib/Ajax'
import Card from '../lib/Card'
import Button from '../lib/Button'
import Flag from '../lib/IconMoon/Flag'

import SearchBox from '../components/SearchBox'
import GoodsList from '../components/GoodsList'

class NoticePanel extends Component{
	render(){
		return (
			<Card full style={{height:144}}>
				<p style={{fontSize:20,textAlign:"center"}}>公告</p>
			</Card>
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
		this.state={tt,user:null}
	}
	logout(){
		store.remove('token')
		location.reload()
	}
	render(){
		return (
			<Card full color="red" style={{textAlign:"center",marginBottom:"1em"}}>
				<p style={{fontSize:20}}>Hi， {this.state.user?(this.state.user.nickname||this.state.user.account):(this.state.tt+"好")}</p>
				<p style={{color:"#AAA",fontSize:15,margin:"10px 0 20px 0"}}>欢迎来到第壹印象</p>
				{
					this.state.user?(
						<div>
							<Link to="/user/info.html">
								<Button  color="red">用户中心</Button>
							</Link>
							<Button style={{marginRight:0}} color="default" onClick={()=>this.logout()}>注销</Button>
						</div>
					):(
						<div>
							<Link to="/login.html">
								<Button color="red">登录</Button>
							</Link>
							<Link to="/register.html">
								<Button color="red" style={{marginRight:0}}>注册</Button>
							</Link>
						</div>
					)
				}
				<Ajax auto={store.get("token")!=null} url={"/users/info?token="+store.get("token")} onSuccess={user=>this.setState({user:user})} />
			</Card>
		)
	}
}


class ItemList extends Component{
	render(){
		return(
			<div>
				<div style={{borderBottom:"2px solid #C81624",marginBottom:20}}>			
					<strong style={{display:"inline-block",padding:"0 10px",height:23,color:"#C81624",lineHeight:"1.5em",textAlign:"center"}}>
						<Flag />
						<span style={{marginLeft:10}}>{this.props.title||"#"}</span>
					</strong>
					<Link to={"/search.html?word="+this.props.title} style={{float:"right",marginRight:10}}>more</Link>
				</div>
				<div style={{width:1200}}>{this.props.children}</div>
				<div style={{clear:"both"}}></div>
			</div>
		)
	}
}

class InfoBar extends Component {
	state={data:[],data2:[]}
	render(){
		return (
			<div style={{paddingLeft:220}}>
				<div style={{display:"inline-block",verticalAlign:"top"}}>
					<Carouse style={{height:300,width:740}} button list>
						{this.state.data.map(it=>{
							return <img src={it.path} style={{width:"100%",height:"100%"}} />
						})}
					</Carouse>
				</div>
				<div style={{display:"inline-block",width:220,marginLeft:20}}>
					<UserPanel />
					<NoticePanel />
				</div>
				<Carouse style={{height:170,width:1000}} button total={5}>
					{this.state.data2.map(it=>{
						return (
							<Link to={{pathname:"/item.html",query:{id:it._id}}}>
								<img src={"/files/image"+it.imgs[0].path+"?w=190&h=190"} style={{paddingRight:20,width:"100%",height:"100%"}} />
							</Link>
						)
					})}
				</Carouse>
				<Ajax auto url={"/configs/主页主轮播图片"} onSuccess={data=>this.setState({data})} />
				<Ajax auto url={"/configs/主页次轮播商品"} onSuccess={data2=>this.setState({data2})} />
			</div>
		)
	}
}

export default class extends Component{
	state={data1:[],data2:[],data3:[]}
	render(){
		return (
			<SearchBox active>
				<InfoBar />
				<ItemList title="每日新款">
					<GoodsList data={this.state.data1} />
				</ItemList>
				<ItemList title="潮流单品">
					<GoodsList data={this.state.data2} />
				</ItemList>
				<ItemList title="当季促销">
					<GoodsList data={this.state.data3} />
				</ItemList>
				<Ajax auto url={"/goods?limit=5&sort=createTime,-&onSale=true&word=每日新款"} onSuccess={data=>this.setState({data1:data.data})} />
				<Ajax auto url={"/goods?limit=5&sort=createTime,-&onSale=true&word=潮流单品"} onSuccess={data=>this.setState({data2:data.data})} />
				<Ajax auto url={"/goods?limit=5&sort=createTime,-&onSale=true&word=当季促销"} onSuccess={data=>this.setState({data3:data.data})} />
			</SearchBox>
		)
	}	
}

