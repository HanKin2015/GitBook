# QT入门学习

# 1、QT的安装

## 1-1、QT MSVC和MinGW版本的区别

Qt 5.9 之后的安装包与之前相比，不再区分 VC 版本和 MinGW 版本，而是全都整合到了一个安装包中。因此，与之前的安装包相比，体积也是大了不少。

他们都是很好用的编译工具，但是他们兼容的并不好。当你的项目使用MinGW编译的使用，想要用一个MSVC编译生成的库时就会有问题。使用MinGW编译项目的时候，所使用的Lib也要是MinGW编译的。如果你只是开发Window平台的软件时，最好用Qt MSVC组合，这样可以使用大量的第三方lib，还有很多的构建指令，毕竟window上MSVC才是王道。
编码的问题，QT5的Qstring默认是UTF8格式，QT5极力推介把源码用UTF8格式存储。 但是MSVC只支持带BOM的UTF8格式，qmake不支持带BOM的UTF8格式，逼我只能用GBK么。这样的话，用qt5，每次都要Qstring::fromLocal8bit(“我是中国人”)；况且就算BOM问题解决了，源代码是UTF8了。MSVC的执行编码也是GBK。这个问题这里有一些探讨。
————————————————
版权声明：本文为CSDN博主「16ern」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u013185164/article/details/48160561/

Qt 中有两种方式编译：一种是MinGW ，另一种MSVC，是两种不同的编译器。

1、MSVC是指微软的VC编译器

2、MingGW是指是Minimalist GNU on Windows的缩写。它是一个可自由使用和自由发布的Windows特定头文件和使用GNU工具集导入库的集合，允许你     在GNU/Linux和Windows平台生成本地的Windows程序而不需要第三方运行时库。



#　注意

MinGW版本的QT需要使用MinGW版本的gcc编译，默认是使用ms编译器。（lib里文件会是prl）

还要注意x86和arm架构的不同。

