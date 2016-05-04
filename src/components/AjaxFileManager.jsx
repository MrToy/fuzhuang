import React,{Component} from "react"
import store from 'store'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import FileManager from '../lib/FileManager'
import Ajax from '../lib/Ajax'


export default class extends Component{
	static propTypes ={
		onSelect:React.PropTypes.func
	}
	state={data:[],dir:null,selected:null,form:null,dump:null}
	render(){
		return (
			<div>
				<FileManager {...this.state} {...this.props} color="black"
					onSelect={selected=>{
						this.setState({selected})
						this.props.onSelect&&this.props.onSelect(this.state.data.find(it=>it.key==selected))
					}}
					selected={this.props.onSelect?this.props.selected:this.state.selected}
					onDir={dir=>this.setState({dir})}
					onUpload={files=>{
						var form=new FormData()
						for(var i in files)
							form.append(i,files[i])
						this.setState({form},()=>this.refs.post.request())
					}}
					onMkdir={()=>this.refs.mkdir.request()}
					onRename={()=>{
						swal({
							title: "请输入新的文件名",
							type: "input",
							showCancelButton: true,
							closeOnConfirm: false,
							confirmButtonText:"确定",
							cancelButtonText:"取消",
							animation: "slide-from-top",
						}, form=>{
							if (form=== false){
								return false
							}
							if (form === "") {
								swal.showInputError("请输入!");
								return false
							}
							this.setState({form},()=>this.refs.rename.request())
						})
					}}
					onDel={()=>this.refs.del.request()}
					onMove={dump=>this.setState({dump},()=>this.refs.move.request())} />
				<Ajax ref="get" auto url={"/files?token="+store.get("token")} onSuccess={data=>this.setState({data:data.map(it=>({key:it._id,parent:it.pid,...it}))})} />
				<Ajax ref="post" method="post" url={"/files?pid="+(this.state.dir||"")+"&token="+store.get("token")} data={this.state.form} alert onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="mkdir" method="post" url={"/files?target=folder&pid="+(this.state.dir||"")+"&token="+store.get("token")} alert onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="rename" method="put" url={"/files/"+this.state.selected+"?&token="+store.get("token")} data={JSON.stringify({name:this.state.form})} alert onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="move" method="put" url={"/files/"+this.state.dump+"?&token="+store.get("token")} data={JSON.stringify({pid:this.state.dir})} alert onSuccess={()=>this.refs.get.request()} />
				<Ajax ref="del" method="delete" url={"/files/"+this.state.selected+"?&token="+store.get("token")} alert onSuccess={()=>{
					this.setState({selected:null})
					this.refs.get.request()
				}} />
			</div>
		)
	}
}