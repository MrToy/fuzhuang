import React,{Component} from "react"
import ReactDOM from "react-dom"
import {Box} from './'
import {colors} from '../home/main'
import {FilesEmpty,Folder,FolderOpen,FilePicture,Plus,Minus} from '../home/icons'
import Radium from 'radium'

class Tree extends Component{
	constructor(props){
		super(props)
		this.state={isOpen:this.props.isOpen||false}
	}
	select(place){
		if(this.props.onSelect)this.props.onSelect(place)
	}
	render(){
		var Icon=FilesEmpty
		var data=this.props.data
		var place=this.props.place||[]
		var lineStyle=this.props.selected.toString()==place.toString()?{position:"relative",display:"inline-block",cursor:"pointer",background:"#FFE6B0",padding:"2px 5px",border:"1px solid #FFB951"}:{position:"relative",display:"inline-block",cursor:"pointer",padding:"2px 5px",border:"1px solid rgba(0,0,0,0)"}
		var FolderIcon=this.state.isOpen?Minus:Plus
		switch(data.type){
			case "Folder":
				Icon=this.state.isOpen?FolderOpen:Folder
				break
			case "image":
				Icon=FilePicture
				break
		}
		return (
			<div style={{marginLeft:20}}>
				<p style={lineStyle} onClick={()=>this.select(place)} >
					{data.type=="Folder"?<FolderIcon onClick={()=>this.setState({isOpen:!this.state.isOpen})} style={{padding:4,cursor:"pointer",position:"absolute",left:-20,width:10,height:10,marginRight:5}} />:null}
					<Icon style={{width:15,height:15,marginRight:5}} />
					<span>{data.text}</span>
				</p>
				{
					data.children&&data.children.length?(
						<div style={{display:data.type=="Folder"&&!this.state.isOpen?"none":"block"}}>
							{data.children.map((it,i)=><Tree key={it+i} data={it} selected={this.props.selected} place={place.concat(i)} onSelect={this.props.onSelect} />)}
						</div>
					):null
				}
			</div>
		)
	}
}

class FileNav extends Component{
	select(len){
		var selected=this.props.selected.slice(0,this.props.selected.length-len)
		if(this.props.onSelect)this.props.onSelect(selected)
	}
	render(){
		var part=this.props.part.slice(0)
		var data=this.props.data
		var len=part.length
		return (
			<span>
				{this.props.noArrow?null:<span style={{margin:10}}>></span>}
				<span onClick={()=>this.select(len)} style={!part.length?{cursor:"pointer",background:"#FFE6B0",padding:"2px 5px",border:"1px solid #FFB951"}:{cursor:"pointer",padding:"2px 5px"}}>{data.text}</span>
				{part.length?<FileNav data={data.children[part.shift()]} part={part} selected={this.props.selected} onSelect={this.props.onSelect} />:null}
			</span>
		)
	}
}

class FileGrid extends Component{
	select(place){
		if(this.props.onSelect)this.props.onSelect(place)
	}
	render(){
		function recur(data,selected){
			var selected=selected.slice(0)
			return selected.length?recur(data.children[selected.shift()],selected):data
		}
		var node=recur(this.props.data,this.props.selected)
		var data
		if(node.type=="Folder"){
			data=node.children.map((it,i)=>{
				var Icon=FilesEmpty
				switch(it.type){
					case "Folder":
						Icon=Folder
						break
					case "image":
						Icon=FilePicture
						break
				}
				return (
					<div onClick={()=>this.select(this.props.selected.concat(i))} style={{cursor:"pointer",textAlign:"center",margin:30,display:"inline-block"}}>
						<Icon style={{width:50,height:50}} />
						<p>{it.text}</p>
					</div>
				)
			})
		}else{
			data=(
				<div style={{margin:30}}>
					<h2 style={{margin:30}}>文件详情,略</h2>
					<FilesEmpty style={{width:150,height:150}} />
				</div>
			)
		}
		return <div>{data}</div>
	}
}

class FileManager extends Component{
	constructor(props){
		super(props)
		var data={
			text:"test",
			type:"Folder",
			children:[
				{text:"test-1",type:"Folder",children:[
					{text:"test1-1"},{text:"test1-2"}
				]},
				{text:"test-2",type:"Folder",children:[
					{text:"test1-2.jpg",type:"image"},
					{text:"test2-2",type:"Folder",children:[
						{text:"test2-2.jpg",type:"image"}
					]}
				]}
			]
		}
		this.state={data,sel:[]}
	}
	render(){
		return (
			<div style={{height:500}}>
				<div style={{display:"inline-block",verticalAlign:"top"}}>
					<h4 style={{marginLeft:30}} >文件目录</h4>
					<input style={{margin:20}} />
					<Tree isOpen data={this.state.data} selected={this.state.sel} onSelect={it=>this.setState({sel:it})} />
				</div>
				<div style={{display:"inline-block",verticalAlign:"top",marginLeft:30,width:900}}>
					<div style={{padding:"0 20px 20px 20px",borderBottom:"1px solid "+colors.line}}>
						<FileNav data={this.state.data} part={this.state.sel} selected={this.state.sel} noArrow onSelect={it=>this.setState({sel:it})} />
					</div>
					<FileGrid data={this.state.data} selected={this.state.sel} onSelect={it=>this.setState({sel:it})} />
				</div>
			</div>
		)
	}
}

export default class extends Component{
	render(){
		return(
			<Box title="文件管理">
				<FileManager />
			</Box>
		)
	}
}