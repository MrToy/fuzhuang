import React,{Component} from 'react'
import Header from 'my-components/Header'
import Footer from 'my-components/Footer'
import TitleBar from 'my-components/TitleBar'
import MenuBar from 'my-components/MenuBar'
import BackToTop from 'toy-ui/BackToTop'

export default class extends Component{
	render(){
		return (
			<div>
				<Header />
				<TitleBar title={this.props.title} />
				<div style={{width:1200,margin:"0 auto",minHeight:650}}>{this.props.children}</div>
				<Footer />
				<BackToTop />
			</div>
		)
	}	
}
