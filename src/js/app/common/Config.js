var ENV = 'dev';
exports.ENV = ENV;
exports.Dev = ( ENV == 'dev' );
exports.Production = ( ENV == 'production' );
exports.AjaxUrl = {
	DemoPageData : "DemoPageDataJsonP?"
};
exports.AjaxUrlValueJsonP = {
	"DemoPageDataJsonP?" : "http://tliangl.com/service/api.ashx?action=GetBlogs"
	//"DemoPageDataJsonP?" : "http://localhost:20849/service/api.ashx?action=GetBlogs"
};


