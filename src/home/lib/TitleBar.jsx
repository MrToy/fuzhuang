import React,{Component} from 'react'
import {Link} from 'react-router'
import Input from '../../lib/Input'
import {Search} from '../../lib/IconMoon'

export default class extends Component {
	state={value:""}
	render(){
		return (
			<div style={{borderBottom:this.props.text?"2px solid #C81624":"none"}}>
				<div style={{width:1200,margin:"0 auto"}}>
					<Link to="/">
						<img style={{verticalAlign:"middle",width:100,height:100,margin:"0 30px"}} src={require("./logo.png")} />
					</Link>
					{this.props.text?(
						<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:20,color:"#888",fontSize:35}}>{this.props.text}</div>
					):(
						<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:150}}>
							<Input size="xl" color="red" placeholder="" style={{width:450}} onChange={e=>this.setState({value:e.target.value})} addRight={(
								<Link to={"/search.html?word="+this.state.value} style={{color:"inherit"}}>
									<Search />搜索
								</Link>
							)} />
						</div>
					)}
				</div>
			</div>
		)
	}
}