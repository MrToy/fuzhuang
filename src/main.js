import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'
import 'moment/locale/zh-cn'
import App from './App'


Vue.use(VueRouter)
Vue.filter('moment',(value,formatString)=>{
	moment.locale('zh-cn')
	if(formatString=="past")
		return moment(value).fromNow()
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
	return moment(value).format(formatString)
})
var router = new VueRouter({history:true,transitionOnLoad:true})
router.map({
	'/':{
		component:resolve=>require(["./Index"],resolve)
	},
	'/login':{
		component:resolve=>require(["./Login"],resolve)
	},
	'/register':{
		component:resolve=>require(["./Register"],resolve)
	},
	'/search':{
		component:resolve=>require(["./Search"],resolve)
	},
	'/product/:id':{
		component:resolve=>require(["./Product"],resolve),
	},
	'/deal':{
		component:resolve=>require(["./Deal"],resolve),
	},
	'/saler':{
		component:resolve=>require(["./Saler"],resolve),
		auth:true,
		subRoutes:{
			'/create':{
				component:resolve=>require(["./SalerCreate"],resolve)
			},
			'/':{
				component:resolve=>require(["./SalerInfo"],resolve),
				saler:true
			},
			'/products':{
				component:resolve=>require(["./SalerProducts"],resolve),
				saler:true
			},
			'/createProduct':{
				component:resolve=>require(["./SalerProduct"],resolve),
				saler:true
			},
			'/orders':{
				component:resolve=>require(["./SalerOrders"],resolve),
				saler:true
			},
			'/editProduct/:id':{
				component:resolve=>require(["./SalerProduct"],resolve),
				saler:true
			}
		}
	},
	'/user':{
		component:resolve=>require(["./User"],resolve),
		auth:true,
		subRoutes:{
			'/':{
				component:resolve=>require(["./UserInfo"],resolve)
			},
			'/orders':{
				component:resolve=>require(["./UserOrders"],resolve)
			},
			'/cart':{
				component:resolve=>require(["./UserCart"],resolve)
			}
		}
	}
})
router.beforeEach(({to,next})=>{
	if(to.auth&&!to.router.app.$store.state.user.userInfo){
		to.router.app.$emit("toast","需要登录","warning")
		to.router.go({path:"/login"})
		return
	}
	if(to.saler&&!to.router.app.$store.state.user.userInfo.group.saler){
		to.router.app.$emit("toast","需要先注册一个店铺","warning")
		to.router.go({path:"/saler/create"})
		return
	}
	next()
})
router.start(App, '#app')