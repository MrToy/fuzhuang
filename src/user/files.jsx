import React,{Component} from "react"
import {Box} from './'
import {colors} from '../home/main'
import Radium from 'radium'
import store from 'store'
import swal from 'sweetalert'
import FileManager from './filemanager'
import 'sweetalert/dist/sweetalert.css'

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
				switch(it.type){
					case "image/svg+xml":
						type="image"
						break;
				}
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
		var pid=this.refs.fm.getSelected()["id"]
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
		var pid=this.refs.fm.getSelected()["id"]
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
	render(){
		return(
			<Box title="文件管理">
				<FileManager ref="fm" style={{height:500}} data={this.state.data} onUpload={files=>this.onUpload(files)} onAdd={()=>this.onAdd()} />
			</Box>
		)
	}
}