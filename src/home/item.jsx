import React,{Component} from 'react'
import {colors,BodyStyle,Head,TitleBar,Search,Footer,MenuBar,menuData} from './main'
import Radium from 'radium'
import Ajax from '../lib/Ajax'
import Image from '../lib/Image'
import Input from '../lib/Input'
import {Link} from 'react-router'

class ItemInfo extends Component{
	state={amount:1}
	render(){
		var data=this.props.data||{imgs:[]}
		return(
			<div style={{border:"1px solid "+colors.line,padding:20}}>
				<div style={{marginRight:20,display:'inline-block',verticalAlign:"top"}}>
					<Image border style={{width:400,height:400}} src={data.imgs[0]?data.imgs[0].path:require('./014-image.png')} />
					<div>
						{data.imgs.slice(1,5).map((it,i)=>(
							<Image border style={{width:78,height:78,margin:10}} src={it.path||require('./014-image.png')} />
						))}
					</div>
				</div>
				<div style={{display:'inline-block',verticalAlign:"top",marginLeft:20}}>
					<p style={{fontSize:20,width:680,textAlign:"center"}}>{data.name}</p>
					<div style={{padding:"20px 50px",margin:"20px 0",background:colors.bg,lineHeight:"50px",color:"#888"}}>
						<p>
							<span style={{marginRight:50}}>批发价</span>
							<span style={{color:colors.primary,fontSize:30}}>¥{data.price}</span>
						</p>
						<p>
							<span style={{marginRight:50}}>淘宝价</span>
							<span>¥{data.price}</span>
						</p>
					</div>
					<div style={{borderBottom:"1px dotted "+colors.line,padding:"15px 0"}}>
						<span style={{color:"#888"}}>货号</span>
					</div>
					<div style={{borderBottom:"1px dotted "+colors.line,padding:"15px 0"}}>
						<span style={{color:"#888"}}>尺寸</span>
					</div>
					<div style={{borderBottom:"1px dotted "+colors.line,padding:"15px 0"}}>
						<span style={{color:"#888"}}>颜色</span>
					</div>
					<div style={{borderBottom:"1px dotted "+colors.line,padding:"15px 0"}}>
						<span style={{color:"#888",marginRight:50}}>数量</span>
						<Input inline type="number" value={this.state.amount} onChange={e=>this.setState({amount:e.target.value})} />
					</div>
					<div style={{textAlign:"center"}}>
						<Link to={"/deal.html?id="+data._id+"&amount="+this.state.amount}>
							<div style={{margin:20,cursor:"pointer",background:colors.primary,color:"#fff",padding:"5px 20px",display:"inline-block",fontSize:20}}>立即购买</div>
						</Link>
						<div style={{margin:20,cursor:"pointer",border:"1px solid "+colors.primary,color:colors.primary,padding:"5px 20px",display:"inline-block",fontSize:20}}>收藏</div>
						<div style={{margin:20,cursor:"pointer",border:"1px solid "+colors.primary,color:colors.primary,padding:"5px 20px",display:"inline-block",fontSize:20}}>加入购物车</div>
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
			<div style={{marginTop:30,border:"1px solid "+colors.line}}>
				<h2 style={{borderBottom:"1px solid "+colors.line,padding:"15px 20px",background:colors.bg,fontSize:16,color:"#333"}}>商品详情</h2>
				<div style={{padding:20}}>
					<ul style={{listStyle:"none",fontSize:13,margin:"0 40px 20px 40px"}}>
						{data.info}
					</ul>
					<p style={{overflow:"hidden",textAlign:"center"}}>
						{data.imgs.map(it=>(
							<div style={{padding:50}}>
								<Image style={{width:"auto",height:"auto"}} src={it.path} />
							</div>
						))}
					</p>
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
				<BodyStyle />
				<Head />
				<TitleBar>
					<Search />
				</TitleBar>
				<MenuBar data={menuData} />
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