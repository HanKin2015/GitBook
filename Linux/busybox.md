# busybox 

## 1、简介
BusyBox 是一个集成了三百多个最常用Linux命令和工具的软件。BusyBox 包含了一些简单的工具，例如ls、cat和echo等等，还包含了一些更大、更复杂的工具，例grep、find、mount以及telnet。有些人将 BusyBox 称为 Linux 工具里的瑞士军刀。简单的说BusyBox就好像是个大工具箱，它集成压缩了 Linux 的许多工具和命令，也包含了 Android 系统的自带的shell。

软件平台：类Unix系统

BusyBox 将许多具有共性的小版本的UNIX工具结合到一个单一的可执行文件。这样的集合可以替代大部分常用工具比如的GNU fileutils ， shellutils等工具，BusyBox提供了一个比较完善的环境，可以适用于任何小的嵌入式系统。

## 2、个人理解
相当于把linux下的shell命令集成到一个二进制文件之中，利于跨平台使用。

## 3、Android的toolbox及busybox,toybox
1 toolbox

看 system/core $ gitk toolbox/

toolbox应该是在5.0及5.0以前使用，14年年底后google已停止维护


2 toybox

6.0以后执行ls等基础linux命令都执行了toybox

What is Toybox
  - Fresh implementation of linux/android command line, BSD licensed.
    - Draws from Posix, LSB, LFS, toolbox, bash man page, etc.

What does toybox implement?
  - android toolbox    - lives in "android core" git.    - triage    - container support for security      - unshare      - examine lxc. (Fix chroot in kernel.)    - google has epic "not invented here" syndrome      - install toybox, put first in $PATH. Leave toybox alone.      - Eliminating need for toolbox won't eliminate safety blanket.

3 busybox

busybox在android上位于xbin，是android xbin下额外的工具，不是ls等默认指向的。

原来 Android 中的 busybox 与 toolbox 是两套程序。

 

busybox 是一个嵌入式领域常用的软件。它是一个命令集工具，像传统的PC端的Linux系统上的大多数命令的实现都被封装在 busybox 程序中。在嵌入式平台上就可以将这些命令以参数的形式传递给 busybox 工具集，进而实现相应的功能。

 

那为什么嵌入式平台不能直接像PC端那样，直接将各个命令所对应的程序预置在板端，而非要包装在一个 busybox 中呢？其最主要的原因还是因为这些命令所对应的程序加起来太过庞大，嵌入式平台的存储资源通常是比较有限的，为了节约存储空间，就将这些命令集合在一个程序中。那集合以后的程序又凭什么能比PC端那种分散开来的形式体积要小呢？一个主要的原因是因为这些命令中，有不少命令的实现都是相同的。busybox 就将这些相同的部分提取出来让多个命令共用。如此一来随着命令数量的增多，就能比较大程度地缩减程序体积了。

 

Android平台是基于嵌入式Linux的。通过串口或者 adb shell 可以像在嵌入式Linux平台上那样敲击命令以实现某些目的。

 

Android平台的命令系统一般而言可以认为分为两类：

1、busybox 实现的命令系统

2、toolbox 实现的命令系统

 

toolbox 命令系统是Android平台默认的命令系统。

Toybox
A implementation of over 200 Unix command line utilities.
BSD licenses.（和GPL区别在于基于BSD许可的开源软件所做的修改可以不开源，且在BSD上面新开发的部分可以商业使用）。
Android's command line tools.

BusyBox
GNU GPL licenses. （copyleft）
BusyBox 官网 - The Swiss Army Knife of Embedded Linux.
你可以看到 busybox 所支持的 COMMANDS（Currently available applets）.

作者：michael_jia
链接：https://www.jianshu.com/p/8b52739c8f89
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

