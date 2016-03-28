import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Box,MenuPanel} from './'

class DataTable extends Component{
	render(){
		return(
			<div {...this.props}>
				2333
			</div>
		)
	}
}

class Publish extends Component{
	async post(){
		var form=new FormData()
		form.append("title",this.refs.title.value)
		form.append("info",this.refs.info.value)
		form.append("img",this.refs.img.files[0])
		form.append("price",this.refs.price.value)
		var res=await fetch("/upload",{method:"POST",body:form})
		var data=await res.json()
		console.log(data)
	}
	render(){
		return(
			<div {...this.props} style={{lineHeight:"50px"}}>
				<p>标题: <input ref="title" /></p>
				<p>商品介绍: <textarea ref="info" /></p>
				<p>图片: <input ref="img" type="file" multiple value="上传" /></p>
				<p>价格: <input ref="price" /></p>
				<input type="button" value="发布" onClick={()=>this.post()} />
			</div>
		)
	}
} 

export default class extends Component{
	render(){
		return(
			<Box title="商品管理">
				<MenuPanel>
					<Publish title="发布商品" />
					<DataTable title="出售中的商品" />
					<DataTable title="已删除商品" />
				</MenuPanel>
			</Box>
		)
	}
}