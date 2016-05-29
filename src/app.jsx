import 'core-js/shim'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,Link,browserHistory} from 'react-router'
import './app.styl'

class App extends Component{
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={require('react-router!./Main')} >
					<IndexRoute component={require('react-router!./Main/Index')} />
					<Route path="search.html" component={require('react-router!./Main/Search')} />
					<Route path="item.html" component={require('react-router!./Main/Item')} />
				</Route>
				<Route path="/user" component={require('react-router!./User')}>
					<Route path="info.html" component={require('react-router!./User/Info')} />
					<Route path="deal.html" component={require('react-router!./User/Deal')} />
					<Route path="shop.html" component={require('react-router!./User/Shop')} />
					<Route path="files.html" component={require('react-router!./User/Files')} />
					<Route path="config.html" component={require('react-router!./User/Config')} />
					<Route path="news.html" component={require('react-router!./User/News')} />
				</Route>
				<Route path="/" component={require('react-router!./Other')} >
					<Route path="login.html" component={require('react-router!./Other/Login')} />
					<Route path="register.html" component={require('react-router!./Other/Register')} />
					<Route path="deal.html" component={require('react-router!./Other/Deal')} />
					<Route path="cashier.html" component={require('react-router!./Other/Cashier')} />
					<Route path="demo.html" component={require('react-router!./Other/Demo')} />
					<Route path="news.html" component={require('react-router!./Other/News')} />
					<Route path="*" component={require('react-router!./Other/404')} />
				</Route>
			</Router>
		)
	}
}


ReactDOM.render(<App />,document.getElementById('app'))