$(document).ready(function(){
	//alert(1);
});

$(".return").click(function () {
	location.href="index.html";
});

$(".reset").click(function () {
	$("input").val("");
	$("textarea").val("");
});

$(".copy").click(function () {
	//写文件函数
	towrite();
});

$(".submit").click(function () {
	//写文件+记录写入时间
});

function towrite(){
	//创建一个可以将文件翻译成文件流的对象。
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	//用于创建一个textStream 对象 
	var f=fso.createtextfile("d:\a.txt",2,true);
	//写入
	f.write("wo shi di yi hang");
	//关闭流
	f.close();
	alert(1);
}
