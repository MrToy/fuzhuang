var webpack = require("webpack")

var config=require("./webpack.config.js")
config.module.loaders[0].query.presets.push('react-hmre')
for(var i in config.entry)config.entry[i]=['webpack-hot-middleware/client',config.entry[i]]
config.plugins=[
	config.plugins[0],
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
]

module.exports = config
