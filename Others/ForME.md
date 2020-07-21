[TOC]

[全国组织机构统一社会信用代码公示查询平台](https://www.cods.org.cn/)


- 总是忘记，时刻提醒自己！
- 命名风格应该细化到函数里（不要着眼于整个文件）
- 不要沉迷游戏
- 懒
- 

# 1、自带错误

printf("err=%u, %s", errno, strerror(errno));

返回只类型为void的linux函数一般不会出错

但当一个函数出错时，errno（一个int型变量，用errno时，程序必须包含errno.h头文件）会随之改变，不同的值代表了不同的错误

所以直接用这个变量表示错误非常的不方便，所以每次想知道出现了什么错误，必须回到errno.h中察看宏定义

所以有以下几种方式来获得详细的错误信息：

\1. void perror(const char *s);

函数说明，函数的头文件是stdio.h

这个函数将上一个函数发生的错误输出到标准错误（stderr），参数s所指的参数先输出来（该参数与错误无关，可以自己任意添加），之后再输出错误原因（字符串），此原因依照errno的值来输出错误信息

2.char * strerror（int errnum）；

函数说明：函数的头文件是string.h

参数一般为errno，可以把errno对应的数值转化成对应的错误信息（字符串）

3.printf（“%m"，errno）；

也可以直接用printf("%m\n");

这个用法也直接输出上一个函数的错误信息，第二个参数可以不要


这三个错误信息一块用的时候，请注意他们的顺序，要不有的函数可能因为上一个错误输出函数的影响，输出不了错误信息

 

注意：不能用errno判断刚才的操作是否出错，只能是当错误发生时，用errno来获取错误的信息

并不是所有的函数的错误信息都存储在errno中：

例如函数：struct hostent* gethostbyname（const char* name）；它的错误信息保存在h_errno中

# 2、学习资料

块设备是i/o设备中的一类，是将信息存储在固定大小的块中，每个块都有自己的地址，还可以在设备的任意位置读取一定长度的数据，例如硬盘,U盘，SD卡等。

[金步国作品集](http://www.jinbuguo.com/)





datafountain网站注册：微信号

flyai.com网站注册

好好学习正则表达式，顺便再次深入了解模式匹配，KMP，自动机



mii-tool和ethtool工具很少见啊。

```
应用检测网口是否插入网线。
```

## MII（媒体独立接口）

MII即媒体独立接口，也叫[介质](https://baike.baidu.com/item/介质/5419484)无关接口。它是IEEE-802.3定义的以太网行业标准。它包括一个[数据接口](https://baike.baidu.com/item/数据接口/6659495)，以及一个MAC和PHY之间的管理接口(图1)。数据接口包括分别用于发送器和接收器的两条独立信道。每条信道都有自己的数据、时钟和控制信号。MII数据接口总共需16个信号。管理接口是个双信号接口：一个是时钟信号，另一个是数据信号。通过管理接口，上层能监视和控制PHY。

https://sites.uclouvain.be/SystInfo/usr/include/linux/mii.h.html

## 小海龟git如何在文件夹显示改动

安装后可能没有生效，建议重启电脑。

## qwebview边框border

似乎也设置不了它的边框，最后是在父窗口加入边框，qwebview缩小窗体大小。

QMessageBox mybox = new QMessageBox();

mybox->exec();

需要执行完后才能进行后面的事情。



# [10个非常有趣的Linux命令](https://www.cnblogs.com/1394htw/p/6358737.html)

还找到了另一个命令：linuxlogo

$linuxlogo -L ubuntu  与  $linuxlogo 显示了两幅不同的画面，感觉挺有意思的。

好奇心试了一下 $linuxlogo -L ubun 显示了另外一幅。

于是简单百度了一下，发现了各类彩蛋。

# 40个超有趣的Linux命令行彩蛋和游戏（https://www.jianshu.com/p/dd24e4227deb）

https://blog.csdn.net/zhongbeida_xue/article/details/78820731

https://www.cnblogs.com/sukai/archive/2013/06/08/3127031.html







# 简历
qq邮箱：hejian0616@qq.com（1058198502@qq.com）
备用qq：1429291381
163邮箱：18712779076@163.com
手机号码：18712779076（河北秦皇岛）


















