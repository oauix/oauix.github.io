$(document).ready(function(){
	//alert(1);
});
//隐藏/显示菜单按钮
$(".button").click(function () {
	//alert(1);
	var left=document.getElementById("left");
	//alert(this.innerHTML);
	//alert(this.innerHTML=="＞");
	if(this.innerHTML=="&gt;"){
		$("#right").hide(1000);
		left.style.width="100%";
		this.innerHTML="<";
	}else{
		left.style.width="78%";
		$("#right").show(1000);
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
