import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,Link,browserHistory} from 'react-router'
import {StyleRoot,Style} from 'radium'

class RouterList extends Component{
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/">
					<IndexRoute component={require('react-router-proxy!./home')} />
					<Route path="search.html" component={require('react-router-proxy!./home/search')} />
					<Route path="item.html" component={require('react-router-proxy!./home/item')} />
					<Route path="login.html" component={require('react-router-proxy!./home/login')} />
					<Route path="register.html" component={require('react-router-proxy!./home/register')} />
				</Route>
				<Route path="/admin.html"  component={require('react-router-proxy!./admin')} >
					<IndexRoute component={require('react-router-proxy!./home')} />
				</Route>
				<Route path="/user.html"  component={require('react-router-proxy!./user')} >
					<IndexRoute component={require('react-router-proxy!./user/info')} />
					<Route path="chart.html" component={require('react-router-proxy!./user/chart')} />
					<Route path="deal.html" component={require('react-router-proxy!./user/deal')} />
					<Route path="serve.html" component={require('react-router-proxy!./user/serve')} />
					<Route path="track.html" component={require('react-router-proxy!./user/track')} />
					<Route path="diliver.html" component={require('react-router-proxy!./user/diliver')} />
					<Route path="shop.html" component={require('react-router-proxy!./user/shop')} />
					<Route path="goods.html" component={require('react-router-proxy!./user/goods')} />
					<Route path="files.html" component={require('react-router-proxy!./user/files')} />
				</Route>
				<Route path="*" component={require('react-router-proxy!./home/404')} />
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