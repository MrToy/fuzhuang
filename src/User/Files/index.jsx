import React,{Component} from "react"
import Modal from 'react-modal'
import AjaxFileManager from 'my-components/AjaxFileManager'

export default class extends Component{
	render(){
		return(
				<AjaxFileManager style={{height:500,minWidth:800}} />
		)
	}	
}