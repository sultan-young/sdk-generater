const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const md5 = require('md5');
const defaultMd5 = md5('_default');

module.exports = {
	context: path.resolve(__dirname, 'src'), //	devtool: 'inline-source-map',
	entry: {
		track: {
			import: path.resolve(__dirname, 'src/sdk_modules/track/src', 'main.ts'),
			filename: `track.sdk.${defaultMd5}.js`
		},
        test: {
			import: path.resolve(__dirname, 'src/sdk_modules/test', 'main.ts'),
			filename: `test.sdk.${defaultMd5}.js`
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
