var Config = require('./Config');
var requestQueue = new Object();
exports.Close = function(id){
	$('#'+id).modal('hide');
}
exports.CloseParent = function(id){
	parent.window.JZ.Modal.Close(id);
}