# SSH

## 整合Spring Hibernate 续

Spring 提供了 HibernateTemplate类 用于封装Session接口, 在Session接口基础之上提供了更加简洁高效的API方法. 使用HibernateTemplate可以替代Sesison接口. 并且更加简洁方便.

案例:

1. 在spring-hibernate.xml 中配置HibernateTemplate:
	
		<bean id="hibernateTemplate" class="org.springframework.orm.hibernate4.HibernateTemplate">
			<property name="sessionFactory" 
				ref="sessionFactory"/>
		</bean>

2. 添加实体类 User

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

3. 添加映射文件 hbm/User.hbm.xml

		<?xml version="1.0" encoding="UTF-8"?>
		<!DOCTYPE hibernate-mapping PUBLIC 
		    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
		    "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
		<hibernate-mapping>
			<class name="cn.tedu.entity.User"
				table="t_user">
				<id name="id" column="u_id"></id>
				<property name="name" column="u_name"/>
				<property name="password" column="u_password"/>
				<property name="age" column="u_age"/>
				<property name="salary" column="u_salary"/>
				<property name="hiredate" column="u_hiredate"/>
			</class>
		</hibernate-mapping>

4. 添加测试案例 

		public class TestCase {
			ClassPathXmlApplicationContext ctx;
			HibernateTemplate template;
			
			@Before 
			public void init(){
				ctx = new ClassPathXmlApplicationContext(
						"conf/spring-hibernate.xml");
				template = ctx.getBean(
						"hibernateTemplate", 
						HibernateTemplate.class);
			}
			
			@Test
			public void testGet(){
				User user=template.get(User.class,1);
				System.out.println(user); 
			}
		}

5. 测试 ...

## 使用HibernateTemplate 实现UserDao

HibernateTemplate天生就是用于实现Dao接口的. 并且可以利用Spring声明式事务管理事务.

1. 配置spring-hibernate.xml:

		<!-- 配置Hibernate事务管理器 -->
		<bean id="txMgr" 
			class="org.springframework.orm.hibernate4.HibernateTransactionManager">
			<property name="sessionFactory"
				ref="sessionFactory"/>
		</bean>
		<!-- 开启基于注解的声明式事务管理 -->
		<tx:annotation-driven 
			transaction-manager="txMgr"/>
		
		<context:component-scan 
			base-package="cn.tedu.dao"/>
	
2. 编写UserDao接口
		
		public interface UserDao {
			
			int addUser(User user);
			
			int updateUser(User user);
			
			int deleteUser(Integer id);
			
			User findById(Integer id);
			
			List<User> findAll();
			
			User findByName(String name);
		}

3. 实现UserDao接口

		@Repository("userDao")
		@Transactional
		public class UserDaoImpl implements UserDao {
			
			@Resource 
			private HibernateTemplate hibernateTemplate;
			
		
			public int addUser(User user) {
				Object id=hibernateTemplate.save(user);
				return id==null ? 0 : 1;
			}
		
			public int updateUser(User user) {
				hibernateTemplate.update(user);
				return 1;
			}
		
			public int deleteUser(Integer id) {
				User user = 
				  hibernateTemplate.get(User.class, id);
				hibernateTemplate.delete(user);
				return 1;
			}
		
			public User findById(Integer id) {
				User user = 
				  hibernateTemplate.get(User.class, id);
				return user;
			}
		
			public List<User> findAll() {
				String hql="from User";
				List<User> list=(List<User>)
					hibernateTemplate.find(hql);
				return list;
			}
		
			public User findByName(String name) {
				String hql="from User where name=?";
				List<User> list=(List<User>)
					hibernateTemplate.find(hql,name);
				if(list.isEmpty()){
					return null;
				}else{
					return list.get(0);
				}
			}
		}

4. 测试:

		public class DaoTestCase {
			ClassPathXmlApplicationContext ctx;
			UserDao dao;
			@Before 
			public void init(){
				ctx = new ClassPathXmlApplicationContext(
						"conf/spring-hibernate.xml");
				dao = ctx.getBean(
						"userDao", UserDao.class);
			}
			
			@Test
			public void testAddUser(){
				User user=new User(2, "Jerry", "123",
						2, 3.4, new Date(0));
				int n = dao.addUser(user);
				System.out.println(n); 
			}
			
			@Test
			public void testUpdate(){
				User user=dao.findById(1);
				user.setName("光头强");
				dao.updateUser(user);
			}
		
			@Test
			public void testFindAll(){
				List<User> users=dao.findAll();
				for (User user : users) {
					System.out.println(user); 
				}
			}
		}

## 持久对象生存周期管理

Hibernate 为了自动化的处理ORM, 设计了对象持久状态管理.

1. 临时状态: 刚刚创建的新实体对象, 还没有保存到数据库时候, 这是对象是临时状态. 
	- 从Hibernate中删除的对象也是临时状态.
2. 持久状态: 已经保存到数据库的对象, 并且缓存到了session中, 持久状态对象有个非常重要的特点, 在更改属性时候会自动的更新的到数据库中.
	- session.get, session.save, session.update 以后的对象是持久状态的.
	> Hibernate4 需要利用 session.flush 手动执行更新功能
3. 游离状态: 是指持久状态的对象, 被从session缓存中清除, 这时候更新对象的属性不再影响数据库, 可以利用 session.update方法使对象返回到持久状态.
	- session.evict() session.clear() 可将对象从session清除, 使对象变成游离状态.

![](hbm.png)

案例:

	public class TestCase {
		ClassPathXmlApplicationContext ctx;
		HibernateTemplate template;
		
		@Before 
		public void init(){
			ctx = new ClassPathXmlApplicationContext(
					"conf/spring-hibernate.xml");
			template = ctx.getBean(
					"hibernateTemplate", 
					HibernateTemplate.class);
		}
		
		@Test
		public void testGet(){
			User user=template.get(User.class,1);
			System.out.println(user); 
		}
		
		@Test
		public void testState1(){
			SessionFactory factory =
					template.getSessionFactory();
			Session session=factory.openSession();
			Transaction tx = session.beginTransaction();
			//新创建的user对象状态是游离状态的
			User user=new User(3, "Andy", "123", 
					4, 3.4, new Date(0));
			session.save(user);
			//save以后对象状态变成持久状态
			//持久状态对象属性更改将影响到数据库
			user.setPassword("456"); 
			tx.commit();
			session.close();
		}
		
		@Test
		public void testState2(){
			SessionFactory factory =
					template.getSessionFactory();
			Session session=factory.openSession();
			Transaction tx = session.beginTransaction();
			
			User user=(User)session.get(User.class, 2);
			//持久状态
			user.setName("熊大");
			session.flush(); //调用flush清空缓存
			//session.evict(user);
			//evict(user)将一个对象从缓存中清除, 
			// 使其成为游离状态
			session.clear();
			// 将当前session中的全部对象从缓存中清除
			// 使其全部成为游离状态
			//游离状态
			user.setName("李洪鹤");
			session.flush();
			tx.commit();
			session.close();
		}
		
		@Test
		public void testState3(){
			SessionFactory factory =
					template.getSessionFactory();
			Session session=factory.openSession();
			Transaction tx = session.beginTransaction();
				
			User user=(User)session.get(User.class, 3);
			session.evict(user);
			user.setPassword("7788");
			user.setName("John");
			session.update(user);
			
			tx.commit();
			session.close();
		}
		
		
		@Test
		public void testState4(){
			SessionFactory factory =
					template.getSessionFactory();
			Session session=factory.openSession();
			Transaction tx = session.beginTransaction();
				
			User user=(User)session.get(User.class, 3);
			session.delete(user);
			user.setName("ABC");
			tx.commit();
			session.close();
		}
	}

# SSH 整合案例: 用户管理

## 用户列表功能

原理:

![](list.png)

### 1. 持久层

1. 编写持久层接口 UserDao

		List<Map<String, Object>> findAllUser();

2. 实现持久层接口 UserDaoImpl

		public List<Map<String, Object>> 
			findAllUser() {
			String hql = "select new map(id as id, "
					+ "name as name, "
					+ "age as age) "
					+ "from User";
			List<Map<String, Object>> list=
					(List<Map<String, Object>>)
					hibernateTemplate.find(hql);
			return list;
		}

3. 测试 DaoTestCase

		@Test
		public void testFindAllUser(){
			List<Map<String, Object>> list=
					dao.findAllUser();
			for (Map<String, Object> map : list) {
				System.out.println(map);
			}
		}

### 2. 业务层

1. 定义业务层接口:

		public interface UserService {
			List<Map<String, Object>> userList();
		}

2. 实现业务层接口:

		@Service("userService")
		@Transactional
		public class UserServiceImpl 
			implements UserService {
			
			@Resource
			private UserDao userDao;
			
			public List<Map<String, Object>> userList() {
				return userDao.findAllUser();
			}
		}

3. 测试:

		public class ServiceTestCase {
			ClassPathXmlApplicationContext ctx;
			UserService service;
			
			@Before 
			public void init(){
				ctx = new ClassPathXmlApplicationContext(
						"conf/spring-hibernate.xml",
						"conf/spring-service.xml");
				service = ctx.getBean(
						"userService", UserService.class);
			}
			@After
			public void destory(){
				ctx.close();
			}
			@Test
			public void testUserList(){
				List<Map<String, Object>> list=
					service.userList();
				for (Map<String, Object> map : list) {
					System.out.println(map);
				}
			}
		}
		
### 3. 控制器

1. 添加JsonResult封装Json返回值

		public class JsonResult<T> implements Serializable {
			private static final long serialVersionUID = -2722313840903428077L;
		
			public static final int SUCCESS = 1;
			public static final int ERROR = 0;
			
			private int state;
			private String message;
			private T data;
			
			public JsonResult() {
			}
			
			public JsonResult(int state, String message) {
				this.state = state;
				this.message = message;
			}
			
			public JsonResult(Throwable e) {
				this.state = ERROR;
				this.message = e.getMessage();
			}
			
			public JsonResult(T data) {
				this.state = SUCCESS;
				this.data = data;
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
		
			public T getData() {
				return data;
			}
		
			public void setData(T data) {
				this.data = data;
			}
		
			@Override
			public String toString() {
				return "JsonResult [state=" + state + ", message=" + message + ", data=" + data + "]";
			}
			
		}

2. 编写控制器类:

		@Controller
		@Scope("prototype")
		public class UserAction {
			
			@Resource 
			private UserService userService;
			
			private JsonResult result;
			public void setResult(JsonResult result) {
				this.result = result;
			}
			public JsonResult getResult() {
				return result;
			}
			
			public String list(){
				List<Map<String, Object>> list=
						userService.userList();
				result = new JsonResult(list);
				return "json";
			}
		}

3. 配置注解扫描 spring-struts.xml

		<context:component-scan 
			base-package="cn.tedu.action"/>
	
4. 配置控制器 struts.xml

		<constant name="struts.action.extension" 
			value="do"/>
		<package name="user" namespace="/user"
			extends="json-default">
			<action name="list" class="userAction"
				method="list">
				<result type="json" name="json">
					<param name="root">result</param>
				</result>
			</action>	
		</package>

5. 测试:

		http://localhost:8080/ssh3/user/list.do


### 4. 编写HTML界面

1. 编写静态HTML, 包含一个表格
2. 引入JQuery
3. 编写JS, 利用AJAX获取用户数据
4. 利用JS将用户数更新到表格上

		<!DOCTYPE html>
		<html>
		<head>
		<meta charset="UTF-8">
		<title>用户管理</title>
		<script type="text/javascript" 
			src="jquery/jquery-3.2.1.min.js"></script>
		<script type="text/javascript">
		var SUCCESS=1;
		
		$(function(){
			loadUsers();
		});
		function loadUsers(){
			var url='user/list.do';	
			$.getJSON(url, function(result){
				if(result.state==SUCCESS){
					var users = result.data;
					console.log(users);
					showUsers(users);
				}else{
					alert(result.message);
				}
			});
		}
		function showUsers(users){
			var tbody = $('#users tbody');
			tbody.empty();
			for(var i=0; i<users.length; i++){
				var u = users[i];
				var tr=template.replace('[id]', u.id)
					.replace('[name]', u.name)
					.replace('[age]', u.age);
				tbody.append(tr);
			}
		}
		var template='<tr><td>[id]</td>'+
			'<td>[name]</td>'+
			'<td>[age]</td></tr>';
		</script>
		</head>
		<body>
			<div>
				
			</div>
			<div>
				<h1>用户管理</h1>
				<table id="users">
					<thead>
						<tr>
							<th>编号</th>
							<th>姓名</th>
							<th>年龄</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Tom</td>
							<td>5</td>
						</tr>
					</tbody>
				</table>	
			</div>
		</body>
		</html>

## 作业:

1. 添加用户功能









