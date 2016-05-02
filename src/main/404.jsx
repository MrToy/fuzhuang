import React,{Component} from 'react'


export default class extends Component{
	render(){
		return(
			<div>
				<div style={{height:600,width:1000,margin:"0 auto",padding:"150px 100px"}}>
					<img src={require("./404.jpg")} style={{width:"100%",height:"100%"}} />
				</div>
			</div>
		)
	}
}