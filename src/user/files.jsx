import React,{Component} from "react"
import {Box} from './'
import Modal from 'react-modal'
import AjaxFileManager from '../components/AjaxFileManager'

export default class extends Component{
	render(){
		return(
			<Box title="文件管理">
				<AjaxFileManager style={{height:500,minWidth:800}} />
			</Box>
		)
	}	
}