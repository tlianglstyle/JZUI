var Config = require('./Config');
var Utils = require('./Utils');
var Array = require('./Array');
var Ajax = require('./Ajax');
var Form = require('./Form');
var Table = require('./Table');
var TableResizable = require('./Table.Resizable');
var VueInit = require('./VueInit');
var Modal = require('./Modal');
var JZHACK = require('./JZHACK');
Config.LoadClock();
Form.Load();
Utils.Load();
Array.Load();
TableResizable.Load();
var GetInstance = function(modules){return modules;};
var _JZ = window.JZ;
var _J = window.J;
var JZ = function(cb){JZHACK.Init(cb);};
window.JZ = JZ;
window.J = JZ;
window.vm = null;
JZ.vm = null;
JZ.Ajax = GetInstance(Ajax.Ajax);  
JZ.Form = GetInstance(Form.Form);
JZ.Table = GetInstance(Table.Table);
JZ.TableGolbal = VueInit.TableGolbal;
JZ.TableConfig = VueInit.TableConfig; 
JZ.Vue = GetInstance(VueInit.VueInit);
JZ.Modal = GetInstance(Modal);
JZ.Config = Config;
JZ.AjaxUrl = Config.AjaxUrl;
JZ.onWindowLoad = Config.onWindowLoad;
JZ.onWindowLoad(function () {
    Form.InitEventKeyUp(); 
});	
JZ.noConflict = function(){ 
	if(window.J == JZ){
		window.J = _J;
	}
	if(window.JZ == JZ){
		window.JZ = _JZ;
	}
	return JZ; 
};


//-------------极装专用分割线-------------------------
JZ.GetDic = JZHACK.GetDictionary;
JZHACK.Load(JZ);