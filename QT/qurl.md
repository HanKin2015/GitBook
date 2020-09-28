# QT之Qurl

我就仅仅想打开一个网页。

# 查询资料

 **分析：**在qt中实现web显示，根据qt的版本和对应编译器的版本，有如下选择：
(1)5.6以下的版本，基于QtWebkit。但Qt5.6以后，移除了QtWebkit这个组件。
(2)5.6以上的MSVC版本，移除了QtWebkit 模块，可采用基于 Chromium 的浏览器引擎 Qt WebEngine
(3)5.6以上的mingw 版本，由于移除了QtWebkit，mingw版本不能使用QtWebEngine，只能采用QAxWidget 控件 

5.9及以上版本是进行了整合，软件包会很大。

我的版本是4.8.7和5.2.1。

 https://blog.csdn.net/qq_36651243/article/details/93173395 

 Qt 5.4的重要更改是引入了Qt WebEngine，QtWebkit将不再更新，转而使用Qt WebEngine替代。 

 https://blog.csdn.net/qq_24571549/article/details/62893925?utm_source=blogxgwz4 

# QtWebKit

```
#include <QtWebKitWidgets/QWebView>
#include <QWebView>

//#pragma comment(lib,"Qt5WebKitWidgets.lib")

QWebView *view = new QWebView(this);
view->load(QUrl("https://www.baidu.com"));
view->show();
```

QT 4.4 以上（QT5.0以下）需要用这种形式使用QtWebKit下面的类：



> \#include <QtWebKit/QWebView>
> \#include <QtWebKit/QWebPage>
> \#include <QtWebKit/QWebPage>
> \#include <QtWebKit/QWebFrame>

Qt5.0开始使用QWebView控件，按以下方法试试

*.pro 加上 QT+= webkitwidgets

*.cpp 加上 #include <QtWebKitWidgets/QWebView>

# qt自带，调用本地的浏览器打开网页

```
#include <QDesktopServices>

QDesktopServices::openUrl(QUrl(QLatin1String("https://www.baidu.com")));
```

# Qt WebEngine

qt5.2.1无法默认使用，没有头文件。

```
工程文件里面包含： QT += webenginewidgets 
#include <QWebEngineView>通过QWebEngineView这个控件去显示url。

QWebEngineView  *myWeb = new QWebEngineView(this);
myweb->setUrl(QUrl("https://www.baidu.com/"));
```

# QAxWidget

qt5.2.1无法默认使用，没有头文件。

工程文件里添加 QT += axcontainer



#include <QAxWidget>

# 解决 Project ERROR: Unknown module(s) in QT: webengine 办法





月份   英文简写 英文全称

1. 一月   Jan.   January
2. 二月  Feb.   February
3. 三月  Mar.   March
4. 四月  Apr.   April
5. 五月  May.   May
6. 六月  Jun.   June
7. 七月  Jul.    July
8. 八月  Aug.   August
9. 九月  Sept.   September
10. 十月   Oct.    October
11. 十一月 Nov.    November
12. 十二月 Dec.   December

十大音乐播放器 http://www.liulanqi.net/bofangqi/6749.html 

# Installing Qt for X11 Platforms https://doc.qt.io/archives/qt-4.8/index.html 



 You failed to pass our validation. Please use a normal browser or command line to download files. We expect your ip is 175.8.49.106 but we got 175.8.49.79 

实际是172.22.22





1、直接去掉系统提供的窗口边框，不能移动和改变窗口的大小。

setWindowFlags(Qt::FramelessWindowHint）；
1
Qt::FramelessWindowHint： Produces a borderless window. The user cannot move or resize a borderless window via the window system. On X11, the result of the flag is dependent on the window manager and its ability to understand Motif and/or NETWM hints. Most existing modern window managers can handle this.

2、如果隐藏边框后还想要把该界面至于其他界面的顶层，可以使用以下代码：

this->setWindowFlags(Qt::X11BypassWindowManagerHint | Qt::WindowStaysOnTopHint | Qt::FramelessWindowHint);
1
3、隐藏任务栏中的图标：

this->setWindowFlags(Qt::Tool);
————————————————
版权声明：本文为CSDN博主「cs_zyx」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zyx_0604/article/details/70944615





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