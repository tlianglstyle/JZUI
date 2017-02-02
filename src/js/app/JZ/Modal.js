var Config = require('./Config');
var requestQueue = new Object();
exports.Close = function(id){
	$('#'+id).modal('hide');
}
exports.CloseParent = function(id){
	top.window.JZ.Modal.Close(id);
}
 