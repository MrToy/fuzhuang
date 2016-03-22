import React,{Component} from 'react'
import {colors,BodyStyle,Head,Footer,TitleBar} from './main'
import Radium from 'radium'
import {Link} from 'react-router'


export default class extends Component{
	render(){
		return(
			<div>
				<BodyStyle />
				<Head />
				<TitleBar text>注册</TitleBar>
				<div style={{height:400,width:1000,margin:"0 auto",padding:"150px 100px"}}>
					开发中～
				</div>
				<Footer />
			</div>
		)
	}
}