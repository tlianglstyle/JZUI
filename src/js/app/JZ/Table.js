var Config = require('./Config');
var Ajax = require('./Ajax');
var Array = require('./Array');
var Pages = require('./Pages');
var TableResizable = require('./Table.Resizable');
Array.Load();
//数据表格 -------------全局模式调用-无Vue声明-------
exports.Table = function(opts){
	Config.Base();
	var settings={
			el_data:'',
			data:'items',
			url:'',
			jsonp:false,
			relative:true,
			dataSource:'',
			el_pager:'',
			pageNum:1,
			limit:10,
			page:true, 
			filter:function(){},
			methods:{},
			resizable:false,//可拖拽列
			singleLine:false,//单行显示单元格
			callback:function(){},
			onRequestData:function(data){this.callback(data)},
			onRenderData:function(){}
	};
	$.extend(settings,opts);
	var resizable = null;
	if(settings.resizable){
		if(!TableResizable.isLoad())
			resizable = TableResizable.Load();//此处resizable暂时没有用到
	}
	if(settings.singleLine){
		var setModuleContent = function (cells){
			for(var i = 0; i<cells.length;i++){
				cells.eq(i).html('<div class="rc-div">'+cells.eq(i).html()+'</div>');
			}
		}
		setModuleContent($(settings.el_data).find('[v-for]').find('td'));
		setModuleContent($(settings.el_data).find('thead th'));
	}
	if(settings.page){
		if(settings.el_pager!=''){
			settings.page = true;
		}else{
			settings.page = false;
		}
	}
	var obj = new Object(); 
	obj.vm;
	obj.pageNum = settings.pageNum;
	obj.limit = settings.limit;
	obj.total = 0;
	obj.page = settings.page;
	obj.loadPage = false;
	obj.resizable = resizable;
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
		_object.initSort() ;
		_object.requestData() ;
		
	}
	obj.initSort= function(){
		var _object = obj;
		var sorts = $(settings.el_data).find('th[sort]').append('<span class="glyphicon glyphicon-sort"></span>');
		if(sorts.length==0) return;
		var sortConfig = {}; 
		var sortDirection = {asc:true,desc:false};
		var sortRex = /^([^\[]*)[\[]?([^\]]*)[\]]?$/;
		var sortType = '';
		var sortNumber = function (a, b) {
		  if(!isNaN(a)&& !isNaN(b)){ 
	        	return parseInt(a)-parseInt(b); 
	       }
	        return false;
	  	}
		var sortFun = function(arr){
				switch(sortType){
					case 'number': 
						return arr.sort(sortNumber);
					break;
					default:
						return arr.sort();
					break;
				}
			
		}
		var sortClone = function (data){
			return JSON.parse(JSON.stringify(data));
		}
		var sortSwitchIcon = function(th){
			th.siblings().children('.glyphicon').removeClass('glyphicon-arrow-up').removeClass('glyphicon-arrow-down').addClass('glyphicon-sort');
			if(th.children('.glyphicon').hasClass('glyphicon-sort')){
				th.children('.glyphicon').removeClass('glyphicon-sort').addClass('glyphicon-arrow-up');
			}else{
				th.children('.glyphicon').toggleClass('glyphicon-arrow-up').toggleClass('glyphicon-arrow-down')
			}
		};
		sorts.click(function(){
			var _this = $(this); 
			sortSwitchIcon(_this);
			var key = _this.attr('sort');
			var sortRes = sortRex.exec(key);
			key =sortRes[1];
			sortType = sortRes[2];
			var keys = obj.sourceData.getKeys(key);
			if(sortConfig[key] == undefined){
				keys = sortFun(keys);
				sortConfig[key] = {key:key,sortDirection:sortDirection.asc};
			}else{
				if(sortConfig[key].sortDirection){
					keys = sortFun(keys).reverse();
				}else{
					keys = sortFun(keys);
				}
				sortConfig[key].sortDirection = !sortConfig[key].sortDirection;
			}
			var data = sortClone(obj.sourceData).getByKeys(key,keys,1,function(obj,arr){
				console.log(obj.vueIndex);
				obj.vueIndex = arr.length + 1 + _object.limit*(_object.pageNum-1);
				return obj;
			});
			_object.renderData(data);
		});
	};
	obj.initPage = function(){
		var _object = obj;
		Pages.Load({ 
			control: settings.el_pager, 
			pageid: _object.pageNum,
			show_sumRows:true,  
			pagesize: _object.limit, 
			sumrows: _object.total, 
			fun: function (index) {
				if(_object.loadPage){
					_object.pageNum = index;
			    	_object.requestData();
				}
			}
		});
	};
	obj.clearPage = function(){
		$(settings.el_pager).html('');
	};
	obj.setUrl= function(url){settings.url=url};
	obj.data;
	obj.sourceData;
	obj.reload = function(pageNum){
		var _object = obj;
		_object.pageNum = 1;
		//reload通常伴随着请求更改，此处作分页重绘
		_object.loadPage = false;
		_object.requestData(); 
	};
	obj.refresh = function(){ obj.requestData(); };
	obj.requestData = function(){
		if(settings.resizable)
			$(settings.el_data).addClass('table-resizable');
		var _object = obj;
		if(!_object.page){
			if(opts.limit == undefined) _object.limit = 9999;
		}
		var splits = (settings.url.indexOf('?')>0?'&':'?');
		var url= settings.url + splits + 'pageNum='+_object.pageNum+'&pageSize='+_object.limit+'&randomParameter='+Math.random();
		Ajax.Ajax({
	  	 	url:url,
	  	 	jsonp:settings.jsonp,
	  	 	relative:settings.relative,
	   		success:function(data){
	   			if(!_object.page){
	   				_object.total = 9999;
	   				if(data[settings.dataSource]!=undefined)
	   					data = data[settings.dataSource];
	   				else
	   					data = data.pageInfo.resultList;
	   			}else{
	   				_object.total=data.pageInfo.totalNum;
	   				data = data.pageInfo.resultList;
	   			}
	   			
	   			if(data.length==0){
    	   	    	if(_object.page && !_object.loadPage) _object.clearPage();
    	   	    	_object.renderData([]);
    				settings.callback(data);
	   			}else{
    	   	    	for(var i=0;i<data.length;i++){
    	   	    		data[i].vueIndex=(i+1)+_object.limit*(_object.pageNum-1);	
    	   	    	}
		   	    	if(_object.page && !_object.loadPage) _object.initPage();
    	   	    	_object.renderData(data);
    				settings.callback(data);
	   			}
	   			obj.data = data;
	   			obj.sourceData = JSON.parse(JSON.stringify(data));
				
			},
			error:function(){
			}
		});
	};
	obj.renderData = function(data){
		settings.onRenderData();
		var _object = obj;
		_object.vm[settings.data] = data;
		setTimeout(function(){ 
			if(settings.singleLine){
				$(settings.el_data).removeClass('table-resizable');
				if(!_object.loadPage){ 
					var ths = $(settings.el_data).find('thead th');
					for(var i=0;i<ths.length;i++){
						var thWidth = ths.eq(i).width();
						ths.eq(i).css({width:thWidth});
						var _div = ths.eq(i).find('.rc-div');
						if(!_div.hasClass('rc-cells')){ 
							_div.addClass('rc-cells').after('<div class="rc-td" style="width1:'+_div.width()+'px;opacity:0;">'+_div.text()+'</div>');
						}
					}
					
				} 
				var divs = $(settings.el_data).find('tbody td .rc-div'); 
				for(var i=0;i<divs.length;i++){divs.eq(i).addClass('rc-cells').after('&nbsp;');} 
			}
			if(settings.resizable){
				$(settings.el_data).resizableColumns();
			}
			_object.loadPage=true;//TODO:注意loadPage变量赋值与取值问题
		},10); 
	};
	obj.init();
	return obj;
}