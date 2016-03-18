import React,{Component} from 'react'
import {colors,BodyStyle,Head,LogoBar,Footer,MenuBar,menuData} from './main'
import Radium from 'radium'
export default class extends Component{
	render(){
		return (
			<div>
				<BodyStyle />
				<Head />
				<LogoBar ref="logobar" placeholder={this.props.location.query.word} />
				<MenuBar data={menuData} />
				<div style={{width:1200,margin:"20px auto"}}>
					<div style={{width:978,marginRight:20,display:'inline-block',border:"1px solid "+colors.line}}>233</div>
					<div style={{width:198,display:'inline-block',border:"1px solid "+colors.line}}>233</div>
				</div>	
				<Footer />
			</div>
		)
	}
}