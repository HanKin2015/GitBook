# 银河麒麟

## 1、简介
银河麒麟是麒麟软件有限公司研制的开源操作系统。

银河麒麟（KylinOS）原是在“863计划”和国家核高基科技重大专项支持下，国防科技大学研发的操作系统，后由国防科技大学将品牌授权给天津麒麟，后者在2019年与中标软件合并为麒麟软件有限公司，继续研制的Linux操作系统。银河麒麟是优麒麟（Ubuntu Kylin）的商业发行版。使用UKUI桌面。

## 2、银河麒麟烦人的提示
[Note] System unauthorized, Please contact the system supplier

ssh进入的时候明显能看见当前版本是试用版的缘故：
```
Welcome to Kylin 4.0.2 (GNU/Linux 4.4.58-20170818.kylin.5.desktop-generic aarch64)


银河麒麟操作系统（试用版）免责声明

尊敬的客户：
  您好！随机安装的“银河麒麟操作系统（试用版）”是针对该版本对应的行业客户的免费试用版本，仅用于飞腾CPU整机的试用、测试和评估，不能用于其他任何商业用途。此试用版本以软件出库时间计时，试用时间为一年。试用期不提供相关正版软件的售后服务，如果客户在试用版本上自行存放重要文件及私自进行商业用途，由此产生的任何安全问题及结果一概由用户自己承担，天津麒麟信息技术有限公司不承担任何法律风险。
  在试用过程中，如希望激活或者得到专业的技术服务支持，请您购买“银河麒麟操作系统”正式版本或授权，联系方式如下：400-089-1870。

天津麒麟信息技术有限公司
www.kylinos.cn

* Kylin system authentication information:
To obtain service serial number error!
您有新邮件。
Last login: Mon Mar 22 21:08:46 2021 from 172.22.36.34

[Note] System unauthorized, Please contact the system supplier.
```

## 3、银河麒麟安装后bash权限问题
现象：银河麒麟系统安装后，没有可执行权限，运行bash或者2进制程序都提示bash权限不够或者类似报错

原因：系统做了限制，客服公众号回复需要进行下述设定

解决：sudo setstatus softmode -p
```
root@hankin-KVM-Virtual-Machine:/home/hankin# getstatus
KySec status: Normal

exec control: on
file protect: on
kmod protect: on
three admin : off
root@hankin-KVM-Virtual-Machine:/home/hankin# setstatus
usage:  setstatus < Normal |Softmode > [ -p ]
        setstatus -f  < exectl | fpro | kmod >  < on | off >
```

## 4、镜像源
http://archive.kylinos.cn/kylin/KYLIN-ALL/

在系统的/etc/apt/sources.list文件中，根据不同版本填入以下内容:
```
#V10 SP1 2107版本:
deb http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107-updates main restricted universe multiverse

root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# cat /etc/.kyinfo
[dist]
name=Kylin
milestone=Desktop-V10-SP1-Release-2107
arch=loongarch64
beta=False
time=2021-09-22 12:03:40
dist_id=Kylin-Desktop-V10-SP1-Release-2107-loongarch64-2021-09-22 12:03:40

[servicekey]
key=0124212

[os]
to=
term=2023-04-12
```
使用apt update命令更新库源。

## 5、apt update执行失败
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# apt update
获取:1 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1 InRelease [67.3 kB]
正在读取软件包列表... 完成
E: http://archive.kylinos.cn/kylin/KYLIN-ALL/dists/10.1/InRelease 的 Release 文件已经过期(已经过期了 285天 7小时 42分 22秒)。该仓库的更新将不会应用。
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# date
2021年 09月 06日 星期一 11:39:07 CST
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# date -s "20220705 14:40"
2022年 07月 05日 星期二 14:40:00 CST
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# apt update
获取:1 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1 InRelease [67.3 kB]
获取:2 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1/main loongarch64 Packages [3,078 kB]
获取:3 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1/restricted loongarch64 Packages [1,348 B]                                     
获取:4 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1/universe loongarch64 Packages [17.7 MB]                                       
获取:5 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1/multiverse loongarch64 Packages [176 kB]                                      
已下载 21.0 MB，耗时 51秒 (414 kB/s)                                                                                                
正在读取软件包列表... 完成
正在分析软件包的依赖关系树
正在读取状态信息... 完成
有 188 个软件包可以升级。请执行 ‘apt list --upgradable’ 来查看它们。

root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# apt update
获取:1 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.0 InRelease [73.6 kB]
已下载 73.6 kB，耗时 1秒 (134 kB/s)
正在读取软件包列表... 完成
正在分析软件包的依赖关系树
正在读取状态信息... 完成
所有软件包均为最新。
N: 鉴于仓库 'http://archive.kylinos.cn/kylin/KYLIN-ALL 10.0 InRelease' 不支持 'loongarch64' 体系结构，跳过配置文件 'main/binary-loongarch64/Packages' 的获取。
N: 鉴于仓库 'http://archive.kylinos.cn/kylin/KYLIN-ALL 10.0 InRelease' 不支持 'loongarch64' 体系结构，跳过配置文件 'restricted/binary-loongarch64/Packages' 的获取。
N: 鉴于仓库 'http://archive.kylinos.cn/kylin/KYLIN-ALL 10.0 InRelease' 不支持 'loongarch64' 体系结构，跳过配置文件 'universe/binary-loongarch64/Packages' 的获取。
N: 鉴于仓库 'http://archive.kylinos.cn/kylin/KYLIN-ALL 10.0 InRelease' 不支持 'loongarch64' 体系结构，跳过配置文件 'multiverse/binary-loongarch64/Packages' 的获取。


root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# apt update
忽略:1 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107 InRelease
错误:2 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107 Release
  404  Not Found [IP: 175.6.237.98 80]
正在读取软件包列表... 完成
E: 仓库 “http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107 Release” 没有 Release 文件。
N: 无法安全地用该源进行更新，所以默认禁用该源。
N: 参见 apt-secure(8) 手册以了解仓库创建和用户配置方面的细节。
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# vim /etc/apt/sources.list
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# apt update
获取:1 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107-updates InRelease [48.0 kB]
获取:2 http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107-updates/universe loongarch64 Packages [13.7 kB]
已下载 61.7 kB，耗时 1秒 (75.7 kB/s)
正在读取软件包列表... 完成
正在分析软件包的依赖关系树
正在读取状态信息... 完成
有 2 个软件包可以升级。请执行 ‘apt list --upgradable’ 来查看它们。
```

## 6、安装linux内核头文件
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# uname -r
5.4.18-28.23-bj-generic
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# apt search 5.4.18-28.23-bj-generic
正在排序... 完成
全文搜索... 完成
linux-headers-5.4.18-28.23-bj-generic/now 5.4.18-28.23-bj loongarch64 [已安装，本地]
  Linux kernel headers for version 5.4.18-28.23 on loongarch64 SMP

linux-image-5.4.18-28.23-bj-generic/now 5.4.18-28.23-bj loongarch64 [已安装，本地]
  Linux kernel image for version 5.4.18-28.23 on loongarch64 SMP

linux-modules-5.4.18-28.23-bj-generic/now 5.4.18-28.23-bj loongarch64 [已安装，本地]
  Linux kernel extra modules for version 5.4.18-28.23 on loongarch64 SMP

linux-modules-extra-5.4.18-28.23-bj-generic/now 5.4.18-28.23-bj loongarch64 [已安装，本地]
  Linux kernel extra modules for version 5.4.18-28.23 on loongarch64 SMP

root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# ll /usr/src/
总用量 16
drwxr-xr-x  4 root root 4096 7月   5 14:47 ./
drwxrwxr-x 13 root root 4096 2月  22  2021 ../
drwxr-xr-x 26 root root 4096 7月   5 14:46 linux-headers-5.4.18-28.23-bj/
drwxr-xr-x  6 root root 4096 7月   5 14:47 linux-headers-5.4.18-28.23-bj-generic/
```

## 7、编译linux内核头文件
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# make
gcc: error: unrecognized command line option ‘-mlvz’; did you mean ‘-mlra’?
  LEX     scripts/kconfig/lexer.lex.c
/bin/sh: 1: flex: not found
make[2]: *** [scripts/Makefile.host:9：scripts/kconfig/lexer.lex.c] 错误 127
make[1]: *** [Makefile:610：syncconfig] 错误 2
make: *** [Makefile:721：include/config/auto.conf.cmd] 错误 2
```

百度了一半天没有一丁点关于gcc: error: unrecognized command line option ‘-mlvz’; did you mean ‘-mlra’?的内容。
可能是gcc版本过低导致，但是系统提供的镜像源gcc版本已经是最新的了。

听了大佬的话，如果这个有影响的话就不应该往下走，下面还有一处错误，flex命令未找到。

### 7-1、解决flex和bison命令问题
在xubuntu中使用apt search搜索flex和bison：
```
flex/xenial 2.6.0-11 amd64
  fast lexical analyzer generator
bison/xenial 2:3.0.4.dfsg-1 amd64
  YACC-compatible parser generator
```
但是银河麒麟却没有，只能通过源码进行安装了。

bison的官网：http://www.gnu.org/software/bison
flex的官网 ：http://flex.sourceforge.net

在windows下已经编译好的flex和bison可以在：https://sourceforge.net/projects/winflexbison/files/

### 7-2、安装flex
直接最新版本：Noteworthy changes in release 2.6.4 (2017-05-06) [stable]
https://github.com/westes/flex/files/981163/flex-2.6.4.tar.gz



### 7-3、安装bison
直接最新版本：2021-09-07 15:48	2.7M	 
https://ftp.gnu.org/gnu/bison/bison-3.8.tar.xz


