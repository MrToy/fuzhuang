import React,{Component} from "react"
import Radium from 'radium'
import {FileBar} from '../lib/FileManager'
import Modal from '../lib/Modal'
import AjaxFileManager from './AjaxFileManager'
import Button from '../lib/Button'
import ArrowDown from '../lib/IconMoon/ArrowDown'
import Cross from '../lib/IconMoon/Cross';

class FileModal extends Component{
	state={selected:null,dump:null}
	render(){
		var filterPass=this.props.filter?(this.state.selected&&this.state.selected.type?this.state.selected.type.match(new RegExp(this.props.filter)):false):true
		var repeatPass=this.state.selected?!this.props.checked.find(it=>it.key==this.state.selected.key):false
		return(
			<Modal {...this.props} style={{width:910}}>
				<div style={{textAlign:"right",marginBottom:10}}>
					<span onClick={this.props.onRequestClose} style={{cursor:"pointer"}}><Cross /></span>
				</div>
				<AjaxFileManager style={{height:400,minWidth:800}} onSelect={selected=>this.setState({selected})} />
				<div style={{marginTop:10,textAlign:"center"}}>
					<Button color="warning" disable={!this.state.selected||!filterPass||!repeatPass} onClick={()=>{
						this.props.onCheck([...this.props.checked,this.state.selected])
					}}><ArrowDown /></Button>
					<Button color="danger" disable={!this.state.dump} onClick={()=>{
						this.props.onCheck(this.props.checked.filter(it=>it.key!=this.state.dump))
					}}><Cross /></Button>
				</div>
				<FileBar data={this.props.checked} style={{marginTop:10}} onSelect={dump=>this.setState({dump})} />
			</Modal>
		)
	}
}

export default class extends Component{
	static propTypes ={
		checked:React.PropTypes.array,
		onCheck:React.PropTypes.func,
		noBar:React.PropTypes.bool
	}
	state={isOpen:false,checked:[]}
	render(){
		var checked=this.props.onCheck?this.props.checked:this.state.checked
		return (
			<span>
				<Button style={this.props.style} onClick={()=>this.setState({isOpen:true})}>{this.props.children}</Button>
				<FileModal checked={checked} onCheck={checked=>{
					this.setState({checked})
					this.props.onCheck&&this.props.onCheck(checked)
				}} filter="image" onRequestClose={()=>this.setState({isOpen:false})} isOpen={this.state.isOpen} />
				{!this.props.noBar&&<FileBar data={checked} style={{marginTop:10}} />}
			</span>
		)
	}
}