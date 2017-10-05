$(document).ready(function(){
	//alert(1);
});

$(".return").click(function () {
	location.href="index.html";
});

$(".reset").click(function () {
	var boolean=confirm("确定清空数据，数据将不可恢复！");
	if(boolean){
		$("input").val("");
		$("#editor").empty();
	}
});

$(".show").click(function () {
	//alert(1);
	$(".showtextblack").fadeIn(900);
	$(".showtext").fadeIn(900);

	var type=$("input").val();
	var text=$("#editor").html();
	console.log(text);
	var str='<div class="textshowche">'
				+'<h5><a href="#">'+type+'</a></h5>'
				+'<div class="show">'
				+text
				+'</div>'
				+'<div class="bottom">@ ' +getNowFormatDate()+'小ol鱼 阅读(0) 评论(0) <a href="#">编辑</a></div>'
			+'</div>';
		$(".showche").html(str);
});

$(".toclose").click(function () {
	//alert(1);
	$(".showtextblack").fadeOut(900);
	$(".showtext").fadeOut(900);
});

$(".submit").click(function () {
	//写文件+记录写入时间
	aleat(1);
	var type=$("input").val();
	var text=$(".gettext").html();
	var time=getNowFormatDate();
	var admin_type="小ol鱼";
	$.ajax({"url":"type/add.do","type":"post",
		"data":{"notetype.type":type,"notetype.text":text,"notetype.time":time,"notetype.admin_type":admin_type},
		"dataType":"json",
		"success":function(date){
			alert("保存成功！");
			if(date.state=1)
				$(".success").html("操作成功！");
		},
		"error":function(){}});
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
$("#b").click(function(){
	//console.log(getSelectText());
	
	var str=$("#editor").html().replace(/<b>/g,"").replace(/<\/b>/g,"");
	var che=getSelectText(str);
	console.log(str);
	var strs=str.replace(che,"<b>"+che+"</b>");
	console.log(strs);
	$(".gettext").html(strs);
	//getSelectText();
});
//获取选中的文本
function getSelectText(str) {
	 if (document.selection) //IE
    { 
        return document.selection.createRange().text; 
    }else{//webkit内核（chrome、UC等）、firefox浏览器以及IE11以上等
		//获取Selection对象  
		var se = window.getSelection();  
		//获取起始位置，这个是字符的序号位置，而不是坐标  
		var start = se.anchorOffset; 
		console.log(start);
		//获取结束位置  
		var end = se.focusOffset;
		console.log(end);
		
		return str.substring(start, end);
	}	
}