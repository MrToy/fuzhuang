import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,Link,browserHistory} from 'react-router'
import Main from './home/main'

class App extends Component{
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
				</Route>
				<Route path="*" component={require('react-router-proxy!./home/404')} />
			</Router>
		)
	}
}

ReactDOM.render(<App />,document.getElementById('app'))