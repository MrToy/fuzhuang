import React,{Component} from 'react'
import style from './index.styl'
import Icon from 'toy-ui/Icon'
import Popover from 'toy-ui/Popover'
import cx from 'classnames'


class Cart extends Component{
	render(){
		return (
			<div />
		)
	}
}

export default class extends Component{
	state={content:null}
	onClick=e=>{
		if(this.state.content&&(document.body.clientWidth-e.clientX)>300)
			this.setState({content:null})
	}
	componentDidMount(){
		window.addEventListener('click', this.onClick)
	}
	componentWillUnmount(){
		window.removeEventListener('click', this.onClick)
	}
	render(){
		return (
			<div className={cx(style.box,{[`${style.box_active}`]:!!this.state.content})}>
				<div className={style.menu}>
					<div className={style.top}>
						<div className={cx(style.list,style.arrow)} onClick={()=>this.setState({content:null})}>
							<Icon content={require("./angle-right.svg")} />
						</div>
					</div>
					<div className={style.center}>
						<div className={style.list}>
							<Icon content={require("./account_circle.svg")} />
							<div className={style.addon}>我的账户</div>
						</div>
						<div className={style.list} onClick={()=>this.setState({content:" "})}>
							<div className={style.cart}>
								<Icon content={require("./shopping-cart.svg")} />
								<div className={style.text}>购物车</div>
							</div>
						</div>
						<div className={style.list} onClick={()=>this.setState({content:" "})}>
							<Icon content={require("./favorite_border.svg")} />
							<div className={style.addon}>我的收藏</div>
						</div>
						<div className={style.list}>
							<Icon content={require("./av_timer.svg")} />
							<div className={style.addon}>浏览历史</div>
						</div>
					</div>
					<div className={style.foot}>
						<div className={style.list} onClick={()=>window.scrollTo(0,0)}>
							<Icon content={require("./vertical_align_top.svg")} />
							<div className={style.addon}>返回顶部</div>
						</div>
					</div>
				</div>
				<div className={style.info}>{this.state.content}</div>
			</div>
		)
	}
}
