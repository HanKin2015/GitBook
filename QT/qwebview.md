[TOC]
# QT之Qwebview

# 1、QNetworkReply Class

 https://doc.qt.io/qt-5/qnetworkreply.html#NetworkError-enum 

获取网页http返回值。

QNetworkRequest Class]( https://doc.qt.io/qt-5.9/qnetworkrequest.html )

# 2、Qt 之处理 QNetworkAccessManager 网络连接超时

 https://blog.csdn.net/liang19890820/article/details/53204396 

其实QNetworkReply里面有超时设置，不过没有花时间去找时间设置。

# 3、qt发送https请，状态码为0

花了接近一天无法解决。

最后发现QNetworkReply和http状态码是分开的，先让QNetworkReply等于noerror才能去获取http状态码，后面也确实看见了302码，而不仅仅是200。

- 404 **Not Found** 
- 200 **OK** 
- 302 **Found** 
- 408 **Request Time-out** 



# 4、QAxWidget Class

 https://doc.qt.io/archives/qt-5.11/qaxwidget.html 

# 5、进度条

[有关浏览器编程]( https://wenku.baidu.com/view/002c5e74551810a6f52486c5.html )

 https://www.cnblogs.com/MingZznet/p/3225328.html 

完全可以在qt creator里查看到qwebview里面定义的函数，就可以找到loadStarted等函数，但是qt安装好像出于保护却无法找到.cpp文件。

QProgressBar Class]( https://doc.qt.io/archives/qt-4.8/qprogressbar.html )

[QWebView实现浏览器的框架]( https://blog.csdn.net/hpu11/article/details/79621522 )

 https://blog.csdn.net/naibozhuan3744/article/details/80799842 

## 颜色设计

```
QProgressBar {
	/* 外边框 */
	border:2px solid red;
	
	/* 倒角 */
	border-radius:5px;
	
	/* 字体对齐方式 */
	text-align:center;
}

/* 进度条 */
QProgressBar::chunk {
	/* 颜色 */
	background-color:#05B8CC;
	
	/* 步进距离 */
	width:5px;
	
	/* 进度条中间空白区域宽度 */
	margin:1px;
}
```



# 6、无法打开https网页，报错需要openssl

把 qt-create中的 ssleay32.dll 和 libeay32.dll 复制到 qt sdk的 bin目录下面

盒子已经安装openssl，没有问题

首页不能使用https网址打开，会报[SSL, Handshake failed](

# 7、Qt实现简单的显示网页（QtWebkit、QtWebEngine、QAxWidget）

 https://blog.csdn.net/qq_36651243/article/details/93173395 



# 8、调试窗口

QWebSettings *settings = ui->webView->settings();
settings->setAttribute(QWebSettings::DeveloperExtrasEnabled, true);
QWebInspector *inspector = new QWebInspector(this);
inspector->setWindowFlags(Qt::WindowStaysOnTopHint | Qt::Dialog);
inspector->setMinimumSize(800, 800);
inspector->setPage(ui->webView->page());
inspector->show()
————————————————
版权声明：本文为CSDN博主「Robinson-sir」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zbc415766331/article/details/81173672



# 9、Qt窗体设置

Qt窗体设置Qt::WA_TranslucentBackground



# 10、vs2015安装时提示“安装包丢失或损坏”解决办法

# 11、Electron使用快速入门

 https://baijiahao.baidu.com/s?id=1622258269985547290&wfr=spider&for=pc 

 https://cloud.tencent.com/developer/doc/1070 

跨越平台桌面应用开发框架electron使用的心路历程

请问一下，跨平台解决方案中，Qt 和 Electron 孰优孰劣？]( https://www.zhihu.com/question/53230344 )

# 12、总结

 https://www.jianshu.com/p/5680fe783832 