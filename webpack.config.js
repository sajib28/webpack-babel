const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'

	},
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, "dist/"),
		compress: true,
		port: 3015,
		open: true
	},
	module: {
		rules: [
			{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        },
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					'css-loader',

				]

			},
			{
				test: /\.scss?$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							minimize: true
						},
					},
					'css-loader',
					'sass-loader'
				]

			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						collapseWhitespace: true
					}
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg|mp4|ico|json)$/i,
				use: [
					{
						loader: "file-loader",
						options:{
							outputPath: 'images'
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|woff|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader'
						
					}
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js(\?.*)?$/i,
				cache: true,
			}),
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].css',
			chunkFilename: '[id].css'

		})
	]
};