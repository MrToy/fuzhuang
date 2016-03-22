import React,{Component} from 'react'
import {colors,BodyStyle,Head,TitleBar,Search,Footer,MenuBar,menuData} from './main'
import Radium from 'radium'

class ItemInfo extends Component{
	render(){
		return(
			<div style={{border:"1px solid "+colors.line,padding:20}}>
				<div style={{marginRight:20,display:'inline-block',verticalAlign:"top"}}>
					<img style={{width:400,height:400}} src={require('./logo.png')} />
					<div>
						<img style={{width:78,height:78,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
						<img style={{width:78,height:78,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
						<img style={{width:78,height:78,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
						<img style={{width:78,height:78,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
					</div>
				</div>
				<div style={{display:'inline-block',verticalAlign:"top",marginLeft:20}}>
					<p style={{fontSize:20,width:680,textAlign:"center"}}>2016夏季新款韩版修身显瘦白色T恤女士短袖圆领紧身纯色打底裤</p>
					<div style={{padding:"20px 50px",margin:"20px 0",background:colors.bg,lineHeight:"50px",color:"#888"}}>
						<p>
							<span style={{marginRight:50}}>批发价</span>
							<span style={{color:colors.primary,fontSize:30}}>¥10.00</span>
						</p>
						<p>
							<span style={{marginRight:50}}>淘宝价</span>
							<span>¥30.00</span>
						</p>
					</div>
					<div style={{borderBottom:"1px dotted "+colors.line,padding:"15px 0"}}>
						<span style={{color:"#888"}}>服务</span>
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
					<div style={{textAlign:"center"}}>
						<div style={{margin:20,cursor:"pointer",background:colors.primary,color:"#fff",padding:"5px 20px",display:"inline-block",fontSize:20}}>立即购买</div>
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
		return (
			<div style={{marginTop:30,border:"1px solid "+colors.line}}>
				<h2 style={{borderBottom:"1px solid "+colors.line,padding:"15px 20px",background:colors.bg,fontSize:16,color:"#333"}}>商品详情</h2>
				<div style={{padding:20}}>
					<ul style={{listStyle:"none",fontSize:13,margin:"0 40px 20px 40px"}}>
						{[{k:"裤长",v:"七分裤"},{k:"货号",v:"872"},{k:"女裤裤型",v:"毛裤"}].map(it=>{
							return (
								<li style={{display:"inline-block",margin:20}}>
									<span style={{marginRight:10,color:"#888"}}>{it.k}:</span>
									<span style={{color:"#333"}}>{it.v}</span>
								</li>
							)
						})}
					</ul>
					<p style={{overflow:"hidden",textAlign:"center"}}>
						<img style={{maxWidth:860}} src={require('./404.jpg')} />
						<img style={{maxWidth:860}} src={require('./404.jpg')} />
					</p>
				</div>
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
				<MenuBar data={menuData} />
				<div style={{width:1200,margin:"20px auto"}}>
					<ItemInfo />
					<ImageInfo />
				</div>	
				<Footer />
			</div>
		)
	}
}