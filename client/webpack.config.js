const path = require('path');
const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: isProd ? 'production' : 'development',
	entry: {
		app: './src/index.tsx'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		alias: {
			'@': path.join(__dirname, 'src')
		}
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, use: 'ts-loader' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: pkg.name,
			template: 'index.html',
			inject: 'body',
			cache: false,
			minify: {
				html5: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: false,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributese: true,
				useShortDoctype: true
			}
		}),
	]
}
