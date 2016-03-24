var webpack = require("webpack")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path=require('path')
var pack=require('./package.json')
var config = {
	entry: {
		main: './src/app.jsx'
	},
	output: {
		path: path.join(__dirname,'public'),
		filename: '[name].[hash].js',
		publicPath:"/"
	},
	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel',
				query: {
					cacheDirectory:"temp",
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['transform-runtime', 'add-module-exports','transform-decorators-legacy']
				}
			},
			{ test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" },
			{ test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, exclude: /node_modules/, loader: 'url-loader?limit=8192' }
		]
	},
	resolve: {
		extensions: ['', '.js','.jsx']
	},
	plugins: [
		new HtmlWebpackPlugin({title:"郑州第壹印象",template:"./src/template.ejs"}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({compress:{warnings: false}}),
		new webpack.ProvidePlugin({fetch:'imports?this=>global!exports?global.fetch!whatwg-fetch'})
	]
}
if(process.env.NODE_ENV=='debug'){
	config.module.loaders[0].query.presets.push('react-hmre')
	for(var i in config.entry)config.entry[i]=['webpack-hot-middleware/client',config.entry[i]]
	config.plugins=[
		config.plugins[0],
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}
module.exports = config