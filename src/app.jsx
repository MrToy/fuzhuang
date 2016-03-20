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
					<Route path="/search.html" component={require('react-router-proxy!./home/search')} />
					<Route path="/item.html" component={require('react-router-proxy!./home/item')} />
					<Route path="/admin.html" component={require('react-router-proxy!./admin')} />
				</Route>
			</Router>
		)
	}
}

ReactDOM.render(<App />,document.getElementById('app'))