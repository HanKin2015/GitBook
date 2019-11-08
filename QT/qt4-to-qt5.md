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



# 安装QT需要c++编译环境

# QT5.9.5使用MSVC(VS2017)编译器开发环境搭建 https://jingyan.baidu.com/article/e2284b2b9b9525e2e6118d02.html 

 qt是一个库虽然早就脱离了纯[GUI库](https://www.baidu.com/s?wd=GUI库&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的范畴，使用qmake/moc预处理以生成标准C++代码。但是他不是一个编译器，也不自带编译器，但是可分发版本是按照不同编译器编译的，毕竟C++的符号修饰方法并不是标准所强行规定的，因此C++ dll是不能跨编译器使用的，所以一般我们写dll的时候都要不会导出类，而是纯C类型的导出。
想用qtcreator的话，必须要有自己的编译环境的，无论是vs还是mingw都必须有其一，同时要求qt版本和编译器环境对应。 



 Qt是一整套c++语言编写的SDK。在windows平台是可以选择使用vs编译还是mingw编译成为目标库。你下载的这个bin release版本是使用vs2013编译环境创建的。所以标注名称会注明vs2013. 如果是mingw编译的或者说使用mingw作为编译器的你不能混用 



QT5.8.0+MSVC2015安装以及环境配置（不需要安装VS2015）]( https://blog.csdn.net/snow_rain_1314/article/details/82929322 )

可以不完全安装vs，只使用其中的c++环境即可



#  **Microsoft visual studio 2015的安装文件里为什么找不到vcvarsall.bat** 

安装了VS，但是在at creator里面还是找不到vs编译器，纠结万分，发现vc目录下没有这个文件，然后百度。

如果你在安装VS2015时选择了默认安装方式，将不具备Visual C++，那么，首先打开软件，然后点击新建项目，选择Visual C++； 出现两个安装选项（），选择其中一个安装； 安装完成重新启动VS。修复安装即可。



# qt designer

 Qt Creator 和 Qt Designer 是两个独立的程序。Qt Creator 包含Qt Designer的全部功能，所以，有了Qt Creator，就没必要再用Qt Designer了。

至于默认是不是灰色的，应该没有任何影响吧。只要你创建或打开 .ui 文件，会自动进入design 模式 

