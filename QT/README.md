# QT入门学习

http://download.qt.io/archive/qt

# 1、QT的安装

## 1-1、QT MSVC和MinGW版本的区别

Qt 5.9 及之后的安装包与之前相比，不再区分 VC 版本和 MinGW 版本，而是全都整合到了一个安装包中。因此，与之前的安装包相比，体积也是大了不少。

他们都是很好用的编译工具，但是他们兼容的并不好。当你的项目使用MinGW编译的使用，想要用一个MSVC编译生成的库时就会有问题。使用MinGW编译项目的时候，所使用的Lib也要是MinGW编译的。如果你只是开发Window平台的软件时，最好用Qt MSVC组合，这样可以使用大量的第三方lib，还有很多的构建指令，毕竟window上MSVC才是王道。
编码的问题，QT5的Qstring默认是UTF8格式，QT5极力推介把源码用UTF8格式存储。 但是MSVC只支持带BOM的UTF8格式，qmake不支持带BOM的UTF8格式，逼我只能用GBK么。这样的话，用qt5，每次都要Qstring::fromLocal8bit(“我是中国人”)；况且就算BOM问题解决了，源代码是UTF8了。MSVC的执行编码也是GBK。这个问题这里有一些探讨。

Qt 中有两种方式编译：一种是MinGW ，另一种MSVC，是两种不同的编译器。

1、MSVC是指微软的VC编译器

2、MingGW是指是Minimalist GNU on Windows的缩写。它是一个可自由使用和自由发布的Windows特定头文件和使用GNU工具集导入库的集合，允许你     在GNU/Linux和Windows平台生成本地的Windows程序而不需要第三方运行时库。

## 1-2、安装包下载
http://c.biancheng.net/view/3851.html
官网地址：http://download.qt.io/official_releases/qt/5.14/5.14.2/
最新版本只有3种类型：mac\linux\windows


## 20200927安装msvc版本qt以失败告终
MinGW版本可以在qt安装包直接安装所需的编译环境，但是msvc版本不行，必须另外安装vs编译环境。
电脑上安装了vs2015x86版本的软件，无奈qt5.14.2最低要求是vs2015x64版本和vs2017x86_x64版本高了和低了都不行。

## 运行vs2015发现无法创建c++项目
你十有八九是点击了blend for vs2015图标了，我一开始也给整懵逼，怪只怪在win10装好vs2015，快捷访问里只出现一个blend版本的vs，到所有程序里找真正的vs2015入口吧

blend那个是设计UI的。vs在XAML的高级UI设计上功能有缺失，blend多了些东西。

## Qt错误: 程序数据库管理器不匹配 请检查安装
到D:\VisualStudio2015\VC\bin目录下面拷贝mspdbsrv.exe、mspdb140.dll、mspdbcore.dll、mspdbst.dll到D:\VisualStudio2015\Common7\IDE下面，或者到D:\VisualStudio2015\Common7\IDE目录下面拷贝mspdbsrv.exe、mspdb140.dll、mspdbcore.dll、mspdbst.dll到D:\VisualStudio2015\VC\bin下面，总之就是让这两个文件夹中同时含以上四个文件（如下图）。重Qt启即可。

## TLS
安全传输层协议（TLS）用于在两个通信应用程序之间提供保密性和数据完整性。
该协议由两层组成： TLS 记录协议（TLS Record）和 TLS 握手协议（TLS Handshake）。

## 安装msvc版本后kit出现黄色感叹号
鼠标放在上面可以看见提示，根据提示安装相关插件，可能是Windows SDK未安装啥的。




一月：January
二月：February
三月：March
四月：April
五月：May
六月：June
七月：July
八月：August
九月：September
十月：October
十一月：November
十二月：December

[Qt和Flutter哪个开发app更好？](https://www.zhihu.com/question/315473049/answer/1224659723?ivk_sa=1024320u)
