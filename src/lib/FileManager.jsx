import React,{Component} from "react"
import Radium from 'radium'

import Card from './Card'
import Col from './Col'
import {Tree,InlineTree,getIcon} from './Tree'
import Button from './Button'
import FileButton from './FileButton'

@Radium
class FileNode extends Component{
	static propTypes ={
		name:React.PropTypes.string,
		type:React.PropTypes.string,
		active:React.PropTypes.bool,
		onClick:React.PropTypes.func
	}
	render(){
		var Icon=getIcon(this.props.type,this.state.isOpen)
		return (
			<div style={[
				{
					userSelect:"none",whiteSpace:"nowrap",
					overflow:"hidden",textOverflow:"ellipsis",
					display:"inline-block",
					padding:10,margin:10,
					width:100,height:100,
					textAlign:"center"
				},
				this.props.active?{background:"#FFE6B0",border:"1px solid #FFB951"}:{border:"1px solid transparent"}
			]} onClick={this.props.onClick} onDoubleClick={this.props.onDoubleClick}>
				<div style={{fontSize:"3em",":hover":{filter:"contrast(2)"}}}>
					<Icon />
				</div>
				{this.props.name}
			</div>
		)
	}
}
class FileGrid extends Component{
	static propTypes ={
		data:React.PropTypes.array.isRequired,
		dir:React.PropTypes.string,
		selected:React.PropTypes.string,
		onSelect:React.PropTypes.func,
		onDir:React.PropTypes.func
	}
	render(){
		return (
			<div>

			</div>
		)
	}
}

export default class extends Component{
	static propTypes ={
		data:React.PropTypes.array,
		buttons:React.PropTypes.array
	}
	state={selected:null,dir:null}
	render(){
		var config={
			data:[{key:null,name:"root",type:"folder",parent:"root"},...this.props.data],
			selected:this.state.selected,
			onSelect:selected=>this.setState({selected}),
			onDir:dir=>this.setState({dir})
		}
		var type=config.data.find(it=>it.key==this.state.selected).type
		return (
			<Card full style={this.props.style} color={this.props.color}>
				<div style={{overflow:"auto",whiteSpace:"nowrap",padding:8,marginBottom:10,borderBottom:"1px solid"}}>
					<InlineTree {...config} />
				</div>
				<Col sm={3} style={{height:"calc(100% - 45px)"}}>
					<div style={{overflow:"auto",height:"100%"}}>
					<Tree {...config} />
					</div>
				</Col>
				<Col sm={9} style={{borderLeft:"1px solid",height:"calc(100% - 45px)"}}>
					<div style={{whiteSpace:"nowrap",paddingBottom:10,borderBottom:"1px solid"}}>
						<div style={{float:"right"}}>
							<FileButton disable={type!="folder"}>上传</FileButton>
							<Button disable={type!="folder"}>新建文件夹</Button>
							<Button color={this.props.color}>重命名</Button>
							<Button color={this.props.color}>删除</Button>
						</div>
						<div style={{clear:"both"}}></div>
					</div>
					<div style={{overflow:"auto",height:"100%"}}>
						{config.data.filter(it=>it.parent==this.state.dir).map(it=>(
							<FileNode active={this.state.selected==it.key} {...it} onClick={()=>config.onSelect(it.key)} onDoubleClick={()=>{
								it.type=="folder"&&config.onDir(it.key)
							}} />
						))}
					</div>
				</Col>
			</Card>
		)
	}
}