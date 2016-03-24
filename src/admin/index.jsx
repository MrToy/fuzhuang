import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Link} from 'react-router'
import {BodyStyle,colors,Footer,Head,TitleBar} from '../home/main'
export default class App extends Component{
	render(){return(
		<div style={{minWidth:1000}}>
			<BodyStyle />
			<Head />
			<Footer />
  		</div>
	)}
}