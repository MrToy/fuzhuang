import React,{Component} from 'react'
import {Link} from 'react-router'
import Radium from 'radium'

@Radium
export default class extends Component{
	render(){
		return(
			<div style={[{color:"#888",padding:30,background:"#F6F6F6",height:140,borderTop:"1px solid #ccc",textAlign:"center"},this.props.style]}>
				<ul style={{listStyle:"none",marginBottom:20}}>
					<Link to="/">
						<li style={{display:"inline-block",fontSize:14,padding:10}}>首页</li>
					</Link>
					{["关于我们","联系我们","知识产权","著作权与商标声明","法律声明","服务条款","隐私声明"].map(it=>{
						return (
							<Link to="#">
								<li style={{display:"inline-block",fontSize:14,padding:10}}>{it}</li>
							</Link>
						)
					})}
				</ul>
				<p>Copyright © 2016-2020   www.zzwlpf.com   渝ICP备16002503号-1 </p>
			</div>
		)
	}
}