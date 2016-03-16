import React,{Component} from 'react'
import {colors} from './main'
export default class extends Component{
	render(){
		return (
			<div style={{minHeight:800,borderTop:"3px solid "+colors.primary}}>
			{this.props.location.query.word}
			</div>
		)
	}
}
