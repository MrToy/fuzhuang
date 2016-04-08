import React,{Component} from "react"
import Radium from 'radium'

@Radium
export default class extends Component{
	static propTypes ={
		data:React.PropTypes.array,
		keys:React.PropTypes.array,
		compact:React.PropTypes.bool
	}
	render(){
		var styles=[
			{
				textAlign:"left",
				borderSpacing:0,
				padding:this.props.compact?2:7
			},
			this.props.border?{border:"1px solid #DDD"}:{borderBottom:"1px solid #DDD"}
		]
		var {data,keys}=this.props
		return(
			<table style={{width:"100%",overflow:"hidden",borderCollapse:"collapse"}}>
				<thead>
					<tr>
						{(keys||[]).map(it=>{
							return <th style={styles}>{it}</th>
						})}
					</tr>
				</thead>
				<tbody>
					{(data||[]).map(it=>(
						<tr>
							{(it||[]).map(itit=>(
								<td style={styles}>{itit}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}