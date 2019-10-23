我就仅仅想打开一个网页。

# 查询资料

 **分析：**在qt中实现web显示，根据qt的版本和对应编译器的版本，有如下选择：
(1)5.6以下的版本，基于QtWebkit
(2)5.6以上的MSVC版本，移除了QtWebkit 模块，可采用基于 Chromium 的浏览器引擎 Qt WebEngine
(3)5.6以上的mingw 版本，没有Qt WebEngine ，只能采用QAxWidget 控件 



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