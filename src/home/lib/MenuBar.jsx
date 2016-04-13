import React,{Component} from 'react'
import {Link} from 'react-router'
import Radium from 'radium'
import {getColor} from '../../lib/values'
import Color from 'color'

@Radium
class MenuLeft extends Component{
	render(){
		var colors={
			bg:Color().rgb(246,246,246).hexString(),
			primary:Color().rgb(200,22,36).hexString(),
			line:"#DDD"
		}
		colors.secondary=Color(colors.primary).darken(0.2).hexString()
		return (
			<div ref="box" style={[{display:"inline-block",position:"relative",":hover":{}},this.props.style]}>
				<div style={{width:180,textAlign:"center",float:"left",listStyle:"none",fontWeight:"bold",lineHeight:"35px",color:"#fff",fontSize:16,background:colors.secondary}} >所有商品分类</div>
				<div style={{overflow:"hidden",transition:"all 0.5s",position:"absolute",left:0,top:35,zIndex:4,width:180,height:(Radium.getState(this.state,'box',':hover')||this.props.active)?590:0,display:"inline-block",background:colors.bg,borderLeft:"1px solid "+colors.line,borderRight:"1px solid "+colors.line,borderBottom:"1px solid "+colors.line}}>
					{
						["精品男装","淘款市场","国际名流","意法男装","中纺服饰","一号基地","二号基地","男衬衫","品牌折扣","外贸原单","三号基地","更多市场"].map(ii=>{
							return (
								<div key={ii} style={{margin:"10px 0",height:35,listStyle:"none"}}>
									<Link to={{pathname:"search.html",query:{word:ii}}} key={ii+".child"} style={{textAlign:"center",fontWeight:"normal",width:"100%",lineHeight:"35px",float:"left",color:"#000",":hover":{color:colors.primary},fontSize:16}} href={"/target/"+ii}>{ii}</Link>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}

export default class extends Component{
	render(){
		var colors={
			bg:Color().rgb(246,246,246).hexString(),
			primary:Color().rgb(200,22,36).hexString(),
			line:"#DDD"
		}
		colors.secondary=Color(colors.primary).darken(0.2).hexString()
		return (
			<div style={{background:colors.primary}}>
				<div style={{width:1200,height:35,margin:"0 auto"}}>
					<MenuLeft active={this.props.active} style={{marginRight:100,float:"left"}} />	
					{[
						{text:"首页",link:"/"},
						{text:"批发市场",link:"#"},
						{text:"每日新款",link:"#"},
						{text:"款式搜索",link:"#"}
					].map((it,i)=>{
						return (
							<div key={i} style={{height:35,float:"left",listStyle:"none",":hover":{background:colors.secondary}}} >
								<Link to={it.link} style={{fontWeight:"bold",float:"left",lineHeight:"35px",color:"#fff",padding:"0px 15px",fontSize:16}}>{it.text}</Link>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}