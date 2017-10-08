# ValueStack

Struts2 用于共享数据的存储结构. 在整个Struts请求期间共享数据.

包含两个区域:

1. 内容区域: 主要共享数据的区域, 控制器Bean就保存在这个区域.
	- 在JSP中, 使用 Struts 标签+OGNL表达式可以读取
	- Struts2 接管了JSTL和EL的底层, JSTL/EL就可以访问这个区域
2. 上下文环境区域: 用于访问 request, session 和 application 范围
	- 使用 Struts 标签+OGNL表达式可以读取, 读取时候需要#
		- #request.message  #session.message  #application.message
	- 接管了JSTL和EL的底层, ${requestScope.message}

# 设计模式

模式: 解决特定问题的相对"固定"的解决套路 

## 单列模式

解决单列(只有一个对象)问题的固定套路

懒汉方式

饿汉式











