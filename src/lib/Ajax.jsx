import React,{Component} from "react"
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import Radium,{keyframes} from 'radium'

@Radium
class RollLine extends Component{
	render(){
		var keys=keyframes({
			'0%':{width:'0%'},
			'100%':{width:'90%'}
		})
		return (
			<div style={{width:"100%",height:2,animation:"x 1s ease 0s infinite",animationName:keys,position:"fixed",top:0,left:0,zIndex:999,background:"#0E90D2"}}></div>
		)
	}
}

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
		this.state={finish:true}
		this.props.auto&&this.request()
	}
	async request(url){
		this.setState({finish:false})
		try{
			var res=await fetch(url||this.props.url,{method:this.props.method||'get',body:this.props.data})
			if(!res.ok)
				throw await res.text()
			var j=await res.json()
			this.props.onSuccess&&this.props.onSuccess(j)
			this.props.alert&&swal("成功","","success")
		}catch(err){
			this.props.alert&&swal("错误",err,"error")
		}
		this.setState({finish:true})
	}
	render(){
		return !this.state.finish&&<RollLine />
			
	}
}