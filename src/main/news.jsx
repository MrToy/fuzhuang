import React,{Component} from 'react'
import InfoBox from '../components/InfoBox'
import dateFormat from 'dateformat'
import Ajax from '../lib/Ajax'
import Editor from '../components/Editor'

export default class extends Component{
	state={data:{}}
	render(){
		var {data,title,createTime,author}=this.state.data
		return(
			<InfoBox title="新闻公告">
				<h2 style={{textAlign:"center",lineHeight:2}}>{title}</h2>
				<p style={{textAlign:"center"}}>
					<span style={{marginRight:100}}>发布日期： {dateFormat(createTime,"yyyy-mm-dd")}</span>
					<span>作者： {author}</span>
				</p>
				<Editor readOnly value={data} />
				<Ajax auto url={"/news/"+this.props.location.query.id} onSuccess={data=>this.setState({data})} />
			</InfoBox>
		)
	}
}