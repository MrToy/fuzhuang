import React,{Component} from "react"
import ReactDOM from "react-dom"
import {AppBar,List,ListItem,IconButton} from "material-ui"
import {ActionGrade,ActionHome} from 'material-ui/lib/svg-icons'
import {Link} from 'react-router'
import {BodyStyle,colors,Footer} from '../home/main'
export default class App extends Component{
	render(){return(
		<div style={{minWidth:1000}}>
			<BodyStyle />
			<AppBar title={<Link to="/" style={{color:"#fff"}}>第壹印象</Link>} style={{background:colors.primary}} iconElementLeft={<IconButton><ActionHome /></IconButton>} />
			<div style={{position:"relative"}}>
				<List style={{width:200,background:"#333",position:"absolute",top:0,bottom:0,overflow:"auto"}}>
					<ListItem primaryText="test" style={{color:"#fff"}} leftIcon={<ActionGrade />} />
					<ListItem primaryText="test" style={{color:"#fff"}} leftIcon={<ActionGrade />} />
				</List>
				<div style={{background:colors.bg,minHeight:900}}>233</div>
			</div>
			<Footer style={{background:"#000",borderTop:"none"}} />
  		</div>
	)}
}