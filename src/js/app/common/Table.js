var Config = require('./Config');
var Ajax = require('./Ajax');
var Pages = require('./Pages');
//数据表格 -------------全局模式调用-无Vue声明-------
exports.Table = function(opts){
	var settings={
			data:'items',
			url:'',
			jsonp:false,
			relative:true,
			dataSource:'',
			el_data:'',
			el_pager:'',
			limit:10,
			pageNum:1,
			page:true, 
			filter:function(){},
			methods:{},
			callback:function(){}
	};
	$.extend(settings,opts);
	settings.page = settings.el_pager!='';
	var obj = new Object();
	obj.vm;
	obj.pageNum = 1;
	obj.limit = settings.limit;
	obj.total = 0;
	obj.page = settings.page;
	obj.loadPage = false;
	obj.init = function(){
		var _object = obj;
		settings.filter();
		var vueSetting = {
		  el: settings.el_data,
		  data: {},
          ready:function() {},
		  methods:settings.methods
		};
		vueSetting.data[settings.data] = [];
		_object.vm = new Vue(vueSetting);
		_object.requestData() ;
	}
	obj.initPage = function(){
		var _object = obj;
		_object.loadPage=true;
		Pages.Load({ 
			control: settings.el_pager, 
			pageid: _object.pageNum,
			show_sumRows:true,  
			pagesize: _object.limit, 
			sumrows: _object.total, 
			fun: function (index) {
				_object.pageNum = index;
		    	_object.requestData();
			}
		});
	};
	obj.clearPage = function(){
		$(settings.el_pager).html('');
	};
	obj.setUrl= function(url){settings.url=url};
	obj.data;
	obj.reload = function(){ 
		var _object = obj;
		_object.pageNum = 1;
		//reload通常伴随着请求更改，此处作分页重绘
		_object.loadPage = false;
		_object.requestData(); 
	};
	obj.refresh = function(){ obj.requestData(); };
	obj.requestData = function(){
		var _object = obj;
		if(!_object.page)_object.limit = 99999;
		var splits = (settings.url.indexOf('?')>0?'&':'?');
		var url= settings.url + splits + 'pageNum='+_object.pageNum+'&pageSize='+_object.limit;//TODO:修改你的请求地址
		//console.log(url);
		Ajax.Ajax({
	  	 	url:url,
	  	 	jsonp:settings.jsonp,
	  	 	relative:settings.relative,
	   		success:function(data){
	   			console.log(data); 
	   			obj.data = data;
	   			if(!_object.page){
	   				_object.total=9999;
	   				if(data[settings.dataSource]!=undefined)
	   					data = data[settings.dataSource];
	   				else
	   					data = data.pageInfo.resultList;
	   			}else{
	   				_object.total=data.pageInfo.totalNum;
	   				data = data.pageInfo.resultList;
	   			}
	   			
	   			console.log(data);
	   			if(data.length==0){
    	   	    	_object.vm[settings.data]=[];
    				settings.callback(data);
    	   	    	if(_object.page && !_object.loadPage) _object.clearPage();
	   			}else{
    	   	    	for(var i=0;i<data.length;i++){
    	   	    		data[i].vueIndex=(i+1)+_object.limit*(_object.pageNum-1);	
    	   	    	}
    	   	    	_object.vm[settings.data]=data;
    				settings.callback(data);
		   	    	if(_object.page && !_object.loadPage) _object.initPage();
	   			}
			},
			error:function(){
			}
		});
	};
	obj.init();
	return obj;
}
