﻿$("#top").click(function () {//返回顶部
	var speed=200;//滑动的速度
	$('body,html').animate({ scrollTop: 0 }, speed);
	return false;
});

function imgup(){
	var map=document.getElementById("map");
	map.style.display="block";
}
function imgclose(){
	var map=document.getElementById("map");
	map.style.display="none";
}
$(".box_x").click(function(){
	//删除animated flipInY类，加animated bounceOut类，fadeOut执行完后再反过来来删除animated bounceOut类，加animated flipInY类
	$(".map").removeClass("animated flipInY").addClass("animated bounceOut").fadeOut(1000,function(){
		$(".map").removeClass("animated bounceOut").addClass("animated flipInY");
	});
		$(".map").fadeOut();
	});
	//弹幕技术切换
	$(".box_o").click(function(){
		$(".map").fadeToggle();
		$(".map").fadeToggle();
	});

