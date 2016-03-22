import React,{Component} from 'react'
import {BodyStyle,Head,Footer} from './main'

export default class extends Component{
	render(){
		return(
			<div>
				<BodyStyle />
				<Head />
				<div style={{height:600,width:1000,margin:"0 auto",padding:"150px 100px"}}>
					<img src={require("./404.jpg")} style={{width:"100%",height:"100%"}} />
				</div>
				<Footer />
			</div>
		)
	}
}