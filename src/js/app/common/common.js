var Config = require('./Config');
var Array = require('./Array');
var Ajax = require('./Ajax');
var Form = require('./Form');
var Table = require('./Table');
var VueInit = require('./VueInit');
var _JZ = window.JZ;
var _J = window.J;
var JZ = new Object();
window.JZ = JZ;
window.J = JZ;
JZ.vm = null;
JZ.Ajax = Ajax.Ajax;  
JZ.Form = Form.Form;
JZ.Table = Table.Table;
JZ.TableGolbal = VueInit.TableGolbal;
JZ.TableConfig = VueInit.TableConfig; 
JZ.Vue = VueInit.VueInit;  
JZ.Config = Config;
JZ.AjaxUrl = Config.AjaxUrl;
JZ.noConflict = function(){
	if(window.J == JZ){
		window.J = _J;
	}
	if(window.JZ == JZ){
		window.JZ = _JZ;
	}
	return JZ;
};
Array.Load();


//-------------极装专用分割线-------------------------
require('./JZHACK').Load(JZ);
