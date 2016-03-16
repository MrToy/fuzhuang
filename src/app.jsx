import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,IndexRoute,Link,browserHistory} from 'react-router'
import Main from './main'
class App extends Component{
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Main}>
					<IndexRoute component={require('react-router-proxy!./index')} />
					<Route path="/search.html" component={require('react-router-proxy!./search')} />
				</Route>
			</Router>
		)
	}
}

ReactDOM.render(<App />,document.getElementById('app'))
console.log("start")