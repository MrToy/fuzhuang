import React,{Component} from "react"
import Icon from './Icon'
export default class extends Component{
	state={
		isHide:true
	}
	componentDidMount(){
		window.addEventListener('scroll', this.onScroll)
	}
	componentWillUnmount(){
		window.removeEventListener('scroll', this.onScroll)
	}
	onScroll=()=>{
		var t=document.documentElement.scrollTop||document.body.scrollTop
		if(t>200)
			this.setState({isHide:false})
		else
			this.setState({isHide:true})
	}
	render(){
		return <Icon onClick={()=>window.scrollTo(0,0)} name="arrow-circle-up" style={{fontSize:50,color:"rgba(0,0,0,0.2)",position:"fixed",bottom:20,right:20,cursor:"pointer",zIndex:10,visibility:this.state.isHide?"hidden":"visible",opacity:this.state.isHide?0:1,transition:"all 1s"}} />
	}
}