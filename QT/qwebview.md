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
```
QWebSettings *settings = ui->webView->settings();
settings->setAttribute(QWebSettings::DeveloperExtrasEnabled, true);
QWebInspector *inspector = new QWebInspector(this);
inspector->setWindowFlags(Qt::WindowStaysOnTopHint | Qt::Dialog);
inspector->setMinimumSize(800, 800);
inspector->setPage(ui->webView->page());
inspector->show()
```

# 9、Qt窗体设置
Qt窗体设置Qt::WA_TranslucentBackground

# 10、vs2015安装时提示“安装包丢失或损坏”解决办法
https://blog.csdn.net/qq_19307465/article/details/87869639

# 11、总结
https://www.jianshu.com/p/5680fe783832 

# QT之Qurl

我就仅仅想打开一个网页。

## 1、查询资料
 **分析：**在qt中实现web显示，根据qt的版本和对应编译器的版本，有如下选择：
(1)5.6以下的版本，基于QtWebkit。但Qt5.6以后，移除了QtWebkit这个组件。
(2)5.6以上的MSVC版本，移除了QtWebkit 模块，可采用基于 Chromium 的浏览器引擎 Qt WebEngine
(3)5.6以上的mingw 版本，由于移除了QtWebkit，mingw版本不能使用QtWebEngine，只能采用QAxWidget 控件 

5.9及以上版本是进行了整合，软件包会很大。

我的版本是4.8.7和5.2.1。
https://blog.csdn.net/qq_36651243/article/details/93173395 

Qt 5.4的重要更改是引入了Qt WebEngine，QtWebkit将不再更新，转而使用Qt WebEngine替代。 
https://blog.csdn.net/qq_24571549/article/details/62893925?utm_source=blogxgwz4 

## 2、QtWebKit
```
#include <QtWebKitWidgets/QWebView>
#include <QWebView>

//#pragma comment(lib,"Qt5WebKitWidgets.lib")

QWebView *view = new QWebView(this);
view->load(QUrl("https://www.baidu.com"));
view->show();
```

QT 4.4 以上（QT5.0以下）需要用这种形式使用QtWebKit下面的类：
```
> \#include <QtWebKit/QWebView>
> \#include <QtWebKit/QWebPage>
> \#include <QtWebKit/QWebPage>
> \#include <QtWebKit/QWebFrame>
```

Qt5.0开始使用QWebView控件，按以下方法试试
```
*.pro 加上 QT+= webkitwidgets
*.cpp 加上 #include <QtWebKitWidgets/QWebView>
```

# qt自带，调用本地的浏览器打开网页
```
#include <QDesktopServices>
QDesktopServices::openUrl(QUrl(QLatin1String("https://www.baidu.com")));
```

## 3、Qt WebEngine
qt5.2.1无法默认使用，没有头文件。
```
工程文件里面包含： QT += webenginewidgets 
#include <QWebEngineView>通过QWebEngineView这个控件去显示url。

QWebEngineView  *myWeb = new QWebEngineView(this);
myweb->setUrl(QUrl("https://www.baidu.com/"));
```

## 4、QAxWidget
qt5.2.1无法默认使用，没有头文件。
工程文件里添加 QT += axcontainer
#include <QAxWidget>

## 5、解决 Project ERROR: Unknown module(s) in QT: webengine 办法

# Installing Qt for X11 Platforms https://doc.qt.io/archives/qt-4.8/index.html 

1、直接去掉系统提供的窗口边框，不能移动和改变窗口的大小。
setWindowFlags(Qt::FramelessWindowHint）；
1
Qt::FramelessWindowHint： Produces a borderless window. The user cannot move or resize a borderless window via the window system. On X11, the result of the flag is dependent on the window manager and its ability to understand Motif and/or NETWM hints. Most existing modern window managers can handle this.

2、如果隐藏边框后还想要把该界面至于其他界面的顶层，可以使用以下代码：
this->setWindowFlags(Qt::X11BypassWindowManagerHint | Qt::WindowStaysOnTopHint | Qt::FramelessWindowHint);

3、隐藏任务栏中的图标：
this->setWindowFlags(Qt::Tool);

# [Qt::WindowFlags枚举类型（Qt::Widget是独立窗口和子窗口两用的，Qt::Window会有标题栏）](https://www.cnblogs.com/findumars/p/8035463.html)

- - **Qt::Widget :** QWidget构造函数的默认值，如新的窗口部件没有父窗口部件，则它是一个独立的窗口，否则就是一个子窗口部件。
  - **Qt::Window :** 无论是否有父窗口部件，新窗口部件都是一个窗口，通常有一个窗口边框和一个标题栏。
  - **Qt::Dialog :** 新窗口部件是一个对话框
  - **Qt::Sheet :** 新窗口部件是一个Macintosh表单。
  - **Qt::Drawer :** 新窗口部件是一个Macintosh抽屉。
  - **Qt::Popup :** 新窗口部件是一个弹出式顶层窗口。
  - **Qt::Tool :** 新窗口部件是一个工具窗口，它通常是一个用于显示工具按钮的小窗 
    口，如果一个工具窗口有父窗口部件，则它将显示在父窗口部件的上面，否则，将相当于使用了Qt::WindowStaysOnTopHint展示。
  - **Qt::Tooltip :** 新窗口部件是一个提示窗口，没有标题栏和窗口边框.
  - **Qt::SplashScreen :** 新窗口部件是一个欢迎窗口，它是QSplashScreen构造函数的默认值。
  - **Qt::Desktop :** 新窗口部件是桌面，它是QDesktopWidget构造函数的默认值。
  - **Qt::SubWindow :** 新窗口部件是一个子窗口，而无论该窗口部件是否有父窗口部件。
  - **Qt::X11BypassWindowManagerHint :** 完全忽视窗口管理器，它的作用是产生一个根本不被管理器的无窗口边框的窗口，此时，用户无法使用键盘进行输入，除非手动调用QWidget::ActivateWindow()函数。
  - **Qt::FramelessWindowHint :** 产生一个无窗口边框的窗口，此时用户无法移动该窗口和改变它的大小。
  - **Qt::CustomizeWindowHint :** 关闭默认的窗口标题提示。

http://blog.csdn.net/ly305750665/article/details/77937997


https://www.cnblogs.com/nanqiang/p/10455318.html 

# qt.network.ssl: QSslSocket: cannot call unresolved function SSLv23_client_method
差两个dll文件，可以安装openssl软件

 在[计算机网络](https://baike.baidu.com/item/计算机网络)上，**OpenSSL**是一个[开放源代码](https://baike.baidu.com/item/开放源代码)的[软件](https://baike.baidu.com/item/软件)[库](https://baike.baidu.com/item/库)包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连接者的身份。这个包广泛被应用在互联网的网页服务器上。 

https://blog.csdn.net/sean_8180/article/details/81634425 
 
## 解决url中空格和加号问题
https://bugreports.qt.io/browse/QTBUG-31660
https://codereview.qt-project.org/c/qt/qtbase/+/60266/
http://www.voidcn.com/article/p-mqihrvse-bur.html
https://blog.csdn.net/weixin_34415923/article/details/90525151

处理空格和加号 (“+”)
空格应该被编码成加号 ("+")，而如果字符本身就是加号 ("+")，则应该被编码成百分比编码格式 (%2B)然而，互联网规范管理 URL 不认为空格和加号字符等价。

由于这样，QUrlQuery 不会将空格字符编码为 "+"，也不会将 "+" 解码为一个空格字符。相反，空格字符将在编码形式中呈现 "%20"。

为了支持这样的 HTML 表单编码，QUrlQuery 既不会将 "%2B" 序列解码为一个加号，也不会编码一个加号。事实上，任何键、值、查询字符串中的 "%2B" 或 "+" 序列完全像写的一样 （除了 "%2b" 到 "%2B" 大写转换）。
 
 解决不了：在源头进行处理。
 这种编码方式很恼火，如果本身就是加号怎么办？翻译成空格？
 
 
 
 
 
 
 
 
 
 