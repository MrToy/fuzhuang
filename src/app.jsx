import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,Link,browserHistory} from 'react-router'
import Main from './home/main'

class Test extends Component{
	render(){
		return (
			<div>404</div>
		)
	}
}

class App extends Component{
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/">
					<IndexRoute component={require('react-router-proxy!./home')} />
					<Route path="search.html" component={require('react-router-proxy!./home/search')} />
					<Route path="item.html" component={require('react-router-proxy!./home/item')} />
				</Route>
				<Route path="/admin"  component={require('react-router-proxy!./admin')} >
					<Route path="info.html" component={require('react-router-proxy!./home/item')} />
				</Route>
				<Route path="*"  component={Test} />
			</Router>
		)
	}
}

ReactDOM.render(<App />,document.getElementById('app'))