import React,{Component} from "react"
import Modal from 'react-modal'
import Radium from 'radium'

export default class extends Component{
	render(){
		return(
			<Modal {...this.props} style={{
				overlay:{background:"rgba(0,0,0,0.5)",
				transition:"all 0.2s"
			},content:{
				width:850,
				height:"auto",
				bottom:"unset",
				right:"unset",
				position:"fixed",
				top:"50%",
				left:"50%",
				transform:"translate(-50%,-50%)",
				transition:"all 0.2s",
				...this.props.style
			}}} />
		)
	}
}