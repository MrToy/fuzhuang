import React,{Component} from 'react'
import style from './index.styl'

export default class extends Component{
	render(){
		return (
			<span style={this.props.style} className={style.box} dangerouslySetInnerHTML={{__html:this.props.content}} />
		)
	}
} 