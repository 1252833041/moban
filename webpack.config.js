var webpack = require("webpack");
var path = require('path');


let entry = {   //js文件在此添加
	hello:'./js/hello.js',
	hello2:'./js/hello2.js'

}
module.exports = {
	entry:entry,
	output:{
		path:path.resolve(__dirname,'bulidjs'),
		filename:'[name].js'
	},
	module:{
		loaders:[
			{test:/\.js$/,loader:'babel-loader'}
		]
	}
}