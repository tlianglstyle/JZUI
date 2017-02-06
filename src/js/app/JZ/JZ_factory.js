var Config = require('./Config'); 
var Ajax = require('./Ajax');
var Table = require('./Table');
var Form = require('./Form');
var VueInit = require('./VueInit');
var _JZ = window.JZ;
var _J = window.J;
var JZUI = (function(){
	var Constructor = function(name){
		this.vm = null;
		this.Ajax = Ajax.Ajax;
		this.Form = Form.Form;
		this.Table = Table.Table;
		this.TableGolbal = VueInit.TableGolbal;
		this.TableConfig = VueInit.TableConfig; 
		this.VueInit = VueInit.VueInit;
	}
	Constructor.prototype.noConflict = function(){
		if(window.J == JZ){
			window.J = _J;
		} 
		if(window.JZ == JZ){
			window.JZ = _JZ;
		}
		return JZ;
	};
	return Constructor;
})();
var JZ = new JZUI();
window.JZ = JZ;
window.J = JZ;
