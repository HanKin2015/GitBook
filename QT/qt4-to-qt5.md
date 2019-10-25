# 焦点问题 

Qt::WA_X11DoNotAcceptFocus 

 在不需要获取到焦点的窗口中setAttribute(Qt::WA_ShowWithoutActivating,true);就可以了！！！ 

# QML

QML是一种描述性的脚本语言，文件格式以.qml结尾。语法格式非常像CSS（参考后文具体例子），但又支持javascript形式的编程控制。QtDesigner可以设计出·ui界面文件，但是不支持和Qt原生C++代码的交互。QtScript可以和Qt原生代码进行交互，但是有一个缺点，如果要在脚本中创建一个继承于QObject的图形对象非常不方便，只能在Qt代码中创建图形对象，然后从QtScript中进行访问。而QML可以在脚本里创建图形对象，并且支持各种图形特效，以及[状态机](https://baike.baidu.com/item/状态机/6548513)等，同时又能跟Qt写的C++代码进行方便的交互，使用起来非常方便。

# 怎样将Qt4程序迁移到Qt5



 http://download.qt.io/archive/qt/ 

 http://download.qt.io/archive/qtcreator/ 

# 有哪些适合大学生浏览的网站？ https://www.zhihu.com/question/20136746/answer/830833678 

Summary:

# Only use X11BypassWindowManagerHint flag on platform X11