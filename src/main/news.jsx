import React,{Component} from 'react'
import InfoBox from '../components/InfoBox'

export default class extends Component{
	render(){
		return(
			<InfoBox title="页面未找到">
				<img src={require("./404.jpg")} style={{width:"100%",height:"100%"}} />
			</InfoBox>
		)
	}
}