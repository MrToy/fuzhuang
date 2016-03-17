import React,{Component} from 'react'
import {colors} from './main'
import Radium from 'radium'

class MenuList extends Component{
	constructor(props){
		super(props)
		this.state={open:false}
	}
	render(){
		return(
			<div style={{borderBottom:"1px solid "+colors.line,padding:"0 20px",transition:"all 0.3s",lineHeight:"50px",height:!this.props.more||this.state.open?(this.props.height||"auto"):50,overflow:"hidden"}}>
				<span style={{marginRight:20}}>{this.props.title}</span>
				<span style={{marginRight:10,color:"#555",cursor:"pointer"}}>全部</span>
				<div style={{display:"inline-block",width:900,verticalAlign:"top",lineHeight:"50px",overflow:"hidden"}}>
					{this.props.list.map((itit,ii)=>{
						return <a href="#" key={ii} style={{margin:"0 10px",display:"inline-block"}}>{itit}</a>
					})}
				</div>
				<div  style={{cursor:"pointer",float:"right",display:this.props.more?"block":"none"}} onClick={()=>this.setState({open:!this.state.open})}>
					<svg style={{transform:"rotate("+(this.state.open?180:0)+"deg)",transition:"all 0.3s",display:"inline-block",width:15,height:15,verticalAlign:"middle",margin:"0 2px"}} viewBox="0 0 20 20">
						<path fill="#000000" d="M0 6c0-0.128 0.049-0.256 0.146-0.354 0.195-0.195 0.512-0.195 0.707 0l8.646 8.646 8.646-8.646c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-9 9c-0.195 0.195-0.512 0.195-0.707 0l-9-9c-0.098-0.098-0.146-0.226-0.146-0.354z"></path>
					</svg>
				</div>
			</div>			
		)
	}
}
class Menu extends Component{
	render(){
		return(
			<div style={{margin:"20px 0",border:"1px solid "+colors.line,color:"#999"}}>
				<MenuList title="分类：" list={["女装","男装","鞋","内衣","母婴用品","配件箱包","运动户外","美妆饰品"]} />
				<MenuList title="市场：" more height={150} list={["国大","大西豪","女人街","国投","富丽","新金马","大时代","宝华","鞋城","圣迦","佰润","西街","新潮都","非凡","柏美","老金马","十三行","欣欣网批","南城","新旺角","周边","万佳","益民","新百佳","西苑鞋汇","景叶","润景","机筑巷","万艺鞋汇"]} />
				<MenuList title="颜色：" list={["黑色","白色","灰色","红色","蓝色","粉红色","花色","绿色","军绿色","藏青色","卡其色","杏色","黄色","藕色"]} />
				<div  style={{padding:"0 20px"}}>
					<span style={{marginRight:20,lineHeight:"50px"}}>服务：</span>
				</div>
			</div>
		)
	}
}

@Radium
class SortBar extends Component{
	constructor(props){
		super(props)
		this.state={sort:"综合"}
	}
	getValue(){
		return this.state.sort
	}
	render(){
		return(
			<ul style={{listStyle:"none",border:"1px solid "+colors.line,width:500,color:"#999"}}>
				{["综合","价格","上新时间","热度"].map(it=>{
					return <li key={it} onClick={()=>this.setState({sort:it})} style={[{cursor:"pointer",display:"inline-block",padding:"10px 20px",borderRight:"1px solid "+colors.line},this.state.sort==it?{background:colors.primary,color:"#fff",":hover":{color:"#fff"}}:{":hover":{color:colors.primary}}]}>{it}</li>
				})}
			</ul>
		)
	}
}
export default class extends Component{
	render(){
		return (
			<div style={{borderTop:"3px solid "+colors.primary}}>
				<div style={{width:1200,minHeight:800,margin:"0 auto"}}>
					<Menu />
					<SortBar />
				</div>
			</div>
		)
	}
}
