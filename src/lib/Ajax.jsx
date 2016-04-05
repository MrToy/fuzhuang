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
		onData:React.PropTypes.func,
		alert:React.PropTypes.bool
	}
	constructor(props){
		super(props)
		this.props.auto&&this.request()
	}
	async request(){
		try{
			var res=await fetch(this.props.url,{method:this.props.method||'get',body:this.props.data})
			if(!res.ok)
				throw await res.text()
			var j=await res.json()
			this.props.onData&&this.props.onData(j)
			this.props.alert&&swal("成功","","success")
		}catch(err){
			this.props.alert&&swal("错误",err,"error")
		}
	}
	render(){
		return null
	}
}