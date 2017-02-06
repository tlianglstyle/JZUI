exports.Load = function (options) {
    var defaults = {
        control: '',
        sumrows: 0,
        pageid: 1,
        pagesize: 10,
        pageMaxCount: 5,
        maxpage: 6,
        height: 15,
        minWidth: 20, 
        radius: 3,
        setPosition: "",
        color: "#403f3f",
        bgColor: "white",
        borderColor: "#E7ECF0",
        fontSize: 12,
        bold: false,
        hover_color: "black",
        hover_bgColor: "#E7ECF0",
        hover_fontsize: 13,
        hover_borderColor: "#E7ECF0",
        show_start: true,
        show_prev: true,
        show_next: true,
        show_end: true,
        show_sumPages: false,
        show_sumRows: false,
        show_pageInput: false,
        pname_pageid: "pageid",
        pname_pagesize: "pagesize",
        url: window.location.href.split('?')[0],
        request: true,
        animate: true,
        fun: function (index) { }
    };

    var settings = $.extend(defaults, options);
    var request = settings.request;
    var animate = settings.animate;
    var url = settings.url;
    var pname_pageid = settings.pname_pageid;
    var pname_pagesize = settings.pname_pagesize;
    var pageid = settings.pageid;
    var reg = new RegExp("(^|&)" + pname_pageid + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) pageid = parseInt(unescape(r[2]));
    var control = settings.control;
    var pagesize = settings.pagesize;
    var pageMaxCount = settings.pageMaxCount;
    var sumrows = settings.sumrows;
    var maxpage = settings.maxpage;
    var height = settings.height;
    var minWidth = settings.minWidth;
    var radius = settings.radius;
    var setPosition = settings.setPosition;
    var color = settings.color;         //css
    var bgColor = settings.bgColor;
    var borderColor = settings.borderColor;
    var fontSize = settings.fontSize;
    var bold = settings.bold;
    var hover_color = settings.hover_color;
    var hover_bgColor = settings.hover_bgColor;
    var hover_fontsize = settings.hover_fontsize;
    var hover_borderColor = settings.hover_borderColor;
    var show_start = settings.show_start;
    var show_prev = settings.show_prev;
    var show_next = settings.show_next;
    var show_end = settings.show_end;
    var show_sumPages = settings.show_sumPages;
    var show_sumRows = settings.show_sumRows;
    var show_pageInput = settings.show_pageInput;


	var Selectors = function(selector){return $(control).find(selector)};
    var d1 = parseInt(sumrows / pagesize);
    var d2 = parseInt(sumrows % pagesize > 0 ? 1 : 0);
    var pagecount = d1 + d2;
    if (pagecount < pageMaxCount)
        pageMaxCount = pagecount;
    var li_w = (minWidth + (minWidth - fontSize) * 2 + 5); //other_width
    var li_h = (height + (height - fontSize) * 2 + 3); //other_height
    var isPageInit = false;
    $(control).html('');
    if (sumrows > pagesize) {
        load_page();
        if (pageid > pagecount) pageid = pagecount;
        else if (pageid < 0) pageid = 1;
            page_url(pageid);
    }else{  
        var content = '';
    	var sumdb = "<div style=\"font-size:" + fontSize + "px;padding-top:" + (height - fontSize + 1) + "px;margin-left:3px;float:left;font-family:宋体;color:" + color + "\">共";
    	if (show_sumRows) sumdb += (show_sumPages ? "," : "") + sumrows + "条数据";
    	sumdb += "</div>";
    	if (show_sumRows) 
            content += sumdb;
        $(control).append(content);
    }
    function load_page() {  
        var content = ''; 
        if (show_start) content += "<li class=\"start-page\">首页</li>";
        if (show_prev) content += "<li class=\"prev-page\">上一页</li>";
        content += '<div style="width:' + (li_w * pageMaxCount + 2) + 'px;height:' + li_h + 'px;position:relative;overflow:hidden;margin:0px;padding:0px;float:left;">';
        content += '<ul class="page-slider" style="width:' + (li_w + 2) * pagecount + 'px;height:' + li_h + 'px;position:absolute;left:0px;top:0px;margin:0px;padding:0px;">';
        for (var i = 1; i <= pagecount; i++) {
            content += '<li' + (i == pageid ? ' class="page-currentpage"' : "") + ' pagevalue="' + i + '">' + i + '</li>';
        }
        content += '</ul>';
        content += '</div>';
        if (pagecount > 1 && show_next) content += "<li class=\"next-page\">下一页</li>";
        if (show_end) content += "<li class=\"end-page\">末页</li>";

        var sumdb = "<div style=\"font-size:" + fontSize + "px;padding-top:" + (height - fontSize + 1) + "px;margin-left:3px;float:left;font-family:宋体;color:" + color + "\">共";
        if (show_sumPages) sumdb += "" + pagecount + "页";
        if (show_sumRows) sumdb += (show_sumPages ? "," : "") + sumrows + "条数据";
        if (show_pageInput) sumdb += '&nbsp;<input type="text" style="border:1px solid ' + color + ';display:none;height:' + fontSize + 'px;width:20px;margin:0px" class="page-input" /><a style="color:' + color + ';cursor:pointer;margin:0px 2px 0px 0px;display:none;" title="关闭" class="page-input-close">关闭</a><a style="color:' + color + ';cursor:pointer;border:1px solid ' + borderColor + ';padding:2px;" class="page-change" title="跳转">跳转</a>';
        sumdb += "</div>";
        if (show_sumPages || show_sumRows || show_pageInput)
            content += sumdb;

        content += "<div style=\"clear:both;\"></div>";
        $(control).append(content);
    }
    function page_url(page_id) {
        if (request) {
            if (animate) {//普通分页
                page_content(page_id);
            }
            else {//分屏+分页
                if (!isPageInit) {
                    isPageInit = true;
                } else {
                    settings.fun(page_id);
                }
            }
        }
        else {
            if (!isPageInit) {
                page_content(page_id); isPageInit = true;
            } else {
                url = url + "?" + pname_pageid + "=" + page_id + "&" + pname_pagesize + "=" + pagesize;
                if (setPosition != "") {
                    url += "#" + setPosition;
                }
                window.location.href = url;
            }
        }
    }
    function page_content(page_id) {
        Selectors(".page-currentpage").removeClass("page-currentpage");
        $("" + control + " li[pagevalue=" + (page_id) + "]").addClass("page-currentpage");

        $("" + control + " li[pagevalue=" + (page_id) + "]").css({ "background-color": hover_bgColor, "font-weight": bold ? "bold" : "normal" });
        $("" + control + " li:not(.page-more):not(.page-currentpage)").css({ "background-color": bgColor, "font-weight": "normal" });
        var selector = "" + control + " li:not(.page-more):not(.page-currentpage)";
        $('body').on("mousemove", selector, function () { $(this).css({ "background-color": hover_bgColor, "color": hover_color, "font-size": hover_fontsize, "border": ("1px solid " + hover_borderColor).toString(), "font-weight": bold ? "bold" : "normal" }); });
        $('body').on("mouseout", selector, function () { $(this).css({ "background-color": bgColor, "color": color, "font-size": fontSize, "border": ("1px solid " + borderColor).toString(), "font-weight": "normal" }); });
		
        if (page_id <= pagecount - (pageMaxCount - 1)) {
        	if(pagecount<20)
            	Selectors(".page-slider").stop(true, false).animate({ left: -li_w * (page_id - 1) }, 200);
            else
            	Selectors(".page-slider").stop(true, false).css({ left: -li_w * (page_id - 1) });
        } else if (pagecount > pageMaxCount) {
        	if(pagecount<20)
            	Selectors(".page-slider").stop(true, false).animate({ left: -li_w * (pagecount - pageMaxCount) }, 200);
            else 
            	Selectors(".page-slider").stop(true, false).css({ left: -li_w * (pagecount - pageMaxCount) });
        }

        if (page_id == pagecount) { Selectors(".next-page").css("opacity", 0.3); Selectors(".end-page").css("opacity", 0.3); }
        else { Selectors(".next-page").css("opacity", 1); $(".end-page").css("opacity", 1); }

        if (page_id == 1) { $(".prev-page").css("opacity", 0.3); Selectors(".start-page").css("opacity", 0.3); }
        else { Selectors(".prev-page").css("opacity", 1); Selectors(".start-page").css("opacity", 1); }

        settings.fun(page_id);
    }
    var edit_true = false;
    $('body').on("click", ".page-change", function () {
        if (!edit_true) {
            $(this).siblings(".page-input").show();
            $(this).siblings(".page-input-close").show();

            edit_true = true;
        } else {
            if (Selectors(".page-input").val() != null && parseInt(Selectors(".page-input").val()) > 0) {
                if (parseInt(Selectors(".page-input").val()) > pagecount) { pageid = pagecount; Selectors(".page-input").val(pagecount); }
                else pageid = Selectors(".page-input").val();
            }
            page_url(pageid);
        }
    });
    $('body').on("click", ".page-input-close", function () { $(this).siblings(".page-input").hide(); $(this).hide(); edit_true = false; });
    $(control + " li")
    .click(function () {
        if ($(this).hasClass("start-page")) { 
        	if(pageid!=1){ 
        		pageid = 1; page_url(pageid); 
        	}
        }
        else if ($(this).hasClass("prev-page")) { if (pageid > 1) { pageid = parseInt(pageid - 1); page_url(pageid); } }
        else if ($(this).hasClass("next-page")) { if (pageid < pagecount) { pageid = parseInt(pageid) + 1; page_url(pageid); } }
        else if ($(this).hasClass("end-page")) { pageid = pagecount; page_url(pageid); }
        else if ((typeof ($(this).attr('pagevalue')) != "undefined")) {
        		pageid = parseInt($(this).attr("pagevalue")); page_url(pageid);
        }
    })
    .css({ "border": "1px solid " + borderColor,
        "float": "left", "height": (height + "px").toString(), "line-height": (height + "px").toString(), "list-style": "none outside none",
        "padding-top": ((height - fontSize) + "px"), "padding-right": ((minWidth - fontSize) + "px"),
        "padding-bottom": ((height - fontSize) + "px"), "padding-left": ((minWidth - fontSize) + "px"),
        "font-size": fontSize, "font-family": "宋体",
        "min-width": (minWidth + "px").toString(), "text-align": "center", "color": color,
        "margin-left": "3px", "cursor": "pointer", "border-radius": (radius + "px " + radius + "px " + radius + "px " + radius + "px").toString()
    })
    .each(function () {
        if ($(this).hasClass("page-currentpage")) {
            $(this).css({ "background-color": hover_bgColor, "font-weight": bold ? "bold" : "normal" });
            var selector = "" + control + " li:not(.page-more):not(.page-currentpage)";
            $(selector).css({ "background-color": bgColor, "font-weight": "normal" });
            $('body').on("mousemove", selector, function () { $(this).css({ "background-color": hover_bgColor, "color": hover_color, "font-size": hover_fontsize, "border": ("1px solid " + hover_borderColor).toString(), "font-weight": bold ? "bold" : "normal" }); });
            $('body').on("mouseout", selector, function () { $(this).css({ "background-color": bgColor, "color": color, "font-size": fontSize, "border": ("1px solid " + borderColor).toString(), "font-weight": "normal" }); });
        }
        if ($(this).hasClass("start-page") || $(this).hasClass("end-page")) {
            $(this).css("min-width", (fontSize * 2 + 2).toString() + "px");
        } else if ($(this).hasClass("prev-page") || $(this).hasClass("next-page")) {
            $(this).css("min-width", (fontSize * 3 + 3).toString() + "px");
        }
    });
};