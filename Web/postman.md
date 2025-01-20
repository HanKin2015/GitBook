# 21年流落民间，最全的 postman 使用教程 (极其详细)
http://www.taodudu.cc/news/show-3943163.html?action=onClick#google_vignette
postman是一款支持http协议的接口调试与测试工具，其主要特点就是功能强大，使用简单且易用性好 。
无论是开发人员进行接口调试，还是测试人员做接口测试，postman都是我们的首选工具之一 。
![](https://img-blog.csdnimg.cn/img_convert/ff2424eae930b16c4150378bd9c28f8d.png)

## 1、安装
postman 在 2018 年之后就不再支持浏览器版本，所以，想要使用它就必须先下载客户端再安装使用。
访问地址：https://www.getpostman.com/

## 2、发送第一个请求
如果你是第一次使用postman发送请求，下面这个例子可以作为一个最基本的入门，可以帮我们建立一个初始印象 。
1. 打开postman，点击+加号打开一个新的请求页。
2. 在请求的URL中输入请求地址：http://www.weather.com.cn/data/sk/101010100.html
3. 点击Send按钮，这时就可以在下部的窗格中看到来自服务器的json响应数据。

## 3、实战
http://chanpinxue.cn/archives/4628.html
重点：GET请求可以直接在浏览器上面测试，但是POST请求还是需要使用到postman，这就是为什么postman存在的意义。

- 使用pycharm启动服务，os.popen注释掉前端界面，socketio.run添加host地址为0.0.0.0即可
- 打开postman软件选择POST下拉框
- 输入地址http://127.0.0.1:8001/device_helper/get_supported_versions

## 4、GET和POST两种基本请求方法的区别
相同点：
都向服务器提交数据，并都会从服务器获取数据；

区别：
a. get是下载，post是上传；
b. 传送方式：get通过地址栏传输，post通过报文传输；
c. 传送长度：get有长度限制[受限于URL-(统一资源定位系统）长度]，post无；所以get不安全，因为URL是可见的，存在隐私泄露，如密码等；post比get安全性高；
d. get传输数据量小，post传输可以传输大量的数据；
e. get产生一个 TCP 数据包，post产生两个 TCP 数据包；
对于get方式的请求，浏览器会把 http header和data一并发出去，服务器响应200（返回数据）；
post,浏览器先发送header，服务器响应100 continue，浏览器再发送data,服务器再发送data,服务器响应200 ok(返回数据)；
（在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有很大的优点）。

https://www.cnblogs.com/logsharing/p/8448446.html

- 最直观的区别就是GET把参数包含在URL中，POST通过request body传递参数。
- GET和POST还有一个重大区别，简单的说：GET产生一个TCP数据包；POST产生两个TCP数据包。

在我大万维网世界中，TCP就像汽车，我们用TCP来运输数据，它很可靠，从来不会发生丢件少件的现象。但是如果路上跑的全是看起来一模一样的汽车，那这个世界看起来是一团混乱，送急件的汽车可能被前面满载货物的汽车拦堵在路上，整个交通系统一定会瘫痪。为了避免这种情况发生，交通规则HTTP诞生了。HTTP给汽车运输设定了好几个服务类别，有GET, POST, PUT, DELETE等等，HTTP规定，当执行GET请求的时候，要给汽车贴上GET的标签（设置method为GET），而且要求把传送的数据放在车顶上（url中）以方便记录。如果是POST请求，就要在车上贴上POST的标签，并把货物放在车厢里。当然，你也可以在GET的时候往车厢内偷偷藏点货物，但是这是很不光彩；也可以在POST的时候在车顶上也放一些数据，让人觉得傻乎乎的。HTTP只是个行为准则，而TCP才是GET和POST怎么实现的基本。

https://baijiahao.baidu.com/s?id=1761298730953726989&wfr=spider&for=pc
GET和POST是两种最基本的HTTP请求方法。HTTP是超文本传输协议，用于在Web浏览器和Web服务器之间传输数据。HTTP请求方法定义了Web浏览器如何向Web服务器发送请求。GET和POST是最常用的HTTP请求方法之一。

GET方法用于从Web服务器请求数据。在使用GET方法时，浏览器向Web服务器发送一个请求，Web服务器将响应数据发送回浏览器。GET方法是无状态的，也就是说每个请求都是独立的，没有前后关系。GET方法通常用于请求静态数据，如HTML页面、图片和CSS文件等。
POST方法用于向Web服务器提交数据。在使用POST方法时，浏览器将数据打包并发送到Web服务器。Web服务器收到数据后，可以根据数据执行相应的操作，并向浏览器发送响应。POST方法是有状态的，也就是说请求和响应之间存在关系，请求和响应之间的数据可以互相传递。POST方法通常用于向Web服务器提交表单数据和上传文件等操作。













