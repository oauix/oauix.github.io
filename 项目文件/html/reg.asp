<%@ language="javascript" %>
<html>
	<head>
		<meta name="description" content="说明书">
		<meta name="keywords" content="关键词，关键词">
		<meta charset="UTF-8">
		<title>加入我们，注册会员 - oauix</title>
		<link type="text/css" href="../css/yema.css" rel="stylesheet" />
		<style>
			a{color:#6600ff;}
			.nav{width:1190px;margin:60px auto;}
			.nav .nav_top{text-align:right;}
			.nav .nav_left{float:left;width:700px;height:500px;margin-left:200px;color:red;}
			.nav .nav_left .db input{width:400px;height:50px;margin-top:30px}
			.nav .nav_left .dj input{width:20px;margin-top:40px;height:14px;margin-left:101px;}
			.nav .nav_left .dy{margin-left:103px;}
			.nav .nav_left .dy input{width:150px;margin-top:40px;height:20px;cursor:pointer;}
			.nav .nav_right{float:left;width:286px;height:500px;border:1px solid red;}
		</style>
		<!--<script>
			using System.Data;  
			using System.Data.SqlClient;    
			string strConnection="user   id=sa;password=;";   
			strConnection+="initial   catalog=Northwind;Server=YourSQLServer;";   
			strConnection+="Connect   Timeout=30";   
			SqlConnection objConnection=new SqlConnection(strConnection);   
			objConnection.Open();   
			//objConnection.Close();  
		</script>-->
	</head>
	<body>
		<div class="nav">
			<div class="nav_top"><a href="../index.html">取消注册</a>|已有账号<a href="login.html">登录</a></div>
			<div class="nav_left">
				<form>
					<div class="db"><input id="name" onFocus="myname()" onBlur="mynameover()" type="text" value="会员名" /><span id="name_a"></span></div>
					<div class="db"><input id="pass" onFocus="mypass()" onBlur="mypassover()" type="text" value="新密码" /><span id="pass_a"></span></div>
					<div class="db"><input id="passb" onFocus="mypassb()" onBlur="mypassbover()" type="text" value="确认密码" /><span id="pass_b"></span></div>
					<div class="db"><input id="test" onFocus="mytest()" onBlur="mytestover()" type="text" value="验证码" /><span id="test_a"></span></div>
					<div class="dj"><label><input id="bb" type="checkbox" onclick="mybb()"/><font color="#666">同意</font>协议</label></div>
					<div class="dy"><input type="button" onclick="mylogo()" value="reger" /><input type="reset" onclick="myreset()" value="reset"></div>
				</form>
			</div>
			<div class="nav_right">
				通知显示区，一些推荐信息
			</div>
			<div class=="clear"></div>
		</div>
	</body>
	<script language="javascript" src="js/reg.js"></script>
</html>