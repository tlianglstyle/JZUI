<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<!-- Core -->
<link href="<%=ctx_modules%>/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Menu -->
<link href="<%=ctx_src %>/js/lib/metisMenu/dist/metisMenu.min.css" rel="stylesheet">
 
<!-- DataTables -->
<link href="<%=ctx_src%>/js/lib/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">
<link href="<%=ctx_src%>/js/lib/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet">

<!-- Custom -->
<link href="<%=ctx_src%>/css/common/sb-admin-2.css" rel="stylesheet">

<!-- Fonts -->
<link href="<%=ctx_modules%>/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"> 

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]--> 
<script src="<%=ctx_modules%>/jquery/dist/jquery.min.js" type="text/javascript"></script>
<script src="<%=ctx_modules%>/vue/dist/vue.js" type="text/javascript"></script>
<script src="<%=ctx_modules%>/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=ctx_src%>/js/lib/metisMenu/dist/metisMenu.min.js" type="text/javascript"></script>
<script src="<%=ctx_src%>/js/lib/tools/validate/jquery.validate.min.js"></script> 
<script src="<%=ctx_src%>/js/lib/tools/validate/additional-methods.js"></script>
<script src="<%=ctx_src%>/js/lib/tools/validate/messages_zh.js"></script>
<script src="<%=ctx_src%>/js/lib/tools/validate/validate-methods.js"></script>
<script src="<%=ctx_src%>/js/lib/sb-admin-2.js"></script> 
<script src="<%=ctx_src%>/js/lib/tools/WdatePicker/WdatePicker.js"></script>
<link href="<%=ctx_src%>/js/utils/prettify/prettify.min.css" rel="stylesheet" type="text/css" />
 
<script src="<%=ctx_src%>/js/utils/prettify/prettify.js"></script>
<style>   

	body{margin:0px;font-size:12px;opacity:0;}
	.nav>li>a{padding:5px 5px;}
	.table{margin-bottom:5px;}
	.panel-heading{padding:5px 8px;}
	.label{font-weight:normal;font-family:microsoft yahei;}
	
	#page-wrapper{border:0;margin:0;padding:10px 15px;}

	.form-inline .form-group{margin-bottom:10px;margin-right:5px;}
	.form-inline .form-group .form-control{	padding: 0px 4px;height: 30px;}
	.form-inline .form-group label{min-width:80px;text-align:right;}
	
	.pagination {margin: 5px 0px;}

	.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{font-weight:bold;}
	.m5{margin:10px 5px;}
	label.form-require-error{color: #F42D2D;line-height: 2;}
	
	table.table-bordered thead th, table.table-bordered thead td{white-space: nowrap;}
	
	.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th
	{padding:8px 5px;}
	.panel-body{padding:10px;}
	.pagination li{display:block;    box-sizing: initial;}
	[v-for],[v-if]{opacity:0}
	.rc-handle-container{position:relative;} 
	.rc-handle{position:absolute;width:7px;cursor:ew-resize;*cursor:pointer;margin-left:-3px;z-index:99;}
	
	table.table-bordered thead th, table.table-bordered tbody td{position:relative;
	}
	table.table-bordered thead th, table.table-bordered div.rc-div{
		
	}
	table.table-bordered div.rc-cells{
		opacity: 1;
		white-space: nowrap;
	    width: calc( 100% - 10px) ;
	    display: block;
	    position: absolute;
	    overflow: hidden;
	    top: 8px;
	    left: 5px;
	    z-index:1;
	}
	.table-resizable tbody{
		opacity:0;
	} 
	.table-resizable tbody tr:not(:nth-child(1)){
		opacity:0;
	}
	.table th[sort]{cursor:pointer;}
	.table th[sort]:hover{background-color: #f9f9f9;}
	.table th[sort] .glyphicon{    position: absolute;right: 2px;top: 10px;}
	
	.table th[sort] .glyphicon-sort{opacity:0;}
	[v-cloak]{display:none;}
</style>
<script>var Ctx = ctx = '';</script> 
<script src="<%=ctx_dist%>/js/app/JZ/JZ.js"></script>