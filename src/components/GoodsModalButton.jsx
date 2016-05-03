import React,{Component} from "react"
import Radium from 'radium'
import Ajax from '../lib/Ajax'
import Table from '../lib/Table'
import Paging from '../lib/Paging'
import Modal from '../lib/Modal'
import FormGroup from '../lib/FormGroup'
import Input from '../lib/Input'
import {Link} from 'react-router'
import store from 'store'
import Button from '../lib/Button'
import dateFormat from 'dateformat'
import Icon from '../lib/Icon'

@Radium
class Info extends 	Component{
	render(){
		var {_id,imgs,price,name}=this.props
		return (
			<div style={[
					{margin:5,padding:5,border:"1px solid #555",display:"inline-block"},
					this.props.active?{background:"#FFE6B0",border:"1px solid #FFB951"}:{border:"1px solid transparent"}
				]} {...this.props}>
				<div style={{border:"1px solid #EDEDED",width:50,overflow:"hidden",cursor:"pointer"}}>
					<img src={"/files/image"+(imgs&&imgs[0]?imgs[0]:{}).path+"?w=50&h=50"} style={{width:50,height:50}}/>
					<p style={{color:"#666",height:"20px",overflow:"hidden"}}>{name}</p>
				</div>
			</div>
		)
	}
}

class InfoBar extends Component{
	render(){
		return (
			<div style={{border:"1px dashed #CCC",marginTop:10,overflowX:"auto",whiteSpace:"nowrap",minHeight:104}}>
				{this.props.data.map(it=><Info active={this.props.checked==it._id} {...it} onClick={()=>this.props.onCheck(it)} />)}
			</div>
		)
	}
}

class Goods extends Component{
	state={data:[],index:1,pages:0,selected:null,dump:null}
	render(){
		var repeatPass=this.state.selected?!this.props.checked.find(it=>it._id==this.state.selected._id):false
		return (
			<Modal {...this.props} style={{width:910}}>
				<Table border center keys={[null,"商品名","价格","商品简介","创建时间"]}
					data={this.state.data.map(it=>{
						var {_id,name,price,info,imgs,onSale,createTime}=it
						return [
							(
								<input type="checkbox" checked={(this.state.selected||{})._id==_id} onClick={()=>this.setState({selected:it})} />
							),(
								<Link to={"/item.html?id="+_id}>
									<Button color="link">{name}</Button>
								</Link>
							),
							price,
							(info||"").length>10?info.slice(0,10)+"...":info,
							it.createTime&&dateFormat(it.createTime,"yyyy-mm-dd , HH:MM:ss")
						]
					}
				)} />
				<Paging  style={{marginTop:20}} total={this.state.pages} onPaging={i=>this.setState({index:i},()=>this.refs.get.request())} />
				<Ajax auto ref="get" 
					url={"/goods?sort=createTime,-&limit=5&skip="+(this.state.index-1)*5} 
					onSuccess={it=>this.setState({data:it.data,pages:Math.ceil(it.total/5)})} />
				<div style={{marginTop:10,textAlign:"center"}}>
					<Button color="warning" disable={!this.state.selected||!repeatPass} onClick={()=>{
						this.props.onCheck([...this.props.checked,this.state.selected])
					}}><Icon name="keyboard_arrow_down" /></Button>
					<Button color="danger" disable={!this.state.dump} onClick={()=>{
						this.props.onCheck(this.props.checked.filter(it=>it._id!=this.state.dump))
					}}><Icon name="close2" /></Button>
				</div>
				<InfoBar data={this.props.checked} checked={this.state.dump} onCheck={it=>this.setState({dump:it._id})} />
			</Modal>
		)
	}
}

export default class extends Component{
	static propTypes ={
		checked:React.PropTypes.array,
		onCheck:React.PropTypes.func,
		noBar:React.PropTypes.bool
	}
	state={isOpen:false,checked:[]}
	render(){
		var checked=this.props.onCheck?this.props.checked:this.state.checked
		return (
			<span>
				<Button onClick={()=>this.setState({isOpen:true})}>{this.props.children}</Button>
				<Goods checked={checked} onCheck={checked=>{
					this.setState({checked})
					this.props.onCheck&&this.props.onCheck(checked)
				}}  onRequestClose={()=>this.setState({isOpen:false})} isOpen={this.state.isOpen}  />
				<InfoBar data={checked} />
			</span>
		)
	}
}