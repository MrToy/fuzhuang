import React,{Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'

export default class extends Component{
	render(){
		return (
			<div>
				<Header />
				<TitleBar title={this.props.title} />
				<div style={{width:1200,margin:"0 auto",minHeight:650}}>{this.props.children}</div>
				<Footer />
			</div>
		)
	}	
}
