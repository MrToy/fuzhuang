import React,{Component} from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default class extends Component{
	render(){
		return(
			<div>
				<Header />
				<div style={{height:600,width:1000,margin:"0 auto",padding:"150px 100px"}}>
					<img src={require("./404.jpg")} style={{width:"100%",height:"100%"}} />
				</div>
				<Footer />
			</div>
		)
	}
}