# SSH

## 多线程问题

1. Web应用是并发访问的
2. 当多个并发访问了同一个数据时候将出现并发安全性问题
	- 尽量并发解决问题, 性能好
	- 必要的时候使用同步处理, 性能差
3. 超过300并发, 应该采用服务器集群解决
	- Tomcat 默认值是 200

> 无状态类: 没有公共的可读写的实例变量的类, 没有线程安全问题
> 有状态类: 有公共的可读写实例变量类, 有线程安全问题.

## Struts 的 Result

Struts 控制器处理结束以后有Result, 代表控制结果的视图呈现方式

在struts-default.xml 文件中定义了result 类型:

    <result-types>
        <result-type name="chain" class="com.opensymphony.xwork2.ActionChainResult"/>
        <result-type name="dispatcher" class="org.apache.struts2.result.ServletDispatcherResult" default="true"/>
        <result-type name="freemarker" class="org.apache.struts2.views.freemarker.FreemarkerResult"/>
        <result-type name="httpheader" class="org.apache.struts2.result.HttpHeaderResult"/>
        <result-type name="redirect" class="org.apache.struts2.result.ServletRedirectResult"/>
        <result-type name="redirectAction" class="org.apache.struts2.result.ServletActionRedirectResult"/>
        <result-type name="stream" class="org.apache.struts2.result.StreamResult"/>
        <result-type name="velocity" class="org.apache.struts2.result.VelocityResult"/>
        <result-type name="xslt" class="org.apache.struts2.views.xslt.XSLTResult"/>
        <result-type name="plainText" class="org.apache.struts2.result.PlainTextResult" />
        <result-type name="postback" class="org.apache.struts2.result.PostbackResult" />
    </result-types>

每个类型都对应一个类, 这个类是实际功能的实现者, 可以在手册上查询对应result类型的使用方式.

### 转发

默认情况下是 "转发" 处理, 常用与控制器转发到JSP显示结果.

对应类型为: dispatcher

### Struts2 支持重定性

	<result-type name="redirect" class="org.apache.struts2.result.ServletRedirectResult"/>

手册参考: [http://doc.tedu.cn/struts2/struts2-core/apidocs/org/apache/struts2/dispatcher/ServletRedirectResult.html](http://doc.tedu.cn/struts2/struts2-core/apidocs/org/apache/struts2/dispatcher/ServletRedirectResult.html "ServletRedirectResult")

使用:

1. 创建项目, 导入Struts2 和 Spring

		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-core</artifactId>
			<version>2.5.1</version>
		</dependency>
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-spring-plugin</artifactId>
			<version>2.5.1</version>
		</dependency>

2. 配置Spring和Struts2 web.xml

		  <filter>
		    <display-name>StrutsPrepareAndExecuteFilter</display-name>
		    <filter-name>StrutsPrepareAndExecuteFilter</filter-name>
		    <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
		  </filter>
		  <filter-mapping>
		    <filter-name>StrutsPrepareAndExecuteFilter</filter-name>
		    <url-pattern>/*</url-pattern>
		  </filter-mapping>
		  <listener>
		    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
		  </listener>
		  <context-param>
		  	 <param-name>contextConfigLocation</param-name>
		  	 <param-value>classpath:spring-*.xml</param-value>
		  </context-param>

3. 添加 Spring 配置文件 spring-struts.xml

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
		
			<context:component-scan 
				base-package="cn.tedu.ssh.action"/>
		
		</beans> 


4. 添加Struts配置文件 struts.xml

		<?xml version="1.0" encoding="UTF-8"?>
		<!-- 从 struts-2.5.dtd 文件中复制 DOCTYPE -->
		<!DOCTYPE struts PUBLIC
			"-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
			"http://struts.apache.org/dtds/struts-2.5.dtd">
		<struts>
		</struts>

5. 编写控制器类 

		@Controller
		@Scope("prototype")
		public class DocAction {
			
			public String execute(){
				System.out.println("doc action!");
				return "success";
			}
		}

6. 配置控制器: struts.xml

		<action name="doc" class="docAction">
		 	<result name="success" type="redirect">
			   <param name="location">http://doc.tedu.cn</param>
		 	</result>	 		
		</action>

	> 其中 result 参考 ServletRedirectResult 的手册

7. 测试:

		http://localhost:8080/ssh2/demo/doc.action

### 重定向到其他Action

	<result-type name="redirectAction" class="org.apache.struts2.result.ServletActionRedirectResult"/>

参考: [http://doc.tedu.cn/struts2/struts2-core/apidocs/org/apache/struts2/dispatcher/ServletActionRedirectResult.html](http://doc.tedu.cn/struts2/struts2-core/apidocs/org/apache/struts2/dispatcher/ServletActionRedirectResult.html "ServletActionRedirectResult")

使用:

1. 创建控制器

		@Controller
		@Scope("prototype")
		public class TestAction {
			public String execute(){
				System.out.println("test action!");
				return "success";
			}
		}

2. 配置 struts.xml

		<action name="test" class="testAction">
			<result type="redirectAction" name="success">
				<param name="namespace">/demo</param>
				<param name="actionName">doc</param>
			</result>
		</action>

3. 测试

		http://localhost:8080/ssh2/test/test.action

### Stream Result

Stream 结果用于下载文件到客户端

原理:

![](3.png)

案例:

1. 声明控制器:

		@Controller
		@Scope("prototype")
		public class ImageAction {
			
			private InputStream img;
			public InputStream getImg() {
				return img;
			}
			public void setImg(InputStream img) {
				this.img = img;
			}
			
			public byte[] createPngImage() throws IOException{
				BufferedImage img = 
						new BufferedImage(200, 100, 
						BufferedImage.TYPE_3BYTE_BGR); 
				img.setRGB(100, 50, 0xffffff);
				ByteArrayOutputStream buf=
						new ByteArrayOutputStream();
				ImageIO.write(img, "png", buf);
				buf.close();
				return buf.toByteArray();
			}
			
			public String execute() throws Exception{
				
				byte[] data = createPngImage();
				img = new ByteArrayInputStream(data);
				
				return "success";
			}
		}

2. 配置 struts.xml

		<action name="image" class="imageAction">
			<result name="success" type="stream">
				<param name="contentType">image/png</param>
				<param name="inputName">img</param>
			</result>
		</action>

	> inputName属性值必须是控制器中的Bean属性, 并且其类型一定是InputStream

	> contentType 属性用于声明反馈到客户端的 媒体类型.

3. 测试:

		http://localhost:8080/ssh2/test/image.action

### Json类型Result

Json是后期添加的Result类型, 需要使用JSON插件:

		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-json-plugin</artifactId>
			<version>2.5.1</version>
		</dependency>

在json插件中定义了新的package:

    <package name="json-default" extends="struts-default">

        <result-types>
            <result-type name="json" class="org.apache.struts2.json.JSONResult"/>
            <result-type name="jsonActionRedirect" class="org.apache.struts2.json.JSONActionRedirectResult"/>
        </result-types>
	...

> 在这个package中定义了 json类型的result.

使用Json:

1. 声明控制器

		@Controller
		@Scope("prototype")
		public class BeanAction {
			
			//private UserService userService;
			//getxxx
			//setXXX
			//...
			
			private String name;
			private int age;
			private double salary;
			private String[] friends;
				
			public String getName() {
				return name;
			}
		
			public void setName(String name) {
				this.name = name;
			}
		
			public int getAge() {
				return age;
			}
		
			public void setAge(int age) {
				this.age = age;
			}
		
			public double getSalary() {
				return salary;
			}
		
			public void setSalary(double salary) {
				this.salary = salary;
			}
		
			public String[] getFriends() {
				return friends;
			}
		
			public void setFriends(String[] friends) {
				this.friends = friends;
			}
		
			public String execute(){
				name = "李洪鹤";
				age = 18;
				salary = 10.0;
				friends = new String[]{"熊大","熊二"};
				return "success";
			}
		}

2. 配置 struts.xml
	
		<package name="ajax" namespace="/ajax"
			extends="json-default">
			<!-- 可以使用 result type=json -->
			<action name="bean" class="beanAction">
				<!-- 默认情况下, json result将Action对象
				整体作为 JavaBean, 转换为JSON字符发送
				到浏览器端. Action的Bean属性转换为JSON属性 -->
				<result name="success" type="json" />
			</action>
			
		</package>
	
	> 这里package继承于extends="json-default"才能使用json类型的Result

3. 测试:

	 	http://localhost:8080/ssh2/json/bean.action


> 如上方式有缺点: 如果控制器中包含不需要转换的JSON数据的属性时候, 就不方便了.

使用一个控制器属性转换为JSON:

1. 开发JSON封装Bean:

		public class JsonResult {
			public static final int SUCCESS=1;
			public static final int ERROR=0;
			
			private int state;
			private String message;
			private Object data;
			
			public JsonResult() {
			}
		
			public JsonResult(Object data){
				state = SUCCESS;
				this.data = data;
			}
		
			public JsonResult(Throwable e){
				state = ERROR;
				this.data = null;
				this.message = e.getMessage();
			}
		
			public int getState() {
				return state;
			}
		
			public void setState(int state) {
				this.state = state;
			}
		
			public String getMessage() {
				return message;
			}
		
			public void setMessage(String message) {
				this.message = message;
			}
		
			public Object getData() {
				return data;
			}
		
			public void setData(Object data) {
				this.data = data;
			}
		
			@Override
			public String toString() {
				return "JsonResult [state=" + state + ", message=" + message + ", data=" + data + "]";
			}
			
		}
		 

2. 开发控制器: 
	
		@Controller
		@Scope("prototype")
		public class RootAction {
			
			private String name;
			private JsonResult result;
		 
			public JsonResult getResult() {
				return result;
			}
			public void setResult(JsonResult result) {
				this.result = result;
			}
			public String getName() {
				return name;
			}
			public void setName(String name) {
				this.name = name;
			}
			
			public String execute(){
				name = "Tom";
				
				result=new JsonResult("Hello World!");
				
				return "success";
			}
		}
		
3. 配置

		<action name="root" class="rootAction">
			<result name="success" type="json">
				<!-- 将控制器rootAction中的result
				属性序列化为JSON发送到浏览器. -->
				<param name="root">result</param>
			</result>
		</action>	

4. 测试:

	 	http://localhost:8080/ssh2/json/root.action

## Hibernate

Hibernate体系结构:

![](6.png)

使用Hibernate

1. 导入Hibernate

		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-core</artifactId>
			<version>4.3.2.Final</version>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.40</version>
		</dependency>

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
		</dependency>

	> 需要导入数据库驱动

2. 配置主配置文件 hibernate.cfg.xml:

		<?xml version="1.0" encoding="UTF-8"?>
		<!DOCTYPE hibernate-configuration PUBLIC
			"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
			"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
		<hibernate-configuration>
			<session-factory>
				<!-- 数据库连接参数  -->
				<property name="connection.driver_class">
					com.mysql.jdbc.Driver
				</property>
				<property name="connection.url">
					jdbc:mysql://localhost:3306/ssh			
				</property>
				<property name="connection.username">
					root
				</property>
				<property name="connection.password">
					root
				</property>
				<!-- 配置数据的方言(dialect) MySQL方言 -->
				<property name="dialect">
					org.hibernate.dialect.MySQLDialect
				</property>
				<!-- 配置调试参数, 显示生成的SQL -->
				<property name="show_sql">true</property>
				<property name="format_sql">true</property>
				<!-- 配置子配置文件(映射文件) -->
				<mapping resource="hbm/User.hbm.xml"/>
			</session-factory>
		</hibernate-configuration>
		
3. 声明实体类:

		public class User implements Serializable{
			private static final long serialVersionUID = 4791239487936751712L;
			
			private Integer id;
			private String name;
			private String password;
			private Integer age;
			private Double salary;
			private Date hiredate;
			
			public User() {
			}
		
			public User(Integer id, String name, String password, Integer age, Double salary, Date hiredate) {
				super();
				this.id = id;
				this.name = name;
				this.password = password;
				this.age = age;
				this.salary = salary;
				this.hiredate = hiredate;
			}
		
			public Integer getId() {
				return id;
			}
		
			public void setId(Integer id) {
				this.id = id;
			}
		
			public String getName() {
				return name;
			}
		
			public void setName(String name) {
				this.name = name;
			}
		
			public String getPassword() {
				return password;
			}
		
			public void setPassword(String password) {
				this.password = password;
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
		
			public Date getHiredate() {
				return hiredate;
			}
		
			public void setHiredate(Date hiredate) {
				this.hiredate = hiredate;
			}
		
			@Override
			public String toString() {
				return "User [id=" + id + ", name=" + name + ", password=" + password + ", age=" + age + ", salary=" + salary
						+ ", hiredate=" + hiredate + "]";
			}
		
			@Override
			public int hashCode() {
				final int prime = 31;
				int result = 1;
				result = prime * result + ((id == null) ? 0 : id.hashCode());
				return result;
			}
		
			@Override
			public boolean equals(Object obj) {
				if (this == obj)
					return true;
				if (obj == null)
					return false;
				if (getClass() != obj.getClass())
					return false;
				User other = (User) obj;
				if (id == null) {
					if (other.id != null)
						return false;
				} else if (!id.equals(other.id))
					return false;
				return true;
			}
			
			
		}

4. 创建数据表:
		
		create table t_user(
			u_id int,
			u_name varchar(100),
			u_password varchar(100),
			u_age int,
			u_salary double,
			u_hiredate date,
			primary key (u_id)
		);
			
5. 配置子配置文件(映射文件) hbm/User.hbm.xml

		<?xml version="1.0" encoding="UTF-8"?>
		<!DOCTYPE hibernate-mapping PUBLIC 
		    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
		    "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
		<hibernate-mapping>
			<!-- 定义了 类和表的对应关系 -->
			<class name="cn.tedu.entity.User" 
				table="t_user">
				<!-- 定义属性和列(字段)的对应关系 -->
				<id name="id" column="u_id"></id>
				<property name="name" column="u_name"/>
				<property name="password" column="u_password"/>
				<property name="age" column="u_age"/>
				<property name="salary" column="u_salary"/>
				<property name="hiredate" column="u_hiredate"/>
			</class>
		</hibernate-mapping>

6. 利用Hibernate操作数据库

		public class TestCase {
			
			@Test
			public void testSaveUser(){
				//创建Session对象
				
				Configuration cfg=new Configuration();
				//读取主配置文件
				cfg.configure("hibernate.cfg.xml");
				//创建Session的工厂
				SessionFactory factory=
						cfg.buildSessionFactory();
				//创建Session对象
				Session session=factory.openSession();
				
				Transaction tx=session.beginTransaction();
				
				long now = System.currentTimeMillis();
				User user = new User(1, "Tom", "123",
						4, 4.5, new Date(now));
				//调用 session的save方法操作数据库
				session.save(user);
				
				tx.commit();//提交事务才能执行DML语句
			}
		}

	> 可以在控制台上看到SQL语句, 在数据库中查询出执行的结果.











 
 
