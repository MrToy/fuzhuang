import React,{Component} from "react"
import Radium from 'radium'
import FileManager,{MenuButton} from '../lib/FileManager'
import Modal from './Modal'
import AjaxFileManager from '../lib/AjaxFileManager'
import FormGroup from './FormGroup'
import Button from './Button'

@Radium
export class ImageLine extends Component{
	render(){
		return (
			<div style={[{border:"1px dashed #CCC",padding:10,height:80,overflowX:"auto",whiteSpace:"nowrap"},this.props.style]}>
				{(this.props.data||[]).map(it=>{
					return (
						<div style={{display:"inline-block",padding:5,width:60,height:60,marginRight:20,border:"1px dashed #CCC"}}>
							<img src={it.path} style={{width:"100%",height:"100%"}} />
						</div>
					)
				})}
			</div>
		)
	}
}

export default class ImageFileModal extends Component{
	constructor(props){
		super(props)
		this.state={checked:[]}
	}
	onCheck(data){
		var arr=[]
		data.forEach(it=>{
			if(it.type=="image")
				arr.push(it)
		})
		this.setState({checked:arr})
	}
	onConfirm(){
		if(this.props.onConfirm)this.props.onConfirm(this.state.checked)
	}
	render(){
		return(
			<Modal isOpen={this.props.isOpen}>
				<AjaxFileManager style={{height:350}} onCheck={this.onCheck.bind(this)} />
				<ImageLine data={this.state.checked} style={{marginTop:20,width:650,display:"inline-block",verticalAlign:"top"}} />
				<div style={{width:100,display:"inline-block",verticalAlign:"top",marginTop:20,marginLeft:20}}>
					<MenuButton onClick={this.onConfirm.bind(this)} disable={!this.state.checked.length}>选定</MenuButton>
					<MenuButton onClick={this.props.onCancel} style={{marginTop:20}}>取消</MenuButton>
				</div>
			</Modal>
		)
	}
}

export class FormImageButton extends Component{
	static propTypes ={
		data:React.PropTypes.array,
		onCheck:React.PropTypes.func
	}
	state={isOpen:false}
	onConfirm(data){
		this.setState({isOpen:false})
		this.props.onCheck&&this.props.onCheck(data)
	}
	render(){
		return (
			<FormGroup>
				<Button collapse onClick={()=>this.setState({isOpen:true})}>选择图片</Button>
				<ImageFileModal onConfirm={this.onConfirm.bind(this)} onCancel={()=>this.setState({isOpen:false})} isOpen={this.state.isOpen} />
				<ImageLine data={this.props.data} style={{margin:"5px 0 0 0"}} />
			</FormGroup>
		)
	}
}