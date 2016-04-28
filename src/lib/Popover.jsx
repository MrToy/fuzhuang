import React,{Component} from "react"
import {getColor} from './values'

export default class extends Component{
	static propTypes ={
		content:React.PropTypes.any,
		direction:React.PropTypes.string,
		color:React.PropTypes.string
	}
	state={active:false}
	onHide=()=>this.setState({active:false})
	componentDidMount(){
		window.addEventListener('click', this.onHide)
	}
	componentWillUnmount(){
		window.removeEventListener('click', this.onHide)
	}
	render(){
		var color=getColor(this.props.color||"default")
		var styles
		if(this.props.direction=="right"){
			styles={
				angle:{transform:"translate(5px,-50%) rotate(45deg)",top:"50%",right:"100%"},
				box:{left:"100%",top:"50%",transform:"translateY(-50%)",marginLeft:10}
			}
		}else if(this.props.direction=="left"){
			styles={
				angle:{transform:"translate(5px,-50%) rotate(45deg)",top:"50%",right:0},
				box:{right:"100%",top:"50%",transform:"translateY(-50%)",marginRight:10}
			}
		}else if(this.props.direction=="top"){
			styles={
				angle:{transform:"translate(5px,-50%) rotate(45deg)",top:"100%",right:"50%"},
				box:{left:"50%",bottom:"100%",transform:"translateX(-50%)",marginBottom:10}
			}
		}else{
			styles={
				angle:{transform:"translate(5px,-50%) rotate(45deg)",top:0,right:"50%"},
				box:{left:"50%",top:"100%",transform:"translateX(-50%)",marginTop:10}
			}
		}
		return(
			<div style={{position:"relative",display:"inline-block"}} onClick={e=>{
				e.stopPropagation?e.stopPropagation():window.event.cancelBubble = true
			}}>
				<span onClick={()=>this.setState({active:true})}>{this.props.children}</span>
				<div style={{zIndex:4,display:this.state.active?"block":"none",position:"absolute",padding:8,...color,...styles.box,...this.props.style}}>
					{this.props.content}
					<div style={{whiteSpace:"nowrap",position:"absolute",...styles.angle,border:"5px solid "+color.backgroundColor}}></div>
				</div>
			</div>
		)
	}
}