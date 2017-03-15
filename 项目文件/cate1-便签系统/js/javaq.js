var ebp=0;
//屏蔽自带右键
document.oncontextmenu=function(){return false};
//监控鼠标坐标
$(document).mousemove(function(e){
	var x=e.pageX; //定义鼠标x抽坐标
	var y=e.pageY; //定义鼠标y抽坐标
	//alert(x+"+"+y);
	$("#xzx_y").html("当前鼠标坐标_x: "+x+"_y: "+y);
});
//按下鼠标
$(document).mousedown(function(e){
	//获取鼠标上的键
	var key=e.which;//定义鼠标键位(左键为1、中建为2、右键为3);
	//alert(key);测试正常不，一步一步走
	if(key==3){
		//alert(key);
		var x=e.clientX; //定义鼠标x抽坐标
		var y=e.clientY; //定义鼠标y抽坐标
		//alert(x+"+"+y);
		$("#x_y").html("右键触发坐标_x: "+x+"_y: "+y);//将坐标值给id为x_y的标签显示
		//if(x>document.documentElement.clientWidth){x=document.documentElement.clientWidth-200;}
		//if(y>document.documentElement.clientHeight){x=document.documentElement.clientHeight-250;}
		$(".desp").show().css({left:x,top:y});//让desp显示，并将xy赋值
	}
});
//触发键隐藏右键
$(document).click(function(){
	$(".desp").hide();
});
//右键功能实现
function menu(flag){
	if(flag==2){
		//获取右键的坐标
		var _left=$(".desp").offset().left;
		var _top=$(".desp").offset().top;
		//获取随机图片 Math.floor(Math.random())随机0.0-1的数
		var random=Math.floor(Math.random()*3)+1;
		$(".bq_box").append(
			"<div  class='conter animated flipInX' style='left:"+_left+"px;top:"+_top+"px;display:block;'>"+
			"<img src='images/"+random+".png' width='294' height='310'>"+
			"<div class='c_cont' contenteditable='true' ></div>"+
				"<p class='c_time'><span>3</span>秒后自动保存</p>"+
			"</div>"
		);
		auto_timer();
	}
	if(flag==3){
		$(".conter").removeClass("animated rollIn").addClass("animated bounceOut").fadeOut(1000);
		//清除缓存
		localStorage.removeItem("markContent");
	}

	//更换背景脚本 start
	if(flag==6){
		$(".top_bj").toggle("slow");
	}
};
//创建关闭背景box
$(".button_bottom").click(function(){
	$(".top_bj").toggle("slow");
});
//更换背景图片
$(".bj_box ul li a img").click(function(){
	var li_src=$(this).attr("src");
	//alert(li_src);
	//css();方法里是字符串"url(li_src)"\"url("li_src")"是不一样的，弄死我了就这个
	$("body").css("background-image","url("+li_src+")");
});
//定义一个w变量
var w = $(".bj_box ul li").find("img").eq(0).width();
//下一张图片
$(".button_left").click(function(){
	if(ebp==4){ebp=-1;}
		ebp++;
		$(".bj_box ul").stop(true,true).animate({"left":-1 * w * ebp },1500);
	});
//上一张图片
$(".button_right").click(function(){
	ebp--;
	if(ebp==-1){ebp=4;}
		$(".bj_box ul").stop(true,true).animate({"left":-1 * w * ebp },1500);
	});
//更换图片脚本 end

//自动保存便签的内容函数
var timer=null;
function auto_timer(){
	var count=3;
	timer=setInterval(function(){
		if(count<=0){
			count=3;
			//保存内容
			localStorage.setItem("markContent",$(".bq_box").html());
					
		}
					
		$(".c_time").find("span").text(count);
		count--;
	},1000);
			}
//加载页面是读取本地数据库
$(function(){
	var markContent=localStorage.getItem("markContent");//读取一下
	//判断markContent是否为空，不为空就运行
	if(markContent){
		$(".bq_box").html(markContent);//加载过来
		auto_timer();//运行自动保存函数 
	}
});
//最先建立测试jQuery正确性的
$(function(){
	//alert(1);
});