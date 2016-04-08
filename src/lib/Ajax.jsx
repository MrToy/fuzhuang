import React,{Component} from "react"
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'

export default class extends Component{
	static propTypes={
		url:React.PropTypes.string.isRequired,
		data:React.PropTypes.oneOfType([
			React.PropTypes.object,React.PropTypes.string
		]),
		auto:React.PropTypes.bool,
		onSuccess:React.PropTypes.func,
		alert:React.PropTypes.bool
	}
	constructor(props){
		super(props)
		this.props.auto&&this.request()
	}
	async request(url){
		try{
			var res=await fetch(url||this.props.url,{method:this.props.method||'get',body:this.props.data})
			var j=await res.json()
			if(!res.ok){
				throw j.error
			}
			this.props.onSuccess&&this.props.onSuccess(j)
			this.props.alert&&swal("成功",j.info||"","success")
		}catch(err){
			this.props.alert&&swal("错误",err,"error")
		}
	}
	render(){
		return null	
	}
}