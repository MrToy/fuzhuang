import React,{Component} from 'react'
import Radium from 'radium'
import {Link} from 'react-router'

import Ajax from '../lib/Ajax'
import Input from '../lib/Input'
import Button from '../lib/Button'

import Header from '../components/Header'
import TitleBar from '../components/TitleBar'
import Footer from '../components/Footer'
import MenuBar from '../components/MenuBar'

class ItemInfo extends Component{
	state={amount:1}
	render(){
		var data=this.props.data||{imgs:[]}
		return(
			<div style={{border:"1px solid #ccc",padding:20}}>
				<div style={{marginRight:20,display:'inline-block',verticalAlign:"top"}}>
					<img style={{width:400,height:400,padding:20}} src={data.imgs[0]?("/files/image"+data.imgs[0].path+"?w=360&h=360"):require('./014-image.png')} />
					<div>
						{data.imgs.slice(1,5).map((it,i)=>(
							<img style={{width:78,height:78,margin:10}} src={("/files/image"+it.path+"?w=80&h=80")||require('./014-image.png')} />
						))}
					</div>
				</div>
				<div style={{display:'inline-block',verticalAlign:"top",marginLeft:20}}>
					<p style={{fontSize:20,width:680,textAlign:"center"}}>{data.name}</p>
					<div style={{padding:"20px 50px",margin:"20px 0",background:"#eee",lineHeight:"50px",color:"#888"}}>
						<p>
							<span style={{marginRight:50}}>批发价</span>
							<span style={{color:"#C81624",fontSize:30}}>¥{data.price}</span>
						</p>
						<p>
							<span style={{marginRight:50}}>淘宝价</span>
							<span>¥{data.price}</span>
						</p>
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888"}}>货号</span>
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888"}}>尺寸</span>
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888"}}>颜色</span>
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888",marginRight:50}}>数量</span>
						<Input inline type="number" value={this.state.amount} onChange={e=>this.setState({amount:e.target.value})} />
					</div>
					<div style={{marginTop:20}}>
						<Link to={"/deal.html?id="+data._id+"&amount="+this.state.amount} style={{marginLeft:70}}>
							<Button color="red">立即购买</Button>
						</Link>
						<Button style={{marginLeft:150}} >搜藏</Button>
						<Button >加入购物车</Button>
					</div>
				</div>
			</div>
		)
	}
}
class ImageInfo extends Component{
	render(){
		var data=this.props.data||{imgs:[]}
		return (
			<div style={{marginTop:30,border:"1px solid #ccc"}}>
				<h2 style={{borderBottom:"1px solid #ccc",padding:"15px 20px",background:"#eee",fontSize:16,color:"#333"}}>商品详情</h2>
				<div style={{padding:20}}>
					<ul style={{listStyle:"none",fontSize:13,margin:"0 40px 20px 40px"}}>
						{data.info}
					</ul>
					<div style={{overflow:"hidden",textAlign:"center"}}>
						{data.imgs.map(it=>(
							<div style={{padding:50}}>
								<img style={{width:"auto",height:"auto",maxWidth:"100%"}} src={it.path} />
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}


export default class extends Component{
	state={data:null}
	render(){
		return (
			<div>
				<Header />
				<TitleBar />
				<MenuBar />
				<div style={{width:1200,margin:"20px auto"}}>
					<ItemInfo data={this.state.data} />
					<ImageInfo data={this.state.data} />
				</div>	
				<Footer />
				<Ajax auto url={"/goods/"+this.props.location.query.id} onSuccess={it=>this.setState({data:it})} />
			</div>
		)
	}
}