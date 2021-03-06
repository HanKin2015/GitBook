# 成长==再出发

## 常识
公积金一年调整一次：7月1日至当年的6月30日。
养老院通常由地方政府或慈善机构主办,；而敬老院是在农村实行“五保”的基础上发展起来的。

## C/C++
stdio.h：标准输入输出
```
int getchar()//从标准输入设备写入一个字符
int putchar()//向标准输出设备读出一个字符
int scanf(char*format[,argument…])//从标准输入设备读入格式化后的数据
int printf(char*format[,argument…])//向标准输出设备输出格式化字符串
char* gets(char*string)//从标准输入设备读入一个字符串
int puts(char*string)//向标准输出设备输出一个字符串
int sprintf(char*string,char*format[,…])//把格式化的数据写入某个字符串缓冲区
```

stdlib.h：standard library标准库头文件
```
stdlib.h里面定义了五种类型、一些宏和通用工具函数。 类型例如size_t、wchar_t、div_t、ldiv_t和lldiv_t； 宏例如EXIT_FAILURE、EXIT_SUCCESS、RAND_MAX和MB_CUR_MAX等等； 常用的函数如malloc()、calloc()、realloc()、free()、system()、atoi()、atol()、rand()、srand()、exit()等等。
```


stdarg.h：让函数能够接收可变参数，可变参数函数的参数数量是可变动的，它使用省略号来忽略之后的参数。
```
POSIX定义所遗留下的头文件varargs.h，它早在C标准化前就已经开始使用了且提供类似stdarg.h的功能。MSDN明确指出这一头文件已经过时，完全被stdarg.h取代。这个头文件不属于ISO C的一部分。文件定义在单一UNIX规范的第二个版本中。

stdarg.h数据类型
va_list 用来保存宏va_arg与宏va_end所需信息

stdarg.h宏
va_start 使va_list指向起始的参数
va_arg 检索参数
va_end 释放va_list
va_copy 拷贝va_list的内容
```
```
#include <stdio.h>
#include <stdarg.h>

/* 输出所有int类型的参数，直到-1结束，结束可以自己指定 */
void printargs(int arg1, ...)
{
    va_list ap;
    int i;
    va_start(ap, arg1);
    for (i = arg1; i != -1; i = va_arg(ap, int)) {
        printf("%d ", i);
    }
    va_end(ap);
    putchar('\n');
}

int main(void)
{
    printargs(5, 2, 14, 84, 97, 15, 24, 48, -1);
    printargs(84, 51, -1);
    printargs(-1);
    printargs(1, -1);
    return 0;
}
```

libusb.h
源文件：http://libusb.sourceforge.net/api-1.0/libusb_8h_source.html
驱动开发向来是内核开发中工作量最多的一块，Linux 平台上的usb驱动开发，主要有内核驱动的开发和基于libusb的无驱设计。



“#ifdef __cplusplus extern "C" { #endif”的定义
有意思：https://www.cnblogs.com/nx520zj/p/5920782.html
```
#ifdef  __cplusplus
extern "C" {
#endif

// 代码

#ifdef  __cplusplus
}
#endif
```



idx===index
中断、等时（同步）、批量、控制传输：control_packet、bulk_packet、iso_packet、interrupt_packet
大数据块(bulk)传输方式，对不能容差的数据进行移动;同步(isochronous，ISO)传输方式，对不允许时延的数据进行移动
back pointer反向指针
interval间隔
pkt===packget
verbose：冗长的
content===ctx
devoce===devoce
descriptor===desc
quirks mode：怪异模式（兼容模式）
pending：待定、吊着
hack for People's Bank of China (PBC) USB Key但是中国人民银行是PBOC
cmp：Certificate Management Protocol 
dmz：隔离区，防火墙中间的区域
cmp===compare
gap：间隔、隔阂
compatible：兼容
mp===multiple多种多样的、倍数

---

errno.h
定义了通过错误码来回报错误资讯的宏

unistd.h
该头文件由 POSIX.1 标准（可移植系统接口）提出，故所有遵循该标准的操作系统和编译器均应提供该头文件（如 Unix 的所有官方版本，包括 Mac OS X、Linux 等）。对于类 Unix 系统，unistd.h 中所定义的接口通常都是大量针对系统调用的封装（英语：wrapper functions），如 fork、pipe 以及各种 I/O 原语（read、write、close 等等）。

inttypes.h
提供整数输入的各种转换宏
举个例子，PRIi8、PRIu8、PRIo8以及PRIx8，其中i为有符号，u为无符号，o为8进制以及x为16进制。
提供各种进制的转换宏
```
#include <stdio.h>
#include <inttypes.h>
 
int main() {
    int a = 5;
    printf("a=%"PRIu64"\n", a);
    return 0;
}
```
静态变量是在堆分配的，而普通变量是在栈上分配的，栈上分配的变量是动态的，可以实现重用，而堆上分配的变量是不能实现重用。还有普通变量可以实现多次初始化，而静态变量只能初始化一次。

[什么是C语言中的静态变量？](https://baijiahao.baidu.com/s?id=1652340168215119087&wfr=spider&for=pc)
静态的意思就是在程序运行的过程中，其内存地址始终不变，可以对其进行连续操作，而动态变量每次使用都会重新进行初始化，无法进行连续操作。
```
void AutoAdd1()
{
	auto int i = 1;
	i++;
	printf("%d\n", i);
}

void AutoAdd2()
{
	static int i = 1;
	i++;
	printf("%d\n", i);
}

int main()
{
	AutoAdd1();	//2
	AutoAdd1();	//2
	
	printf("\n");
	
	AutoAdd2();	//2
	AutoAdd2();	//3
	return 0;
}
```

## C++98 auto
早在C++98标准中就存在了auto关键字，那时的auto用于声明变量为自动变量，自动变量意为拥有自动的生命期，这是多余的，因为就算不使用auto声明，变量依旧拥有自动的生命期：
```
int a =10 ;  //拥有自动生命期
auto int b = 20 ;//拥有自动生命期
static int c = 30 ;//延长了生命期
```

C++98中的auto多余且极少使用，C++11已经删除了这一用法，取而代之的是全新的auto：变量的自动类型推断。

## C++11 auto
auto可以在声明变量的时候根据变量初始值的类型自动为此变量选择匹配的类型，类似的关键字还有decltype。举个例子：
```
    int a = 10;
    auto au_a = a;//自动类型推断，au_a为int类型
    cout << typeid(au_a).name() << endl;
```


typeid操作符
在c++中，typeid用于返回指针或引用所指对象的实际类型。

注意：typeid是操作符，不是函数！
操作符好像可以理解为运算符

运行时获知变量类型名称，可以使用 typeid(变量).name()，需要注意不是所有编译器都输出"int"、"float"等之类的名称，对于这类的编译器可以这样使用：float f = 1.1f; if( typeid(f) == typeid(0.0f) ) ……
补充：对非引用类型，typeid是在编译时期识别的，只有引用类型才会在运行时识别。

# LZO
LZO 是致力于解压速度的一种数据压缩算法，LZO 是 Lempel-Ziv-Oberhumer 的缩写。这个算法是无损算法，参考实现程序是线程安全的。 实现它的一个自由软件工具是lzop。最初的库是用 ANSI C 编写、并且遵从 GNU通用公共许可证发布的。LZO 有用于 Perl、Python 以及 Java 的各种版本。代码版权的所有者是 Markus F. X. J. Oberhumer。


# M4 文件摘要
M4 文件与 一 种文件类型相关联，可以使用 MacroMates 开发的 MacroMates TextMate查看。 总的来说，这种格式与 四 种已知的软件应用程序相关联。 它们通常以 Macro Processor Library 文件格式存在。 M4 文件主要归类为 Developer Files。

桌面（和某些移动）设备上已支持文件扩展名为 M4 的文件。 Mac、 Windows和 Linux完全或部分支持这些文件。 这些文件的普及性为“低”，这意味着它们并不常见。

# 线程安全
线程安全是多线程编程时的计算机程序代码中的一个概念。在拥有共享数据的多条线程并行执行的程序中，线程安全的代码会通过同步机制保证各个线程都可以正常且正确的执行，不会出现数据污染等意外情况。
线程安全问题大多是由全局变量及静态变量引起的，局部变量逃逸也可能导致线程安全问题。
若每个线程中对全局变量、静态变量只有读操作，而无写操作，一般来说，这个全局变量是线程安全的；若有多个线程同时执行写操作，一般都需要考虑线程同步，否则的话就可能影响线程安全。

# 新疆生产建设兵团
新疆生产建设兵团，是新疆维吾尔自治区的重要组成部分， 新疆生产建设兵团承担着国家赋予的屯垦戍边职责，实行党政军企合一体制，在自己所辖垦区内，依照国家和新疆维吾尔自治区的法律、法规，自行管理内部行政、司法事务，受中央政府和新疆维吾尔自治区双重领导，在国家实行计划单列的特殊社会组织，是国务院计划单列的省（部）级单位，享有省级的权限。兵团地域分布在新疆各地，与蒙古、哈萨克斯坦、吉尔吉斯斯坦3国接壤，国境线有2000多千米。兵团辖区总面积7.06万平方千米，占新疆维吾尔自治区总面积的4.24%，约占全国农垦总面积的五分之一。 屯垦戍边是中国几千年开发和保卫边疆的历史遗产。中央政府在西域新疆大规模屯垦戍边始于2000多年前的西汉，以后历代沿袭。
兵团实行党政军企高度统一的特殊管理体制。兵团各级都建有中国共产党的组织，发挥着对兵团各项事业的领导作用。兵团设有行政机关和政法机关，自行管理内部行政、司法事务。兵团是一个“准军事实体”，设有军事机关和武装机构，沿用兵团、师、团、连等军队建制和司令员、师长、团长、连长等军队职务称谓，涵养着一支以民兵为主的武装力量。兵团也称为“中国新建集团公司”，是集农业、工业、交通、建筑、商业，承担经济建设任务的国有大型企业。兵团的党、政、军、企四套领导机构与四项职能合为一体。
2019年7月，荣获全国模范劳动关系和谐企业。
# 生产建设兵团
生产建设兵团是指中国建国后陆续组建的各类生产建设兵团，是中国通过军垦这种特殊体制达到巩固边防，发展经济，安置人员的目的，兵团成为党、政、军权合一，工、农、兵、学、商五位一体的半军事化组织和社会经济体系，尽管如今只有新疆生产建设兵团存在，但是在那段激情燃烧的岁月里，全国陆续出现过12个兵团，3个农建师。
新疆生产建设兵团直属中央管辖，新疆的石河子是兵团的窗口，比如大学中新疆大学是自治区的代表 石河子大学就是兵团的代表
兵团是和自治区平级的，它有自己独立的社保，行政等系统，连教育系统都是独立的且平级于自治区，一个学生竞赛获得兵团一等奖平级于自治区一等奖
新中国在成立后，为了促进地区的发展和稳定，在国内一些地区成立生产建设兵团。通过军垦这种特殊体制，生产建设兵团做到了提升边防力量、发展地区经济、安置劳动力，使党、政、军权合一。

# 屯垦戍边
屯垦戍边，读音：tún kěn shù biān 。屯垦是驻扎下来开垦田地的意思，而戍边顾名思义就是在边疆守卫的意思。不过通常两个词一起用都是强调后一个意思的。

# REV
在电脑主板中：意思是PCB板的版本、或主板的设计版本，如Rev 1.0就是为1.0的设计版本。
在软件中REV是指修订本的意思，revision的简写。

# BCD码 
BCD码（Binary-Coded Decimal‎），用4位二进制数来表示1位十进制数中的0~9这10个数码，是一种二进制的数字编码形式，用二进制编码的十进制代码。BCD码这种编码形式利用了四个位元来储存一个十进制的数码，使二进制和十进制之间的转换得以快捷的进行。这种编码技巧最常用于会计系统的设计里，因为会计制度经常需要对很长的数字串作准确的计算。相对于一般的浮点式记数法，采用BCD码，既可保存数值的精确度，又可免去使计算机作浮点运算时所耗费的时间。此外，对于其他需要高精确度的计算，BCD编码亦很常用。

# amcap
AMCap是一个功能完全的视频捕捉程序，虽然它很像Microsoft VidCap，但作者No Danjou以源自Microsoft DirectX 9 SDK的AMCap开放代码制作发展并加入对DirectShow的支持，到现在功能已经十分强大。

# 互联网电影资料库
互联网电影资料库（Internet Movie Database，简称IMDb）是一个关于电影演员、电影、电视节目、电视明星和电影制作的在线数据库。
IMDb创建于1990年10月17日，从1998年开始成为亚马逊公司旗下网站，2010年是IMDb成立20周年纪念。
IMDb的资料中包括了影片的众多信息、演员、片长、内容介绍、分级、评论等。对于电影的评分目前使用最多的就是IMDb评分。
截至2018年6月21日，IMDb共收录了4,734,693部作品资料以及8,702,001名人物资料。

# USB请求块
USB请求块(USB request block，URB)是USB设备驱动中用来描述与USB设备通信所用的基本载体和核心数据结构，与网络设备驱动中的sk_buff结构体类似，是USB主机与设备之间传输数据的封装。

# 注册表 
注册表（Registry，繁体中文版Windows操作系统称之为登录档）是Microsoft Windows中的一个重要的数据库，用于存储系统和应用程序的设置信息。早在Windows 3.0推出OLE技术的时候，注册表就已经出现。随后推出的Windows NT是第一个从系统级别广泛使用注册表的操作系统。但是，从Microsoft Windows 95操作系统开始，注册表才真正成为Windows用户经常接触的内容，并在其后的操作系统中继续沿用至今。

反编译
注册表：配置文件
注册表好比是我们用的户口簿，我们安装的程序都要在注册表中进行注册登记。注册表中可以记录程序或文件存放的位置、授权信息、外观设置……
人们通过修改注册表相应的键值，可以获得他们想要的效果而省去了复杂的操作。
https://blog.csdn.net/chenjian60665/article/details/94440814
https://www.cnblogs.com/alantu2018/p/8503883.html


---

[__attribute__ ((format (printf, 2, 3))); 介绍](https://blog.csdn.net/zzhongcy/article/details/90057284)
https://blog.csdn.net/tongdh/article/details/20530415

```
#ifdef __GNUC__
__attribute__((unused))
#endif

#if (defined(__GNU__) && defined(_MSC_VER))
   // ...
#endif

#if defined __GNUC__
__attribute__((format(printf, 3, 4)))
#endif
```



```
static void
#if defined __GNUC__
__attribute__((format(printf, 2, 3)))
#endif
va_log(struct MyStruct *node, const char *fmt, ...)
{
    char buf[BUFSIZ];
    va_list ap;
    int n;

    n = sprintf(buf, "hello:");
    va_start(ap, fmt);
    vsnprintf(buf + n, sizeof(buf) - n, fmt, ap);
    va_end(ap);
}
```
va_开头可能是varargs缩写
变量ap就不知所措了？？？
自定义日志，静态无返回值函数
__attribute__告诉要像printf那样检查入参，第2个参数是格式化参数，从第3个参数开始应用这个规则检测。
vsnprintf函数:int vsnprintf (char * s, size_t n, const char * format, va_list arg );



version “版本”。指文件或软件的公开发行版本，强调功能性。通常在功能方面有重大改变、改进或增加，包括对一些重大bug的修复。
revision “修订版”。指在文件或软件的公开发行版本的基础上，在功能方面有细微改变、改进或增加，包括对一些小bug的修复，这是在某个version版本的基础上在不同设计阶段的标志。
所以，在每次修改时，revision都会变化，但是version 却不一定会有变化。


overhand：举手过肩、上手的

# 阅文集团
阅文集团由腾讯文学与原盛大文学整合而成，成立于2015年3月。作为国内 [1]  引领行业的正版数字阅读平台和文学IP培育平台，阅文 [2]  旗下囊括QQ阅读 [3]  、起点中文网 [4]  、新丽传媒 [5]  等业界品牌。 [1]  拥有1170万 [6]  部 [7]  作品储备、780 [6]  万名创作者，覆盖200多种内容品类，  触达数亿用户，已成功输出《鬼吹灯》《盗墓笔记》《琅琊榜》《全职高手》《扶摇皇后》《将夜》等网文IP改编为影视、动漫、游戏等多业态产品。 [9]  阅文为作者提供原创平台，为内容打通分发渠道，在下游打造多业态衍生，向用户提供精神文化产品， [1]  阅文已搭建起以在线业务+版权运营双轮驱动的文创生态。 [1] 
2017年11月，阅文在香港联交所主板公开上市(股票代码：0772.HK)。
2019年6月11日，阅文集团入选“2019福布斯中国最具创新力企业榜”。

# 起点中文网
起点中文网创建于2002年5月，是国内最大文学阅读与写作平台之一，是国内领先的原创文学门户网站，隶属于国内最大的数字内容综合平台——阅文集团旗下。 [1] 
前身为起点原创文学协会（Chinese Magic Fantasy Union），长期致力于原创文学作者的挖掘与培养工作， [2]  并以推动中国文学原创事业为发展宗旨，在2003年10月以此为契机开创了在线收费阅读即电子出版的新模式。
2019年，“扫黄打非”部门针对网络文学领域低俗色情等问题开展专项整治，查处并公开曝光了起点中文网的违法行为 [3]  。





微信电脑端登录后新消息的时候手机也常有提示音：手机在Windows已登录设置。
[C++中前自增和后自增的区别（转载\整理）](https://www.cnblogs.com/xhj-records/archive/2013/05/28/3103391.html)
总结：在对内建类型的操作时前自增和后自增效率没太大区别；在对自定义类型操作时前自增效率高于后自增。



# WINAPI宏
https://blog.csdn.net/qq_32320399/article/details/53735635
https://blog.csdn.net/slj_win/article/details/33732087

```
#define WINAPI _stdcall;
#define CALLBACK _stdcall;
```
https://blog.csdn.net/lisfaf/article/details/98990043

而_stdcall是新标准c/c++函数的调用方法，它是采用自动清栈的方式，而标准c调用（_cdecl方法，cdecl是C declare的缩写）采用的是手工清栈的方式。

那么就引出了一个新的问题，什么是自动清栈？什么是手动清栈？查阅baidu.com，整理如下：

自动清栈，就是指，由调用者来处理，被调用者不需要处理。
手工清栈，就是指，调用者不会管被调用的函数使用的栈，需要由被调用者自己处理。就是我原来说的__cdecl要手工清栈，所以不用担心压进去几个参数无所谓。所以像printf这种就是参数不限的调用，都是用__cdecl的，如果是自动清栈的话，他必定有长度要求，清理几个字节的堆栈，所以其他调用方式是不能实现参数个数不限的要求的。
调用约定种类：一共有5种函数调用约定(calling convention)，它决定一下内容：
- 函数参数的压栈顺序
- 由调用者还是被调用者把参数弹出栈
- 产生函数修饰名的方法(C者C++在编译和链接的时候会重新给函数起一个名字，而这个名字的起法是根据std_call,cdecl这些来指定的)。



# 东华大学
东华大学（Donghua University），地处中国上海，是中华人民共和国教育部直属的全国重点大学，是国家“211工程“建设高校、世界一流学科建设高校，入选国家“2011计划”牵头高校、“111计划”、“双万计划”、卓越工程师教育培养计划、国家大学生创新性实验计划、中非高校20+20合作计划、国家级大学生创新创业训练计划、国家建设高水平大学公派研究生项目、国家级新工科研究与实践项目、中国政府奖学金来华留学生接收院校，是中国首批具有博士、硕士、学士三级学位授予权的大学之一、教育部“援疆学科建设计划”40所重点高校之一、首批28所全国来华留学质量认证院校之一、高水平行业特色大学优质资源共享联盟成员、“一带一路”世界纺织大学联盟成员、全国深化创新创业教育改革特色典型经验高校、上海市首批深化创新创业教育改革示范高校。在2016年世界大学学术排名中，东华大学名列中国大陆高校第34位、上海高校第6位。 [1-7] 
学校创建于1951年，时名华东纺织工学院，由交通大学纺织系等华东、中南、西南高校的纺织院系合并而成，1985年更名为中国纺织大学，1999年更名为东华大学。 [3] 
截至2019年5月，东华大学有松江校区、延安路校区和新华路校区，分别位于松江区和长宁区，占地面积近2000亩，建筑面积78万余平方米；学校设有18个学院（部），本科专业55个，学科涉及工学、理学等十大学科门类；有各类学生近3万人，其中本科生14204人，研究生6822人，留学生4827人；教职工共2209人，专任教师1336人。


companion：伙伴，伴侣
serial：串行
parallel：并行

# Wireshark 
Wireshark（前称Ethereal）是一个网络封包分析软件。网络封包分析软件的功能是撷取网络封包，并尽可能显示出最为详细的网络封包资料。Wireshark使用WinPCAP作为接口，直接与网卡进行数据报文交换。
在过去，网络封包分析软件是非常昂贵的，或是专门属于盈利用的软件。Ethereal的出现改变了这一切。在GNUGPL通用许可证的保障范围底下，使用者可以以免费的代价取得软件与其源代码，并拥有针对其源代码修改及客制化的权利。Ethereal是全世界最广泛的网络封包分析软件之一。


wire：铁丝网、将...连接到
shark：鲨鱼、骗取、诈骗者

# 真无线蓝牙耳机和无线蓝牙耳机
在早期，蓝牙耳机大多是采用单侧入耳设计，后来也演变出来一些双侧带线蓝牙耳机，虽然能够让两侧耳机同时发声，但是仅仅省去了一根线材而已，而当下流行的真无线蓝牙耳机则不然。其采用了更加激进的设计，尽管两枚耳机之间没有线材的束缚，但还是会有主副之分，在连接的时候，手机先与主耳机相连，然后再与副耳机相连，两枚耳机连接完成之后才能正常工作。

也就是说“真无线”蓝牙耳机不仅与手机进行无线连接，主副耳机之间也是采用无线的方式进行连接。

compatible；可共存的、和睦相处的、兼容的
already：已经
caps：大写字母、胜过
claim：声明、索赔、断言
detach：分开、分派、拆卸
attach：缠着、固定
capability：能力、军事武器
cap===capacity：容量
allocate：分配、划
call from：从...来
callback：
minor：较小的; 次要的;未成年人; 辅修科目; 辅修课程;
privacy：隐私
privilege：荣耀、特权
peer：同龄人、同辈、对端
fake：假的，伪造者，赝品
alter：改变


[开发者知识库](https://www.itdaan.com/index.html)



我已然放弃找寻sourceinsight的tab标签之sihook之4.X。
现在还有一个办法看他人配置。


#include <assert.h>			断言
#include <sys/types.h>
#include <sys/time.h>     Linux平台下


# 主引导记录
主引导记录（MBR，Master Boot Record）是位于磁盘最前边的一段引导（Loader）代码。它负责磁盘操作系统(DOS)对磁盘进行读写时分区合法性的判别、分区引导信息的定位，它由磁盘操作系统(DOS)在对硬盘进行初始化时产生的。



SCSI：是小型计算机系统接口的意思，就是早期硬盘或者光驱的接口类型，多用在服务器电脑上。数据线有50芯或者68芯的
SATA：是现在的硬盘或者光驱接口，是串行接口。现在的电脑一般都用这种类型，数据线是7芯的。


仅批量传输协议中，数据传输的结构和过程：命令阶段、数据阶段和状态阶段。
命令块封包CBW：Command Block Wrapper
命令状态封包CSW：Command Status Wrapper
CDB：Command Block？？？



signature：签名
delimiter：分隔符

