var Config = require('./Config');
var Ajax = require('./Ajax');

exports.Load = function(){
	window.Request = JZ.Ajax;
	window.Form = JZ.Form;
	window.Table = JZ.Table;
	window.TableGolbal = JZ.TableGolbal;
	window.TableConfig = JZ.TableConfig;
	window.VueInit = JZ.Vue;
}
exports.Init = function(cb){
	console.log('JZ Init');
	cb();
}
exports.GetDictionary = function(value,cb){
	if(Config.Production){
		Ajax.Ajax({
	  	 	url:Config.AjaxUrlValueJsonP.JZ_Dictionary+'?dictId='+value,
	   		success:function(data){
	   			var result = data.result[0];
	   			var dictionaryDate = new Object();
   				for(let k in result){
   					dictionaryDate[k+''] = {
						data : result[k+''], 
						get : function(value){
							if(this.data.getByKey('dictValue',value)==null)
								return '';
							else 
								return this.data.getByKey('dictValue',value).dictName;
						}
					};
   				}
	   				
	   			JZ.Dictionary = dictionaryDate;
	   			cb(dictionaryDate);
	   		},
			error:function(data){
				console.log(data);
			}
		});
	}
}

