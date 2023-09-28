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
GET请求可以直接在浏览器上面测试，但是POST请求还是需要使用到postman。

## 4、Html中Post和Get的区别：
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













