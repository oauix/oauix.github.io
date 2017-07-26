$("#top").click(function () {//返回顶部
	var speed=200;//滑动的速度
	$('body,html').animate({ scrollTop: 0 }, speed);
	return false;
});



function reinitIframe(){//iframe高自动被内容填充
	var iframe = document.getElementById("java");
	try{
	var bHeight = iframe.contentWindow.document.body.scrollHeight;
	var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
	var height = Math.max(bHeight, dHeight);
	iframe.height = height;
	console.log(height);
		}catch (ex){}
}
window.setInterval("reinitIframe()", 200);
