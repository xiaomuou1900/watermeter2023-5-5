window.localStorage.removeItem('user')
window.sessionStorage.removeItem('user')
mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 自由面板1 = new 自由面板("自由面板1","825px");
var 图片框1 = new 图片框("图片框1",null);
var 图片框2 = new 图片框("图片框2",null);
var 编辑框1 = new 编辑框("编辑框1", null, 编辑框1_按下某键, null, null, null);
var 编辑框2 = new 编辑框("编辑框2", null, 编辑框2_按下某键, null, null, null);
var 按钮1 = new 按钮("按钮1",按钮1_被单击,null,null);
var 图片框3 = new 图片框("图片框3",null);
if(mui.os.plus){
    mui.plusReady(function() {
        主窗口_创建完毕();
        
    });
}else{
    window.onload=function(){ 
        主窗口_创建完毕();
        
    }
}
window.onresize=function(){
	主窗口_窗口尺寸改变();
};

function 调整组件尺寸(){





	if(window.innerWidth - 700 < 0 ){
		// 窗口操作.置组件宽度("图片框1","" + window.innerWidth-20 + "px");
		窗口操作.置组件宽度("图片框1","" + window.innerWidth -20 + "px");

	    窗口操作.置组件高度("图片框1","" + (window.innerWidth-20)/700*100 + "px");
		窗口操作.置组件左边("图片框1","" + 10 + "px");
	}else{
	    窗口操作.置组件宽度("图片框1","" + 700 + "px");
	    窗口操作.置组件高度("图片框1","" + 100 + "px");
	    窗口操作.置组件左边("图片框1","" + ((window.innerWidth-700)/2) + "px");
	}

	if(window.innerWidth - 500 > 0 ){
		图片框2.置可视(true);
		图片框3.置可视(false);
		窗口操作.置组件左边("图片框2","" + ((window.innerWidth-600)/2) + "px");
        窗口操作.置组件宽度("图片框2","" + 600 + "px");
	    窗口操作.置组件高度("图片框2","" + 450 + "px");
	}else{


		图片框2.置可视(false);
		图片框3.置可视(true);
		窗口操作.置组件左边("图片框3","" + ((window.innerWidth-260)/2) + "px");
		窗口操作.置组件左边("图片框2","" + 15 + "px");
	}

	if(window.innerWidth - 300 > 0 ){
		窗口操作.置组件左边("编辑框1","" + ((window.innerWidth-300)/2) + "px");
		窗口操作.置组件左边("编辑框2","" + ((window.innerWidth-300)/2) + "px");
		窗口操作.置组件左边("按钮1","" + ((window.innerWidth-160)/2) + "px");
	}




}

function 主窗口_创建完毕(){
	调整组件尺寸();
}

function 主窗口_窗口尺寸改变(){
	调整组件尺寸();
}

function 按钮1_被单击(){
	if(编辑框1.取内容() == "" || 编辑框2.取内容() == ""  ){
		alert("用户名、密码不能为空！");
		return;
	}else{
	var username = 编辑框1.取内容();
	var password = 编辑框2.取内容();
	  $.ajax({
		url: './api/login.php',
		method: 'post',
        data:{
			username: username,
			password: password
		},
        success: function(res) {
          if(res.status != 200) {
			alert('登录失败')
		  }
		  try {
			localStorage.setItem('user', JSON.stringify(res));
			window.sessionStorage.setItem('user', JSON.stringify(res));
		  } catch (e){
			alert("请取消隐私浏览模式。");
		  }
		  location.href="./index.html"
		}

	  })
	}
	    // 窗口操作.切换窗口("index.html",1);
}




function 编辑框1_按下某键(键代码) {
    if (键代码 == 13) {
        //alert("编辑框1回车键被按下了");
        编辑框2.获取焦点();
    }
}

function 编辑框2_按下某键(键代码) {
    if (键代码 == 13) {
        //alert("编辑框2回车键被按下了");
        按钮1_被单击();
    }
}
