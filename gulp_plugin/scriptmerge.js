//PLUGIN_NAME: through-script-clone
// PLUGIN_DESC: 合并独立插件
//AUTHOR:tanliang
//DATE:2017-02-013
var rf=require("fs"); 
var through = require('through-gulp');
//var jsp = require("uglify-js").parser;
//var pro = require("uglify-js").uglify; 
 
function sample(_newFile) {
  // creating a stream through which each file will pass
  var stream = through(function(file, encoding,callback) {
      // do whatever necessary to process the file 
      if (file.isNull()) {

      }
      if (file.isBuffer()) {
	    var contents = file.contents.toString('utf-8');
		var newContent = rf.readFileSync(_newFile,"utf-8");
		contents += '\n' + newContent;//避免sourceMap语法错误
		file.contents = new Buffer(contents);
      }
      //if (file.isStream()) {

      //}
      // just pipe data next, or just do nothing to process file later in flushFunction
      // never forget callback to indicate that the file has been processed.
      this.push(file);
      callback();
    },function(callback) {
      // just pipe data next, just callback to indicate that the stream's over
      //this.push(something);
      callback();
    });

  // returning the file stream
  return stream;
};

// exporting the plugin 
module.exports = sample;
