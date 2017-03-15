			var nam=0,pas=0;
			function myshit(){
				//alert("dd");
				var cont=document.getElementById("text");
				var arrg=document.createTextNode("请输入4-8字符作为用户名");
				if(document.getElementById("name_s").value==""){
					//document.getElementById("name_s").value=234
					cont.appendChild(arrg);
				}
			}
			function myshita(){
				//alert("dd");
				var cont=document.getElementById("text");
				var arrg=document.createTextNode("用户名太少，需要4位喔！");
				var arrgs=document.createTextNode("用户名太长，要少于8位喔！");
				var arrgc=document.createTextNode("正解，恭喜，可以的");
				if(document.getElementById("name_s").value==""){
					//document.getElementById("name_s").value=234
					cont.innerHTML="";
					nam=0;
				}
				else if(document.getElementById("name_s").value.length<4){
					cont.innerHTML="";
					cont.appendChild(arrg);
					nam=0;
				}
				else if(document.getElementById("name_s").value.length>8){
					cont.innerHTML="";
					cont.appendChild(arrgs);
					nam=0;
				}
				else {
					var fhao="~`! @#$￥%^&*\"\'\/";
					for(var i=fhao.length;i>=0;i--){
						if(document.getElementById("name_s").value.indexOf(fhao[i])>0){
							var cc=document.getElementById("name_s").value.indexOf(fhao[i]);
							var ee=document.getElementById("name_s").value[cc];
							if(ee==" "){ee="空格";}//判断是否是空格
							cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
							nam=0;
							return;
						}
					}
					cont.innerHTML="";
					cont.appendChild(arrgc);
					document.getElementById("text").style.color="#33cc00";
					document.getElementById("text").style.fontWeight="700";
					return nam=1;
					/*//alert(document.getElementById("name_s").value);
					//alert(document.getElementById("name_s").value.indexOf("\""));
					if(document.getElementById("name_s").value.indexOf("\"")>0){
						//cont.innerHTML="含有特殊符号，请去掉，再试！！";
						//alert("you");
						var cc=document.getElementById("name_s").value.indexOf("\"");
						var ee=document.getElementById("name_s").value[cc];
						cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
					}
					else if(document.getElementById("name_s").value.indexOf("\'")>0){
						var cc=document.getElementById("name_s").value.indexOf("\'");
						var ee=document.getElementById("name_s").value[cc];
						cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
					}
					else if(document.getElementById("name_s").value.indexOf("\&")>0){
						var cc=document.getElementById("name_s").value.indexOf("\&");
						var ee=document.getElementById("name_s").value[cc];
						cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
					}
					else if(document.getElementById("name_s").value.indexOf(" ")>0){
						var cc=document.getElementById("name_s").value.indexOf(" ");
						var ee=document.getElementById("name_s").value[cc];
						if(ee==" "){ee="空格";} //判断是否是空格
						cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
					}
					else{
						cont.innerHTML="";
						cont.appendChild(arrgc);
					}*/
				}
			}
			function myshitpass(){
				//alert("dd");
				var cont=document.getElementById("pass");
				var arrg=document.createTextNode("请输入6-8字符作我密码");
				if(document.getElementById("pass_s").value==""){
					cont.appendChild(arrg);
				}
			}
			function myshitapass(){
				//alert("dd");
				var cont=document.getElementById("pass");
				var arrg=document.createTextNode("密码太少，需要6位喔！");
				var arrgs=document.createTextNode("密码太长，要少于12位喔！");
				var arrgc=document.createTextNode("正解，恭喜，可以的");
				if(document.getElementById("pass_s").value==""){
					cont.innerHTML="";
					pas=0;
				}
				else if(document.getElementById("pass_s").value.length<4){
					cont.innerHTML="";
					cont.appendChild(arrg);
					pas=0;
				}
				else if(document.getElementById("pass_s").value.length>12){
					cont.innerHTML="";
					cont.appendChild(arrgs);
					pas=0;
				}
				else{
					var fhao="~`! @#$￥%^&*\"\'\/";
					for(var i=fhao.length;i>=0;i--){
						if(document.getElementById("pass_s").value.indexOf(fhao[i])>0){
							var cc=document.getElementById("pass_s").value.indexOf(fhao[i]);
							var ee=document.getElementById("pass_s").value[cc];
							if(ee==" "){ee="空格";}//判断是否是空格
							cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
							pas=0;
							return;
						}
					}
					cont.innerHTML="";
					cont.appendChild(arrgc);
					document.getElementById("pass").style.color="#33cc00";
					document.getElementById("pass").style.fontWeight="700";
					return pas=1;
				}
			}
			function myreset(){
				//alert("dsf");
				document.getElementById("pass").innerHTML="";//清空脚本检测文字
				document.getElementById("text").innerHTML="";
			}
			function mylogo(){
				//alert(nam+"he"+pas); //查看判断的值
				if(nam==1&&pas==1){
					alert("你要会员："+document.getElementById("name_s").value+"\n你的密码是:"+document.getElementById("pass_s").value);
				}
				else{alert("信息错误，请检测！！");}
			}
			/*
				string connStr="Provider=Microsoft.Jet.Oledb.4.0;Data Source="+Server.MapPath("xyu.mdb");
				OleDbConnection conn-new OleDbConnection(connStr);
				OleDbCommand cmd=new OleDbCommand
			*/