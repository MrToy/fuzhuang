import React,{Component} from "react"
import {Box} from './'
import MenuPanel from '../lib/MenuPanel'

export default class extends Component{
	render(){
		return(
			<Box title="商品管理">
				<MenuPanel>
					<div title="商品一览"></div>
				</MenuPanel>
			</Box>
		)
	}
}