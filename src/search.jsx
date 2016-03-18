import React,{Component} from 'react'
import {colors,BodyStyle,Head,LogoBar,Footer,MenuBar,ItemList,menuData,testItems} from './main'
import Radium from 'radium'
@Radium
class MenuList extends Component{
	constructor(props){
		super(props)
		this.state={open:false,selected:"全部"}
	}
	set(it){
		this.setState({selected:it})
		if(this.props.onChange)this.props.onChange(it)
	}
	render(){
		return(
			<div style={{borderBottom:"1px solid "+colors.line,padding:"0 20px",transition:"all 0.3s",lineHeight:"50px",height:!this.props.more||this.state.open?(this.props.height||"auto"):50,overflow:"hidden"}}>
				<span style={{marginRight:20}}>{this.props.title}</span>
				<div style={{display:"inline-block",width:900,verticalAlign:"top",lineHeight:"50px",overflow:"hidden"}}>
					{this.props.list.map((it,i)=>{
						return <div onClick={()=>this.set(it)} href="#" key={i} style={[{cursor:"pointer",color:"#555",padding:"0 10px",display:"inline-block",":hover":{color:colors.primary}},this.state.selected==it?{color:colors.primary}:{}]}>{it}</div>
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
	constructor(props){
		super(props)
		this.state={type:"",market:"",color:""}
	}
	set(it){
		this.setState(it)
		if(this.props.onChange)this.props.onChange(this.state)
	}
	render(){
		return(
			<div style={{margin:"20px 0",border:"1px solid "+colors.line,color:"#999"}}>
				<MenuList title="分类：" onChange={it=>this.set({type:it})} list={["全部","女装","男装","鞋","内衣","母婴用品","配件箱包","运动户外","美妆饰品"]} />
				<MenuList title="市场：" onChange={it=>this.set({market:it})} more height={150} list={["全部","国大","大西豪","女人街","国投","富丽","新金马","大时代","宝华","鞋城","圣迦","佰润","西街","新潮都","非凡","柏美","老金马","十三行","欣欣网批","南城","新旺角","周边","万佳","益民","新百佳","西苑鞋汇","景叶","润景","机筑巷","万艺鞋汇"]} />
				<MenuList title="颜色：" onChange={it=>this.set({color:it})} list={["全部","黑色","白色","灰色","红色","蓝色","粉红色","花色","绿色","军绿色","藏青色","卡其色","杏色","黄色","藕色"]} />
				<div  style={{padding:"0 20px"}}>
					<span style={{marginRight:20,lineHeight:"50px"}}>服务：</span>
				</div>
			</div>
		)
	}
}

@Radium
class MenuButton extends Component{
	render(){
		return (
			<div {...this.props} style={
				[{height:40,lineHeight:"40px",transition:"all 0.2s",display:"inline-block",padding:"0 20px",borderRight:"1px solid "+colors.line,borderTop:"1px solid "+colors.line,borderBottom:"1px solid "+colors.line},
				this.props.active?{cursor:"auto",background:colors.primary,color:"#fff",":hover":{color:"#fff"}}:{cursor:"pointer",":hover":{color:colors.primary}},
				this.props.full?{borderLeft:"1px solid "+colors.line}:{},
				this.props.disable?{color:"#CCC",cursor:"not-allowed",":hover":{color:"#CCC"}}:{},
				this.props.style
			]}>{this.props.children}</div>
		)
	}
}

@Radium
class SortBar extends Component{
	constructor(props){
		super(props)
		this.state={selected:"综合"}
	}
	set(it){
		this.setState({selected:it})
		if(this.props.onChange)this.props.onChange(it)
	}
	render(){
		return(
			<div style={{marginBottom:20,color:"#999"}}>
				{["综合","价格","上新时间","热度"].map((it,i)=>{
					return <MenuButton full={i==0} onClick={()=>this.set(it)} active={this.state.selected==it}>{it}</MenuButton>
				})}
			</div>
		)
	}
}

class Paging extends Component{
	constructor(props){
		super(props)
		this.state={index:1}
	}
	pre(){
		this.go(this.state.index-1)
	}
	next(){
		this.go(this.state.index+1)
	}
	go(i){
		if(i<1||i>this.props.total)return
		this.setState({index:i})
		if(this.props.onPaging)this.props.onPaging(i)
		this.refs.page.value=i
	}
	render(){
		var arr=[]
		for(var i=1;i<=this.props.total;i++){
			(i=>{
				arr.push(<MenuButton full={i==1||(this.state.index>5&&i==this.state.index-2)||(this.state.index<this.props.total-5&&i==this.props.total)} active={i==this.state.index} onClick={()=>this.go(i)}>{i}</MenuButton>)
			})(i)
		}
		if(this.state.index>5){
			arr.splice(1,this.state.index-4,(<div style={{margin:"0 10px",display:"inline-block"}}>...</div>))
		}
		if(this.state.index<this.props.total-5){
			arr.splice(this.state.index>5?7:this.state.index+2,this.props.total-this.state.index-3,(<div style={{margin:"0 10px",display:"inline-block"}}>...</div>))
		}
		return (
			<div {...this.props}>
				<MenuButton disable={this.state.index==1} onClick={()=>this.pre()}  full style={{marginRight:20}}>上一页</MenuButton>
				{arr}
				<MenuButton disable={this.state.index==this.props.total} onClick={()=>this.next()} full style={{marginLeft:20}}>下一页</MenuButton>
				<span style={{margin:"0 10px"}}>共{this.props.total}页</span>
				到第<input ref="page" type="number" style={{margin:"0 5px",width:40,height:40,lineHeight:"40px",padding:"0 10px",border:"1px solid "+colors.line}} />页
				<MenuButton full style={{margin:"0 5px"}} onClick={()=>this.go(parseInt(this.refs.page.value))}>确定</MenuButton>
			</div>
		)
	}
}

export default class extends Component{
	constructor(props){
		super(props)
		this.state={sort:"",menu:{}}
	}
	componentDidMount(){
		this.refs.logobar.refs.search.set(this.props.location.query.word)
	}
	render(){
		if(this.refs.logobar)this.refs.logobar.refs.search.set(this.props.location.query.word)
		return (
			<div>
				<BodyStyle />
				<Head />
				<LogoBar ref="logobar" placeholder={this.props.location.query.word} />
				<MenuBar data={menuData} />
				<div style={{width:1200,margin:"0 auto"}}>
					<Menu onChange={it=>this.setState({menu:it})} />
					<SortBar onChange={it=>this.setState({sort:it})}/>
					<ItemList data={testItems} />
					<div style={{textAlign:"center"}}>
						<Paging total={100} style={{display:"inline-block"}} />
					</div>
				</div>	
				<Footer />
			</div>
		)
	}
}