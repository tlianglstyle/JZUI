var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

var glob = require('glob');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    
	var files = glob.sync(jsPath+'/app/*/*.js');
	var newEntries = {};
	files.forEach(function(f){
	   var name = /.*\/(app\/.*?\/*)\.js/.exec(f)[1];//得到apps/question/index这样的文件名
	   newEntries[name] = f;
	});
	console.log(newEntries);
    return newEntries; 
}

module.exports = {
	//assetsPublicPath:/images/,
    cache: true,
    devtool: "source-map",
    //entry: getEntry(),
    entry: {'app/JZ/JZ':srcDir+'/js/app/JZ/JZ.js'}, 
    output: {
        path: path.join(__dirname, "dist/"),//输出目录 
        publicPath: "dist/",//引用资源地址根目录
        filename: "js/[name].js", 
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {//请求重定向
            jquery: srcDir + "/js/lib/jquery.min.js",
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui",
            images: srcDir + "/images/common"  
        }
    },
    plugins: [
	    new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
	    }),
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    }), 
	    new webpack.optimize.OccurenceOrderPlugin()
    ],
	  module: {
	    // avoid webpack trying to shim process
	    noParse: /es6-promise\.js$/,
	    loaders: [
	      {
	        test: /\.less$/,
	        loader: "style!css!less" 
	      },
	      {
	        test: /\.vue$/,
	        loader: 'vue'
	      },
	      { test: /\.(png|jpg|gif|svg|eot|ttf|woff)(\?.*)*$/, loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'},
	      {
	        test: /\.js$/,
	        // excluding some local linked packages.
	        // for normal use cases only node_modules is needed.
	        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
	        loader: 'babel'
	      }
	    ]
	  },
	  babel: {
	    presets: ['es2015'],
	    plugins: ['transform-runtime']
	  }
	 ,externals: {
        'Vue': 'window.Vue'
    }
};
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
