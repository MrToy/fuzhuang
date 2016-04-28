import React,{Component} from "react"

export default class extends Component{
	static propTypes ={
		top:React.PropTypes.number
	}
	state={
		isTop:false,
		preY:0
	}
	componentDidMount(){
		this.preY=this.refs.box.offsetTop
		this.width=this.refs.box.offsetWidth
		this.onScroll=this.onScroll.bind(this)
		window.addEventListener('scroll', this.onScroll)
	}
	componentWillUnmount(){
		window.removeEventListener('scroll', this.onScroll)
	}
	onScroll(e){
		if(e.pageY>=this.preY)
			this.setState({isTop:true})
		else
			this.setState({isTop:false})
	}
	render(){
		return(
			<div ref="box" {...this.props} style={this.state.isTop?{position:"fixed",top:this.props.top||0,width:this.width||"100%",zIndex:3}:{position: '',top:''}}></div>
		)
	}
}