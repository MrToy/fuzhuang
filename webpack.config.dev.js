var webpack = require("webpack")

var config=require("./webpack.config.js")
config.module.loaders[0].query.presets.push('react-hmre')
config.entry={main: ['webpack-hot-middleware/client','./src/app.jsx']}
config.plugins=[
	config.plugins[0],
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
]

module.exports = config
