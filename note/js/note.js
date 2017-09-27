$(document).ready(function(){
	//alert(1);
});
//隐藏/显示菜单
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
$(".munt a").click(function(){
	//alert(1);
	//console.log(data);
	//console.log(data.currentTarget.href);
	$(".content").empty();
	//var textche=$.ajax({url:"textche/web.txt",async:false});
	//console.log(textche);
	//$(".content").html(textche.responseText);
	$.post("textche/web.html",function(result){
		$(".content").html(result);
	  });
	return false;//让a标签不执行跳转
});
