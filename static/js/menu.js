// baseURL = document.getElementById("basePath").href+"/";

/** *******************自适应 start************************* */

var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
var isResize = true;
$(window).resize(function() {
	var ss = getPageSize();

	/* var jqgirdwidth = $(document.body).width(); */
	if (isIE) {
		$(".widget-body").height(ss.WinH - $(".widget-header").height() - 10);
		$(".widget-main").height(ss.WinH - $(".widget-header").height()-$(".toolbar").height() - 12);
	} else {
		$(".widget-body").height(ss.WinH - $(".widget-header").height() - 10);
		$(".widget-main").height(ss.WinH - $(".widget-header").height()-$(".toolbar").height() - 12);
	}
});

function getPageSize() {
	// http://www.blabla.cn/js_kb/javascript_pagesize_windowsize_scrollbar.html
	var winW, winH;
	if (window.innerHeight) {// all except IE
		winW = window.innerWidth;
		winH = window.innerHeight;
	} else if (document.documentElement
			&& document.documentElement.clientHeight) {// IE 6 Strict Mode
		winW = document.documentElement.clientWidth;
		winH = document.documentElement.clientHeight;
	} else if (document.body) { // other
		winW = document.body.clientWidth;
		winH = document.body.clientHeight;
	} // for small pages with total size less then the viewport
	return {
		WinW : winW,
		WinH : winH
	};
}

$(function() {
	var ss = getPageSize();
	/* $("#grid-table").setGridWidth(ss.winW); */
	$(".widget-body").height(ss.WinH - $(".widget-header").height() - 10);
	$(".widget-main").height(ss.WinH - $(".widget-header").height()-$(".toolbar").height() - 12);
	$("#treeDemo").height($(".widget-main").height());
});

/** *******************自适应 end************************* */

/** *******************全局变量************************* */
var log, className = "dark", curDragNodes, autoExpandNode;

var point =[];
point["inner"] = "append",point["prev"] = "top",point["next"] = "bottom"; 

/**
 * 装载VUE
 */
/** *******************装载VUE start************************* */

// var vm = new Vue({
//     el:'#page_content',
//     data:{
//     	ztree:{},
// 		message:"",
// 		fa_iconCls:"menu-icon fa",
// 		menu:{id:"",menuname:"",useType:"Y",resource:{id:"",name:""},iconCls:""},
// 		parentMenu:{},
// 		ztreeObj:null,
// 		treeNode:null,
// 		rMenu:null,
// 		selected: '',
// 		resource:[{menuname:"",url:""}]
//     },
//     created:function(){
//     	this.ztree.setting={
//     			edit: {
//     				drag: {
//     					autoExpandTrigger: true,
//     					prev: true,
//     					inner: true,
//     					next: true
//     				},
//     				enable: true,
//     				showRemoveBtn: false,
//     				showRenameBtn: false
//     			},
//     			data: {
//     				simpleData: {
//     					enable: true
//     				}
//     			},
    			
//     		view : {
//     			dblClickExpand : false,
//     			showIcon: true,
//     			selectedMulti: false
//     		},
//     		async : {
//     			enable : true,
//     			url : baseURL + "admin/menu/getMenuTree",
//     			autoParam : [ "id" ]
//     		},
//     		callback : {
//     			onClick : this.zTreeOnClick,
//     			onAsyncSuccess:this.onAsyncSuccess,
//     			onRightClick: this.zTreeOnRightClick,
//     			onNodeCreated: this.zTreeOnNodeCreated,
//     			beforeDrag: this.beforeDrag,
//     			beforeDrop: this.beforeDrop,
//     			beforeDragOpen: this.beforeDragOpen,
//     			onDrag: this.onDrag,
//     			onDrop: this.onDrop,
//     			onExpand: this.onExpand
//     		}
//     	};
//     },
//     mounted:function () {
//     	this.init();
//     },
// 	methods:{
// 		init:function(){
// 			$.fn.zTree.init($("#treeDemo"), this.ztree.setting);
// 			this.ztreeObj = $.fn.zTree.getZTreeObj("treeDemo");
// 			this.rMenu = $("#rMenu");
			
// 			var packageUrlParam = new Array();
// 			var paraJson = {"groupId": "1e9fdfcb-691d-4a16-a4e2-5450400d3ef7", "parentId": "0"};
// //			$.post(baseURL+"admin/dictionaries/selectGroupIdOrParentId",paraJson,function(r){
// //				if(r.code === 0){
// //					for(var i=0; i<r.dictionariesList.length; i++){
// //						packageUrlParam.push(r.dictionariesList[i].zhCn);
// //					}
// //					var param = {"packageName":packageUrlParam};
// //					$.ajax({
// //						  type: 'POST',
// //						  url: baseURL + "admin/menu/selectResource",
// //						  data: param,
// //						  traditional:true,
// //						  success: function(re){
// //							  if(re.code === 0){
// //								  vm.resource = re.menuResources;
// //							  }
// //						  }
// //					});
// //				}else{
// //					$.Pro(r.msg);
// //				}
// //			});
// 		},
// 		reload:function(treeNode){
			
// 		},
// 		getMenu:function(node){
// 			$.getJSON(baseURL + "admin/menu/getMenu?id="+node.id, function(r){
// 				var pid = vm.treeNode.getParentNode()==null?0:vm.treeNode.getParentNode();
// 				if(r.menu){
// 					vm.menu=r.menu;
// 				}else{
// 					vm.menu={id:"",menuname:"",parentId:pid,useType:true,resource:{id:"",name:""}};
// 				}
// 				if(vm.menu.useType=="N"){
// 					vm.menu.useType=false;
// 				}else{
// 					vm.menu.useType=true;
// 				}
// 				if(node.getParentNode()){
// 					vm.parentMenu=node.getParentNode();
// 				}else{
// 					vm.parentMenu={};
// 				}
// 				//判断后台resource是否为空，如果为空需重置
// 				if(!vm.menu.resource){
// 					vm.menu.resource={};
// 					vm.menu.resource.id="";
// 					vm.menu.resource.name="";
// 				}
// 			});
// 		},
// 		add:function(e,append){
// 			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
// 			if(append){
// 				vm.treeNode = vm.treeNode.getParentNode();
// 			}
			
// 			var parentId = vm.treeNode==null?0:vm.treeNode.id;
// 			if(vm.treeNode){
// 				vm.menu={id:"",menuname:"",parentId:vm.treeNode.id,useType:true,resource:{id:"",name:""},iconCls:''};
// 				var newNode = {id:-1, pId:vm.treeNode.id, isParent:false, name:""};
// 				var childnode = vm.ztreeObj.addNodes(vm.treeNode,newNode);
// 			}else{
// 				vm.menu={id:"",menuname:"",parentId:0,useType:true,resource:{id:"",name:""},iconCls:''};
// //				var newNode = {id:-1, pId:vm.treeNode.id, isParent:false, name:""};
// 				var newCount=1;
// 				var treeNode1 = zTree.addNodes(null, {id:-1, pId:0, isParent:false, name:""});
// 				vm.treeNodevm=treeNode1[0];
// 				zTree.editName(treeNode1[0]);
// 			}
// 			vm.hideRMenu();
// 		},
// 		update:function(){
			
// 		},
// 		del:function(){
// 			var menu = {id:vm.menu.id, menuname:vm.menu.menuname};
// 			$.post(baseURL + "admin/menu/delete",menu,function(r){
// 				if(r.code === 0){
// 					vm.ztreeObj.selectNode(vm.treeNode.getParentNode());
// 					var treeNode =  vm.treeNode;
// 					vm.ztreeObj.removeNode(treeNode);
// 					vm.treeNode =  vm.treeNode.getParentNode();
// 				}else{
// 				}
// 				vm.hideRMenu();
// 	        });
// 		},
// 		selectResource:function(){
// 			vm.menu.url = this.selected;
// 		},
// 		//移动
// 		dropNext:function(treeId, nodes, targetNode){
// 			var pNode = vm.treeNode.getParentNode();
// 			if (pNode && pNode.dropInner === false) {
// 				return false;
// 			} else {
// 				for (var i=0,l=curDragNodes.length; i<l; i++) {
// 					var curPNode = curDragNodes[i].getParentNode();
// 					if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
// 						return false;
// 					}
// 				}
// 			}
// 			return true;
// 		},
// 		dropInner:function(treeId, nodes, targetNode){
// 			if (targetNode && targetNode.dropInner === false) {
// 				return false;
// 			} else {
// 				for (var i=0,l=curDragNodes.length; i<l; i++) {
// 					if (!targetNode && curDragNodes[i].dropRoot === false) {
// 						return false;
// 					} else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {
// 						return false;
// 					}
// 				}
// 			}
// 			return true;
// 		},
// 		dropPrev:function(treeId, nodes, targetNode){
// 			var pNode = vm.treeNode.getParentNode();
// 			if (pNode && pNode.dropInner === false) {
// 				return false;
// 			} else {
// 				for (var i=0,l=curDragNodes.length; i<l; i++) {
// 					var curPNode = curDragNodes[i].getParentNode();
// 					if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
// 						return false;
// 					}
// 				}
// 			}
// 			return true;
// 		},
// 		beforeDrag:function (treeId, treeNodes) {
// 			className = (className === "dark" ? "":"dark");
// 			vm.showLog("[ "+vm.getTime()+" beforeDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
// 			for (var i=0,l=treeNodes.length; i<l; i++) {
// 				if (treeNodes[i].drag === false) {
// 					curDragNodes = null;
// 					return false;
// 				} else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
// 					curDragNodes = null;
// 					return false;
// 				}
// 			}
// 			curDragNodes = treeNodes;
// 			return true;
// 		},
// 		beforeDragOpen:function(treeId, treeNode) {
// 			autoExpandNode = treeNode;
// 			return true;
// 		},
// 		beforeDrop:function(treeId, treeNodes, targetNode, moveType, isCopy) {
// 			className = (className === "dark" ? "":"dark");
// 			vm.showLog("[ "+vm.getTime()+" beforeDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
// 			vm.showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"));
// 			//append  top  bottom prev next inner
// 			return true;
// 		},
// 		onDrag:function(event, treeId, treeNodes) {
// 			className = (className === "dark" ? "":"dark");
// 			vm.showLog("[ "+vm.getTime()+" onDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
// 		},
// 		onDrop:function(event, treeId, treeNodes, targetNode, moveType, isCopy) {
// 			className = (className === "dark" ? "":"dark");
// 			var source_id =  treeNodes[0].id;
// 			var target_id = targetNode.id;
// 			var function_point = point[moveType];
			
// 			//移动更新
// 			$.ajax({
// 		        type: "POST",
// 		        url: baseURL + "admin/menu/updateRank",
// 		        data: {"sourceId":source_id,"targetId":target_id,"point":function_point},
// 		        dataType: "json",
// 		        success: function(data){
// 		        }
// 		    });
			
// 		},
// 		onExpand:function(event, treeId, treeNode) {
// 			if (treeNode === autoExpandNode) {
// 				newObj.checked = vm.ztreeObj.selectNode(treeNode).checked;
				
// 				setTimeout(function(){
// 					newObj = vm.zTree.addNodes(vm.ztreeObj.selectNode(treeNode), newObj);
// 				},10);
// 				className = (className === "dark" ? "":"dark");
// 				vm.showLog("[ "+vm.getTime()+" onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
// 			}
// 		},
// 		showLog:function(str) {
// 			if (!log) log = $("#log");
// 			log.append("<li class='"+className+"'>"+str+"</li>");
// 			if(log.children("li").length > 8) {
// 				log.get(0).removeChild(log.children("li")[0]);
// 			}
// 		},
// 		getTime:function() {
// 			var now= new Date(),
// 			h=now.getHours(),
// 			m=now.getMinutes(),
// 			s=now.getSeconds(),
// 			ms=now.getMilliseconds();
// 			return (h+":"+m+":"+s+ " " +ms);
// 		},
// 		//图标显示框
// 		shouIcons:function(){
// 			$("#icons").css({"visibility" : "visible"});
// 		},
// 		saveOrUpdate:function(){
// 			//是否启用状态
// 			var useType;
// 			if(vm.menu.useType){
// 				useType="Y";
// 			}else{
// 				useType="N";
// 			}
// 			var menu = {id:vm.menu.id,rank:vm.menu.rank,state:vm.menu.state,menuname:vm.menu.menuname,url:vm.menu.url,useType:useType,parentId:vm.menu.parentId,iconCls:vm.menu.iconCls,resourceId:vm.menu.resource.id,menuType:vm.menu.menuType,isLeftMenu:vm.menu.isLeftMenu,permissCode:vm.menu.permissCode};
// 			$.post(baseURL + "admin/menu/save",menu,function(r){
// 				if(r.code === 0){
// 					if(vm.treeNode.id==-1){
// 						vm.treeNode.id=r.menu.id;
// 						vm.treeNode.name=r.menu.menuname;
// 						vm.ztreeObj.updateNode(vm.treeNode);
// 					}else{
// 						vm.treeNode.name=r.menu.menuname;
// 						vm.ztreeObj.updateNode(vm.treeNode);
// 					}
// 					vm.getMenu(vm.treeNode);
// 				}else{
// 				}
// 	        });
// 		},
// 		zTreeOnNodeCreated:function(event, treeId, treeNode){
// 			if(treeNode&&treeNode.id=="-1"){
// 				vm.ztreeObj.selectNode(treeNode);
// 				vm.treeNode=treeNode;
// 			}
// 		},
// 		zTreeOnClick:function(event, treeId, treeNode){
// 			vm.treeNode=treeNode;
// 			vm.getMenu(treeNode);
// 		},
// 		//点击弹出框资源树事件
// 		resourceTreeClick:function(event, treeId, treeNode){
// 			if(treeNode != null){
// 				vm.menu.resource.name=treeNode.name;
// 				vm.menu.resource.id=treeNode.id;
// 				if(treeNode.code != null){
// 					vm.menu.url=treeNode.code;
// 				}else{
// 					vm.menu.url=treeNode.url;
// 				}
// 			}
// 			$("#menuContentEdit").css({"visibility" : "hidden"});
// 		},
// 		onAsyncSuccess:function(event, treeId, treeNode, msg){
			
// //			vm.ztreeObj = $.fn.zTree.getZTreeObj("treeDemo");
// //			vm.treeNode=vm.ztreeObj.getNodes();
// //			if (!treeNode&&vm.treeNode.length>0) {
// //				vm.ztreeObj.selectNode(vm.treeNode[0]);
// //				vm.getMenu(vm.treeNode[0]);
// //			}
// 		},
// 		zTreeOnRightClick:function(event, treeId, treeNode){
// 			if(treeNode==null){
// 				return true;
// 			}
// 			if (treeNode==null && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
// 				vm.ztreeObj.selectNode(treeNode);
// 				vm.ztreeObj.cancelSelectedNode();
// 				vm.showRMenu("root", event.clientX, event.clientY);
// 			} else if (treeNode!=null && !treeNode.noR) {
// 				vm.ztreeObj.selectNode(treeNode);
// 				vm.showRMenu("node", event.clientX, event.clientY);
// 			}
// 			vm.treeNode = treeNode;
// 			/*vm.parentMenu=treeNode;*/
// 			/*alert(1);*/
// 		},
// 		showRMenu:function(type, x, y) {
// 			$("#rMenu ul").show();
// 			vm.rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});
// 			$("body").bind("mousedown", vm.onBodyMouseDown);
// 		},
// 		hideRMenu:function() {
// 			if (vm.rMenu) vm.rMenu.css({"visibility": "hidden"});
// 			$("body").unbind("mousedown", vm.onBodyMouseDown);
// 		},
// 		onBodyMouseDown:function(event){
// 			if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
// 				vm.rMenu.css({"visibility" : "hidden"});
// 			}
// 			if (!(event.target.id == "menuContentEdit" || $(event.target).parents("#menuContentEdit").length>0)) {
// 				$("#menuContentEdit").css({"visibility" : "hidden"});
// 			}
// 			if (!(event.target.id == "icons" || $(event.target).parents("#icons").length>0)) {
// 				$("#icons").css({"visibility" : "hidden"});
// 			}
// 		},
// 		//回显图标选择值
// 		onLiMouseDown:function(obj){
// 			if(obj != null){
// 				vm.menu.iconCls=$(obj).text();
// 			}
// 			$("#icons").modal("hide"); //手动关闭模态框
// 			$("#icons ul li").removeClass("bg-img-color");
// 		},
// 		showResource:function(){
// 			$("#menuContentEdit").css({"visibility" : "visible"});
// 		},
// 		initResource:function(obj){
// 			var resourceSetting={data: {
// 				simpleData: {
// 					enable: true
// 				},
// 				key:{
// 					url:"noUrl"
// 				}
// 				},view : {
// 				dblClickExpand : false,
// 				showIcon: true,
// 				selectedMulti: false
// 				},
// 				async : {
// 					enable : true,
// 					url : baseURL + "admin/resource/getAllResourceTree",
// 					autoParam : [ "id" ]
// 				},
// 	    		callback : {
// 	    			onClick : this.resourceTreeClick
// 	    		}
// 			};
// 			$.fn.zTree.init($("#resourceTree"), resourceSetting);
			
// 			$("#menuContentEdit").css({
// //				left : obj.screenX-obj.clientX-18 + "px",
// 				left : "28%",
// 				top : 32 + "px",
// 				width : "68%"
// 			}).fadeIn("fast");
// 			$("body").bind("mousedown", vm.onBodyMouseDown);
// 			vm.showResource();
// 		},
// 		//图标选择模态框
// 		initIcons:function(e){
// 			if($icon_a == null){
// 				$icon_a=$("#modal-container_icon form p a");
// 			}
			
// 			for(var i=0 ; i<$icon_a.length ; i++){
// 				if($($icon_a.get(i)).hasClass("btn-success")){
// 					$($icon_a.get(i)).removeClass("btn-success");//清理其他a标签的样式
// 					$($icon_a.get(i)).addClass("btn-light");//其他标签恢复默认样式
// 					break;//只可能有一个，找到后不必再循环
// 				}
// 			}
// 			$('#modal-container_icon').modal('show');
// 		},
// 		//确定选择图标
// 		sureChooseIcon:function(){
// 			if($icon_a == null){
// 				$icon_a=$("#modal-container_icon form p a");
// 			}
// //			if(!$icon_a.hasClass("btn-success")){//是否选择图标
// //				$.Pro('请选择图标！');
// //				return false;
// //			}
// 			for(var i=0 ; i<$icon_a.length ; i++){
// 				if($($icon_a.get(i)).hasClass("btn-success")){
// 					vm.menu.iconCls=$($icon_a.get(i)).attr("title").replace("icon-","fa-");//设置选择的图标
// 					break;//只可能有一个，找到后不必再循环
// 				}
// 			}
// 		},
// 		//取消选择图标
// 		canceChooseIcon:function(){
			
// 		}
		
// 	}
// });

/** *******************装载VUE end************************* */

/**
 * 点击选择图标时设置选择的图标的效果
 * @param obj
 */
var $icon_a=null;//减少Jquery再次遍历a标签，提高效率
var currentChoose=null;
function clickChooseIcon(obj){
	if(currentChoose===obj){
		return false;
	}
	if($icon_a == null){
		$icon_a=$("#modal-container_icon form p a");
	}
	
	for(var i=0 ; i<$icon_a.length ; i++){
		if($($icon_a.get(i)).hasClass("btn-success")){
			$($icon_a.get(i)).removeClass("btn-success");//清理其他a标签的样式
			$($icon_a.get(i)).addClass("btn-light");//其他标签恢复默认样式
			break;//只可能有一个，找到后不必再循环
		}
	}
	$(obj).removeClass("btn-light");//清理对象的默认样式
	$(obj).addClass("btn-success");//添加新样式
	
	currentChoose=obj;
};
