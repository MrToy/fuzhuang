import Color from 'color'
var sizes={
	xl:20,
	lg:18,
	default:16,
	sm:14,
	xs:12
}
export {sizes}

export function getAdapt(callback){
	var arr=[]
	if(this.props.sm){
		arr.push(callback(this.props.sm))
	}
	if(this.props.md){
		arr.push({'@media(min-width:641px)':callback(this.props.md)})
	}
	if(this.props.lg){
		arr.push({'@media(min-width:1025px)':callback(this.props.lg)})
	}
	return arr
}
export function getColor(color){
	var colors={
		default:{
			backgroundColor:"#E6E6E6",
			color:"#444"
		},
		primary:{
			backgroundColor:"#0E90D2",
			color:"#fff"
		},
		secondary:{
			backgroundColor:"#3BB4F2",
			color:"#fff"
		},
		success:{
			backgroundColor:"#5EB95E",
			color:"#fff"
		},
		warning:{
			backgroundColor:"#F37B1D",
			color:"#fff"
		},
		danger:{
			backgroundColor:"#DD514C",
			color:"#fff"
		},
		link:{
			backgroundColor:"transparent",
			color:"#0E90D2"
		},
		red:{
			backgroundColor:"#C81624",
			color:"#fff"
		}
	}
	if(color=='random'){
		var ran='#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6)
		return {
			backgroundColor:ran,
			color:Color(ran).luminosity()>0.7?"#333":"#fff"
		}
	}
	return colors[color]
}