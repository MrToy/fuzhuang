import React,{Component} from 'react'
import {Link,browserHistory} from 'react-router'
import Input from '../../lib/Input'
import Button from '../../lib/Button'
import Search from '../../lib/IconMoon/Search'

export default class extends Component {
	state={value:""}
	onSearch(){
		browserHistory.push("/search.html?word="+this.state.value)
		this.props.onSearch&&this.props.onSearch(this.state.value)
	}
	render(){
		return (
			<div style={{borderBottom:this.props.text?"2px solid #C81624":"none"}}  onKeyDown={e=>{e.keyCode==13&&this.onSearch()}}>
				<div style={{width:1200,margin:"10px auto"}}>
					<Link to="/">
						<img style={{verticalAlign:"middle",width:100,height:100,margin:"0 30px"}} src={require("./logo.png")} />
					</Link>
					{this.props.text?(
						<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:20,color:"#888",fontSize:35}}>{this.props.text}</div>
					):(
						<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:150}}>
							<Input  labelCollapse size="xl" color="red" placeholder="请输入关键词" style={{width:450}} onChange={e=>this.setState({value:e.target.value})} addRight={(
								<Button color="red" onClick={this.onSearch.bind(this)} size="xl" style={{marginRight:0}}>
									<Search />搜索
								</Button>
							)} />
						</div>
					)}
				</div>
			</div>
		)
	}
}