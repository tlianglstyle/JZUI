var Config = require('./Config');
var Array = require('./Array');
var Ajax = require('./Ajax');
var Form = require('./Form');
var Table = require('./Table');
var VueInit = require('./VueInit');
var Modal = require('./Modal');
var GetInstance = function(modules){return modules;};
var _JZ = window.JZ;
var _J = window.J;
var JZ = new Object();
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
JZ.noConflict = function(){ 
	if(window.J == JZ){
		window.J = _J;
	}
	if(window.JZ == JZ){
		window.JZ = _JZ;
	}
	return JZ; 
};
Config.LoadClock();
Array.Load();


//-------------极装专用分割线-------------------------
require('./JZHACK').Load(JZ);