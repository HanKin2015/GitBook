# 银河麒麟

## 1、简介
银河麒麟是麒麟软件有限公司研制的开源操作系统。

银河麒麟（KylinOS）原是在“863计划”和国家核高基科技重大专项支持下，国防科技大学研发的操作系统，后由国防科技大学将品牌授权给天津麒麟，后者在2019年与中标软件合并为麒麟软件有限公司，继续研制的Linux操作系统。银河麒麟是优麒麟（Ubuntu Kylin）的商业发行版。使用UKUI桌面。

查看系统版本信息：
cat /etc/.kylin.info

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

## 4、安装ko文件
可能会出现：insmod : ERROR: could not insert module usbip-core.ko: Permission denied。

解决方法：
在安全中心-》应用控制与保护-》关闭检查应用程序完整性

## 5、其他主机无法ping通银河麒麟
发现是银河麒麟的网络保护中的防火墙搞的鬼，从公共网络设置为自定义配置即可。

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

```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin# tar xvf flex-2.6.4.tar.gz
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin# cd flex-2.6.4
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/flex-2.6.4# ./configure
checking build system type... build-aux/config.guess: unable to guess system type

```

参考：https://blog.csdn.net/antony1776/article/details/51744522（未解决）
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/flex-2.6.4# ll /usr/lib/gcc
总用量 20
drwxr-xr-x   3 root root  4096 4月  15  2021 ./
drwxr-xr-x 105 root root 12288 9月   6  2021 ../
drwxr-xr-x   3 root root  4096 4月  15  2021 loongarch64-linux-gnu/
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/flex-2.6.4# ./configure --build=loongarch64-linux-gnu
checking build system type... Invalid configuration `loongarch64-linux-gnu': machine `loongarch64' not recognized
configure: error: /bin/bash build-aux/config.sub loongarch64-linux-gnu failed

root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/flex-2.6.4# build-aux/config.guess
build-aux/config.guess: unable to guess system type
[root@ubuntu0006:/media/hankin/vdb/TransferStation/flex-2.6.4] #build-aux/config.guess
x86_64-pc-linux-gnu
```

参考：https://www.cnblogs.com/silent2012/p/16393984.html（解决）
修改build-aux/config.guess文件，参考aarch64的写法仿写如下：
```
    aarch64:Linux:*:*)
        echo ${UNAME_MACHINE}-unknown-linux-${LIBC}
        exit ;;
    loongarch64:Linux:*:*)
        echo ${UNAME_MACHINE}-unknown-linux-${LIBC}
        exit ;;
    aarch64_be:Linux:*:*)
        UNAME_MACHINE=aarch64_be
        echo ${UNAME_MACHINE}-unknown-linux-${LIBC}
        exit ;;
```

奇怪的现象：在物理机上面进行make会出现权限不足，切换成普通也不行。但是使用mobaxtrem接入make会弹出麒麟安全授权框认证，点击允许后解决。
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# make
gcc: error: unrecognized command line option ‘-mlvz’; did you mean ‘-mlra’?
  HOSTCC  scripts/basic/fixdep
/bin/sh: 1: scripts/basic/fixdep: Permission denied
make[2]: *** [scripts/Makefile.host:107：scripts/basic/fixdep] 错误 126
make[2]: *** 正在删除文件“scripts/basic/fixdep”
make[1]: *** [Makefile:543：scripts_basic] 错误 2
make: *** [Makefile:721：include/config/auto.conf.cmd] 错误 2

root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# make
gcc: error: unrecognized command line option ‘-mlvz’; did you mean ‘-mlra’?
  HOSTCC  scripts/basic/fixdep
  HOSTCC  scripts/kconfig/conf.o
  HOSTCC  scripts/kconfig/confdata.o
  HOSTCC  scripts/kconfig/expr.o
  LEX     scripts/kconfig/lexer.lex.c
  YACC    scripts/kconfig/parser.tab.[ch]
/bin/sh: 1: bison: not found
make[2]: *** [scripts/Makefile.host:17：scripts/kconfig/parser.tab.h] 错误 127
make[1]: *** [Makefile:610：syncconfig] 错误 2
make: *** [Makefile:721：include/config/auto.conf.cmd] 错误 2
```
在安全中心把网络保护和应用保护关闭后，物理机也能正常make。

### 7-3、小插曲
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# lscpu
Architecture:        loongarch64
Byte Order:          Little Endian
CPU(s):              4
On-line CPU(s) list: 0-3
Thread(s) per core:  1
Core(s) per socket:  4
Socket(s):           1
NUMA node(s):        1
CPU family:          Loongson-64bit
Model name:          Loongson-3A5000
BogoMIPS:            5000.00
L1d cache:           256 KiB
L1i cache:           256 KiB
L2 cache:            1 MiB
L3 cache:            16 MiB
NUMA node0 CPU(s):   0-3
Flags:               cpucfg lam ual fpu lsx lasx complex crypto lvz
```
出现了3次睡眠无法唤醒屏幕的情况，长按关机后还是无法正常亮屏，只有拔插电源才行。最后一次直接挂掉了，怎么操作都无法使之亮屏，报废。
其他人也遇到过此情况，试了上面2个VGA接口和1个HDMI接口，都是同样的情况。

### 7-3、安装bison
直接最新版本：2021-09-07 15:48	2.7M	 
https://ftp.gnu.org/gnu/bison/bison-3.8.tar.xz

很顺利就安装完毕：
```
tar xvf bison-3.8.tar.xz
cd bison-3.8/
./configure
make
make install
```

### 7-4、继续编译内核头文件
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# make
gcc: error: unrecognized command line option ‘-mlvz’; did you mean ‘-mlra’?
  HOSTCC  scripts/basic/fixdep
make[1]: *** 没有规则可制作目标“arch/loongarch/tools/elf-entry.c”，由“arch/loongarch/tools/elf-entry” 需求。 停止。
make: *** [arch/loongarch/Makefile:15：archscripts] 错误 2
```

听取建议改成ra或者注释掉后make：
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# grep -R mlvz
arch/loongarch/Makefile:cflags-y                        += -mlvz
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# vim arch/loongarch/Makefile
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# make
  HOSTCC  scripts/basic/fixdep
make[1]: *** 没有规则可制作目标“arch/loongarch/tools/elf-entry.c”，由“arch/loongarch/tools/elf-entry” 需求。 停止。
make: *** [arch/loongarch/Makefile:15：archscripts] 错误 2
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/usbip_driver# make
make -C /usr/src/linux-headers-5.4.18-28.23-bj-generic/ M=`pwd` modules
make[1]: 进入目录“/usr/src/linux-headers-5.4.18-28.23-bj-generic”
  CC [M]  /home/admin/usbip_driver/usbip_common.o
In file included from ./arch/loongarch/include/asm/addrspace.h:17,
                 from ./arch/loongarch/include/asm/barrier.h:13,
                 from ./include/linux/compiler.h:256,
                 from ./include/uapi/linux/swab.h:6,
                 from ./include/linux/swab.h:5,
                 from ./include/uapi/linux/byteorder/little_endian.h:13,
                 from ./include/linux/byteorder/little_endian.h:5,
                 from ./arch/loongarch/include/uapi/asm/byteorder.h:10,
                 from /home/admin/usbip_driver/usbip_common.c:20:
./arch/loongarch/include/asm/loongarchregs.h:103:10: fatal error: larchintrin.h: 没有那个文件或目录
 #include <larchintrin.h>
          ^~~~~~~~~~~~~~~
compilation terminated.
make[2]: *** [scripts/Makefile.build:275：/home/admin/usbip_driver/usbip_common.o] 错误 1
make[1]: *** [Makefile:1698：/home/admin/usbip_driver] 错误 2
make[1]: 离开目录“/usr/src/linux-headers-5.4.18-28.23-bj-generic”
make: *** [Makefile:4：all] 错误 2
```

看了一下linux内核：https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/arch/loongarch/include/asm?h=v5.19-rc5
没有找到loongarchregs.h文件和larchintrin.h文件。

https://github.com/loongson/gcc
https://github.com/xieby1/xieby1.github.io/blob/65d7062f49a2ce67d04002f39486141908f0afe0/src/Kernel/Linux/mtlb.logs.md
有提及，但是没有啥营养。

查看loongarchregs.h文件内容，注释掉相关的两行：
```
#ifndef __ASSEMBLY__
#ifndef __clang__
//#include <larchintrin.h>
//#include <lvzintrin.h>
#endif
```
结果报错：
```
#ifdef __clang__
static inline u32 __cpucfg(u32 reg)
{
        return 0;
}
```
这些函数未定义，调用这些函数的地方只有宏__ASSEMBLY__，因此要想这些函数定义，那必须要定义宏__clang__，如果定义了宏__clang__，那么所有问题好像迎刃而解。

### 7-5、Linux宏：__ASSEMBLY__
汇编：assembly

猜测：所以这个宏跟汇编有关？！

引用：某些常量宏会同时被C和asm引用，而C与asm在对立即数符号的处理上是不同的。asm中通过指令来区分其操作数是有符号还是无符号的，而不是通过操作数。而C中是通过变量的属性，而不是通过操作符。C中如果要指明常量有无符号，必须为常量添加后缀，而asm则通过使用不同的指令来指明。如此，当一个常量被C和asm同时包含时，必须做不同的处理。故KBUILD_AFLAGS中将添加一项D__ASSEMBLY__，来告知预处理器此时是asm。

### 7-6、clang gcc 中__clang__ __GNUC__宏定义区别
(1)、GCC定义的宏包括：
```
__GNUC__
__GNUC_MINOR__
__GNUC_PATCHLEVEL__
__GNUG__
```
(2)、Clang除了支持GCC定义的宏之外还定义了：
```
__clang__
__clang_major__
__clang_minor__
```

### 7-7、安装clang
http://clang.org/
https://clang.llvm.org/
看着还挺麻烦的。https://www.bbsmax.com/A/kPzONNM3dx/

后来意外发现是镜像源配置错误了，使用apt命令轻松搞定。
```
apt search clang

clang/xenial-updates 1:3.8-33ubuntu3.1 amd64
  C, C++ and Objective-C compiler (LLVM based)
clang-8/xenial-updates,xenial-security 1:8-3~ubuntu16.04.1 amd64
  C, C++ and Objective-C compiler

apt install clang
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# clang --version
clang version 8.0.1-3~bpo10+1.lnd.11
Target: loongarch64-unknown-linux-gnu
Thread model: posix
InstalledDir: /usr/bin
```

### 7-8、安装完clang后，之前遇到的所有问题迎刃而解
gcc无法识别mlvz参数，原来这个是clang编译器具有的。
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# make clean
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/usr/src/linux-headers-5.4.18-28.23-bj-generic# make
  HOSTCC  scripts/basic/fixdep
make[1]: *** 没有规则可制作目标“arch/loongarch/tools/elf-entry.c”，由“arch/loongarch/tools/elf-entry” 需求。 停止。
make: *** [arch/loongarch/Makefile:15：archscripts] 错误 2

root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/usbip_driver# ll *.ko
-rw-r--r-- 1 root root 276168 7月   5 22:57 usbip-core.ko
-rw-r--r-- 1 root root 474256 7月   5 22:57 usbip-host.ko
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/usbip_driver# modinfo usbip-core.ko
filename:       /home/admin/usbip_driver/usbip-core.ko
version:        1.0.0
license:        GPL
description:    USB/IP Core
author:         Takahiro Hirofuchi <hirofuchi@users.sourceforge.net>
srcversion:     CC82663D9922E9694EF0953
depends:
name:           usbip_core
vermagic:       5.4.18-28.23-bj-generic SMP mod_unload modversions LOONGSON64 64BIT
parm:           usbip_debug_flag:debug flags (defined in usbip_common.h) (ulong)
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/usbip_driver# insmod usbip-core.ko
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/usbip_driver# echo $?
0
```

## 8、外置无线网卡连接网络
存在免驱的无线网卡，很奇怪插在3.0的端口会报获取描述符错误，插在2.0端口即可。

检测到后，需要选择EAP方法为PEAP即可。

## 9、芯片型号和架构区别
uname -m          arch
lscpu

因为后面找到一台龙芯3A4000的mips架构。
我的理解是这两类跟硬件有关，是无法通过软件来更改的。
