var Config = require('./Config');
var Ajax = require('./Ajax');
var Pages = require('./Pages');
//初始化全局Vue ---------集成Table相关插件-------
var tableQueue = new Object();
var TableGolbal = function(opts){
	var settings={
			vm:null,		//(必需)全局Vue对象
			data:'items',	//(必需)数据集合标识
			url:'',			//(必需)数据源接口地址
			jsonp:false,	//(可选)使用异步数据接口
		    dataCheckes:'',	//(多选)(必需)多选容器标识,用于存放选择的结果。如:vm.UserListSelects=[1,4,5]
		    dataCheckFilter://(多选)(可选)判断是否允许选中
		    null,
			relative:true,	//(可选)是否设置请求相对父路径
			dataSource:'',	//(可选)表格的数据源集合标识,默认值为(pageInfo.resultList)
			el_pager:'',	//(分页)(必需)分页容器
			pageNum:1,		//(分页)(可选)初始页码
			limit:10,		//(分页)(可选)每页条数
			page:true		//(分页)(不需)是否分页
	};
	$.extend(settings,opts);
	if(settings.page){
		if(settings.el_pager!=''){
			settings.page = true;
		}else{
			settings.page = false;
		}
	}
	var obj = new Object();
	obj.vm = settings.vm;
	obj.url = settings.url;
	obj.pageNum = settings.pageNum;
	obj.limit = settings.limit;
	obj.total = 0;
	obj.page = settings.page;
	obj.loadPage = false;
	obj.init = function(){
		var _object = obj;
		_object.requestData();
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
	obj.setUrl= function(url){obj.url=url}; 
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
		console.log(_object.page);
		console.log(opts.limit);
		if(!_object.page){
			if(opts.limit == undefined) _object.limit = 9999;
		}
		var splits = (_object.url.indexOf('?')>0?'&':'?'); 
		var url= _object.url + splits + 'pageNum='+_object.pageNum+'&pageSize='+_object.limit; 
		console.log(url);
		Ajax.Ajax({
	  	 	url:url,
	  	 	jsonp:settings.jsonp,
	  	 	relative:settings.relative,
	   		success:function(data){
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
    	   	    	if(_object.page && !_object.loadPage) _object.clearPage();
	   			}else{
    	   	    	for(var i=0;i<data.length;i++){
    	   	    		data[i].vueIndex=(i+1)+_object.limit*(_object.pageNum-1);	
    	   	    	}
    	   	    	_object.vm[settings.data]=data;
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

var TableConfig = function(opts){
	var settings={
			data:'',		//(必需)数据集合标识
			url:'',			//(必需)数据源接口地址
		    dataCheckes:'',	//(多选)(必需)多选容器标识,用于存放选择的结果。如:vm.UserListSelects=[1,4,5]
		    dataCheckFilter://(多选)(可选)判断是否允许选中
		    null,
			relative:true,	//(可选)是否设置请求相对父路径
			dataSource:'',	//(可选)表格的数据源集合标识,默认值为(pageInfo.resultList)
			el_pager:'',	//(分页)(必需)分页容器
			limit:undefined,//(分页)(可选)每页条数
			page:true		//(分页)(不需)是否分页
	};
	$.extend(settings,opts);
	tableQueue[settings.data] = settings;
	return {
		url:function(url){
			var obj = tableQueue[settings.data].tableGolbal;
			return obj.url; 
		},
		setUrl : function(url){
			var obj = tableQueue[settings.data].tableGolbal;
			obj.url = url;
		},
		getData : function(){
			var obj = tableQueue[settings.data].tableGolbal;
			return obj.data;
		},
		reload : function(url){
			var obj = tableQueue[settings.data].tableGolbal;
			obj.pageNum = 1;
			obj.reload(); 
		},
		refresh : function(url){
			var obj = tableQueue[settings.data].tableGolbal;
			obj.refresh(); 
		}
	};
}

var VueInit = function(opts){
	var settings = {
		el:'body',
		tables:{},
		data:{},
		computed:{},
		filter:function(){},
		methods:{}
	};
	$.extend(settings,opts); 
	settings.filter();
	//添加配置出口
	var _tables = new Object();
	for(var k in settings.tables){
		_tables[k] = TableConfig(settings.tables[k]);
	}
	//添加全选功能
	for(var k in tableQueue){
		(function(key){ 
			var obj = tableQueue[key]; 
			settings.data[obj.data]=[];
			if(obj['dataCheckes']!=undefined && obj['dataCheckes']!=''){
				//过滤掉不允许选中的内容，保存到结果池中
				var funDataCheck =function(arrs,_this){
					var arr=[];
					arrs.map(function(item){
						var oList = _this[obj.data].getByKeys(obj.key,[item]);
						var o = null;
						//如果是当前页的行，则执行条件判断
						if(oList.length>0){ 
							o = _this[obj.data].getByKeys(obj.key,[item])[0];  
							if(obj.dataCheckFilter(o)){
								arr.push(item); 
							}
						}else{//如果是当前页的行，则直接添加
							arr.push(item);
						}
					});
					return arr; 
				} 
				//选择结果池
				settings.data[obj.dataCheckes+'_Pool']=[];
				//选择结果
				settings.computed[obj.dataCheckes]={ 
					get:function(){
						if(obj.dataCheckFilter!=null){
							this[obj.dataCheckes+'_Pool'] = funDataCheck(this[obj.dataCheckes+'_Pool'],this);
						}
				        return this[obj.dataCheckes+'_Pool']; 
					},
					set:function(value){ 
						if(obj.dataCheckFilter!=null){   
							value = funDataCheck(value,this);
						}
						this[obj.dataCheckes+'_Pool'] = value;
					} 
				}
				settings.computed[obj.data+'_CheckAll']={ 
					  get: function() { 
						  //当前页的可选集合
						  var currPageKeys = null;
						  if(obj.dataCheckFilter!=null){
							  currPageKeys = funDataCheck(this[obj.data].getKeys(obj.key),this);
						  }else{
							  currPageKeys = this[obj.data].getKeys(obj.key);
						  }
						  if(obj.el_pager!=undefined && obj.el_pager!=''){  
					   			var flag = this[obj.dataCheckes+'_Pool'].isContains(currPageKeys);
					   			return flag;
					   	  }
						  return this[obj.data+'_CheckCount'] == currPageKeys.length;
				      },
				      set: function(value) { 
				    	  this[obj.dataCheckes] = value
				    	  	?this[obj.dataCheckes].mergeArray(this[obj.data].getKeys(obj.key))
				    		:this[obj.dataCheckes].removeByValues(this[obj.data].getKeys(obj.key));
				      }
				};
				settings.computed[obj.data+'_CheckCount']={
					 get: function() { 
				        return this[obj.dataCheckes].length;     
				      } 
				};
			}
		})(k);
	}
	var vm  = new Vue(settings);
	//设置初始化配置
	for(let k in tableQueue){
		(function(key){ 
			var table = tableQueue[k];
			table.vm = vm;
			table.tableGolbal = TableGolbal(table); 
		})(k);
	}
	vm.tables = _tables;
	return vm;
};

exports.TableGolbal = TableGolbal;
exports.TableConfig = TableConfig;
exports.VueInit = VueInit;
