import React,{Component} from "react"
import URL from 'url'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'

export default class extends Component{
	state={data:null}
	async onCreate(){
		try{
			var res=await fetch(URL.parse(this.props.url),{method:"post",body:this.props.body})
			var j=await res.json()
			if(!res.ok)
				throw j.error
		}catch(err){
			swal({title:"错误",text:err,timer:1000,type:"error"})
		}
		this.onRetrieve()
	}
	async onRetrieve(){
		try{
			var res=await fetch(URL.parse(this.props.url))
			var j=await res.json()
			if(!res.ok)
				throw j.error
			this.state.setState({data:j})
		}catch(err){
			swal({title:"错误",text:err,timer:1000,type:"error"})
		}
	}
	async onUpdate(){
		try{
			var res=await await fetch(URL.parse(this.props.url),{method:"put",body:this.props.body})
			var j=await res.json()
			if(!res.ok)
				throw j.error
		}catch(err){
			swal({title:"错误",text:err,timer:1000,type:"error"})
		}
		this.onRetrieve()
	}
	async onDelete(){
		try{
			var res=await fetch(URL.parse(this.props.url),{method:"delete"})
			var j=await res.json()
			if(!res.ok)
				throw j.error
		}catch(err){
			swal({title:"错误",text:err,timer:1000,type:"error"})
		}
		this.onRetrieve()
	}
	render(){
		return React.cloneElement(this.props.children,{
			data:this.state.data,
			onCreate:this.onCreate.bind(this),
			onUpdate:this.onUpdate.bind(this),
			onDelete:this.onDelete.bind(this),
			onRetrieve:this.onRetrieve.bind(this)
		})
	}
}