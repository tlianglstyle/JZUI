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
		beforeSubmit:function(_submit){_submit();},//提交前执行自定义功能，完毕后继续提交
		beginSubmit:function(){return true;},//是否可以开始提交
		success:function(){},
		error:function(){}
	};
	$.extend(settings,opts);
	var obj = new Object();
	obj = settings;
	obj.submit = function (){
		 settings.beforeSubmit(function(){
			if(settings.beginSubmit()){
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
		 				settings.error(data);
		 			}
		 		});
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
