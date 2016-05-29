import React,{Component} from 'react'
import Header from 'my-components/Header'
import Footer from 'my-components/Footer'
import SearchBar from 'my-components/SearchBar'
import MenuBar from 'my-components/MenuBar'
import RightBar from './RightBar'

export default props=>(
	<div>
		<Header />
		<SearchBar />
		<MenuBar active={props.location.pathname=="/"} />
		<div style={{width:1200,margin:"0 auto",minHeight:650}}>{props.children}</div>
		<Footer />
		<RightBar />
	</div>
)

