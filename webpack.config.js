/**
 * Created by bykj on 2016/5/3.
 */
var webpack = require('webpack');
var path = require('path');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
	//插件项
	// plugins: [commonsPlugin],
	//页面入口文件配置
	entry: {
		React_OverFlow_TipToolDemo: path.resolve(__dirname, 'public/react-src/React_OverFlow_TipToolDemo.jsx'),
		myApp1: path.resolve(__dirname, 'public/react-src/App.jsx'),
		testModal: path.resolve(__dirname, 'public/react-src/testDatePicker.jsx'),
		myApp3: path.resolve(__dirname, 'public/react-src/component/TimeChooseDialog.jsx'),
		myApp5: path.resolve(__dirname, 'public/react-src/LifeCircleToLearn.jsx')

	},
	//出口文件输出配置
	output: {
		path: path.resolve(__dirname, 'build'),
		//D:\project\node\demo\public\dist
		publicPath: path.join(__dirname, 'public', 'dist/'),
		// publicPath:'D:\\project\\node\\demo\\public\\dist\\',
		filename: '[name].bundle.js'
	},
	module: {
		//加载器配置
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				presets: ['es2015', 'react'],
				include: './public/react-src',
				loader: 'babel?jsx'
			},
			// {
			//     test: /\.jsx$/,
			//     exclude: /node_modules/,
			//     presets: ['es2015','react'],
			//     include :path.join(__dirname, 'public/react-src'),
			//     loader: 'babel?jsx'
			// },
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'public/react-src'),
				loader: 'jsx-loader'
			},
			{test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
		]
	}

	//其它解决方案配置
	// ,resolve: {
	//     root: 'E:/github/flux-example/src', //绝对路径
	//     extensions: ['', '.js', '.json', '.scss'],
	//     alias: {
	//         AppStore : 'js/stores/AppStores.js',
	//         ActionType : 'js/actions/ActionType.js',
	//         AppAction : 'js/actions/AppAction.js'
	//     }
	// }
};

// console.log(path.resolve(__dirname, '/public/dist/'));
// console.log(path.resolve(__dirname, 'public/dist'));
// console.log(path.resolve(__dirname, '/public/dist'));
// console.log(path.resolve(__dirname, 'public/dist/'));
