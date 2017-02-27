exports.Load =function(){
	//console.log(new Date().Format("yyyy-MM-dd"));
	//console.log(new Date().Format("yyyy-MM-dd HH:mm:ss"));
//	
//	//Date对象
//	new Date().FormatDate() 						//"2017-02-23 17:25:03"
//	new Date().FormatDate('yyyy-MM-dd') 			//"2017-02-23"
//	new Date().FormatDate('yyyy-MM-dd HH:mm:ss')//"2017-02-23 17:25:03"
//	new Date('2001-01-01').FormatDate() 			//"2001-01-01 08:00:00"
//	//String对象
//	'2001-01-01'.FormatDate()  					//"2001-01-01 00:00:00"
//	//Number对象
//	new Date(1486978331000).FormatDate()			//"2017-02-13 17:32:11"
//	(1486978331000).FormatDate() 				//"2017-02-13 17:32:11"
	
	
	Date.prototype.Format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "H+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if(fmt == undefined) fmt = 'yyyy-MM-dd HH:mm:ss';
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	Date.prototype.FormatDate = function (fmt) {
		return this.Format(fmt);
	}
	String.prototype.FormatDate = function (fmt) {
		var date,_this = this;
		try{
			if(_this.toString().indexOf('-')>0) _this = _this.replace(/-/g,'/');//兼容safari
			date = new Date(_this);
		}catch(e){
			date = new Date();
		} 
		return date.Format(fmt);
	}
	Number.prototype.FormatDate = function (fmt) {
		var date,_this = this;
		try{
			date = new Date(_this);
		}catch(e){
			date = new Date();
		}
		return date.Format(fmt);
	}
}