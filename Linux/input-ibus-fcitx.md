
# 输入法

[https://wiki.archlinux.org/index.php/IBus_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)](https://wiki.archlinux.org/index.php/IBus_(简体中文)) 

 [https://wiki.archlinux.org/index.php/Fcitx_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)](https://wiki.archlinux.org/index.php/Fcitx_(简体中文)) 

很搞笑：类后面加双冒号，然后加一个类名，这是 类中嵌套类。



# qt置顶

```
void CWidget::activateWindow()  
{  
    Qt::WindowStates winStatus = Qt::WindowNoState;  
    if (windowState() & Qt::WindowMaximized)  
    {  
        winStatus = Qt::WindowMaximized;  
    }  
    setWindowState(Qt::WindowMinimized);  
    setWindowState(Qt::WindowActive | winStatus);  
    setGeometry(curGemRect);  
    activateWindow();  
    raise();  
}  


通过在窗体处理函数中调用上述函数，就可以将该窗体设为顶层窗体，其中，CWidget派生自QWidget（当然其他窗体也行，只要窗体的最终父类是QWidget就行），curGemRect是CWidget的成员变量，用来保存窗体的几何位置，这样就能记住窗体上一次弹出的位置，不过还要重载两个函数，resizeEvent和moveEvent，以保证窗体大小和位置改变后能时刻记住其位置。

[cpp] view plain copy
 
 在CODE上查看代码片派生到我的代码片
voidCWidget::resizeEvent(QResizeEvent*event)  
{  
    curGemRect = geometry();  
}  
  
void CWidget::moveEvent(QMoveEvent *event)  
{  
    curGemRect = geometry();  
}   
```



要调用类成员函数，你需要先生成一个类的对象，比如有个类： class Student { public sayHello{printf("hello!\n");}};

1. Studen stu; 
2. stu.sayHello();

或者

1. Student *pStu=new Student;
2. pStu->sayHello();



如果类的成员函数是[静态函数](https://www.baidu.com/s?wd=静态函数&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)，那么不需要生成[类对象](https://www.baidu.com/s?wd=类对象&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)，可以直接调用： Student::sayHello();



 x11库，raise函数 

# [Cookie文件格式](https://www.cnblogs.com/qguohog/archive/2012/11/13/2768131.html)

Cookie文件的格式

　　IE的Cookie文件实际上就是一个txt文本文件，只不过换行符标记为Unix换行标记（0x0A），由于记事本对Unix换行标记不兼容，打开后内容全在一行看起来不方便，我们可以用EditPlus或UltraEdit-32打开，打开之后，会看到形式如下的内容：
name
value
domain/
1600
1263382784
30020896
452781968
30020892
*
每一行的内容说明：

英文说明：
Line Summary
1 The Variable Name
2 The Value for the Variable
3 The Website of the Cookie’s Owner
4 Optional Flags
5 The Most Significant Integer for Expired Time, in FILETIME Format
6 The Least Significant Integer for Expired Time, in FILETIME Format
7 The Most Significant Integer for Creation Time, in FILETIME Format
8 The Least Significant Integer for Creation Time, in FILETIME Format
9 The Cookie Record Delimiter (a * character)

中文说明：
第一行　Cookie变量名
第二行　Cookie变量值
第三行　该Cookie变量所属域，形如csdn.net/、blog.csdn.net/或blog.csdn.net/lixianlin/
第四行　可选标志（cooke是否加密？）
第五行　该Cookie过期时间（FILETIME格式）的高位整数
第六行　该Cookie过期时间（FILETIME格式）的低位整数
第七行　该Cookie创建时间（FILETIME格式）的高位整数
第八行　该Cookie创建时间（FILETIME格式）的低位整数
第九行　Cookie记录分隔符（为一个星号* ）



位置：





**QIODevice**做为QLocalSocket的父类

在Qt中，提供了多种IPC方法。看起来好像和Socket搭上点边，**实则底层是windows的name pipe**。这应该是支持双工通信的

QLocalServer提供了一种基于本地套接字的服务器，实现了接收本地socket的连接的功能。

通过调用listen()监听特定的连接，每次与client连接上时发出**newConnection()**信号。

通过调用nextPendingConnection()响应一个等待中的连接请求，返回一个指针，指向用于与client建立通信的QLocalSocket。

当连接发生错误时，serverError() 返回错误的类型，通过调用errorString()可以获取错误描述。

监听过程中，serverName()可获取当前服务器的名称。

调用close()停止对连接请求的监听。

虽然QLocalServer是为在事件循环中使用而设计出来的，但是在没有事件循环时也是可以使用的。

没有事件循环时，你必须使用**waitForNewConnection()**，它只在以下两种情况下解除阻塞：1）有可用的连接；2）超时。

# git 放弃本地修改

 pkg文件也就是安装包配置文件，是制作[Symbian OS](https://baike.baidu.com/item/Symbian OS)[安装程序](https://baike.baidu.com/item/安装程序/3765365)的核心部分。 







# 认识ibus和fcitx

 [中文输入法](https://wiki.ubuntu.org.cn/中文输入法) 

## fcitx

fcitx 在中文环境下安装一般不会有什么问题（LC_CTYPE=zh_CN.UTF-8）. 在英文环境（LC_CTYPE=en_US.UTF-8）下安装，可按如下配置：

\> sudo apt-get install fcitx-pinyin im-switch

\> im-switch -s fcitx -z all_ALL

修改/etc/X11/xinit/xinput.d/fcitx，为：

XIM=fcitx
XIM_PROGRAM=/usr/bin/fcitx
XIM_ARGS=""
GTK_IM_MODULE=fcitx
QT4_IM_MODULE=fcitx
DEPENDS="fcitx"

在以上配置下，通常不会有什么问题了。但偶尔在GTK程序中会出现不能切换出fcitx的情况，此时需要配置 gtk.immodules，immodules.cache 这两个文件。



```
-c              inactivate input method
-o              activate input method
-r              reload fcitx config
-t,-T           switch Active/Inactive
-e              Ask fcitx to exit
-a              print fcitx's dbus address
-m <imname>     print corresponding addon name for im
-s <imname>     switch to the input method uniquely identified by <imname>
[no option]     display fcitx state, 0 for close, 1 for inactive, 2 for acitve
-h              display this help and exit

fcitx -h
fcitx-remote  查看输入法状态，0表示没有输入框，1表示英文，2表示中文
fcitx-remote -c   英文（即关闭输入法）
fcitx-remote -t   切换输入法
```

# ibus

IBus（英文全称为Intelligent Input Bus），是[GNU/Linux](https://baike.baidu.com/item/GNU%2FLinux)和[类UNIX](https://baike.baidu.com/item/类UNIX)操作系统下的以[GPL](https://baike.baidu.com/item/GPL)协议分发源代码的[开源](https://baike.baidu.com/item/开源)免费多语言输入法框架。

用了总线（Bus）式的架构，所以命名为Bus。IBus支持多种输入法，如拼音输入法（包括全/简/双拼），并支持基于码表的输入法，如[五笔](https://baike.baidu.com/item/五笔)[郑码](https://baike.baidu.com/item/郑码)[二笔](https://baike.baidu.com/item/二笔)[仓颉](https://baike.baidu.com/item/仓颉)[GNU/Linux](https://baike.baidu.com/item/GNU%2FLinux)[Debian](https://baike.baidu.com/item/Debian)[RedHat](https://baike.baidu.com/item/RedHat)。

 IBus 全称 Intelligent Input Bus是下一代输入法框架（或者说“平台”）。 项目现托管于 Google Code - https://code.google.com/p/ibus/ 此项目包含了世界多数语言的文字输入需求——由世界多个国家开发者维护。 

安装ibus框架：sudo apt-get install ibus ibus-clutter ibus-gtk ibus-gtk3 ibus-qt4

```
ibus-setup   设置
ibus help
ibus engine  获取当前的输入法
ibus-daemon -drx   找回消失的IBus图标，相当于重启
ibus restart	   重启会回到英文原始的状态
ibus list-engine   显示所有输入法
```

PS：好奇怪啊，root用户没法连接IBus，普通用户可以。。。。所以使用的时候需要使用普通用户权限。

还有就是xshell连接是没法进行操作的，不管是不是普通用户。

注意：Linux并不是所有快捷键切换输入法一样，个人爱好设置。

- Control
- Alt
- Shift
- Meta
- Super（win键）
- Hyper
- Release

[Ubuntu 16.04安装iBus中文输入法pinyin及问题]( https://blog.csdn.net/suifenghahahaha/article/details/78723733 )

- apt install ibus-pinyin
- ibus-setup

## im-switch

-bash: im-switch: command not found

资料还很少。。。。

 im-switch 提供一个在 X 窗口系统中配置和切换输入法的框架，可以随本地化设置的不同 而改变。 这个输入法是中文、日文和韩文(CJK)输入非 ASCII 本国字符的基本机制。 

我发现x11编程相关资料就很少。







在ssh协议中，采用一种非对称加密的方式保障通信安全，即a，b通过tcp建立连接后，b生成一对公私钥并将公钥发送给a，a再将密钥用b的公钥发送给a，后续通信便使用密钥加密。
在https协议中，有证书(ca:包含公钥及其他一些信息)这种存在。即在http的基础上加入ssl层，使数据在传输过程中加密，证书就是这个过程的一个认证官。
常见公钥后缀：pem crt key
常见私钥后缀：pfx p12 pem key

```
cer后缀的证书文件有两种编码-->DER二进制编码或者BASE64编码(也就是.pem)
.cer/.crt是用于存放证书，它是2进制形式存放的，不含私钥。
.pem跟crt/cer的区别是它以Ascii来表示。


p7b一般是证书链，里面包括1到多个证书
pfx是指以pkcs#12格式存储的证书和相应私钥。

pfx/p12用于存放个人证书/私钥，他通常包含保护密码，2进制方式

Apache、Nginx环境下：
公钥：.KEY
私钥：.KEY
证书：.CRT或者.PEM（两者都可以）
概括：无论是根证书还是证书后缀都是.CRT。
IIS环境：.pfx
JKS环境：.JKS
概括：IIS或者JKS安装证书有对应格式文件需要向Gworg机构索取：网页链接


Linux 下的工具们通常使用 base64 编码的文本格式，相关常用后缀如下：
* 证书：.crt, .pem
* 私钥：.key
* 证书请求：.csr
.cer 好像是二进制的证书。当然你也可以把证书和 key 放到同一个文件里边。这时候扩展名通常叫 .pem。Java 的 keystore 什么的都是二进制的，好像是自有格式。
其实在类 UNIX 系统上，关注文件名后缀的程序并不多的。而证书、密钥都是有明显的标识的，所以相关软件（如 openssl）可以处理，而不管你用的什么扩展名。当然乱用扩展名自己识别不便，桌面环境也不能将扩展名与默认操作、图标关联起来。
```



















