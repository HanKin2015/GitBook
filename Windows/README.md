# windows相关知识
asm入网小助手是网络管理员用来审查网络中的计算机是否安全操作的应用程序，不需要到的可以删除的。

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
Spy++官方版是一款简单实用的Windows操作系统的窗口句柄获取工具。Microsoft Spy++最新版支持查看窗口、消息、进程、线程信息等内容，具有简单易用、功能多样的特点。通过Microsoft Spy++软件用户还可以保存和还原自己的首选项，绿色安全，无需安装即可使用。

devmgmt.msc设备管理器
sc命令可以查看驱动，如sc query usbccgp

## 7、win32 getMessage 和 peekMessage的区别
按照微软文档的解释，getmessage在没有消息时，会被阻塞。如果peekmessage没有消息时，就返回。

## 8、查看系统信息
我的电脑-》属性
systeminfo命令
运行-》dxdiag
第三方工具，如鲁大师、360驱动大师

## 9、关闭进程
一个进程报错弹出错误弹框，关闭后3秒左右后又重新弹出，发现进程中有个该进程服务，怀疑是服务自动拉起的，因此把服务进程给杀掉，但是服务进程又会被自动拉起。发现服务进程有关联服务，转到服务并不能停止。

但是，可以通过win+R调出运行窗口，然后输入services.msc打开服务窗口，找到该服务并禁止，然后再杀掉进程，此时就不再弹出烦恼的窗口了。

一开始计划打算使用python脚本每秒自动检测该窗口进程并杀死。

## 10、findstr命令
可以使用TCPUDPDbg.exe软件模拟端口占用。
```
(base) D:\Users\User\Desktop>netstat -ano | findstr "9878"

(base) D:\Users\User\Desktop>netstat -ano | findstr "9878"
  TCP    0.0.0.0:9878           0.0.0.0:0              LISTENING       12772
```

使用netstat -aon可以看到当前操作系统的端口占用情况，但是我想匹配进程号为5是否占用端口。
```
netstat -ano  
netstat -ano|findstr "8081" 
taskkill /pid 4176 -t -f 
tasklist | findstr 4176   查看进程信息
```
则会出现很多匹配词条，但是如果使用netstat -ano|findstr "LISTENING       5"就会匹配两种情况的字符，空格类似分隔符。
```
(base) D:\Users\User\Desktop>netstat -ano | findstr "51503    56636"
  UDP    127.0.0.1:51503        *:*                                    5204
  UDP    127.0.0.1:56636        *:*                                    3572
```

因此想匹配，则需要使用netstat -ano|findstr "LISTENING.*5"进行查找。这个命令使用正则表达式来匹配"LISTENING"和"5"之间的任意字符，以便正确识别搜索模式。
```
(base) D:\Users\User\Desktop>netstat -ano | findstr "LISTENING.*5"
  TCP    0.0.0.0:21             0.0.0.0:0              LISTENING       3540
  TCP    0.0.0.0:1556           0.0.0.0:0              LISTENING       752
  TCP    127.0.0.1:7777         0.0.0.0:0              LISTENING       13560
  TCP    127.0.0.1:8071         0.0.0.0:0              LISTENING       5156
  TCP    127.0.0.1:8118         0.0.0.0:0              LISTENING       9592
```

