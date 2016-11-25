var Config = require('./Config');
var requestQueue = new Object();
exports.Ajax = function(opts){
	if(requestQueue[opts.url]!=undefined){
		return false;
	}else{
		requestQueue[opts.url]='true';
	} 
	var settings={
			type:'get',
			jsonp:false,
			data:[],
			url:'',
			relative:true,//相对父路径
			success:function(){},
			accessToken:false,//指定accessToken
			setAccessToken:false,//是否追加accessToken
			responseData:true,//转换Data
			loading:false
	};
	$.extend(settings,opts);
	settings.url = settings.url+(settings.url.indexOf('?')>0?'&':'?')+'jsonType=1';
	if($('.ajax-load').length>0){
		return false;
	}
	for(var u in Config.AjaxUrlValueJsonP){
		if(settings.url.indexOf(u)>=0){
			settings.jsonp = true;
			settings.url = settings.url.replace(u,Config.AjaxUrlValueJsonP[u]); 
			break;
		}
	}
	if(settings.loading)
		$('body').append('<div class="ajax-load"><div class="ajax-bg"></div><div class="ajax-img"></div></div>');
	console.log(settings.url);
	var ajaxOpts = {
		  url : (settings.relative?Ctx:"") + settings.url,
		  timeout : 32000,
		  type : settings.type,
		  jsonp: settings.jsonp,
		  data : settings.data,
		  success : function(data){
		  	//console.log(data);
		  	if(settings.loading)
			  $('.ajax-load').remove();
			delete requestQueue[opts.url]; 
			if(!settings.responseData){
				  settings.success(data);
				  return;
			}
			if(data){
				if(typeof data =="string"){
					data = eval('('+data+')');
				}
				if(data.rs==1){
					settings.success(data.data);
				}else{
					if(settings.error) settings.error(data.data);
					else
						console.log('服务器数据错误,请联系客服!');
				}
			}else{
				if(settings.error) settings.error();
				else 
					console.log('无数据,请联系客服!');
			}
		  },
		  error:function(){
			  if(settings.loading)
				  $('.ajax-load').remove();
			  delete requestQueue[opts.url];
				if(settings.error) settings.error();
				else
					console.log('服务器请求错误,请联系客服!');
		  }, 
		  complete : function(XHR,status){
		    if(status=='timeout'){
		    	ajax.abort();
		    	console.log('请求超时!');
				if(settings.loading)
					$('.ajax-load').remove();
				delete requestQueue[opts.url];
		    }
		  }
	  };
	  if(settings.jsonp){
	  	ajaxOpts.jsonp = "callback";
		//ajaxOpts.jsonpCallback = "jsonpCallbackQianggouCustom", 
	  	ajaxOpts.dataType = "jsonp";
	  }
	  var ajax=$.ajax(ajaxOpts);
}
