# SSH

Spring MVC + Spring + MyBatis = SSM

Struts2 + Spring + Hibernate = SSH

SSH 支持两种配置使用方式:

1. 注解配置
2. XML配置, 重点讲解

# Struts 2

## 什么是Struts2

Struts 架子

![](1.png)

Struts1 和 Struts2 有什么关系:
 
答: 没有任何关系, 只有名字一样! 都使用了MVC设计模式

什么是Struts2: 使用了MVC模式的一个WEB编程框架(架子)

## 使用Struts2

按照Struts2 的架构要求添加 MVC 组件, 即可使用Struts2.

![](2.png)

使用步骤:

0. 创建WEB项目, 导入Tomcat运行环境
1. 导入Struts 2, pom.xml

		<dependency>
		  <groupId>org.apache.struts</groupId>
		  <artifactId>struts2-core</artifactId>
		  <version>2.5.1</version>
		</dependency> 

2. 配置Struts 2 主控制器, web.xml
		
		<filter>
			<display-name>StrutsPrepareAndExecuteFilter</display-name>
			<filter-name>StrutsPrepareAndExecuteFilter</filter-name>
			<filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
		</filter>
		<filter-mapping>
			<filter-name>StrutsPrepareAndExecuteFilter</filter-name>
			<url-pattern>/*</url-pattern>
		</filter-mapping>
		

3. 添加Struts2 配置文件: resources/struts.xml
		
		<?xml version="1.0" encoding="UTF-8"?>
		<!-- 从 struts-2.5.dtd 文件中复制 DOCTYPE -->
		<!DOCTYPE struts PUBLIC
			"-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
			"http://struts.apache.org/dtds/struts-2.5.dtd">
		<struts>
		
		</struts>

	> 注意:文件名一定是struts.xml.

4. 部署测试...

## Hello World

1. 开发控制器类 DemoAction

		/**
		 * Struts 2 的子控制器 
		 */
		public class DemoAction {
		
			//控制器中, 处理Web请求的方法
			//默认情况下方法名为 execute
			//方法的返回值是 字符串,值是目标视图的名称
			public String execute(){
				//调用业务模型, 调用业务层...
				System.out.println("Hello World!"); 
				return "success"; //反馈给用户的视图名
			}
		}

2. 开发JSP视图:  /WEB-INF/jsp/demo.jsp

		<%@page contentType="text/html; charset=utf-8"
		   pageEncoding="utf-8"%>
		<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body >
		 	<h1>Hello World!</h1>
		 	<!-- /WEB-INF/jsp/demo.jsp -->  
		</body>
		</html>

3. 配置 struts.xml

		<!-- 用于定义"包", 就是定义第一层WEB路径 -->
		<!-- extends="struts-default" 自动继承了
		struts-default.xml 中定义环境信息 -->
		<package namespace="/demo" name="demo"
			extends="struts-default"> 
			<!-- 在package中定义url与控制器和视图对应关系 
				哪个URL被哪个控制器处理, 返回结果映射到
				哪个JSP视图	-->
			<!-- 请求url: demo/hello.action 
				由DemoAction的execute方法处理URL-->
			<action name="hello" 
				class="cn.tedu.ssh1.action.DemoAction">
				<!-- result 用于约定 控制器返回结果
				和视图的对应关系: success对应demo.jsp-->
				<result name="success">
					/WEB-INF/jsp/demo.jsp
				</result>
			</action>
		</package>

4. 测试:

		http://localhost:8080/ssh1/demo/hello.action 
	
	> Struts 2 的默认请求都以 .action 为结尾

## 浏览器传递数据到控制器

Struts 2 封装了数据传输算法, 只需要将网页表单项目的name属性与控制器的Bean属性对应上就可以完成数据的传输:

![](3.png)

案例:

1. 编写test.html, 包含表单.

		<!DOCTYPE html>
		<html>
		<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
		</head>
		<body>
			<h1>将浏览器中的表单数据传递到控制器</h1>	
			<form action="demo/test.action" 
				method="post">
				用户名:<input name="user" type="text"><br>
				密码:<input name="pwd" type="password"><br>
				<input type="submit" value="登录">
			</form>
		</body>
		</html>

2. 编写控制器 
		
		public class TestAction {
			
			private String user;
			private String pwd;
			
			public String getUser() {
				return user;
			}
		
			public void setUser(String user) {
				this.user = user;
			}
		
			public String getPwd() {
				return pwd;
			}
		
			public void setPwd(String pwd) {
				this.pwd = pwd;
			}
		
			public String execute(){
				
				System.out.println(user+","+pwd);
				
				return "success";
			}
		}

3. 配置 struts.xml

		<action name="test"
			class="cn.tedu.ssh1.action.TestAction">
			<result name="success">
				/WEB-INF/jsp/demo.jsp				
			</result>
		</action>
		
4. 测试:

		//显示表单
		http://localhost:8080/ssh1/test.html
		
		//提交以后在控制台看到:
		Tom,123

## 利于域模型传递表单参数

利于域模型封装传递表单参数, 可以简化控制器代码, 重用表单项目:

![](4.png)

案例:

1. 编写 add-user.html:

		<!DOCTYPE html>
		<html>
		<head>
		<meta charset="UTF-8">
		<title>添加用户</title>
		</head>
		<body>
			<h1>添加用户</h1>
			<p>利用域模型(值对象)封装传递表单参数</p>	
			<form action="user/add.action" 
				method="post">
				用户名:<input name="user.name" type="text"><br>
				年龄:<input name="user.age" type="text"><br>
				薪水:<input name="user.salary" type="text"><br>
				<input type="submit" value="添加">
			</form>
		</body>
		</html>

	> 注意: name属性

2. 编写域模型(值对象)
	
		public class UserVo implements Serializable {
			
			private String name;
			private Integer age;
			private Double salary;
			
			public UserVo() {
			}
		
			public String getName() {
				return name;
			}
		
			public void setName(String name) {
				this.name = name;
			}
		
			public Integer getAge() {
				return age;
			}
		
			public void setAge(Integer age) {
				this.age = age;
			}
		
			public Double getSalary() {
				return salary;
			}
		
			public void setSalary(Double salary) {
				this.salary = salary;
			}
		
			@Override
			public String toString() {
				return "UserVo [name=" + name + ", age=" + age + ", salary=" + salary + "]";
			}
		
		}
			
3. 编写控制器

		public class UserAction {
			
			private UserVo user;
			
			public UserVo getUser() {
				return user;
			}
			
			public void setUser(UserVo user) {
				this.user = user;
			}
		
			// 控制器方法名可以是任何名
			public String add(){
				System.out.println(user);
				return "success";
			}
			
			
		}

4. 配置 struts.xml
	
		<package namespace="/user" name="user"
			extends="struts-default">
			<!-- 调用指定的控制器方法 method="add" -->
			<action name="add" method="add"
				class="cn.tedu.ssh1.action.UserAction">
				<result name="success">
					/WEB-INF/jsp/demo.jsp
				</result>
			</action>
		</package>

5. 测试:
	
		//请求
		http://localhost:8080/ssh1/add-user.html
		//提交表单后, 控制台显示: 
		UserVo [name=李洪鹤, age=18, salary=250.8]

## 从控制器向页面传输数据

Struts2 可以利用控制器Bean属性向JSP页面传输数据,在JSP页面上只需要使用EL表达式就可以显示数据.

![](5.png)

案例:

1. 编写控制器

		public class MessageAction {
			private String message;
			public String getMessage() {
				return message;
			}
			public void setMessage(String message) {
				this.message = message;
			}
			public String execute(){
				message="OK";
				return "success";
			}
		}

2. 编写 show.jsp

		<%@page contentType="text/html; charset=utf-8"
		   pageEncoding="utf-8"%>
		<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body >
		 	<h1>显示控制器返回的消息</h1>
			${ message }
		</body>
		</html>

3. 配置 struts.xml

		<action name="msg" 
			class="cn.tedu.ssh1.action.MessageAction">
			<result name="success">
				/WEB-INF/jsp/show.jsp
			</result>	
		</action>

4. 测试:

		http://localhost:8080/ssh1/demo/msg.action

## Struts2 与 Spring整合

利用Spring 的 IOC/AOP 功能可以很方便的管理软件的业务层和控制器. Struts2 提供了 Struts2-spring-plugin插件, 可以自动的将Struts2 和Spring进行整合, 整合之后Struts2可以利用Spring作为工厂, 生产Struts2 控制器实例.

![](6.png)

整合步骤:

1. 添加插件:

		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-spring-plugin</artifactId>
			<version>2.5.1</version>
		</dependency>

2. 添加Spring配置文件 spring-struts.xml

		<?xml version="1.0" encoding="UTF-8"?>
		<!-- /** 配置文件描述: spring-mvc配置 */ -->
		<beans default-lazy-init="true"
		    xmlns="http://www.springframework.org/schema/beans" 
		    xmlns:p="http://www.springframework.org/schema/p"
		    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		    xmlns:context="http://www.springframework.org/schema/context"
		    xmlns:tx="http://www.springframework.org/schema/tx"
		    xmlns:aop="http://www.springframework.org/schema/aop" 
		    xmlns:mvc="http://www.springframework.org/schema/mvc"
		    xmlns:util="http://www.springframework.org/schema/util"
		    xmlns:jpa="http://www.springframework.org/schema/data/jpa"
		    xsi:schemaLocation="  
		       http://www.springframework.org/schema/beans   
		       http://www.springframework.org/schema/beans/spring-beans-4.1.xsd  
		       http://www.springframework.org/schema/mvc   
		       http://www.springframework.org/schema/mvc/spring-mvc-4.1.xsd   
		       http://www.springframework.org/schema/tx   
		       http://www.springframework.org/schema/tx/spring-tx-4.1.xsd   
		       http://www.springframework.org/schema/aop 
		       http://www.springframework.org/schema/aop/spring-aop-4.1.xsd
		       http://www.springframework.org/schema/util 
		       http://www.springframework.org/schema/util/spring-util-4.1.xsd
		       http://www.springframework.org/schema/data/jpa 
		       http://www.springframework.org/schema/data/jpa/spring-jpa-1.3.xsd
		       http://www.springframework.org/schema/context
		       http://www.springframework.org/schema/context/spring-context-4.1.xsd">
		
		</beans> 

	> 注意: 配置文件的中的Schema版本要与 Spring 版本一致.

3. 添加监听器初始化Spting容器. web.xml

		  <!-- 配置监听器, 在Web服务器启动时候初始化Spring容器 -->
		  <listener>
		    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
		  </listener>
		  <context-param>
		  	 <param-name>contextConfigLocation</param-name>
		  	 <param-value>classpath:spring-*.xml</param-value>
		  </context-param>

4. 部署测试...

## 利用Spring管理Struts2 控制器对象

案例:

1. 编写控制器Bean

		@Controller 
		//Spring 管理的Bean, ID: springAction
		@Scope("prototype") 
		public class SpringAction {
			
			public String execute(){
				System.out.println("From Spring");
				return "success";
			}
		}

2. 添加Bean组件扫描: spring-struts.xml
	
		<context:component-scan 
			base-package="cn.tedu.ssh1.action"/>

3. 配置struts.xml:

		<!-- class 属性的值使用 Spring Bean ID 
		时候, 就可以从Spring中获取控制器Bean对象-->
		<action name="spring" class="springAction">
			<result name="success"> 
				/WEB-INF/jsp/demo.jsp
			</result>
		</action>
	
	> 其中: class 属性的值使用 Spring Bean ID

4. 测试:

		http://localhost:8080/ssh1/demo/spring.action


## Struts2 控制器的线程安全问题

原理:

![](7.png)

为每个请求创建一个控制器实例即可解决线程并发安全问题! 在使用Spring时候务必使用 @Scope("prototype") 属性.





