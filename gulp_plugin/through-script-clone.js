// PLUGIN_NAME: through-script-clone
// PLUGIN_DESC: demo-script-clone(为script标签添加pre属性自动生成script的页面体现)
//AUTHOR:tanliang
var through = require('through-gulp');

function sample() {
  // creating a stream through which each file will pass
  var stream = through(function(file, encoding,callback) {
      // do whatever necessary to process the file 
      if (file.isNull()) {

      }
      if (file.isBuffer()) {
	    var contents = file.contents.toString('utf-8');
			var regex = /<script pre\>.*?<\/script>/g;
			var regReplace1 = /^\<script pre\>/;
			var regReplace2 = /\<\/script\>$/;
			
			contents=contents.replace(/[\r\n]/g,"throughScript");
			//console.log(contents);
			var results = contents.match(regex);
			//console.log(results);
			var replaces = new Array;
			for(var r in results){
				var value = results[r];
				var aa = value.replace(regReplace1,'\<pre\>').replace(regReplace2,'\<\/pre\>');
				replaces.push(aa);
			}
			var i = 0;
			function Replace(contents){
					var _value = contents.replace(results[i],replaces[i]+results[i]);
					i++;
					if(i==replaces.length)
						return _value;
					else
						return Replace(_value);
			}
			var result = results==null?contents:Replace(contents);
			console.log(result);
			result=result.replace(/throughScript/g,"\r\n");
			file.contents = new Buffer(result);
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
