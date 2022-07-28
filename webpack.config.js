const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'src'), //	devtool: 'inline-source-map',
	entry: {
		track: {
			import: path.resolve(__dirname, 'src/sdk_modules/track', 'main.ts'),
			filename: 'track.sdk.js'
		},
        test: {
			import: path.resolve(__dirname, 'src/sdk_modules/test', 'main.ts'),
			filename: 'test.sdk.js'
		}
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(ts|js)?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-object-rest-spread'
						]
					}
				}
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist/sdk')
	},
	resolve: {
		extensions: [
			'.tsx',
			'.ts',
			'.jsx',
			'.js'
		]
	},
	optimization: {
//		chunkIds: 'named',
//		usedExports: true,
//		innerGraph: true,
//		minimize: true,
//		concatenateModules: true
	},
	plugins: [
				// new BundleAnalyzerPlugin()
	]
};
