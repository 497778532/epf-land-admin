
//jqGrid的配置信息
//$.jgrid.defaults.width = 1000;
//$.jgrid.defaults.responsive = true;
//$.jgrid.defaults.styleUI = 'Bootstrap';

//工具集合Tools
window.T = {};

// 获取请求参数
// 使用示例
// location.href = http://localhost/index.html?id=123
// T.p('id') --> 123;
var url = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
};
T.p = url;

//请求前缀
var baseURL = "/"+window.location.pathname.split("/")[1]+"/";
//登录token
var token = localStorage.getItem("token");
if(token == 'null'){
    parent.location.href = baseURL + 'login.html';
}

var isLogout=localStorage.setItem("isLogout",false);
var a=0;
//jquery全局配置
$.ajaxSetup({
	dataType: "json",
	cache: false,
    headers: {
        "token": token
    },
    xhrFields: {
	    withCredentials: true
    },
    complete: function(xhr) {
//  	xhr.setRequestHeader('Content-Type', 'application/xml;charset=utf-8');
        //token过期，则跳转到登录页面
        if(xhr.responseJSON!=undefined&&xhr.responseJSON.code == 401){
        	isLogout = localStorage.getItem("isLogout");
        	if(isLogout=="false"){
        		isLogout = localStorage.setItem("isLogout",true);
        		alert("登陆已失效或在其他地方登陆，请重新登陆");
        		parent.location.href = baseURL + 'login';
        	}
        }
    }
});

//jqgrid全局配置
//$.extend($.jgrid.defaults, {
//    ajaxGridOptions : {
//        headers: {
//            "token": token
//        }
//    }
//});

//权限判断
function hasPermission(permission) {
    if (window.parent.permissions.indexOf(permission) > -1) {
        return true;
    } else {
        return false;
    }
}

//重写alert
/*window.alert = function(msg, callback){
	parent.layer.alert(msg, function(index){
		parent.layer.close(index);
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}*/
//$.Pro = function(msg){alert(msg);};
//重写confirm式样框
/*window.confirm = function(msg, callback){
	parent.layer.confirm(msg, {btn: ['确定','取消']},
	function(){//确定事件
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}*/

//选择一条记录
function getSelectedRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
    	//alert("请选择一条记录");
    	$.Pop('请选择一条记录','alert');
    	return ;
    }
    
    var selectedIDs = grid.getGridParam("selarrrow");
    if(selectedIDs.length > 1){
    	$.Pop('只能选择一条记录','alert');
    	//alert("只能选择一条记录");
    	return ;
    }
    
    return selectedIDs[0];
}

//选择多条记录
function getSelectedRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
    	//alert("请选择一条记录");
    	$.Pop('请选择一条记录','alert');
    	return ;
    }
    
    return grid.getGridParam("selarrrow");
}

//判断是否为空
function isBlank(value) {
    return !value || !/\S/.test(value)
}



/**
 * 重新更新替换Ace的icon
 * @returns
 */
function reloadAceIcon(){
	var table = this;
	var replacement = 
		{
			'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
			'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
			'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
			'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
		};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
		var icon = $(this);
		var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
		
		if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	});
}

/**
 * 解决vue无法绑定时间控件选择的数据通用方法
 * 例子：
 * 	使用方法：时间控件添加 my-model="your v-mode value"
 * 	添加change触发事件：onchange="vueValueChange(this)"
 */
function vueValueChange(node){
	var model = $(node).attr("my-model");
	if(model == null || model == ""|| (model+"")=="undefined" ){
		return ;
	}
	var value = vm;
	var keys=model.split(".");
	for(var i in keys){
		if(i<keys.length-1){
			value=value[keys[i]];
		}else{
			value[keys[i]]=$(node).val();
		}
	}
}
//根据分组查询字典表 para格式为{"model":"vue中需要设值得的参数，需要在vue的参数上配","groupId":"字典表的分组id"};
function initStatus(para){
	$.post(baseURL+"admin/dictionaries/selectGroupId",{"groupId":para.groupId},function(r){
		if(r.code === 0){
			vm[para.model] = r.dictionariesList;
		}else{
			$.Pro(r.msg);
		}
	});
}
//根据value查zhCn
//数据格式输出方法：value为转换前的值，model为需要从vue中的相应的参数数组，注意，调用此方法前vue的相应的参数必须是已经有值得
function formater(value,model){
	for(var i in vm[model]){
		var dictValue = vm[model][i].dictValue;
		if(dictValue==value){
			return vm[model][i].zhCn;
		}
	}
	return value;
}

//根据zhCn查value
//数据格式输出方法：name为装换前的值，model为需要从vue中的相应的参数数组，注意，调用此方法前vue的相应的参数必须是已经有值得，与formater相反
function formaterByName(name,model){
	for(var i in vm[model]){
		var zhCn = vm[model][i].zhCn;
		if(zhCn==name){
			return vm[model][i].dictValue;
		}
	}
	return name;
}


//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt) { //author: meizz   
var o = {   
		"M+" : this.getMonth()+1,                 //月份   
		"d+" : this.getDate(),                    //日   
		"h+" : this.getHours(),                   //小时   
		"m+" : this.getMinutes(),                 //分   
		"s+" : this.getSeconds(),                 //秒   
		"q+" : Math.floor((this.getMonth()+3)/3), //季度   
		"S"  : this.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(fmt))   
	fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	for(var k in o)   
	if(new RegExp("("+ k +")").test(fmt))   
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
}

/**
* 查询处所有字典数据
**/
function dictList(){
	var dicts;
	var url = baseURL + "admin/dictionaries/list";
	$.ajax({
		type: 'POST',
		url: url,
		async: false,
		data : {"groupId": null},
		dataType: "json",
		success: function(r){
			dicts = r;
		}
	});
	return dicts;
}

/**
 * 迭代字典数据
 * @param dicts
 * @param cellvalue
 * @param groupId
 * @returns
 */
function iterationDicts(dicts,cellvalue,groupId){
	var value="";
	for(var i = 0; i < dicts.length; i++){
		if(dicts[i].dictValue==cellvalue && dicts[i].groupId == groupId){
			value = dicts[i].zhCn;
			break;
		}
	}
	return value;
}
/**
 * 根据父id查询子节点
 * @param dicts
 * @param cellvalue
 * @param groupId
 * @returns
 */
function getDictByParentId(dicts,cellvalue,parentId){
	var value="";
	for(var i = 0; i < dicts.length; i++){
		if(dicts[i].dictValue==cellvalue && dicts[i].parentId == parentId){
			value = dicts[i].zhCn;
			break;
		}
	}
	return value;
}

/**
 * 根据id查询节点
 * @param dicts
 * @param cellvalue
 * @param groupId
 * @returns
 */
function getParentDict(dicts,id){
	var value={};
	for(var i = 0; i < dicts.length; i++){
		if(dicts[i].id==id){
			value = dicts[i];
			break;
		}
	}
	return value;
}
/**
 * 获取字典值json
 * @param dicts
 * @param cellvalue
 * @param groupId
 * @returns
 */
function getDictJson(dicts,cellvalue,groupId){
	var value={};
	for(var i = 0; i < dicts.length; i++){
		if(dicts[i].dictValue==cellvalue && dicts[i].groupId == groupId){
			value = dicts[i];
			break;
		}
	}
	return value;
}

/**
 * 根据groupId获取字典数组
 */
function getDictsArrayByGroupId(dicts,groupId){
	var array=[];
	var value = 0;
	for(var i = 0; i < dicts.length; i++){
		if(dicts[i].groupId == groupId){
			array[value++] = dicts[i];
		}
	}
	return array;
}
/**
 * 根据parentId获取字典数组
 */
function getDictsArrayByParentId(dicts,groupId,parentId){
	var array=[];
	var value = 0;
	for(var i = 0; i < dicts.length; i++){
		if(dicts[i].groupId == groupId && dicts[i].parentId == parentId){
			array[value++] = dicts[i];
		}
	}
	return array;
}

/**
 * 根据字典值和字典分组code查询字典中文显示名称
 * @param groupCode
 * @param value
 * @returns admin/dictionaries/getDictByGroupCodeAndValue
 */
function getDictByGroupCodeAndValue(groupCode,value){
	var zhCn="";
	var url = baseURL + "admin/dictionaries/getDictByGroupCodeAndValue";
	$.ajax({
		type: 'POST',
		url: url,
		async: false,
		data : {"groupCode": groupCode, "value": value},
		dataType: "json",
		success: function(r){
			zhCn = r.zhcn;
		}
	});
	return zhCn;
}
//文件上传
function initUpload(url,fileinputId){
	$(".excelupload").find(fileinputId).fileupload({
		iframe:true,
		url:url,
		dataType: 'json',
		autoUpload: true,
		singleFileUploads: true
	}).on('fileuploaddone', function (e, data) {
		if(data.result.code === 0){
			$.Pro("上传成功");
			vm.reload();
		}else{
			$.Pop(data.result.msg,'alert',function(){});
		}		
	}).on('fileuploadfail', function (e, data) {
		$.Pro("上传失败");
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');	
}

function loadPlaceHolder(){
	 var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	//判断是否是IE浏览器
	 var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
	 var reIE = new RegExp("MSIE (\\d+\\.\\d+);"); 
     reIE.test(userAgent); 
     var fIEVersion = parseFloat(RegExp["$1"]); 
     if(fIEVersion < 10){
    	 jQuery('[placeholder]').focus(function() {
    		  var input = jQuery(this);
    		  if (input.val() == input.attr('placeholder')) {
    		    input.val('');
    		    input.removeClass('placeholder');
    		  }
    		}).blur(function() {
    		  var input = jQuery(this);
    		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    		    input.addClass('placeholder');
    		    input.val(input.attr('placeholder'));
    		    input.css("padding-left","5px").css("font-weight","bold").css("font-size","12px").css("height","30px").css("color","gray");
    		  }
    		}).blur().parents('form').submit(function() {
    		  jQuery(this).find('[placeholder]').each(function() {
    		    var input = jQuery(this);
    		    if (input.val() == input.attr('placeholder')) {
    		      input.val('');
    		    }
    		    input.css("padding-left","5px").css("font-weight","normal").css("font-size","12px").css("height","28px").css("color","gray");
    		  })
    		});
     }
}



function timeFormatter(cellvalue) {
	if(cellvalue){
		if((cellvalue+"").indexOf("-")!=-1){
			cellvalue = (cellvalue+"").replace(/-/g,"/");
		}
		var date=new Date(cellvalue);
		return formatDateTime(date);
	}else{
		return "";
	}
	
}

function dateFormatter(cellvalue) {
	if(cellvalue){
		if((cellvalue+"").indexOf("-")!=-1){
			cellvalue = (cellvalue+"").replace(/-/g,"/");
		}
		var date=new Date(cellvalue);
		return formatDate(date);
	}else{
		return "";
	}
}

var formatDateTime = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes(); 
    var s = date.getSeconds();
    s=s<10?('0'+s):s;
    h=h<10?('0'+h):h;
    minute = minute < 10 ? ('0' + minute) : minute;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+s;  
};

var formatDate = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
};
function formatUrl(url){
	if (url != null && url != "" && url != "#"
		&& url.indexOf(".html") == -1) {
		if(url.indexOf("?") == -1){
			url = url + "?token=" + token;
		}else{
			url = url + "&token=" + token;
		}
	}
	return url;
}

