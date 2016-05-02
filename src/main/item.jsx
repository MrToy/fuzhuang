import React,{Component} from 'react'
import Radium from 'radium'
import {Link} from 'react-router'
import SearchBox from '../components/SearchBox'

import Ajax from '../lib/Ajax'
import Input from '../lib/Input'
import Button from '../lib/Button'
import ButtonGroup from '../lib/ButtonGroup'



class ImagePicker extends Component{
	state={selected:0}
	render(){
		return (
			<div style={{marginRight:20,display:'inline-block',verticalAlign:"top"}}>
				<img style={{width:400,height:400,display:"block"}} src={this.props.imgs[this.state.selected]?("/files/image"+this.props.imgs[this.state.selected].path+"?w=400&h=400"):require('./014-image.png')} />
				{this.props.imgs.slice(0,4).map((it,i)=>(
					<img onClick={()=>this.setState({selected:i})} style={{width:92,height:92,margin:"10px 10px 0 0",cursor:"pointer",border:"2px solid "+(this.state.selected==i?"#C81624":"transparent"),padding:3}} src={("/files/image"+it.path+"?w=90&h=90")||require('./014-image.png')} />
				))}
			</div>
		)
	}
}


class ItemInfo extends Component{
	state={amount:1,size:null,color:null}
	render(){
		var data=this.props.data||{}
		return(
			<div style={{border:"1px solid #ccc",padding:20}}>
				<ImagePicker imgs={data.imgs||[]} />
				<div style={{display:'inline-block',verticalAlign:"top",marginLeft:20}}>
					<p style={{fontSize:20,width:680,textAlign:"center"}}>{data.name}</p>
					<div style={{padding:"20px 50px",margin:"20px 0",background:"#eee",lineHeight:"50px",color:"#888"}}>
						<p>
							<span style={{marginRight:50}}>批发价</span>
							<span style={{color:"#C81624",fontSize:30}}>¥{data.price}</span>
						</p>
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888",marginRight:30}}>货号</span>
						{data.itemCode}
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888",marginRight:30}}>尺寸</span>
						<ButtonGroup>
							{(data.sizes||[]).map(it=><Button>{it}</Button>)}
						</ButtonGroup>
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888",marginRight:30}}>颜色</span>
						<ButtonGroup>
							{(data.colors||[]).map(it=><Button>{it}</Button>)}
						</ButtonGroup>
					</div>
					<div style={{borderBottom:"1px dotted #ccc",padding:"15px 0"}}>
						<span style={{color:"#888",marginRight:30}}>数量</span>
						<Input inline type="number" value={this.state.amount} onChange={e=>this.setState({amount:e.target.value})} />
					</div>
					<div style={{marginTop:20}}>
						<Link to={"/deal.html?id="+data._id+"&amount="+this.state.amount} style={{marginLeft:70}}>
							<Button color="red">立即购买</Button>
						</Link>
						<Button style={{marginLeft:150}} >收藏</Button>
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
			<SearchBox title="商品信息">
				<ItemInfo data={this.state.data} />
				<ImageInfo data={this.state.data} />
				<Ajax auto url={"/goods/"+this.props.location.query.id} onSuccess={it=>this.setState({data:it})} />
			</SearchBox>
		)
	}
}