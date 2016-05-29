import React,{Component} from "react"
import Editor from 'my-components/Editor'
import Table from 'toy-ui/Table'
import Paging from 'toy-ui/Paging'
import Modal from 'toy-ui/Modal'
import Ajax from 'toy-ui/Ajax'
import Input from 'toy-ui/Input'
import Button from 'toy-ui/Button'
import FormGroup from 'toy-ui/FormGroup'
import dateFormat from 'dateformat'
import URL from 'url'
import store from 'store'

class NewsModal extends Component{
	render(){
		return (
			<Modal isOpen={this.props.isOpen} onRequestClose={this.props.onRequestClose} style={{width:1200}}>
				<div style={{maxHeight:500,overflow:"auto"}}>
					<FormGroup label="标题" >
						<Input full value={this.props.data.title} onChange={e=>this.props.onChange({...this.props.data,title:e.target.value})} />
					</FormGroup>
					<FormGroup label="内容">
						<Editor style={{minHeight:400}} value={this.props.data.data} onChange={data=>this.props.onChange({...this.props.data,data})} />
					</FormGroup>
				</div>
				<div style={{marginTop:20,textAlign:"right"}}>
					<Button onClick={()=>{this.props.onSave();this.props.onRequestClose()}}>确定</Button>
					<Button onClick={this.props.onRequestClose}>取消</Button>
				</div>
			</Modal>
		)
	}
}

export default class extends Component{
	state={dump:{},data:[],pageNumber:0,index:1,showModal:false}
	render(){
		const itemNumber=10
		return(
			<div>
				<NewsModal data={this.state.dump} onSave={()=>(this.state.dump._id?this.refs.put:this.refs.post).request()} onChange={dump=>this.setState({dump})} isOpen={this.state.showModal} onRequestClose={()=>this.setState({showModal:false})} />
				<div style={{textAlign:"right",marginBottom:20}}>
					<Button onClick={()=>this.setState({showModal:true,dump:{}})}>添加</Button>
				</div>
				<Table border center keys={["标题","作者","创建时间","操作"]}
					data={this.state.data.map(it=>{
						var {_id,title,author,createTime}=it
						return [
							title,author,dateFormat(createTime,"yyyy-mm-dd , HH:MM:ss"),
							(
								<div>
									<Button onClick={()=>this.setState({dump:it,showModal:true})}>修改</Button>
									<Button color="danger" onClick={()=>this.setState({dump:it},()=>this.refs.del.request())}>删除</Button>
								</div>
							)
						]
					}
				)} />
				<Paging  style={{marginTop:20}} total={this.state.pageNumber} onPaging={index=>this.setState({index},()=>this.refs.get.request())} />
				<Ajax auto ref="get" url={URL.format({pathname:"/news",query:{token:store.get("token"),sortKey:"createTime",sortValue:-1,limit:itemNumber,skip:(this.state.index-1)*itemNumber}})} onSuccess={it=>this.setState({data:it.data,pageNumber:Math.ceil(it.total/itemNumber)})} />
				<Ajax ref="post" method="post" alert url={URL.format({pathname:"/news",query:{token:store.get("token")}})} data={JSON.stringify(this.state.dump)} onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="put" method="put" alert url={URL.format({pathname:"/news/"+this.state.dump._id,query:{token:store.get("token")}})} data={JSON.stringify(this.state.dump)} onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="del" method="delete" alert url={URL.format({pathname:"/news/"+this.state.dump._id,query:{token:store.get("token")}})} onSuccess={()=>this.refs.get.request()} />
			</div>
		)
	}
}