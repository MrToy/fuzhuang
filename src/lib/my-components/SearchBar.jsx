import React,{Component} from 'react'
import {Link} from 'react-router'
import Input from 'toy-ui/Input'
import Button from 'toy-ui/Button'
import Icon from 'toy-ui/Icon'

export default class extends Component{
	state={value:""}
	render(){
		return (
			<div onKeyDown={e=>{e.keyCode==13&&this.refs.link.context.router.push("/search.html?word="+this.state.value)}}>
				<div style={{width:1200,margin:"0 auto",padding:10}}>
					<Link to="/">
						<img style={{verticalAlign:"middle",width:100,height:100,margin:"0 30px"}} src={require("./logo.png")} />
					</Link>
					{this.props.text?(
						<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:20,color:"#888",fontSize:35}}>{this.props.text}</div>
					):(
						<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:150}}>
							<Input  labelCollapse size="xl" color="red" placeholder="请输入关键词" style={{width:450}} onChange={e=>this.setState({value:e.target.value})} addRight={(
								<Link ref="link" to={"/search.html?word="+this.state.value}>
									<Button color="red" size="xl" style={{marginRight:0}}>
										<Icon name="search" />搜索
									</Button>
								</Link>
							)} />
						</div>
					)}
				</div>
			</div>
		)
	}
}