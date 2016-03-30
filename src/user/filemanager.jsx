import React,{Component} from "react"
import Radium from 'radium'
import {FilesEmpty,Folder,FolderOpen,FilePicture,Plus,Minus,CheckMark,CheckMark2} from '../home/icons'

function getIcon(type){
	var icon=FilesEmpty
	if(type.match(/image/))
		icon=FilePicture
	switch(type){
		case "folder":
			icon=Folder
			break
		case "folderOpen":
			icon=Folder
			break

	}
	return icon
}
class Tree extends Component{
	constructor(props){
		super(props)
		this.state={isOpen:this.props.isOpen||false}
	}
	select(place){
		if(this.props.onSelect)this.props.onSelect(place)
	}
	render(){
		var data=this.props.data
		var place=this.props.place||[]
		var lineStyle=this.props.selected.toString()==place.toString()?{whiteSpace:"nowrap",position:"relative",display:"inline-block",cursor:"pointer",background:"#FFE6B0",padding:"2px 5px",border:"1px solid #FFB951"}:{whiteSpace:"nowrap",position:"relative",display:"inline-block",cursor:"pointer",padding:"2px 5px",border:"1px solid rgba(0,0,0,0)"}
		var FolderIcon=this.state.isOpen?Minus:Plus
		var Icon=getIcon(data.type)
		if(data.type=="folder"&&this.state.isOpen){
			Icon=getIcon("folderOpen")
		}
		return (
			<div style={{marginLeft:20}}>
				<p style={lineStyle} onClick={()=>this.select(place)} >
					{data.type=="folder"?<FolderIcon onClick={()=>this.setState({isOpen:!this.state.isOpen})} style={{padding:4,cursor:"pointer",position:"absolute",left:-20,width:10,height:10,marginRight:5}} />:null}
					<Icon style={{width:15,height:15,marginRight:5}} />
					<span>{data.text}</span>
				</p>
				{
					data.children&&data.children.length?(
						<div style={{display:data.type=="folder"&&!this.state.isOpen?"none":"block"}}>
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

@Radium
class FileInfo extends Component{
	render(){
		var it=this.props.data
		var Icon=getIcon(it.type)
		var checked=this.props.checked
		var CheckIcon=checked?CheckMark:CheckMark2
		var isHover=Radium.getState(this.state,'box',':hover')
		return(
			<div ref="box" style={{":hover":{},position:"relative",display:"inline-block",verticalAlign:"top",margin:20,padding:10,border:"2px solid "+(checked||isHover?"#AAA":"rgba(0,0,0,0)")}}>
				{checked||isHover?<CheckIcon onClick={this.props.onCheck} style={{fill:"#AAA",cursor:"pointer",width:20,height:20,position:"absolute",right:3,top:3}} />:null}
				<div onClick={this.props.onClick} style={{cursor:"pointer",textAlign:"center"}}>
					<Icon style={{width:50,height:50}} />
					<p style={{width:80,overflow:"hidden",textOverflow:"ellipsis"}}>{it.text}</p>
				</div>
			</div>
		)
	}
}

class FileGrid extends Component{
	render(){
		function recur(data,selected){
			var selected=selected.slice(0)
			return selected.length?recur(data.children[selected.shift()],selected):data
		}
		var node=recur(this.props.data,this.props.selected)
		var data
		if(node.type=="folder"){
			data=node.children.map((it,i)=>{
				return <FileInfo checked={this.props.checked.indexOf(it.id)>-1} onCheck={()=>this.props.onCheck(it.id)} data={it} onClick={()=>this.props.onSelect(this.props.selected.concat(i))} />
			})
		}else if(node.type.match(/image/)){
			data= <img src={node.path} />
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

@Radium
class MenuButton extends Component{
	render(){
		return <div title={this.props.disable?"请选择一个文件":null} onClick={this.props.disable?null:this.props.onClick} style={[{cursor:this.props.disable?"not-allowed":"pointer",padding:"0 20px",lineHeight:"30px",background:this.props.disable?"#888":"#000",color:"#fff",textAlign:"center"},this.props.style]}>{this.props.children}</div>
	}
}

@Radium
class MenuFileButton extends Component{
	render(){
		return (
			<MenuButton disable={this.props.disable} style={[{overflow:"hidden",position:"relative"},this.props.style]}>
				{this.props.disable?null:<input multiple onChange={e=>this.props.onFile(e.target.files)} style={{cursor:"pointer",position:"absolute",top:0,left:0,border:"none",background:"none",opacity:0}} type="file"></input>}
				<span>{this.props.children}</span>
			</MenuButton>
		)
	}
}

@Radium
export default class extends Component{
	constructor(props){
		super(props)
		this.state={sel:[],checked:[]}
	}
	select(place){
		this.setState({sel:place,checked:[]})
	}
	getIndex(){
		function recur(data,selected){
			var selected=selected.slice(0)
			return selected.length?recur(data.children[selected.shift()],selected):data
		}
		return recur(this.props.data,this.state.sel)
	}
	onCheck(id){
		if(this.state.checked.indexOf(id)>-1){
			var arr1=this.state.checked.slice(0,this.state.checked.indexOf(id))
			var arr2=this.state.checked.slice(this.state.checked.indexOf(id)+1,this.state.checked.length)
			var arr=arr1.concat(arr2)
			this.setState({checked:arr})
		}else{
			var arr=this.state.checked.slice(0)
			arr.push(id)
			this.setState({checked:arr})
		}
		if(this.props.onCheck)this.props.onCheck(this.state.checked)
	}
	async onDel(){
		await this.props.onDel()
		this.setState({checked:[]})
	}
	render(){
		return (
			<div style={[{padding:20,position:"relative",border:"1px solid #CCC"},this.props.style]}>
				<div style={{position:"absolute",top:20,bottom:20,width:180,overflow:"auto",borderRight:"1px solid #CCC"}}>
					<h4 style={{textAlign:"center",padding:10,margin:"0 20px 10px 10px",borderBottom:"1px solid #CCC"}} >文件目录</h4>
					<Tree isOpen data={this.props.data} selected={this.state.sel} onSelect={it=>this.select(it)} />
				</div>
				<div style={{marginLeft:200,height:"100%"}}>
					<div style={{overflow:"auto",whiteSpace:"nowrap",padding:10,borderBottom:"1px solid #CCC"}}>
						<FileNav data={this.props.data} part={this.state.sel} selected={this.state.sel} noArrow onSelect={it=>this.select(it)} />
					</div>
					<div style={{whiteSpace:"nowrap",padding:10,borderBottom:"1px solid #CCC"}}>
						<MenuButton disable={!this.state.checked.length} onClick={this.onDel.bind(this)} style={{marginRight:20,float:"right"}}>删除</MenuButton>
						<MenuButton disable={this.getIndex().type!="folder"} onClick={this.props.onAdd} style={{marginRight:20,float:"right"}}>新建文件夹</MenuButton>
						<MenuButton disable={this.state.checked.length!=1} onClick={this.props.onRename} style={{marginRight:20,float:"right"}}>重命名</MenuButton>						
						<MenuFileButton disable={this.getIndex().type!="folder"} onFile={this.props.onUpload} style={{marginRight:20,float:"right"}}>上传文件</MenuFileButton>
						<div style={{clear:"both"}}></div>
					</div>
					<div style={{overflow:"auto",height:"calc(100% - 40px)"}}>
						<FileGrid checked={this.state.checked} data={this.props.data} selected={this.state.sel} onSelect={this.select.bind(this)} onCheck={this.onCheck.bind(this)} />
					</div>
				</div>
			</div>
		)
	}
}