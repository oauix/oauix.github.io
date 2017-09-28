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
//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
	var strHours=date.getHours();
	var strMinutes=date.getMinutes();
	var strSeconds=date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	if(strHours >= 0 && strHours <= 9){
		strHours="0" + strHours;
	}
	if(strMinutes >= 0 && strMinutes <= 9){
		strMinutes="0" + strMinutes;
	}
	if(strSeconds >= 0 && strSeconds <= 9){
		strSeconds="0" + strSeconds;
	}
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + strHours + seperator2 + strMinutes
            + seperator2 + strSeconds;
    return currentdate;
}
//HTML格式转换
function toString(){
	var h5="<h5><a href='#'>"+$("input").val()+"</a></h5>\n";
	console.log($(".text textarea").val());
	var textche="     <p>"+$(".text textarea").val().replace(/\r\n/g,
		'</p><p>').replace(/\n/g, '</p><p>').replace(/\s/g,
		' ').replace(/<\/p><p>/g, '</p>\n     <p>')+"</p>";
	
	var toset='<div class="textshowche">\n  '+h5+'  <div class="show">\n'+textche+'\n  </div>\n'
	+'  <div class="bottom">@'+getNowFormatDate()+' 小ol鱼 阅读(0) 评论(0) <a href="#">编辑</a></div>\n'
	+"</div>";

	$(".textche textarea").val(toset);
}
function towrite(){
	toString();
	
	//var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	//saveAs(blob, "hello world.txt");
	
}
