import React,{Component} from "react"
import store from 'store'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import FileManager from './FileManager'

export default class extends Component{
	constructor(props){
		super(props)
		var data={text:"root",type:"folder",children:[]}
		this.state={data}
		this.getData()
	}
	async getData(){
		function recur(data,pid){
			var arr=[]
			data.forEach(it=>{
				if(it.pid!=pid)return
				var type=it.type
				if(type.match(/image/))
					type="image"
				arr.push({id:it["_id"],text:it.name,path:it.path,type,children:recur(data,it["_id"])})
			})
			return arr
		}
		var res=await fetch("/files?token="+store.get("token"))
		var j=await res.json()
		var data={text:"root",type:"folder",children:recur(j)}
		this.setState({data})
	}
	async onUpload(files){
		var form=new FormData()
		var pid=this.refs.fm.getIndex()["id"]
		for(var i=0;i<files.length;i++){
			form.append(i,files[i])
		}
		try{
			var res=await fetch("/files?token="+store.get("token")+"&pid="+pid,{method:"POST",body:form})
			if(!res.ok)
				throw await res.text()
		}catch(err){
			return swal("错误",err,"error")
		}
		swal("上传成功","","success")
		this.getData()
	}
	async onAdd(){
		var pid=this.refs.fm.getIndex()["id"]
		try{
			var res=await fetch("/files?token="+store.get("token")+"&pid="+pid+"&target=folder",{method:"POST"})
			if(!res.ok)
				throw await res.text()
		}catch(err){
			return swal("错误",err,"error")
		}
		swal("新建成功","","success")
		this.getData()
	}
	async onDel(){
		try{
			var checked=this.refs.fm.state.checked
			for(var i=0;i<checked.length;i++){
				var res=await fetch("/files/"+checked[i]+"?token="+store.get("token"),{method:"DELETE"})
				if(!res.ok)
					throw await res.text()
			}
		}catch(err){
			return swal("错误",err,"error")
		}
		swal("删除成功","","success")
		this.getData()
	}
	async onRename(){
		var dialog=async function(){
			return new Promise((resolve,reject)=>{
				swal({
					title: "请输入新的文件名",
					type: "input",
					showCancelButton: true,
					closeOnConfirm: false,
					confirmButtonText:"确定",
					cancelButtonText:"取消",
					animation: "slide-from-top",
				}, function(inputValue) {
					if (inputValue === false){
						resolve(false)
						return false
					}
					if (inputValue === "") {
						swal.showInputError("请输入!");
						return false
					}
					resolve(inputValue)
				})	
			})		
		}
		try{
			var name=await dialog()
			if(!name)return
			var checked=this.refs.fm.state.checked
			var res=await fetch("/files/"+checked[0]+"?token="+store.get("token"),{method:"PUT",body:JSON.stringify({name})})
			if(!res.ok)
				throw await res.text()
		}catch(err){
			return swal("错误",err,"error")
		}
		swal("重命名成功","","success")
		this.getData()
	}
	render(){
		return <FileManager ref="fm" style={this.props.style} data={this.state.data} onUpload={this.onUpload.bind(this)} onAdd={this.onAdd.bind(this)} onDel={this.onDel.bind(this)} onRename={this.onRename.bind(this)} onCheck={this.props.onCheck} />
	}
}