var Config = require('./Config');
var Ajax = require('./Ajax');
//表单插件 -------------自动检测拼接post参数，type=submit提交，自动验证表单---------
exports.Form = function(opts){
	var settings={
		async:false,
		form:'', 
		url:'',
		relative:true,
		responseData:true,
		success:function(){},
		error:function(){}
	};
	$.extend(settings,opts);
	var obj = new Object();
	obj = settings;
	obj.submit = function (){
		 Ajax.Ajax({
		 	async:settings.async,
		 	relative:settings.relative,
		 	responseData:settings.responseData,
 	  	 	url:settings.url,
         	type: Config.Dev?'get':'post',
 	  	 	data:$(settings.form).serialize(),
 	   		success:function(data){
 	   			settings.success(data);
 			}, 
 			error:function(data){
 				settings.success(data);
 			}
 		});
	};
	$(settings.form).validate({
        onfocusout: false,
        errorClass: "form-require-error",
		 submitHandler: function (form) {
			 obj.submit(settings.form);
            return false;
	     }
	});
	return false;
}
