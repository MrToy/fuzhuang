import React,{Component} from 'react'
import Radium from 'radium'
import {Link} from 'react-router'
import Paging from '../lib/Paging'
import Ajax from '../lib/Ajax'
import ButtonGroup from '../lib/ButtonGroup'
import Button from '../lib/Button'
import GoodsList from '../components/GoodsList'


@Radium
class MenuList extends Component{
	state={open:false,selected:"全部"}
	render(){
		return(
			<div style={{borderBottom:"1px solid #ccc",padding:"0 20px",transition:"all 0.3s",lineHeight:"50px",height:!this.props.more||this.state.open?(this.props.height||"auto"):50,overflow:"hidden"}}>
				<span style={{marginRight:20}}>{this.props.title}</span>
				<div style={{display:"inline-block",width:900,verticalAlign:"top",lineHeight:"50px",overflow:"hidden"}}>
					{this.props.list.map((it,i)=>{
						return <Link to={"search.html?word="+it} style={{cursor:"pointer",color:"#555",padding:"0 10px",display:"inline-block"}}>{it}</Link>
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
	state={data:[]}
	set(it){
		this.setState(it)
		if(this.props.onChange)this.props.onChange(this.state)
	}
	render(){
		var list=[]
		var recur= (parent,selected)=>{
			var item=this.state.data.find(it=>it.text==parent)||{}
			list.unshift(this.state.data.filter(it=>it.parent==item.text).map(it=>it.text))
			if(item.text){
				recur(item.parent,item.text)
			}
		}
		recur(this.props.word)
		if(list.length&&list[list.length-1].length==0)
			list.pop()
		return(
			<div style={{margin:"20px 0",border:"1px solid #ccc",color:"#999"}}>
				{list.map(it=><MenuList list={it} />)}
				<Ajax auto url={"/configs/菜单"} onSuccess={data=>this.setState({data})} />
			</div>
		)
	}
}


export default class extends Component{
	state={sort:"",menu:{},index:1,direct:0,pages:0,data:[],word:null}
	componentWillReceiveProps(nextProps){
		this.setState({word:nextProps.location.query.word},()=>this.refs.get.request())	
	}
	onSort(i){
		var sort=""
		switch(i){
			case 1:
				sort="price"
				break
			case 2:
				sort="createTime"
		}
		this.setState({sort},()=>this.refs.get.request())
	}
	render(){
		return (
			<div>
				<Menu word={(this.state.word||this.props.location.query.word)} />
				<ButtonGroup onCheck={this.onSort.bind(this)}  style={{marginBottom:20}}>
					<Button color="red">综合</Button>
					<Button color="red">价格</Button>
					<Button color="red">上新时间</Button>
					<Button color="red">销量</Button>
				</ButtonGroup>
				<Button color="red" onClick={()=>this.setState({direct:!this.state.direct},()=>this.refs.get.request())}>{this.state.direct?"↑升序":"↓降序"}</Button>
				<GoodsList data={this.state.data} />
				<Paging color="red" total={this.state.pages} style={{display:"inline-block"}} onPaging={i=>this.setState({index:i},()=>this.refs.get.request())} />
				<Ajax auto ref="get" url={"/goods?limit=15&sort="+this.state.sort+","+(this.state.direct?"+":"-")+"&word="+(this.state.word||this.props.location.query.word)+"&onSale=true&skip="+(this.state.index-1)*15} onSuccess={it=>this.setState({data:it.data,pages:Math.ceil(it.total/15)})} />
			</div>
		)
	}
}