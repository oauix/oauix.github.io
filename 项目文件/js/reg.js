		/*判断对应值来对内容确定，是我要的值就能触发登录，否则报错,用hh来判断确定密码是否同于新密码，ff判断新密码是否同于启动密码*/
		var nam=0,pas=0,pasb=0,yzh=0,bb=0,hh=1;ff=1;
		/*函数myname(),选中文本框触发，作用：当文本域里是会员名时，清空内容*/
		function myname(){
			if(document.getElementById("name").value=="会员名"){
				document.getElementById("name").value="";
				document.getElementById("name_a").innerHTML="请输入4-8字符作为用户名";
			}
		}
		/*检测函数，离开文本框触发*/
		function mynameover(){
				var cont=document.getElementById("name_a");
				var arrg=document.createTextNode("用户名太少，需要4位喔！");
				var arrgs=document.createTextNode("用户名太长，要少于8位喔！");
				var arrgc=document.createTextNode("正解，恭喜，可以的");
				if(document.getElementById("name").value==""){  //当文本框没输入内容，恢复myname()函数内容
					//document.getElementById("name_s").value=234
					document.getElementById("name").value="会员名";
					cont.innerHTML="";
					document.getElementById("name_a").style.color="red";
					document.getElementById("name_a").style.fontWeight="400";
					nam=0;
				}
				else if(document.getElementById("name").value.length<4){//当文本框没输入小于4，弹出提示用户名太少
					cont.innerHTML="";
					cont.appendChild(arrg);
					document.getElementById("name_a").style.color="red";
					document.getElementById("name_a").style.fontWeight="400";
					nam=0;
				}
				else if(document.getElementById("name").value.length>8){//当文本框没输入大于8，弹出提示用户名太多
					cont.innerHTML="";
					cont.appendChild(arrgs);
					document.getElementById("name_a").style.color="red";
					document.getElementById("name_a").style.fontWeight="400";
					nam=0;
				}
				/*判断上面都不是，就执行下面，如果是就结束测试函数*/
				else {
					var fhao="~`! @#$￥%^&*\"\'\/";//定义一个含特殊符号字符串，利用字符串数组循环一个个调出
					for(var i=fhao.length;i>=0;i--){
						if(document.getElementById("name").value.indexOf(fhao[i])>0){//如果有该特殊字符
							var cc=document.getElementById("name").value.indexOf(fhao[i]);//获取字符位置
							var ee=document.getElementById("name").value[cc];//再获取字符内容
							if(ee==" "){ee="空格";}//判断是否是空格
							cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";//输出
							document.getElementById("name_a").style.color="red";//改变输出字体颜色
							document.getElementById("name_a").style.fontWeight="400";//改变字体是否加粗，这是不加粗，常规
							nam=0;//将0赋给nam
							return;//有特殊字符就跳出循环
						}
					}
					//如果什么内容都没有，就清空测试显示区内容，再告知可以，并将nam变为1，该项通过
					cont.innerHTML="";
					cont.appendChild(arrgc);
					document.getElementById("name_a").style.color="#33cc00";
					document.getElementById("name_a").style.fontWeight="700";
					return nam=1;
				}
		}
		//跟上一样，没内容，清空
		function mypass(){
			if(document.getElementById("pass").value=="新密码"){
				document.getElementById("pass").value="";
				document.getElementById("pass").type="password";
				document.getElementById("pass_a").innerHTML="请输入新6-12字符作为密码";
			}
		}
		function mypassover(){
				var cont=document.getElementById("pass_a");
				var arrg=document.createTextNode("密码太少，需要6位喔！");
				var arrgs=document.createTextNode("密码太长，要少于12位喔！");
				var arrgc=document.createTextNode("正解，恭喜，可以的");
				if(document.getElementById("pass").value==""){//当文本框没输入内容，恢复myname()函数内容
					if(document.getElementById("pass").value==""&&document.getElementById("passb").value!=document.getElementById("pass").value&&document.getElementById("passb").value!="确认密码"){
						document.getElementById("pass_a").innerHTML="请输入新密码，与确定密码同步";
						//alert("oo");
						document.getElementById("pass_a").style.color="red";
						document.getElementById("pass_a").style.fontWeight="400";
						hh=0;//改变确定密码同于新密码属性，增加字符后配对
						pas=1;
					}else{
						document.getElementById("pass").type="text";
						document.getElementById("pass").value="新密码";
						cont.innerHTML="";
						document.getElementById("pass_a").style.color="red";
						document.getElementById("pass_a").style.fontWeight="400";
						pas=0;
					}
				}
				else if(document.getElementById("pass").value.length<6){//当文本框没输入小于6，弹出提示密码太少
					cont.innerHTML="";
					cont.appendChild(arrg);
					document.getElementById("pass_a").style.color="red";
					document.getElementById("pass_a").style.fontWeight="400";
					pas=0;
				}
				else if(document.getElementById("pass").value.length>12){//当文本框没输入大于12，弹出提示密码太多
					cont.innerHTML="";
					cont.appendChild(arrgs);
					document.getElementById("pass_a").style.color="red";
					document.getElementById("pass_a").style.fontWeight="400";
					pas=0;
				}
				else{
					var fhao="~`! @#$￥%^&*\"\'\/";
					for(var i=fhao.length;i>=0;i--){
						if(document.getElementById("pass").value.indexOf(fhao[i])>0){
							var cc=document.getElementById("pass").value.indexOf(fhao[i]);
							var ee=document.getElementById("pass").value[cc];
							if(ee==" "){ee="空格";}//判断是否是空格
							cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
							document.getElementById("pass_a").style.color="red";
							document.getElementById("pass_a").style.fontWeight="400";
							pas=0;
							return;
						}
					}
					//如果确定密码文本框不等于确定密码并且新密码文本框不等于确定文本框，处理那种先输入确定密码，再输入新密码的
					if(document.getElementById("passb").value!="确认密码"&&document.getElementById("passb").value!=document.getElementById("pass").value){
						document.getElementById("pass_a").innerHTML="请更新确定密码部分";
						document.getElementById("pass_a").style.color="red";
						document.getElementById("pass_a").style.fontWeight="400";
						ff=0;
					}
					
					//让新密码去配对确定密码功能，更新新文本框测试显示区内容，如果新密码框(可以说是第二次)内容等于新密码框内容，同时更新二个测试显示区内容
					else if(document.getElementById("passb").value==document.getElementById("pass").value){
						document.getElementById("pass_b").innerHTML="正解，恭喜，可以的";
						document.getElementById("pass_a").innerHTML="正解，恭喜，可以的";
						document.getElementById("pass_a").style.color="#33cc00";
						document.getElementById("pass_a").style.fontWeight="700";
						document.getElementById("pass_b").style.color="#33cc00";
						document.getElementById("pass_b").style.fontWeight="700";
						hh=1;
						ff=1;
						pas=1;
						return pasb=1;
					}
					//如果上面内容都没有，就执行这里
					else{
						cont.innerHTML="";
						cont.appendChild(arrgc);
						document.getElementById("pass_a").style.color="#33cc00";
						document.getElementById("pass_a").style.fontWeight="700";
						ff=1;
						return pas=1;
					}
				}
		}
		//跟上一样，没内容，清空
		function mypassb(){
			if(document.getElementById("passb").value=="确认密码"){
				//alert("000");
				document.getElementById("passb").value="";
				document.getElementById("passb").type="password";
				document.getElementById("pass_b").innerHTML="请再次确认你的密码";
			}
		}
		function mypassbover(){
				var cont=document.getElementById("pass_b");
				var arrg=document.createTextNode("密码太少，需要6位喔！");
				var arrgs=document.createTextNode("密码太长，要少于12位喔！");
				var arrgc=document.createTextNode("正解，恭喜，可以的");
				if(document.getElementById("passb").value==""){
					document.getElementById("passb").type="text";
					document.getElementById("passb").value="确认密码";
					cont.innerHTML="";
					//document.getElementById("passb").value=""；
					document.getElementById("pass_b").style.color="red";
					document.getElementById("pass_b").style.fontWeight="400";
					pasb=0;
				}
				else if(document.getElementById("passb").value.length<4){
					cont.innerHTML="";
					cont.appendChild(arrg);
					document.getElementById("pass_b").style.color="red";
					document.getElementById("pass_b").style.fontWeight="400";
					pasb=0;
				}
				else if(document.getElementById("passb").value.length>12){
					cont.innerHTML="";
					cont.appendChild(arrgs);
					document.getElementById("pass_b").style.color="red";
					document.getElementById("pass_b").style.fontWeight="400";
					pasb=0;
				}
				else{
					var fhao="~`! @#$￥%^&*\"\'\/";
					for(var i=fhao.length;i>=0;i--){
						if(document.getElementById("passb").value.indexOf(fhao[i])>0){
							var cc=document.getElementById("passb").value.indexOf(fhao[i]);
							var ee=document.getElementById("passb").value[cc];
							if(ee==" "){ee="空格";}//判断是否是空格
							cont.innerHTML="有特殊符号:<span style='color:#33ff00'>["+ee+"]</span>请去除再试！";
							document.getElementById("pass_b").style.color="red";
							document.getElementById("pass_b").style.fontWeight="400";
							pasb=0;
							return;
						}
					}
				//判断新密码和确定密码是否一样
				if(document.getElementById("pass").value!="新密码"&&document.getElementById("passb").value!=document.getElementById("pass").value){
					document.getElementById("pass_b").innerHTML="！！与上面密码不配对！";
					document.getElementById("pass_b").style.color="red";
					document.getElementById("pass_b").style.fontWeight="400";
					hh=0;
					//alert(hh);
				}
				//先输入确认密码时：新密码为空情况处理
				else if(document.getElementById("pass").value=="新密码"&&document.getElementById("passb").value!=document.getElementById("pass").value){
						document.getElementById("pass_a").innerHTML="请更新新密码，与确定密码同步";
						document.getElementById("pass_b").innerHTML="正解，恭喜，可以的";
						document.getElementById("pass_b").style.color="#33cc00";
						document.getElementById("pass_b").style.fontWeight="700";
						ff=0;//改变确定密码同于新密码属性，增加字符后配对
						pasb=1;
					}
				else if(document.getElementById("passb").value==document.getElementById("pass").value){
						document.getElementById("pass_b").innerHTML="正解，恭喜，可以的";
						document.getElementById("pass_a").innerHTML="正解，恭喜，可以的";
						document.getElementById("pass_a").style.color="#33cc00";
						document.getElementById("pass_a").style.fontWeight="700";
						document.getElementById("pass_b").style.color="#33cc00";
						document.getElementById("pass_b").style.fontWeight="700";
						ff=1;//改变确定密码同于新密码属性，增加字符后配对
						hh=1;//改变新密码同于确定密码属性，减少字符后配对   理解：一个是改变自己的属性去配对别人，另一个是改变别人的属性来配对自己。
						pasb=1;
						return pas=1;

					}
				else{
					cont.innerHTML="";
					cont.appendChild(arrgc);
					document.getElementById("pass_b").style.color="#33cc00";
					document.getElementById("pass_b").style.fontWeight="700";
					ee=1;
					return pasb=1;
				}
			}
		}
		function mytest(){
			if(document.getElementById("test").value=="验证码"){
				document.getElementById("test").value="";
				document.getElementById("test_a").innerHTML="请输入4验证码";
			}
		}
		function mytestover(){
			if(document.getElementById("test").value==""){
				//document.getElementById("name_s").value=234
				document.getElementById("test").value="验证码";
				document.getElementById("test_a").innerHTML="";
				document.getElementById("test_a").style.color="red";
				document.getElementById("test_a").style.fontWeight="400";
				yzh=0;
			}else{
				yzh=1;
				document.getElementById("test_a").innerHTML="正解^_^"
				document.getElementById("test_a").style.color="#33cc00";
				document.getElementById("test_a").style.fontWeight="700";
			}
		}
		function myreset(){
				//alert("dsf");
				document.getElementById("name_a").innerHTML="";//清空脚本检测文字
				document.getElementById("pass_a").innerHTML="";
				document.getElementById("pass_b").innerHTML="";
				document.getElementById("test_a").innerHTML="";
				document.getElementById("pass").type="text";
				document.getElementById("passb").type="text";
			}
		function mybb(){
			if(document.getElementById("bb").checked==true){
				bb=1;
			}else{bb=0;}
		}
		function mylogo(){
				//alert(nam+"he"+pas+"he"+pasb+"he"+yzh+"he"+bb+"he"+hh+"he"+ff);//查看判断的值
				//alert(ee);
				if(nam==1&&pas==1&&pasb==1&&yzh==1&&bb==1&&hh==1&&ff==1){
					alert("你要注册会员："+document.getElementById("name").value+"\n你的密码是:"+document.getElementById("pass").value);
				}
				else{alert("注册信息错误，请检测！！");}
			}