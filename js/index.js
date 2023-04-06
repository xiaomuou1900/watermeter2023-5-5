(function(){
	var data1 = localStorage.getItem('user')
	var data2 = sessionStorage.getItem('user')
	if((data1 == null) || (data2 == null)){
		window.location.href = './login.html'
	}
	window.localStorage.removeItem('user')
    window.sessionStorage.removeItem('user')
})()
mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 左侧分类导航1 = new 左侧分类导航("左侧分类导航1",左侧分类导航1_分类被单击,左侧分类导航1_子项被单击);
if(mui.os.plus){
    mui.plusReady(function() {
        窗口1_创建完毕();
        
    });
}else{
    window.onload=function(){ 
        窗口1_创建完毕();
        
    }
}

function 窗口1_创建完毕(){
	左侧分类导航1.添加logo("images/erp.png","蓝鸟ERP管理系统");

	左侧分类导航1.添加分类("images/home.png","系统首页");
	左侧分类导航1.添加子项(0,"进货管理");
	左侧分类导航1.添加子项(0,"库存管理");
	左侧分类导航1.添加子项(0,"销售管理");

	左侧分类导航1.添加分类("images/folder.png","订单管理");
	左侧分类导航1.添加子项(1,"当前订单");
	左侧分类导航1.添加子项(1,"历史订单");
	左侧分类导航1.添加子项(1,"生产进度");

	左侧分类导航1.添加分类("images/plane.png","邮件系统");
	左侧分类导航1.添加子项(2,"收件信箱");
	左侧分类导航1.添加子项(2,"发送邮件");
	左侧分类导航1.添加子项(2,"草稿信箱");

	左侧分类导航1.添加分类("images/person.png","用户管理");
	左侧分类导航1.添加子项(3,"添加用户");
	左侧分类导航1.添加子项(3,"权限设置");
	左侧分类导航1.添加子项(3,"删除用户");

	左侧分类导航1.添加分类("images/edit.png","系统维护");
	左侧分类导航1.添加子项(4,"备份数据");
	左侧分类导航1.添加子项(4,"恢复数据");
	左侧分类导航1.添加子项(4,"优化冗余");

	左侧分类导航1.选中分类(0);
	左侧分类导航1.选中子项(0,0);
	左侧分类导航1.切换窗口("chuangkou1.html",false,"user=ZhangSan");
}

function 左侧分类导航1_分类被单击(分类索引){
	console.log(分类索引);
}

function 左侧分类导航1_子项被单击(分类索引,子项索引){
	console.log(分类索引,子项索引);
}
