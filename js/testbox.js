function HTMLEditor(id,bindObj,w,h,value)
{this.id=id;this.width=w;this.height= h;this.obj= null;this.Textobj = null;this.HTMLobj=null;this.body = null;this.value = value;this.mode= "design";this.bindObj= bindObj;this.ImagePath="";this.host="http://"+window.location.host;
this.init = function (){
bindObj.style.display="none";this.obj = document.createElement("div");this.obj.id = this.id;this.obj.name = this.id;this.obj.parentObj = this;this.obj.style.width=w;this.obj.style.height=h;this.obj.style.backgroundColor="#FFFFFF";
this.obj.innerHTML='<div style="width:100%;height:21px;padding-top:5px;"></div><div style="width:100%;top:30px;height:'+(h-50)+'px;"></div><div style="width:100%;top:50px;height:'+(h-50)+'px;display:none;font-size:9pt;"></div><div style="width:100%;height:15px;font-size:9pt;padding-top:5px;"><span style="padding:5px 5px 5px 5px;cursor:hand;" onclick=HTMLEditor_changeMode("'+this.id+'","design")>Design</span>  <span style="padding:5px 5px 5px 5px; color:#DDDDDD;cursor:hand;" onclick=HTMLEditor_changeMode("'+this.id+'","html")>HTML</span></div>';
this.Textobj=this.obj.children[2];this.Textobj.style.border="1px solid #000000";this.Textobj.style.padding="10px 10px 10px 10px";this.Textobj.style.overflow="auto";this.Textobj.contentEditable="true";
this.HTMLobj=this.obj.children[1];this.HTMLobj.style.border="1px solid #000000";this.HTMLobj.style.overflow="auto";this.HTMLobj.style.padding="10px 10px 10px 10px";this.HTMLobj.contentEditable="true";
this.HTMLobj.onfocus=function(){try{this.currPos = document.selection.createRange().duplicate()}catch(e){}};
this.HTMLobj.onclick=function(){try{this.currPos = document.selection.createRange().duplicate()}catch(e){}};
this.HTMLobj.onkeyup=function(){this.parentNode.parentObj.refresh();this.currPos = document.selection.createRange().duplicate()};
this.HTMLobj.onchange=function(){this.currPos = document.selection.createRange().duplicate()};
bindObj.parentNode.appendChild(this.obj);
this.obj.children[0].onmousemove = function() {if (this.OldObj!=undefined)    this.OldObj.style.border="";if (this.OnMoveObj!=undefined){this.OnMoveObj.style.border="1px solid #000000";this.OldObj=this.OnMoveObj;}}
this.obj.children[0].onmouseout = function() {if (this.OnMoveObj!=undefined)this.OnMoveObj.style.border="";}
this.loadToolBar();    this.setValue("<p>Please input some words here...</p>");this.HTMLobj.focus();}
this.loadToolBar = function (){
var atoolbar=new Array("RemoveFormat","Bold","Italic","Underline","StrikeThrough","Subscript","Superscript","CreateLink","MoveLink","JustifyCenter","JustifyFull","JustifyLeft","JustifyRight","Image","About");
for (i=0;i<atoolbar.length;i++)    this.addToolButton(atoolbar[i]);
var lv='<option value="">Font Size</option>';
for (var i=1;i<=7;i++)lv+='<option value='+i+'>'+i+'</option>';
this.obj.children[0].innerHTML+='<span style="font-size:9pt;position:relative;top:-5px;left:5px;"><select onchange=\'HTMLEditor_toolbarClick("'+this.id+'","FontSize",this.value);this.selectedIndex=0;\'>'+lv+'</select></span>';
lv='<option value="">Font Color</option>';
var acolor=new Array("Black","Silver","Gray","White","Maroon","Red","Purple","Fuchsia","Green","Lime","Olive","Yellow","Navy","Blue","Teal","Aqua");
for (i=0;i<acolor.length;i++) lv+='<option value="'+acolor[i]+'" style="background-color: '+acolor[i]+'">'+acolor[i]+'</option>';
this.obj.children[0].innerHTML+='<span style="font-size:9pt;position:relative;top:-5px;left:5px;"><select onchange=\'HTMLEditor_toolbarClick("'+this.id+'","FontColor",this.value);this.selectedIndex=0;\'>'+lv+'</select></span>';
lv='<option value="">Font Name</option>';
var afont=new Array("Arial","Comic Sans MS","Courier New","Tahoma","Times New Roman","Verdana");
for (i=0;i<afont.length;i++) lv+='<option value="'+afont[i]+'" style="font-family:'+afont[i]+';">'+afont[i]+'</option>';
this.obj.children[0].innerHTML+='<span style="font-size:9pt;position:relative;top:-5px;left:5px;"><select onchange=\'HTMLEditor_toolbarClick("'+this.id+'","FontName",this.value);this.selectedIndex=0;\'>'+lv+'</select></span>';
lv='<option value="">Characters</option>';
var ach=new Array(""","©","","¢","","","£","¤","∫","∑","∏","√","