var webpack = require("webpack")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path=require('path')
var pack=require('./package.json')
module.exports = {
	entry: {
		main: './src/app.jsx'
	},
	output: {
		path: path.join(__dirname,'public'),
		filename: '[name].[hash].js',
		publicPath:""
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
		new HtmlWebpackPlugin({title:pack.name,template:"./src/template.ejs"}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({compress:{warnings: false}})
	]
}
