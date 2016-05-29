import React,{Component} from "react"
import Radium from 'radium'

@Radium
class ListItem extends Component{
	render(){
		return (
			<div {...this.props} style={[
				{lineHeight:1.5,cursor:"pointer",padding:"0px 1em"},
				this.props.active?{background:"#FFE6B0",border:"1px solid #FFB951"}:{border:"1px solid transparent"}
			]}>{this.props.children}</div>
		)
	}
}

export default class extends Component{
	state={selected:null}
	render(){
		var selected=this.props.onChange?this.props.selected:this.state.selected
		var onChange=this.props.onChange?it=>this.props.onChange(it):it=>this.setState({selected:it})
		return (
			<div {...this.props}>
				{(this.props.data||[]).map(it=><ListItem active={selected==it} onClick={()=>onChange(it)}>{it}</ListItem>)}
			</div>
		)
	}
}