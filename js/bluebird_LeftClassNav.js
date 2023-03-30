    function 左侧分类导航(name,event1,event2){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 左侧分类导航(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
        
        //组件命令：
        this.添加logo = function (image,title){
			var logo = document.getElementById(this.名称).getElementsByClassName("logo")[0];
			logo.innerHTML = "<img src=\"" + image + "\"/>" + "\n" + "<div>"+title+"</div>";
			logo.style.display="block";
        } 
        
        //组件命令：
        this.添加分类 = function (image,title){
           var accordion = document.getElementById(this.名称).getElementsByClassName("accordion")[0];
		   var count = document.getElementById(this.名称).getElementsByClassName("section").length;
		   var div = document.createElement("div");
		   div.className = "section";
		   div.innerHTML = 
                "<input type=\"radio\" name=\"accordion-0\" id=\"section-"+count+"\"/>"+"\n"+
                "<label for=\"section-"+count+"\"><img src=\""+image+"\"/><span>"+title+"</span></label>"+"\n"+
                "<div class=\"content\">"+"\n"+
                    "<ul>"+"\n"+
                    "</ul>"+"\n"+
                "</div>";
			accordion.appendChild(div);
			document.getElementById(this.名称).getElementsByTagName("input")[count].addEventListener("click", function(){
				if(event1!=null){
					event1(count);//分类被单击事件
				}
			},false);
        }  

        //组件命令：
        this.选中分类 = function (index){
		    document.getElementById(this.名称).getElementsByTagName("input")[index].checked=true;
		}

        //组件命令：
        this.取分类标题 = function (index){
		    return document.getElementById(this.名称).getElementsByTagName("span")[index].innerText;
		}

        //组件命令：
        this.置分类标题 = function (index,title){
		    document.getElementById(this.名称).getElementsByTagName("span")[index].innerText = title;
		}

        //组件命令：
        this.取分类标记 = function (index){
		    return document.getElementById(this.名称).getElementsByTagName("span")[index].getAttribute("tag");
		}

        //组件命令：
        this.置分类标记 = function (index,title){
		    document.getElementById(this.名称).getElementsByTagName("span")[index].setAttribute("tag",title);
		}

        //组件命令：
        this.添加子项 = function (index,title){
		    var ul = document.getElementById(this.名称).getElementsByTagName("ul")[index];
			var li = document.createElement("li");
			var count = ul.children.length;
			//li.setAttribute("index",""+count); 
			li.innerHTML = title;
			ul.appendChild(li);
			var lis = document.getElementById(this.名称).getElementsByTagName("li");
			ul.children[count].addEventListener("click", function(){
                for(var i= 0; i < lis.length; i++){
                    lis[i].classList.remove("active");
                }
			    ul.children[count].classList.add("active");
				if(event2!=null){
					event2(index,count);//子项被单击事件
				}
			},false);			
		}

        //组件命令：
        this.选中子项 = function (index1,index2){
			var lis = document.getElementById(this.名称).getElementsByTagName("li");
            for(var i= 0; i < lis.length; i++){
                lis[i].classList.remove("active");
            }
			var ul = document.getElementById(this.名称).getElementsByTagName("ul")[index1];
			ul.children[index2].classList.add("active");
		}

        //组件命令：
        this.取子项标题 = function (index1,index2){
		    var ul = document.getElementById(this.名称).getElementsByTagName("ul")[index1];
		    return ul.getElementsByTagName("li")[index2].innerText;
		}

        //组件命令：
        this.置子项标题 = function (index1,index2,title){
		    var ul = document.getElementById(this.名称).getElementsByTagName("ul")[index1];
			ul.getElementsByTagName("li")[index2].innerText=title;
		}

        //组件命令：
        this.取子项标记 = function (index1,index2){
		    var ul = document.getElementById(this.名称).getElementsByTagName("ul")[index1];
		    return ul.getElementsByTagName("li")[index2].getAttribute("tag");		
		}

        //组件命令：
        this.置子项标记 = function (index1,index2,title){
		    var ul = document.getElementById(this.名称).getElementsByTagName("ul")[index1];
			ul.getElementsByTagName("li")[index2].setAttribute("tag",title);			
		}


        //组件命令：
        this.切换窗口 = function (page,rebuild,param){
		    var iframes = document.getElementById(this.名称).parentNode.getElementsByTagName("iframe");
			var exist = false;
            for(var i= 0; i < iframes.length; i++){
                iframes[i].style.display="none";
				if(iframes[i].getAttribute("id")==page){
				    exist = true;
				    iframes[i].style.display="block";
					if(rebuild){
					    iframes[i].setAttribute("src",page+"?"+param);
					}
				}
            }
			if(exist == false){
			    var iframe = document.createElement("iframe");
				iframe.setAttribute("frameborder","0");
				iframe.setAttribute("scrolling","auto");
				iframe.setAttribute("style","display:block;flex:1;height:100%;");
				iframe.setAttribute("src",page + "?" + param);
				iframe.setAttribute("id",page);
				document.getElementById(this.名称).parentNode.appendChild(iframe);
			}
		}

        //组件命令：
        this.置导航宽度= function (value){
            var menu = document.getElementById(this.名称);
            menu.style.width=value;
            var logo = document.getElementById(this.名称).getElementsByClassName("logo")[0];
            logo.style.width=value;            
        } 

        this.清空分类 = function (){
            var accordion = document.getElementById(this.名称).getElementsByClassName("accordion")[0];
            while(accordion.hasChildNodes()){
                accordion.removeChild(accordion.firstChild);
            }
        }

        this.清空子项 = function (index){
            var ul = document.getElementById(this.名称).getElementsByTagName("ul")[index];
            while(ul.hasChildNodes()){
                ul.removeChild(ul.firstChild);
            }
        }
        
        //组件命令：
        this.置可视 = function (value){
            if(value==true){
                var div = document.getElementById(this.名称);
                div.style.display="";//显示，也可以设置为block	                
            }else{
                var div = document.getElementById(this.名称);
                div.style.display="none"; //不占位隐藏               
            }
        } 
        
        //组件命令：
        this.置可视2 = function (value){
            if(value==true){
                var div = document.getElementById(this.名称);
                div.style.visibility="visible";//显示	                
            }else{
                var div = document.getElementById(this.名称);
                div.style.visibility="hidden"; //占位隐藏               
            }
        } 
        
		/*
        //组件事件
        if(event1!=null){
 			mui("#"+this.名称).on("tap", "input", function() {
			    //var group = this.getElementsByTagName("input")[0];
				//var id =  group.getAttribute("id");
				var id =  this.getAttribute("id");
	            var arr = id.split("-");
				var index = Number(arr[1]);
			    event1(index);
			});       	
        }
		
        //组件事件
        if(event2!=null){
 			mui("#"+this.名称).on("tap", "li", function() {
 			    var group = this.parentNode.parentNode.parentNode.getElementsByTagName("input")[0];
				var id =  group.getAttribute("id");
				var arr = id.split("-");
				var index1 = Number(arr[1]);
				var index2 = Number(this.getAttribute("index")); 			    
			    event2(index1,index2);
			});       	
        }
		*/
				
    }