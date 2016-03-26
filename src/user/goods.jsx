import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Box,MenuPanel} from './'

class DataTable extends Component{
	render(){
		return(
			<div {...this.props}>
				2333
			</div>
		)
	}
} 

export default class extends Component{
	render(){
		return(
			<Box title="店铺管理">
				<MenuPanel>
					<DataTable title="发布商品" />
					<DataTable title="出售中的商品" />
					<DataTable title="已删除商品" />
				</MenuPanel>
			</Box>
		)
	}
}