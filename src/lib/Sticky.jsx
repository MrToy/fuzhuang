import React,{Component} from "react"
import Radium from 'radium'

export default class extends Component{
	static propTypes ={
		top:React.PropTypes.number
	}
	state={
		isTop:false,
		preY:0
	}
	componentDidMount(){
		this.setState({preY:this.refs.box.offsetTop})
		this.onScroll=this.onScroll.bind(this)
		window.addEventListener('scroll', this.onScroll)
	}
	componentWillUnmount(){
		window.removeEventListener('scroll', this.onScroll)
	}
	onScroll(e){
		if(e.pageY>=this.state.preY)
			this.setState({isTop:true})
		else
			this.setState({isTop:false})
	}
	render(){
		return(
			<div ref="box" {...this.props} style={this.state.isTop?{position:"fixed",top:this.props.top||0}:{position: '',top:''}}></div>
		)
	}
}