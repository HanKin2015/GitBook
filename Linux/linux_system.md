# linux操作系统

## 1、deepin
deepin（原名：Linux Deepin；中文通称：深度操作系统）是由武汉深之度科技有限公司在Debian基础上开发的Linux操作系统，其前身是Hiweed Linux操作系统，于2004年2月28日开始对外发行，可以安装在个人计算机和服务器中。
deepin操作系统内部集成了Deepin Desktop Environment（中文通称：深度桌面环境），并支持deepin store、deepin Music、deepin Movie等第一方应用软件。
2019年，华为开始销售预装有deepin操作系统的笔记本电脑。
2020年，深之度正式发布了deepin v20版本，底层仓库升级到Debian 10.5，系统安装则采用了Kernel 5.4和Kernel 5.7双内核机制，同时用户操作界面也得到了大幅度的调整。
2021年6月29日，深度操作系统发布20.2.2版本，应用商店上线安卓容器功能及安卓应用，满足办公、学习、游戏等场景下的使用需求。
2022年5月18日据统信软件发布，在系统根社区 deepin 线上发布会上，统信软件宣布，将以深度（deepin）社区为基础，建设立足中国、面向全球的桌面操作系统根社区，打造中国桌面操作系统的根系统。

深度操作系统（deepin）是中国第一个具备国际影响力的Linux发行版本，截止至2019年7月25日，深度操作系统支持33种语言，用户遍布除了南极洲的其它六大洲。深度桌面环境（DDE）和大量的应用软件被移植到了包括Fedora、Ubuntu、Arch等十余个国际Linux发行版和社区。

武汉深之度科技有限公司于2011年8月30日在武汉东湖新技术开发区登记成立。法定代表人刘闻欢，公司经营范围包括计算机软硬件开发与销售；计算机及网络技术服务等。

## 2、DESTDIR: GNU Make中的默认约定
GNU Make中，有许多约定俗成的东西，比如这个DESTDIR：用于加在要安装的文件路径前的一个前缀变量。

比如，我们本地编译了一个第三方库，但需要对其打包发布给其他人使用，一方面如果我们安装到默认目录，比如/usr，这时，安装后的文件一但数量很大，则打包时很难找全；或者我们在configure时指定了--prefix，或cmake时指定了CMAKE_INSTALL_PREFIX，则pc文件内的编译依赖关系又会出错，变成了我们指定的那个路径，使用起来会很不方便。此时，DESTDIR就会派上用场。

DESTDIR只在make install时起作用，且和Makefile是由什么工具生成的没有关系，用法如下：

make install DESTDIR=<$CUSTOM_PREFIX>

在configure或cmake时，指定了要安装的路径后，以这种方式make install安装的文件会通通安装到以$CUSTOM_PREFIX为前缀的目录中，这样，开发者直接对这目录中的文件打包，即可发布使用。

make install遇到关于这个好多坑点，编译前先source，导致修改了这个全局变量，导致后面安装第三方库后位置不对。。。。。。

## 3、SELinux
安全增强型 Linux（Security-Enhanced Linux）简称 SELinux，它是一个 Linux 内核模块，也是 Linux 的一个安全子系统。
SELinux 主要由美国国家安全局开发。2.6 及以上版本的 Linux 内核都已经集成了 SELinux 模块。
SELinux 的结构及配置非常复杂，而且有大量概念性的东西，要学精难度较大。很多 Linux 系统管理员嫌麻烦都把 SELinux 关闭了。
如果可以熟练掌握 SELinux 并正确运用，我觉得整个系统基本上可以到达"坚不可摧"的地步了（请永远记住没有绝对的安全）。
掌握 SELinux 的基本概念以及简单的配置方法是每个 Linux 系统管理员的必修课。

SELinux 主要作用就是最大限度地减小系统中服务进程可访问的资源（最小权限原则）。

## 3-1、如何认识SELinux
使用samba服务时，关闭了SELinux，结果导致虚拟机中键盘无法使用。

关于SELinux更多知识后续再补充吧。

## 4、最小的linux比拼
https://zhuanlan.zhihu.com/p/614258778

Tiny Core Linux ：https://blog.csdn.net/stevenldj/article/details/112852507
有界面，能安装，但似乎只能联网安装。
https://baijiahao.baidu.com/s?id=1666021023166364812&wfr=spider&for=pc

## 5、刷入系统后一直重启
最终解决方法还是使用大白菜，先刷入了一个centos系统，然后再刷入后启动正常。

看安装过程中有一个叫vmlinuz的文件在安装： 
vmlinuz是可引导的、压缩的内核。“vm”代表 “Virtual Memory”。Linux 支持虚拟内存，不像老的操作系统比如DOS有640KB内存的限制。Linux能够使用硬盘空间作为虚拟内存，因此得名“vm”。vmlinuz是可执行的Linux内核，它位于/boot/vmlinuz，它一般是一个软链接。

## 6、大白菜可能只支持安装windows系统
或者只支持安装GHO文件。
https://zhuanlan.zhihu.com/p/452299125

因此就不支持安装ubuntu.iso文件。
https://www.mryunwei.com/279797.html
