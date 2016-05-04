import React,{Component} from "react"
import Radium from 'radium'
import store from 'store'

import Card from './Card'
import Col from './Col'
import {Tree,InlineTree,getIcon} from './Tree'
import Button from './Button'
import FileButton from './FileButton'
import Modal from './Modal'
import Icon from '../lib/Icon'

@Radium
class FileNode extends Component{
	static propTypes ={
		name:React.PropTypes.string,
		type:React.PropTypes.string,
		active:React.PropTypes.bool,
		onClick:React.PropTypes.func
	}
	render(){
		var ico=getIcon(this.props.type,this.state.isOpen)
		// var dropfn=this.props.type=="folder"?{
		// 	onDrop:e=>{
		// 		e.preventDefault();
		// 		console.log(e.dataTransfer.getData("Text"))
		// 	},
		// 	onDragOver:e=>e.preventDefault()
		// }:{}
		//draggable onDragStart={e=>e.dataTransfer.setData("Text",this.props.id)}
		return (
			<div style={[
				{
					userSelect:"none",whiteSpace:"nowrap",
					overflow:"hidden",textOverflow:"ellipsis",
					display:"inline-block",
					padding:5,margin:5,
					width:92,height:92,
					textAlign:"center"
				},
				this.props.active?{background:"#FFE6B0",border:"1px solid #FFB951"}:{border:"1px solid transparent"}
			]} onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>
				<div style={{fontSize:"3em",":hover":{opacity:0.7}}}>
					{this.props.path&&this.props.type.match(/image/)?<img style={{width:48,height:48,display:"inline-block"}} src={"/files/image"+this.props.path+"?w=48&h=48"} />:ico}
				</div>
				{this.props.name}
			</div>
		)
	}
}

@Radium
export class FileBar extends Component{
	static propTypes ={
		data:React.PropTypes.array,
		onSelect:React.PropTypes.func
	}
	state={selected:null}
	render(){
		return (
			<div style={[{border:"1px dashed #CCC",minHeight:108,overflowX:"auto",whiteSpace:"nowrap"},this.props.style]}>
				{(this.props.data||[]).map(it=>(
					<FileNode active={this.state.selected==it.key} {...it} onClick={()=>{
						this.setState({selected:it.key})
						this.props.onSelect&&this.props.onSelect(it.key)
					}} />
				))}
			</div>
		)
	}
}

class FileViewer extends Component{
	render(){
		var it=this.props.data||{}
		return (
			<Modal {...this.props}>
				<span onClick={this.props.onRequestClose} style={{cursor:"pointer",float:"right"}}><Icon name="close2" /></span>
				<span style={{clear:"both"}}></span>
				{it.type=="image/jpeg"?(
					<img style={{height:500,display:"block",margin:"0 auto"}} src={it.path} />
				):(
					<p>当前文件不支持预览</p>
				)}
			</Modal>
		)
	}
}

export default class FileManager extends Component{
	static propTypes ={
		data:React.PropTypes.array,
		selected:React.PropTypes.string,
		dir:React.PropTypes.string,
		onUpload:React.PropTypes.func,
		onMkdir:React.PropTypes.func,
		onRename:React.PropTypes.func,
		onDel:React.PropTypes.func,
		onMove:React.PropTypes.func,
		onDir:React.PropTypes.func,
		onSelect:React.PropTypes.func
	}
	state={selected:null,dir:null,isOpen:false,dump:null}
	render(){
		var onDir=dir=>{
			this.setState({dir})
			this.props.onDir&&this.props.onDir(dir)
		}
		var config={
			data:[{key:null,type:"folder",parent:"root"},...this.props.data],
			selected:this.props.onSelect?(this.props.selected||{})._id:this.state.selected,
			dir:this.props.onDir?this.props.dir:this.state.dir,
			onSelect:selected=>{
				this.setState({selected})
				var it=config.data.find(it=>it.key==selected)
				it.type=="folder"?onDir(it.key):onDir(it.parent)
				this.props.onSelect&&this.props.onSelect(selected)
			}
		}
		var it=config.data.find(it=>it.key==config.selected)||{}
		return (
			<Card full style={[this.props.style]} color={this.props.color}>
				<div style={{overflow:"auto",whiteSpace:"nowrap",paddingBottom:8,paddingTop:2,marginBottom:8,borderBottom:"1px solid"}}>
					<InlineTree {...config} />
				</div>
				<Col sm={3} collapse style={{height:"calc(100% - 35px)"}}>
					<div style={{overflow:"auto",height:"100%",padding:2}}><Tree {...config} /></div>
				</Col>
				<Col sm={9} collapse style={{borderLeft:"1px solid",paddingLeft:10,height:"calc(100% - 35px)"}}>
					<div style={{whiteSpace:"nowrap",paddingBottom:10,borderBottom:"1px solid"}}>
						<div style={{float:"right"}}>
							{this.state.dump?(
								<span>
									<Button onClick={()=>{
										this.props.onMove(this.state.dump)
										this.setState({dump:null})
									}} disable={this.state.dump==config.dir||config.data.find(it=>it.key==this.state.dump).parent==config.dir} color="warning" >粘贴</Button>
									<Button onClick={()=>this.setState({dump:null})} color="default" >取消</Button>
								</span>
							):(
								<Button onClick={()=>this.setState({dump:config.selected})} disable={!config.selected} >剪切</Button>
							)}
							<FileButton multiple onFile={this.props.onUpload} >上传</FileButton>
							<Button onClick={this.props.onMkdir} >新建文件夹</Button>
							<Button onClick={this.props.onRename} disable={!config.selected} >重命名</Button>
							<Button onClick={this.props.onDel} disable={!config.selected} color="danger">删除</Button>
						</div>
						<div style={{clear:"both"}}></div>
					</div>
					<div style={{overflow:"auto",height:"calc(100% - 65px)"}}>
						{config.data.filter(it=>it.parent==config.dir).map(it=>(
							<FileNode active={config.selected==it.key} {...it} id={it.key} onClick={()=>{
								this.setState({selected:it.key})
								this.props.onSelect&&this.props.onSelect(it.key)		
							}} onDoubleClick={()=>{
								it.type=="folder"?onDir(it.key):this.setState({isOpen:true})
							}} />
						))}
					</div>
					<p style={{textAlign:"right"}}>
						<span>{it.name}</span>
						{it.size&&<span style={{marginLeft:20}}>({Math.round(it.size/102.4)/10}kb)</span>}
					</p>
					<FileViewer data={it} isOpen={this.state.isOpen} onRequestClose={()=>this.setState({isOpen:false})} />
				</Col>
			</Card>
		)
	}
}
