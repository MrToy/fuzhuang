import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Link} from 'react-router'
import {colors,Footer,Head,TitleBar} from '../home/main'
import Radium from 'radium'

export default class extends Component{
	render(){
		return (
			<div>
				<Head />
				<div style={{padding:"0 30px"}}>
					<TitleBar text>消费足迹</TitleBar>
					<div style={{minHeight:700}}></div>
				</div>
				<Footer />
			</div>
		)
	}
}