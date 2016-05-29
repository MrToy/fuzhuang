import React,{Component} from "react"
import Button from './Button'

export default class extends Component{
	static propTypes ={
		color:React.PropTypes.string,
		size:React.PropTypes.string,
		active:React.PropTypes.bool,
		disable:React.PropTypes.bool,
		full:React.PropTypes.bool,
		border:React.PropTypes.bool,
		multiple:React.PropTypes.bool,
		onFile:React.PropTypes.func
	}
	render(){
		return(
			<Button {...this.props} onClick={()=>this.refs.file.click()}>
				{this.props.children}
				<input ref="file" type="file" multiple={this.props.multiple} onChange={e=>this.props.onFile&&this.props.onFile(e.target.files)} style={{display:"none"}}></input>
			</Button>
		)
	}
}