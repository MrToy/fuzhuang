import React,{Component} from "react"
import URL from 'url'

function request(method,url,body){
	return new Promise((resolve,reject)=>{
		var xhr=new XMLHttpRequest()
		var timer=setTimeout(()=>{
			reject(new Error("请求超时，请刷新重试"))
			xhr.abort()
		},10000)
		if(method.toLocaleLowerCase()=="post"||method.toLocaleLowerCase()=="put")
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
		xhr.open(method,URL.parse(url))
		xhr.onreadystatechange=()=>{
			if(xhr.readyState==4){
				clearTimeout(timer)
				var res=JSON.parse(xhr.responseText)
				xhr.status==200?resolve(res):reject(new Error(res))
			}
		}
		xhr.send(body)
	})
}

export default class extends Component{
	state={data:null}
	onCreate(){
		
	}
	onRetrieve(){

	}
	onUpdate(){

	}
	onDelete(){

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