# windows相关知识

## 1、脑裂计算机术语
英文称为“Split-Brain”。
脑裂是因为cluster分裂导致的，cluster集群中节点因为处理器忙或者其他原因暂时停止响应时，其他节点可能误认为该节点“已死”，从而夺取共享磁盘（即资源）的访问权，此时极有可能假死节点重新对共享文件系统产生读写操作,从而导致共享磁盘文件系统损坏。


## 2、win10恢复照片查看程序
https://jingyan.baidu.com/article/455a9950bb20bda166277824.html

## 3、如何查看一个exe程序的位数
使用linux的file命令

Magic 域是一个幻数值，在 WinNT.h 里定义了一些常量值：
```
#define IMAGE_NT_OPTIONAL_HDR32_MAGIC      0x10b
#define IMAGE_NT_OPTIONAL_HDR64_MAGIC      0x20b
#define IMAGE_ROM_OPTIONAL_HDR_MAGIC       0x107
```
值 0x10b 说明这个 image 是 32 位的，PE 文件格式是 PE32
值 0x20b 说明这个 image 是 64 位的，PE 文件格式是 PE32+
PE32+ 代表的扩展的 PE 文件格式，扩展为 64 位。在 PE 文件规范中并没有 PE64 这种文件格式，Microsoft 官方的判断 image 文件是 32 位还是 64 位的方法就是通过Magic 的值来确定。

最简单的方法，用记事本或者notepad++打开exe文件，在第二段中找到PE两个字母，在其后的不远出会出现d? 或者L。若是d，则证明该程序是64位；若是L，则证明是32位。

## 4、桌面所有电脑图标左下方有红色感叹号
使用everything搜索IconCache.db，然后删除刷新即可。

C:\Users\User\AppData\Local\IconCache.db

目录中删除一个名为“IconCache.db”的隐藏属性的图标缓冲文件。删除图标缓冲文件后，系统将重新建立图标文件的缓冲，图标显示问题也就随之解决了（需将隐藏文件显示出来）。

## 5、Kiosk Mode
所谓“信息亭模式”（Kiosk Mode），特指 Windows操作系统提供的一项功能。其仅允许单次运行一款应用程序，你也可以将它称作“真·全屏模式”。

在此界面下，浏览器的导航栏、情境菜单、状态栏和菜单栏都将被禁用，键盘访问权限会受到限制，默认的 F11 功能键也会被屏蔽，以隔绝 Windows 桌面和其它应用程序的访问。

即便将鼠标悬停在全屏模式，相关按钮也不会出现，因此普通用户是很难攻破 Kiosk 模式的。

## 6、查看系统恢复分区
reagentc /info

errlook.exe这个vs自带的错误查找程序不错。
PoolMonXv2.exe不错的内存泄露工具
spy++.exe接收并打印windows窗口消息

devmgmt.msc设备管理器
sc命令可以查看驱动，如sc query usbccgp

## 7、win32 getMessage 和 peekMessage的区别
按照微软文档的解释，getmessage在没有消息时，会被阻塞。如果peekmessage没有消息时，就返回。










