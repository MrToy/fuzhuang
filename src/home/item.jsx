import React,{Component} from 'react'
import {colors,BodyStyle,Head,LogoBar,Footer,MenuBar,menuData} from './main'
import Radium from 'radium'

class ItemInfo extends Component{
	render(){
		return(
			<div style={{border:"1px solid "+colors.line,padding:20}}>
				<div style={{marginRight:20,display:'inline-block',verticalAlign:"top"}}>
					<img style={{width:360,height:360}} src={require('./logo.png')} />
					<div>
						<img style={{width:68,height:68,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
						<img style={{width:68,height:68,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
						<img style={{width:68,height:68,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
						<img style={{width:68,height:68,margin:10,border:"1px solid"+colors.primary}} src={require('./logo.png')} />
					</div>
				</div>
				<div style={{display:'inline-block',verticalAlign:"top"}}>
					<p style={{fontSize:20,width:540}}>2016夏季新款韩版修身显瘦白色T恤女士短袖圆领紧身纯色打底裤</p>
					<div style={{padding:20,marginTop:20,background:colors.bg,lineHeight:"50px",color:"#888"}}>
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
					<div>
						<div style={{margin:20,cursor:"pointer",background:colors.primary,color:"#fff",padding:"5px 20px",display:"inline-block",textAlign:"center",fontSize:20}}>立即购买</div>
						<div style={{margin:20,cursor:"pointer",border:"1px solid "+colors.primary,color:colors.primary,padding:"5px 20px",display:"inline-block",textAlign:"center",fontSize:20}}>收藏</div>
						<div style={{margin:20,cursor:"pointer",border:"1px solid "+colors.primary,color:colors.primary,padding:"5px 20px",display:"inline-block",textAlign:"center",fontSize:20}}>加入购物车</div>
					</div>
				</div>
			</div>
		)
	}
}


class ShopInfo extends Component{
	render(){
		return (
			<div style={{color:"#888",border:"1px solid "+colors.line,padding:20,fontSize:12,lineHeight:"30px"}}>
				<p style={{fontSize:20,color:"#000"}}>店铺名</p>
				<p>地址：</p>
				<p>商品：</p>
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
				<LogoBar ref="logobar" placeholder={this.props.location.query.word} />
				<MenuBar data={menuData} />
				<div style={{width:1200,margin:"20px auto"}}>
					<div style={{width:980,display:'inline-block',verticalAlign:"top",paddingRight:20}} >
						<ItemInfo />
					</div>
					<div style={{width:200,display:'inline-block',verticalAlign:"top"}} >
						<ShopInfo />
					</div>
				</div>	
				<Footer />
			</div>
		)
	}
}