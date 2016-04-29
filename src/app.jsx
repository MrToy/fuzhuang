import 'core-js/shim'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,Link,browserHistory} from 'react-router'
import {StyleRoot,Style} from 'radium'


class RouterList extends Component{
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/">
					<IndexRoute component={require('react-router!./main')} />
					<Route path="search.html" component={require('react-router!./main/search')} />
					<Route path="item.html" component={require('react-router!./main/item')} />
					<Route path="login.html" component={require('react-router!./main/login')} />
					<Route path="register.html" component={require('react-router!./main/register')} />
					<Route path="deal.html" component={require('react-router!./main/deal')} />
					<Route path="cashier.html" component={require('react-router!./main/cashier')} />
					<Route path="demo.html" component={require('react-router!./main/demo')} />
				</Route>
				<Route path="/user.html"  component={require('react-router!./user')} >
					<IndexRoute component={require('react-router!./user/info')} />
					<Route path="info.html" component={require('react-router!./user/info')} />
					<Route path="chart.html" component={require('react-router!./user/chart')} />
					<Route path="deal.html" component={require('react-router!./user/deal')} />
					<Route path="serve.html" component={require('react-router!./user/serve')} />
					<Route path="track.html" component={require('react-router!./user/track')} />
					<Route path="diliver.html" component={require('react-router!./user/diliver')} />
					<Route path="shop.html" component={require('react-router!./user/shop')} />
					<Route path="files.html" component={require('react-router!./user/files')} />
					<Route path="config.html" component={require('react-router!./user/config')} />
				</Route>
				<Route path="*" component={require('react-router!./main/404')} />
			</Router>
		)
	}
}

class App extends Component{
	render(){
		return (
			<StyleRoot>
				<Style rules={{
					"*":{boxSizing:"border-box",margin:0,padding:0},
					body:{fontFamily:"Microsoft YaHei,SimSun,Tahoma,Geneva,sans-serif",minWidth:1200},
					a:{color:"#555",textDecoration:"none"},
					"button::-moz-focus-inner,input::-moz-focus-inner":{border: 0,padding:0}
				}} />
				<RouterList />
			</StyleRoot>
		)
	}
}

ReactDOM.render(<App />,document.getElementById('app'))