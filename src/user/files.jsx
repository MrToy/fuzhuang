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
		var lineStyle=this.props.selected.toString()==place.toString()?{whiteSpace:"nowrap",position:"relative",display:"inline-block",cursor:"pointer",background:"#FFE6B0",padding:"2px 5px",border:"1px solid #FFB951"}:{whiteSpace:"nowrap",position:"relative",display:"inline-block",cursor:"pointer",padding:"2px 5px",border:"1px solid rgba(0,0,0,0)"}
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
							{data.children.map((it,i)=><Tree key={place+i} data={it} selected={this.props.selected} place={place.concat(i)} onSelect={this.props.onSelect} />)}
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
					<FilesEmpty style={{width:150,height:150}} />
					<h2 style={{margin:30}}>本文件暂不支持在线预览</h2>
				</div>
			)
		}
		return <div>{data}</div>
	}
}
class FileMenu extends Component{
	render(){
		return(
			<div>
				<div style={{float:"right",cursor:"pointer",overflow:"hidden",marginRight:20,position:"relative",padding:"0 20px",lineHeight:"30px",background:"#000",color:"#fff",textAlign:"center"}}>
					<input style={{cursor:"pointer",position:"absolute",top:0,left:0,border:"none",background:"none",opacity:0}} type="file"></input>
					<span>上传文件</span>
				</div>
				<div style={{float:"right",cursor:"pointer",marginRight:20,padding:"0 20px",lineHeight:"30px",background:"#000",color:"#fff",textAlign:"center"}}>新建文件夹</div>
				<div style={{clear:"both"}}></div>
			</div>
		)
	}
}

@Radium
class FileManager extends Component{
	constructor(props){
		super(props)
		var data={
			text:"test",
			type:"Folder",
			children:[
				{text:"test-1",type:"Folder",children:[
					{text:"test1-1"},{text:"test1-2"},{text:"test1-1"},{text:"test1-2"},{text:"test1-1"},{text:"test1-2"},{text:"test1-1"},{text:"test1-2"},{text:"test1-1"},{text:"test1-2"},{text:"test1-1"},{text:"test1-2"},{text:"test1-1"},{text:"test1-2"},{text:"test1-1"},{text:"test1-2"}
				]},
				{text:"test-2",type:"Folder",children:[
					{text:"test1-2.jpg",type:"image"},
					{text:"test2-2",type:"Folder",children:[
						{text:"test2-2",type:"Folder",children:[
							{text:"test2-2",type:"Folder",children:[
								{text:"test2-2",type:"Folder",children:[
									{text:"test2-2.jpg",type:"image"}
								]}
							]}
						]}
					]}
				]},
				{text:"test2-2.jpg",type:"image"}
			]
		}
		this.state={data,sel:[]}
	}
	render(){
		return (
			<div style={[{padding:20,position:"relative",border:"1px solid "+colors.line},this.props.style]}>
				<div style={{position:"absolute",top:20,bottom:20,width:180,overflow:"auto",borderRight:"1px solid "+colors.line}}>
					<h4 style={{textAlign:"center",padding:10,margin:"0 20px 10px 10px",borderBottom:"1px solid "+colors.line}} >文件目录</h4>
					<Tree isOpen data={this.state.data} selected={this.state.sel} onSelect={it=>this.setState({sel:it})} />
				</div>
				<div style={{marginLeft:200,height:"100%"}}>
					<div style={{overflow:"auto",whiteSpace:"nowrap",padding:10,borderBottom:"1px solid "+colors.line}}>
						<FileNav data={this.state.data} part={this.state.sel} selected={this.state.sel} noArrow onSelect={it=>this.setState({sel:it})} />
					</div>
					<div style={{whiteSpace:"nowrap",padding:10,borderBottom:"1px solid "+colors.line}}>
						<FileMenu />
					</div>
					<div style={{overflow:"auto",height:"calc(100% - 40px)"}}>
						<FileGrid data={this.state.data} selected={this.state.sel} onSelect={it=>this.setState({sel:it})} />
					</div>
				</div>
			</div>
		)
	}
}

export default class extends Component{
	render(){
		return(
			<Box title="文件管理">
				<FileManager style={{height:500}} />
			</Box>
		)
	}
}