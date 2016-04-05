import React,{Component} from "react"
import {VelocityComponent} from 'velocity-react'
import Radium from 'radium'
import {CircleLeft,CircleRight} from './icons'

@Radium
export default class extends Component{
	static propTypes ={
		total:React.PropTypes.number,
		button:React.PropTypes.bool,
		list:React.PropTypes.bool
	}
	state={index:0}
	componentDidMount(){
		this.start()
	}
	componentWillUnmount(){
		this.stop()
	}
	start(){
		this.timer=setInterval(()=>{
			if(Radium.getState(this.state,'box',':hover'))return
			this.next()
		},5000)
	}
	stop(){
		clearInterval(this.timer)
	}
	next(){
		this.stop()
		this.setState({index:this.state.index+(this.props.total||1)+1>this.props.children.length?0:this.state.index+1})
		this.start()
	}
	pre(){
		this.stop()
		this.setState({index:this.state.index<1?this.props.children.length-(this.props.total||1):this.state.index-1})
		this.start()
	}
	render(){
		var width=(this.props.style||{}).width||600
		var height=(this.props.style||{}).height||300
		var total=this.props.total||1
		return (
			<div ref="box"  style={{":hover":{},width,height,marginBottom:20,position:"relative",overflow:"hidden"}}>
				<VelocityComponent animation={{marginLeft:-width/total*this.state.index}} duration={1000}>
					<div style={{width:width/total*(this.props.children.length+1),height:"100%"}}>
						{React.Children.map(this.props.children,(child)=>{
							return <div style={{display:"inline-block",width:width/total,height}}>{child}</div>
						})}
					</div>
				</VelocityComponent>
				{this.props.button&&<CircleLeft onClick={this.pre.bind(this)} style={{background:"rgba(0,0,0,0.1)",fill:"#fff",":hover":{fill:"#888"},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:10,position:"absolute",top:0,bottom:0,margin:"auto",width:70,height:70}} />}	
				{this.props.button&&<CircleRight onClick={this.next.bind(this)} style={{background:"rgba(0,0,0,0.1)",fill:"#fff",":hover":{fill:"#888"},display:Radium.getState(this.state,'box',':hover')?"block":"none",cursor:"pointer",padding:10,position:"absolute",right:0,top:0,bottom:0,margin:"auto",width:70,height:70}} />}
				{this.props.list&&(
					<ul style={{listStyle:"none",position:"absolute",bottom:20,right:20}}>
						{React.Children.map(this.props.children.slice(0,this.props.children.length-total+1),(child,i)=>{
							return <li key={"item"+i} onClick={()=>this.setState({index:i})} style={{cursor:"pointer",width:18,height:18,border:"1px solid #fff",margin:"0 5px",borderRadius:10,display:"inline-block",background:this.state.index==i?"#888":"rgba(200,200,200,0.3)",":hover":this.state.index==i?{}:{background:"rgba(200,200,200,0.6)"}}}></li>
						})}
					</ul>
				)}
			</div>
		)
	}
}