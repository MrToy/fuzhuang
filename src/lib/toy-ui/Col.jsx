import React,{Component} from "react"
import Radium from 'radium'
import {getAdapt} from './values'

@Radium
export default class extends Component{
	static propTypes ={
		sm:React.PropTypes.number,
		md:React.PropTypes.number,
		lg:React.PropTypes.number,
		offset:React.PropTypes.number,
		collapse:React.PropTypes.bool,
		center:React.PropTypes.bool
	}
	render(){
		return(
			<div {...this.props} style={[
				{display:"inline-block",verticalAlign:"top"},
				this.props.collapse?null:{
					padding:"5px 1.5rem"
				},
				...getAdapt.bind(this)(key=>({width:key/12*100+"%"})),
				this.props.center&&{
					margin:"0 auto",display:"block"
				},
				this.props.offset&&{
					marginLeft:this.props.offset/12*100+"%"
				},
				this.props.style
			]} ></div>
		)
	}
}