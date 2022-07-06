# 统信UOS 

统信UOS：办公、社交、影音娱乐、开发工具、图像处理等类别，可兼容主流处理器架构。
2022年4月25日，统信软件技术有限公司宣布统信UOS开发者平台正式上线。
2022年5 月 20 日，专为教育而研发的统信桌面操作系统 V20 教育版（1050）发布更新，再次升级浏览器青少年上网保护插件，全新发布统信应用商店教育应用全栈功能。

## 1、统信软件技术有限公司（UnionTech Software Technology Co., Ltd.）
统信软件技术有限公司（以下简称：统信软件）是以“打造中国操作系统创新生态”为使命的国内基础软件公司，由操作系统厂家于2019年联合成立。公司专注于操作系统等基础软件的研发与服务，致力于为不同行业的用户提供操作系统产品与解决方案。统信软件总部设立在北京，同时在武汉、上海、广州、南京等地设立了地方技术支持机构、研发中心和通用软硬件适配中心。作为国内操作系统研发团队，统信软件拥有操作系统研发、行业定制、国际化、迁移和适配、交互设计、咨询服务等多方面专业人才，能够满足不同用户和应用场景对操作系统产品的广泛需求。基于国产芯片架构的操作系统产品已经和龙芯、飞腾、申威、鲲鹏、兆芯、海光、海思麒麟等芯片厂商开展了广泛和深入的合作，与国内各主流整机厂商，以及数百家国内外软件厂商展开了全方位的兼容性适配工作。

## 2、查看系统信息
```
root@hankin-PC:~# cat /etc/os-release
PRETTY_NAME="UnionTech OS Desktop 20 Pro"
NAME="uos"
VERSION_ID="20"
VERSION="20"
ID=uos
HOME_URL="https://www.chinauos.com/"
BUG_REPORT_URL="http://bbs.chinauos.com"
VERSION_CODENAME=eagle
root@hankin-PC:~# cat /etc/os-version
[Version]
SystemName=UnionTech OS Desktop
SystemName[zh_CN]=统信桌面操作系统
ProductType=Desktop
ProductType[zh_CN]=桌面
EditionName=Professional
EditionName[zh_CN]=专业版
MajorVersion=20
MinorVersion=1032
OsBuild=11018.101
root@hankin-PC:~# uname -a
Linux hankin-PC 4.19.0-amd64-desktop #3204 SMP Fri Mar 12 15:57:23 CST 2021 x86_64 GNU/Linux
root@hankin-PC:~# lscpu
Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
Address sizes:       40 bits physical, 48 bits virtual
CPU(s):              8
On-line CPU(s) list: 0-7
Thread(s) per core:  1
Core(s) per socket:  8
Socket(s):           1
NUMA node(s):        1
Vendor ID:           CentaurHauls
CPU family:          7
Model:               59
Model name:          ZHAOXIN KaiXian KX-U6780A@2.7GHz
Stepping:            1
Frequency boost:     disabled
CPU MHz:             2700.000
CPU max MHz:         2700.0000
CPU min MHz:         1200.0000
BogoMIPS:            5389.13
Virtualization:      VT-x
L1d cache:           256 KiB
L1i cache:           256 KiB
L2 cache:            8 MiB
NUMA node0 CPU(s):   0-7
```

## 3、兆芯开先KX-6000系列国产x86处理器
兆芯开先KX-6000系列国产x86处理器由上海兆芯集成电路有限公司生产，是完全自主研发的x86通用处理器，产品性能与国际主流的Intel I5水平相当。
2018年9月19日，兆芯开先KX-6000系列国产x86处理器获第二十届中国国际工业博览会金奖。

上海兆芯集成电路有限公司于2013年4月27日在自贸区市场监督管理局登记成立。法定代表人叶峻，公司经营范围包括研究、开发、设计集成电路芯片、系统级芯片等。

## 4、编译usbip驱动
比龙芯麒麟简单多了：
```
root@hankin-PC:/home/hankin/usbip_driver# modinfo usbip-core.ko
filename:       /home/hankin/usbip_driver/usbip-core.ko
version:        1.0.0
license:        GPL
description:    USB/IP Core
author:         Takahiro Hirofuchi <hirofuchi@users.sourceforge.net>
srcversion:     CC82663D9922E9694EF0953
depends:
retpoline:      Y
name:           usbip_core
vermagic:       4.19.0-amd64-desktop SMP mod_unload modversions
parm:           usbip_debug_flag:debug flags (defined in usbip_common.h) (ulong)
root@hankin-PC:/home/hankin/usbip_driver# insmod usbip-core.ko
root@hankin-PC:/home/hankin/usbip_driver# echo $?
0
root@hankin-PC:/home/hankin/usbip_driver# ls -l *.ko
-rw-r--r-- 1 root root  926968 7月   6 11:03 usbip-core.ko
-rw-r--r-- 1 root root 1551168 7月   6 11:03 usbip-host.ko
```


