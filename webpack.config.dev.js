var webpack = require("webpack")
var config=require("./webpack.config.js")
var configDev={
	entry: {
		main: ['webpack-hot-middleware/client','./src/main.jsx']
	},
	plugins: [
		config.plugins[0],
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}
module.exports = Object.assign(config,configDev)