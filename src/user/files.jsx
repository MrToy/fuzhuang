import React,{Component} from "react"
import UserBox from '../components/UserBox'
import Modal from 'react-modal'
import AjaxFileManager from '../components/AjaxFileManager'

export default class extends Component{
	render(){
		return(
			<UserBox title="文件管理">
				<AjaxFileManager style={{height:500,minWidth:800}} />
			</UserBox>
		)
	}	
}