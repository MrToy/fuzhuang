import React,{Component} from "react"
import Radium from 'radium'
import {getAdapt} from './values'

@Radium
export default class extends Component{
	static propTypes ={
		sm:React.PropTypes.number,
		md:React.PropTypes.number,
		lg:React.PropTypes.number,
		collapse:React.PropTypes.bool
	}
	render(){
		var ctx=this
		return(
			<div {...this.props}>
				{
					React.Children.map(this.props.children,function(child,i){
						return <div style={[
							...getAdapt.bind(ctx)(key=>({
								float:"left",width:100/key+"%",clear:(i%key==0?"both":"none")
							})),
							ctx.props.collapse?null:{
								padding:"0px 0.5rem 1rem"
							}
						]}>{child}</div>
					})
				}
				<div style={{clear:"both"}}></div>
			</div>
		)
	}
}