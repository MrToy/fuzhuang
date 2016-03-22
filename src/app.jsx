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
				<Route path="/admin"  component={require('react-router-proxy!./admin')} >
					<Route path="info.html" component={require('react-router-proxy!./home/item')} />
				</Route>
				<Route path="*" component={require('react-router-proxy!./home/404')} />
			</Router>
		)
	}
}

ReactDOM.render(<App />,document.getElementById('app'))