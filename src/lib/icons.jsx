import React,{Component} from 'react'

export class Cart extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M6 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
				<path d="M16 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
				<path d="M16 8v-6h-12c0-0.552-0.448-1-1-1h-3v1h2l0.751 6.438c-0.458 0.367-0.751 0.93-0.751 1.562 0 1.105 0.895 2 2 2h12v-1h-12c-0.552 0-1-0.448-1-1 0-0.003 0-0.007 0-0.010l13-1.99z"></path>
			</svg>
		)
	}
}

export class FilesEmpty extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M14.341 5.579c-0.347-0.473-0.831-1.027-1.362-1.558s-1.085-1.015-1.558-1.362c-0.806-0.591-1.197-0.659-1.421-0.659h-5.75c-0.689 0-1.25 0.561-1.25 1.25v11.5c0 0.689 0.561 1.25 1.25 1.25h9.5c0.689 0 1.25-0.561 1.25-1.25v-7.75c0-0.224-0.068-0.615-0.659-1.421zM12.271 4.729c0.48 0.48 0.856 0.912 1.134 1.271h-2.406v-2.405c0.359 0.278 0.792 0.654 1.271 1.134v0zM14 14.75c0 0.136-0.114 0.25-0.25 0.25h-9.5c-0.136 0-0.25-0.114-0.25-0.25v-11.5c0-0.135 0.114-0.25 0.25-0.25 0 0 5.749-0 5.75 0v3.5c0 0.276 0.224 0.5 0.5 0.5h3.5v7.75z"></path>
				<path d="M9.421 0.659c-0.806-0.591-1.197-0.659-1.421-0.659h-5.75c-0.689 0-1.25 0.561-1.25 1.25v11.5c0 0.604 0.43 1.109 1 1.225v-12.725c0-0.135 0.115-0.25 0.25-0.25h7.607c-0.151-0.124-0.297-0.238-0.437-0.341z"></path>
			</svg>
		)
	}
}

export class Drawer extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M15.89 10.188l-4-5c-0.095-0.119-0.239-0.188-0.39-0.188h-7c-0.152 0-0.296 0.069-0.39 0.188l-4 5c-0.071 0.089-0.11 0.199-0.11 0.312v4.5c0 0.552 0.448 1 1 1h14c0.552 0 1-0.448 1-1v-4.5c0-0.114-0.039-0.224-0.11-0.312zM15 11h-3.5l-2 2h-3l-2-2h-3.5v-0.325l3.74-4.675h6.519l3.74 4.675v0.325z"></path>
				<path d="M11.5 8h-7c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h7c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
				<path d="M12.5 10h-9c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h9c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"></path>
			</svg>
		)
	}
}

export class Stack extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z"></path>
			</svg>
		)
	}
}
export class User extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M9 11.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
			</svg>
		)
	}
}

export class UserTie extends Component{
	render(){
		return (
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M5 3c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM12.001 7h-0.553l-3.111 6.316 1.163-5.816-1.5-1.5-1.5 1.5 1.163 5.816-3.111-6.316h-0.554c-1.999 0-1.999 1.344-1.999 3v5h12v-5c0-1.656 0-3-1.999-3z"></path>
			</svg>
		)
	}
}

export class PushPin extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M8.5 0l-1.5 1.5 1.5 1.5-3.5 4h-3.5l2.75 2.75-4.25 5.635v0.615h0.615l5.635-4.25 2.75 2.75v-3.5l4-3.5 1.5 1.5 1.5-1.5-7.5-7.5zM7 8.5l-1-1 3.5-3.5 1 1-3.5 3.5z"></path>
			</svg>
		)
	}
}

export class Airplane extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M12 9.999l-2.857-2.857 6.857-5.143-2-2-8.571 3.429-2.698-2.699c-0.778-0.778-1.864-0.964-2.414-0.414s-0.364 1.636 0.414 2.414l2.698 2.698-3.429 8.572 2 2 5.144-6.857 2.857 2.857v4h2l1-3 3-1v-2l-4 0z"></path>
			</svg>
		)
	}
}

export class Home extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M16 9.226l-8-6.21-8 6.21v-2.532l8-6.21 8 6.21zM14 9v6h-4v-4h-4v4h-4v-6l6-4.5z"></path>
			</svg>
		)
	}
}

export class Folder extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M7 2l2 2h7v11h-16v-13z"></path>
			</svg>
		)
	}
}

export class FolderOpen extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M13 15l3-8h-13l-3 8zM2 6l-2 9v-13h4.5l2 2h6.5v2z"></path>
			</svg>
		)
	}
}

export class FilePicture extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M13 14h-10v-2l3-5 4.109 5 2.891-2v4z"></path>
				<path d="M13 7.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5c0.828 0 1.5 0.672 1.5 1.5z"></path>
				<path d="M14.341 3.579c-0.347-0.473-0.831-1.027-1.362-1.558s-1.085-1.015-1.558-1.362c-0.806-0.591-1.197-0.659-1.421-0.659h-7.75c-0.689 0-1.25 0.561-1.25 1.25v13.5c0 0.689 0.561 1.25 1.25 1.25h11.5c0.689 0 1.25-0.561 1.25-1.25v-9.75c0-0.224-0.068-0.615-0.659-1.421zM12.271 2.729c0.48 0.48 0.856 0.912 1.134 1.271h-2.406v-2.405c0.359 0.278 0.792 0.654 1.271 1.134zM14 14.75c0 0.136-0.114 0.25-0.25 0.25h-11.5c-0.135 0-0.25-0.114-0.25-0.25v-13.5c0-0.135 0.115-0.25 0.25-0.25 0 0 7.749-0 7.75 0v3.5c0 0.276 0.224 0.5 0.5 0.5h3.5v9.75z"></path>
			</svg>
		)
	}
}

export class Plus extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M15.5 6h-5.5v-5.5c0-0.276-0.224-0.5-0.5-0.5h-3c-0.276 0-0.5 0.224-0.5 0.5v5.5h-5.5c-0.276 0-0.5 0.224-0.5 0.5v3c0 0.276 0.224 0.5 0.5 0.5h5.5v5.5c0 0.276 0.224 0.5 0.5 0.5h3c0.276 0 0.5-0.224 0.5-0.5v-5.5h5.5c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5z"></path>
			</svg>
		)
	}
}

export class Minus extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M0 6.5v3c0 0.276 0.224 0.5 0.5 0.5h15c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5h-15c-0.276 0-0.5 0.224-0.5 0.5z"></path>
			</svg>
		)
	}
}

export class CheckMark2 extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M6.21 14.339l-6.217-6.119 3.084-3.035 3.133 3.083 6.713-6.607 3.084 3.035-9.797 9.643zM1.686 8.22l4.524 4.453 8.104-7.976-1.391-1.369-6.713 6.607-3.133-3.083-1.391 1.369z"></path>
			</svg>
		)
	}
}

export class CheckMark extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
			</svg>
		)
	}
}

export class CircleLeft extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5z"></path>
				<path d="M10.457 4.957l-1.414-1.414-4.457 4.457 4.457 4.457 1.414-1.414-3.043-3.043z"></path>
			</svg>
		)
	}
}

export class CircleRight extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"></path>
				<path d="M5.543 11.043l1.414 1.414 4.457-4.457-4.457-4.457-1.414 1.414 3.043 3.043z"></path>
			</svg>
		)
	}
}

export class Smile extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM8 1.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5zM4 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM10 5c0-0.552 0.448-1 1-1s1 0.448 1 1c0 0.552-0.448 1-1 1s-1-0.448-1-1zM11.002 9.801l1.286 0.772c-0.874 1.454-2.467 2.427-4.288 2.427s-3.413-0.973-4.288-2.427l1.286-0.772c0.612 1.018 1.727 1.699 3.002 1.699s2.389-0.681 3.002-1.699z"></path>
			</svg>
		)
	}
}

export class Lock extends Component{
	render(){
		return(
			<svg style={{fill:"currentColor",height:"1em",width:"1em"}} {...this.props} viewBox="0 0 16 16">
				<path d="M9.25 7h-0.25v-3c0-1.654-1.346-3-3-3h-2c-1.654 0-3 1.346-3 3v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v7.5c0 0.412 0.338 0.75 0.75 0.75h8.5c0.412 0 0.75-0.338 0.75-0.75v-7.5c0-0.412-0.338-0.75-0.75-0.75zM3 4c0-0.551 0.449-1 1-1h2c0.551 0 1 0.449 1 1v3h-4v-3z"></path>
			</svg>
		)
	}
}