# 20190814入门学习2

https://v.vuevideo.net/share/post/5272267328159358021


感觉git rebase好高级，不是很容易懂得。。。
[git在工作中正确的使用方式----git rebase篇](https://blog.csdn.net/nrsc272420199/article/details/85555911)

[你真的懂git rebase吗？](https://www.jianshu.com/p/6960811ac89c)


# 关于linux下无法用gcc编译c++代码的原因
gcc命令不能和c++的头文件和库联接，所以通常用g++来完成链接。

因此，如果要在代码中使用cin和cout最好使用g++。

LIBS = -std=c++11

gcc *.cpp -lstdc++

gcc非常兼容C++标准 CL可能兼容程度低些


Microsoft:cl最好加-c选项先生成.obj文件，可以在cl中用/I设置include路径（一个路径用一个include）；再调用link生成.exe，这样就可以用/libpath:libpath设置lib路径。因为若是在cl中设了多个库路径且都有空格需要用引号分别标记时，会报错。


GNU: 使用gcc只能编译链接仅包含纯C库（iostream不是）的程序，否则报错,这时需要用g++编译。-llibrary表示添加的库文件，但其中的库要去掉名字前的lib和后缀.a。-Ldir添加lib搜寻路径。-Ldir添加头文件搜寻路径至系统搜寻路径前，可用来隐藏系统头文件。

# CL （编译命令符） 
vc中cl.exe是编译命令，格式为CL [option...] file... [option | file]... [lib...] [@command-file] [/link link-opt...]

和gcc同属于一种编译命令。


# 一般codeblock和dev c++的读者可以去安装路径下找找MinGW文件夹
将vs的cl.exe路径加到环境变量里了，使用会报错找不到mspdb100.dll。

# IMAX
巨幕电影（IMAX，即Image Maximum的缩写）是一种能够放映比传统胶片更大和更高解像度的电影放映系统。整套系统包括以IMAX规格摄制的影片拷贝、放映机、音响系统、银幕等。标准的IMAX银幕为22米宽、16米高，但完全可以在更大的银幕播放，而且迄今为止不断有更大的IMAX银幕出现。
IMAX公司首席执行官理查德·葛尔方认为IMAX不只是个市场品牌，而是通过很多科学、艺术方面的细节造就而成，“我们不是科学家，更像是一个艺术家。”

# 

Corporate Sponsor企业赞助商
inception成立
locale当地，现场
lang language的缩写。。。
module模，组件

subdary新锐无线ap


# AP （无线访问接入点(WirelessAccessPoint)）
无线AP（Access Point）：即无线接入点，它用于无线网络的无线交换机，也是无线网络的核心。无线AP是移动计算机用户进入有线网络的接入点，主要用于宽带家庭、大楼内部以及园区内部，可以覆盖几十米至上百米。无线AP（又称会话点或存取桥接器）是一个包含很广的名称，它不仅包含单纯性无线接入点（无线AP），同样也是无线路由器（含无线网关、无线网桥）等类设备的统称。


# omnipeek
Omnipeek 是出自WildPackets的著名的抓包软件。
其功能与Sniffer Pro有相似之处，但是经过多年的发展，其开发环境已经从VC++转移到了C#平台。
注;WildPackets是一家全球知名的软件公司，公司成立的目标在于针对复杂的网络环境，提供维护、除错及最佳化等工作的方案。而其开发的产品能够提供各个阶段的IT人员很容易就各种异质网络及网络通讯协定，执行管理、监控、分析、除错及最佳化的工作。

以前写的文章跟翔一样？？？？

Electron和NW.js是一个可以使用Web开发技术来开发跨平台的桌面级应用的一个框架，而传统桌面应用开发要求懂高级编程语言以及专门的框架。有了Electron和NW.js，你可以将现有Web开发技术运用到仅仅使用HTML、CSS和JavaScript就能开发的桌面应用中。而且，开发出来的应用还能在Windows、Mac和Linux中工作，显著减少了开发和培训的时间。

这篇教程我们重点讲解下NW.js，NW.js是Intel的工程师写的一个基于node.js和chromium的应用程序运行环境。项目地址是：https://github.com/rogerwang/node-webkit。

使用它的好处：

（1）以网络最流行的技术编写原生应用程序的新方法

（2）基于HTML5, CSS3, JS and WebGL而编写

（3）完全支持nodejs所有api及第三方模块

（4）可以使用DOM直接调用nodejs模块

（5）容易打包和分发

（6）支持运行环境包括32位和64位的Window、Linux和Mac OS

使用方法：

第一步，我们先下载NW的运行环境，官网地址：http://nwjs.io/。

打开后有两个下载项，NORMAL和SDK，分别表示运行时和开发调试环境。这里我们学习使用可以选择下载SDK。

第二步，在开发目录新建一个package.json的全局配置文件。



简单地说，不一样。但还是有相同的地方：nw.js嵌入了node.js。
1、nodejs主要是运行在服务器端，最常用的就是做HTTP服务器，当然你也可以做其他的。
2、nw.js原来叫node-webkit，是一个把nodejs和webkit浏览器整合在一起的项目，主要是写跨平台的客户端应用程序，用HTML+CSS+JS写程序，然后打包运行在nw.js上，程序可以使用本地资源和网络资源，跨平台很方便；Web应用上能用的技术它可以用，不能用的，例如读写本地文件，使用串口等它也能用。只要你的代码没有和操作系统捆绑死，在Windows下使用的程序，弄到Linux上是很方便的——很多时候只是打个包就可以。
3、要说nw.js的不足，首先应该是这东西太大，主程序就5、60M，还要一些其他的弄一起，80M上下，如果写个小程序，真的太臃肿了；其次就是运行速度，和其他Web应用差不多，要速度时真的不行。


1. 硬链接(hard link) ：
在Linux文件系统中，多个文件名指向同一个索引节点（inode）。这种情况文件就称为硬链接。硬链接文件就相当于文件的另外的一个入口。
2.软链接(symbolic link）：
软连接又叫做符号链接，它几乎可以等价于windows下的快捷方式；
软连接知识：
软连接类似window的快捷方式（可以通过readiink查看其指向）
软连接类似一个文本文件，里面存放的是源文件的路径，指向源文件实体
删除源文件，软连接文件依然存在，但是无法访问指向的源文件路径内容了
失效的时候一般是白字红底闪烁提示
执行命令“ln -s 源文件 软连接文件”，即可完成创建软连接（目标不能存在）
软连接和源文件是不同类型的文件，也是不同的文件，inode号也不相同
软连接文件的文件类型为（l），可以用rm命令删除

#define IFHWADDRLEN 6 //6个字节的硬件地址，即MAC

struct ifreq {

 union {

  char ifrn_name[IFNAMESIZ]; //网络接口名称

 } ifr_ifrn;

 union {

  struct sockaddr ifru_addr; //本地IP地址

  struct sockaddr ifru_dstaddr; //目标IP地址

  struct sockaddr ifru_broadaddr; //广播IP地址

  struct sockaddr ifru_netmask; //本地子网掩码地址

  struct sockaddr ifru_hwaddr; //本地MAC地址

  short ifru_flags; //网络接口标记

  int ifru_ivalue; //不同的请求含义不同

  struct ifmap ifru_map; //网卡地址映射

  int ifru_mtu; //最大传输单元

  char ifru_slave[IFNAMSIZ]; //占位符

  char ifru_newname[IFNAMSIZE]; //新名称

  void __user* ifru_data; //用户数据

  struct if_settings ifru_settings; //设备协议设置

 } ifr_ifru;

};




# 符号链接 
符号链接（软链接）是一类特殊的文件， 其包含有一条以绝对路径或者相对路径的形式指向其它文件或者目录的引用。[1] 符号链接最早在4.2BSD版本中出现（1983年）。今天POSIX操作系统标准、大多数类Unix系统、Windows Vista、Windows 7都支持符号链接。Windows 2000与Windows XP在某种程度上也支持符号链接。
符号链接的操作是透明的：对符号链接文件进行读写的程序会表现得直接对目标文件进行操作。某些需要特别处理符号链接的程序（如备份程序）可能会识别并直接对其进行操作。
一个符号链接文件仅包含有一个文本字符串，其被操作系统解释为一条指向另一个文件或者目录的路径。它是一个独立文件，其存在并不依赖于目标文件。如果删除一个符号链接，它指向的目标文件不受影响。如果目标文件被移动、重命名或者删除，任何指向它的符号链接仍然存在，但是它们将会指向一个不复存在的文件。这种情况被有时被称为被遗弃。







sublime配置c/c++环境：
1、环境变量：此时一般可以使用ctrl+B的方法运行，但是无法输入
2、新建编译系统RunInCommand.sublime-build
3、新建快捷键


linux 命令查看png


经验告诉我们：上网环境网速还是杠杆的，下载速度慢是网站的问题，不要怀疑限速。
每天及时清理总结。
办事效率低，不够劳心：小屏幕的显示器明明可以进行调整的，可以放大字体，可以调整分辨率，对比度。。。。一个键调整所有选项：神奇。


# 竹炭包
竹炭包的竹炭是由五年以上毛竹烧制而成。
竹炭包质地坚硬、通气性好、具有良好的吸附甲醛、二氧化硫等有害物质，并能释放天然矿物质，促使植物生长，净化空气。强烈的吸水性可缓解空气中的潮湿因子，除臭防霉。
给爱车这样一个装饰不用放置显眼地方，即可还车子一个健康的内脏，同时还有促进睡眠、解除动脉硬化等状况，对车主本人也百利而无一害的。




# 窗口完整的参考
https://blog.csdn.net/zhangrui_web/article/details/82787337




































