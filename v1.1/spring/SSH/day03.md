# SSH

## Hibernate Session可以实现CRUD功能

准备测试环境

	public class TestCase {
		
		Configuration cfg;
		SessionFactory factory;
		Session session;
		@Before
		public void init(){
			cfg=new Configuration();
			cfg.configure("hibernate.cfg.xml");
			factory = cfg.buildSessionFactory();
			session = factory.openSession();
		}
		@After
		public void close(){
			session.close();
			factory.close();
		}
	}

> 利用JUnit 初始化 Session和SessionFactory

### 查询功能 

	@Test
	public void testGetById(){
		//调用get方法 
		//      get(类型, 对象的主键ID)
		User user=(User)session.get(User.class,1);
		System.out.println(user);
	}

### 更新功能

	@Test
	public void testUpdate(){
		Transaction tx=session.beginTransaction();
		User user=(User)session.get(User.class,1);
		System.out.println(user);
		user.setName("光头强"); 
		session.update(user);
		user =(User)session.get(User.class,1);
		System.out.println(user);
		tx.commit();
	}
	
> 更新功能是DML操作, 必须使用Transaction

### 删除功能

	@Test
	public void testDelete(){
		Transaction tx = session.beginTransaction();
		User user=(User)session.get(User.class,1);
		//          被删除的对象
		session.delete(user);
		tx.commit();
	}

## HQL

Hibernate为了消除SQL提供了替代的查询语言 HQL.

HQL的语法与SQL非常类似:

1. 将SQL中的表名替换为对应的实体类名
2. 将SQL中的列名(字段名)替换为对应的实体属性名
3. 使用Query接口执行HQL查询

### 查询全部列数据

	@Test
	public void testFindAll(){
		//SQL: select * from t_user 
		//HQL: from User
		String hql = "from User";
		//利用Query接口可以执行HQL语句
		Query query=session.createQuery(hql);
		//list 方法执行HQL语句
		List<User> list=query.list();
		for (User user : list) {
			System.out.println(user); 
		}
	}

### 查询部分列封装为Map

	@Test
	public void testFindByMap(){
		//SQL: select u_id, u_name from t_user
		//HQL: select new map(id as id, 
		//            name as name) 
		//     from User
		String hql = "select new map(id as id,"
				+ "name as name) "
				+ "from User ";
		Query query=session.createQuery(hql);
		List<Map<String, Object>> list=
				query.list();
		for (Map<String, Object> map : list) {
			System.out.println(map);
		}
	}

### 有参数查询

	@Test
	public void testFindByParam(){
		//SQL: select u_id, u_name, u_password
		//     from t_user where u_name=?
		//HQL: select new map(id as id,
		//     name as name, 
		//     password as password)
		//     from User where name=?
		String name = "Tom";
		String hql="select new map(id as id,"
				+ "name as name, "
				+ "password as password) "
				+ "from User where name=? ";
		Query query=session.createQuery(hql);
		//替换查询参数
		query.setString(0, name);
		List<Map<String, Object>> list=
				query.list();
		for (Map<String, Object> map : list) {
			System.out.println(map); 
		}
	}

> 如果你SQL很熟悉, 掌握HQL也不会困难.

# 整合SSH

步骤:

1. 创建项目
	- 创建部署描述文件
	- 引入目标服务器运行环境
	> 如果创建不了项目, 请检测网络:是否能够访问Maven服务器.
2. 导入相关的包:
	- Struts2
	- Struts2-Spring-plugin
	- Struts2-json-plugin
	- Hibernate
	- MySql jdbc Drvier
	- dataSource
	- Spring-orm
	- Spring-jdbc
	- JUnit
3. 配置
	- web.xml
	- struts2
	- Spring + hibernate

整合具体步骤:

1. 创建项目导入包:

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
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-json-plugin</artifactId>
			<version>2.5.1</version>
		</dependency>

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

		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid</artifactId>
			<version>1.0.23</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-orm</artifactId>
			<version>4.1.6.RELEASE</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jdbc</artifactId>
			<version>4.1.6.RELEASE</version>
		</dependency>

2. 配置web.xml
		
		  <filter>
		    <display-name>StrutsPrepareAndExecuteFilter</display-name>
		    <filter-name>StrutsPrepareAndExecuteFilter</filter-name>
		    <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
		  </filter>
		  <filter-mapping>
		    <filter-name>StrutsPrepareAndExecuteFilter</filter-name>
		    <url-pattern>/StrutsPrepareAndExecuteFilter</url-pattern>
		  </filter-mapping>
		  <listener>
		    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
		  </listener>
		  <context-param>
			  <param-name>contextConfigLocation</param-name>
			  <param-value>classpath:conf/spring-*.xml</param-value>  
		  </context-param>

	> 需要先导入 目标服务器运行环境	 

3. 添加struts配置文件: struts.xml
		
		<?xml version="1.0" encoding="UTF-8"?>
		<!-- 从 struts-2.5.dtd 文件中复制 DOCTYPE -->
		<!DOCTYPE struts PUBLIC
			"-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
			"http://struts.apache.org/dtds/struts-2.5.dtd">
		<struts>
		</struts>

4. 添加spring-struts配置文件: conf/spring-struts.xml

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
		
5. 添加数据库连接参数文件 conf/conf.properties

		# conf.properties
		driver=com.mysql.jdbc.Drvier
		url=jdbc:mysql://localhost:3306/ssh
		username=root
		password=root
		initialSize=5
		maxActive=50
		minIdle=0
		maxWait=60000
		timeBetweenLogStatsMillis=60000

6. 利用Spring配置文件, 配置Hibernate: conf/spring-hibernate.xml

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
		
			<!-- spring-hibernate.xml  -->
			<!-- 配置数据源, 连接到数据库, 替换Hibernate的
			主配置文件 hibernate.cfg.xml -->
			<!-- 读取properties -->
			<util:properties id="conf" 
				location="classpath:conf/conf.properties"/>
			<!-- 配置数据源 -->
			<bean id="dataSource" 
				class="com.alibaba.druid.pool.DruidDataSource"
				init-method="init"
				destroy-method="close">
				<property name="driverClassName" 
					value="#{conf.driver}"/> 
				<property name="url" 
					value="#{conf.url}"/>
				<property name="username" 
					value="#{conf.username}"/>
				<property name="password" 
					value="#{conf.password}"/>
				<property name="initialSize" 
					value="#{conf.initialSize}"/>
				<property name="maxActive" 
					value="#{conf.maxActive}"/>
				<property name="minIdle" 
					value="#{conf.minIdle}"/>
				<property name="maxWait" 
					value="#{conf.maxWait}"/>
				<property name="timeBetweenLogStatsMillis" 
					value="#{conf.timeBetweenLogStatsMillis}"/>
			</bean>
			
			<!-- 利用spring-orm 提供的工厂Bean创建
			SessionFactory 对象 -->
			<bean id="sessionFactory"
				class="org.springframework.orm.hibernate4.LocalSessionFactoryBean">
				<!-- 配置数据源, 使Hibernate能够连接到数据库 -->
				<property name="dataSource"
					ref="dataSource"/>
				<!-- 配置Hibernate的工作参数, 包括"SQL方言" -->
				<property name="hibernateProperties">
					<props>
						<prop key="hibernate.dialect">
							org.hibernate.dialect.MySQLDialect
						</prop>
						<prop key="hibernate.show_sql">
							true
						</prop>
						<prop key="hibernate.format_sql">
							true
						</prop>
					</props>
				</property>
				<!-- 配置"子映射"文件的存储位置 -->
				<property name="mappingLocations">
					<value>classpath:hbm/*.xml</value>
				</property>
			</bean>
		</beans> 

7. 部署测试

		...

