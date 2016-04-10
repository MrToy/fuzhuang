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