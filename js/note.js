$(document).ready(function(){
	$(".content").load("textche/init.html");
});
//隐藏/显示菜单按钮
$(".button").click(function () {
	//alert(1);
	//alert(this.innerHTML);
	//alert(this.innerHTML=="＞");
	if(this.innerHTML=="&gt;"){
		$("#right").hide(500,function(){
			$("#left").animate({width:"100%"},300);
		});	
		this.innerHTML="<";
	}else{
		$("#left").animate({width:"78%"},500,function(){
			$("#right").show(300);
		});
		this.innerHTML=">";
	}
});
$(".munt a").click(function(data){
	//alert(1);
	//console.log(data);
	//console.log(data.currentTarget.href);
	$(".content").empty();
	//var textche=$.ajax({url:"textche/web.txt",async:false});
	//$(".content").html(textche.responseText);
	$(".content").load(data.currentTarget.href);
	return false;//让a标签不执行跳转
});
function toaction(data){
	//alert(1);
	console.log(data.getAttribute("value"));
	var textche=data.getAttribute("value");
	$(".button").click();
	$(".content").empty();
	$(".content").load(textche);
}
