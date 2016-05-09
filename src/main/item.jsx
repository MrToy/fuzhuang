import React,{Component} from 'react'
import Radium from 'radium'
import {Link} from 'react-router'
import SearchBox from '../components/SearchBox'

import Ajax from '../lib/Ajax'
import Input from '../lib/Input'
import Button from '../lib/Button'
import ButtonGroup from '../lib/ButtonGroup'
import Editor from '../components/Editor'



class ImagePicker extends Component{
	state={selected:0}
	render(){
		return (
			<div style={{marginRight:20,display:'inline-block',verticalAlign:"top"}}>
				<img style={{width:350,height:350,display:"block"}} src={this.props.imgs[this.state.selected]?("/files/image"+this.props.imgs[this.state.selected].path+"?w=400&h=400"):require('./014-image.png')} />
				{this.props.imgs.slice(0,4).map((it,i)=>(
					<img onClick={()=>this.setState({selected:i})} style={{width:82,height:82,margin:"15px 5px 0 0",cursor:"pointer",border:"2px solid "+(this.state.selected==i?"#C81624":"transparent"),padding:3}} src={("/files/image"+it.path+"?w=90&h=90")||require('./014-image.png')} />
				))}
			</div>
		)
	}
}


class ItemInfo extends Component{
	state={amount:1,size:null,color:null}
	render(){
		var {_id,imgs,itemCode,sizes,colors,name,price,remain}=this.props.data
		return(
			<div style={{display:'inline-block',verticalAlign:"top",marginLeft:20,width:490}}>
				<p style={{fontSize:20,textAlign:"center"}}>{name}</p>
				<div style={{padding:"20px 50px",margin:"20px 0",background:"#eee",lineHeight:"50px",color:"#888"}}>
					<span style={{marginRight:50}}>批发价</span>
					<span style={{color:"#C81624",fontSize:30}}>¥{price}</span>
				</div>
				<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
					<span style={{color:"#888",marginRight:30}}>货号</span>
					{itemCode}
				</div>
				<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
					<span style={{color:"#888",marginRight:30}}>尺寸</span>
					<ButtonGroup>
						{(sizes||[]).map(it=><Button>{it}</Button>)}
					</ButtonGroup>
				</div>
				<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
					<span style={{color:"#888",marginRight:30}}>颜色</span>
					<ButtonGroup>
						{(colors||[]).map(it=><Button>{it}</Button>)}
					</ButtonGroup>
				</div>
				<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
					<span style={{color:"#888",marginRight:30}}>数量</span>
					<Input inline type="number" min={0} max={remain||0} boxStyle={{verticalAlign:"middle"}} value={this.state.amount} onChange={e=>this.setState({amount:e.target.value})} />
					<span><span style={{color:"#888"}}>剩余</span> {remain} <span style={{color:"#888"}}>件</span></span>
				</div>
				<div style={{marginTop:20}}>
					<Link to={"/deal.html?id="+_id+"&amount="+this.state.amount} style={{marginLeft:70}}>
						<Button>立即购买</Button>
					</Link>
					<Button style={{marginLeft:50}} >收藏</Button>
					<Button >加入购物车</Button>
				</div>
			</div>
		)
	}
}
class ShopInfo extends Component{
	render(){
		var {name,info}=this.props.data
		return (
			<div style={{width:215,height:451}}>
				<h3>{name}</h3>
				<br />
				<p>{info}</p>
			</div>
		)
	}
}
export default class extends Component{
	state={data:{},shop:{}}
	render(){
		return (
			<SearchBox title="商品信息">
				<div style={{border:"1px solid #ccc",padding:20,display:'inline-block',verticalAlign:"top"}}>
					<ImagePicker imgs={this.state.data.imgs||[]} />
					<ItemInfo data={this.state.data} />
				</div>
				<div style={{border:"1px solid #ccc",padding:20,display:'inline-block',verticalAlign:"top",marginLeft:20}}>
					<ShopInfo data={this.state.shop} />
				</div>
				<div style={{marginTop:30,border:"1px solid #ccc"}}>
					<h2 style={{borderBottom:"1px solid #ccc",padding:"15px 20px",background:"#eee",fontSize:16,color:"#333"}}>商品详情</h2>
					<Editor readOnly value={this.state.data.info} />
				</div>
				<Ajax auto url={"/goods/"+this.props.location.query.id} onSuccess={it=>this.setState({data:it},()=>this.refs.getshop.request())} />
				<Ajax ref="getshop" url={"/shops/"+this.state.data.shop} onSuccess={shop=>this.setState({shop})} />
			</SearchBox>
		)
	}
}