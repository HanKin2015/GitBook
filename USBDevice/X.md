# X系统
## 1、X Window
 X Window即X Window图形用户接口，是一种计算机软件系统和网络协议，提供了一个基础的图形用户界面（GUI）和丰富的输入设备能力联网计算机。其中软件编写使用广义的命令集，它创建了一个硬件抽象层，允许设备独立性和重用方案的任何计算机上实现。
 
 X Window是一种以位图方式显示的软件窗口系统，最初是1984年麻省理工学院的研究成果，之后变成UNIX、类UNIX、以及OpenVMS等操作系统所一致适用的标准化软件工具包及显示架构的运作协议。
X Window通过软件工具及架构协议来建立操作系统所用的图形用户界面，此后则逐渐扩展适用到各形各色的其他操作系统上，几乎所有的操作系统都能支持与使用X Window，GNOME和KDE也都是以X Window为基础建构成的。
 
 X-window于1984年在麻省理工学院（MIT）电脑科学研究室开始开发的，当时Bob Scheifler正在发展分散式系统（distributed system），同一时间 DEC公司的 Jim Gettys 正在麻省理工学院做 Athena 计划的一部分。两个计划都需要一个相同的东西——一套在UNIX机器上运行优良的视窗系统。因此合作关系开始展开，他们从斯坦福（Stanford）大学得到了一套叫做W的实验性视窗系统。因为是根据W视窗系统的基础开始发展的，当发展到了足以和原先系统有明显区别时，他们把这个新系统叫做X。
 
## 2、GTK+
最初，GTK+ 是作为另一个著名的开放源码项目 —— GNU Image Manipulation Program (GIMP) —— 的副产品而创建的。在开发早期的 GIMP 版本时，Peter Mattis 和 Spencer Kimball 创建了 GTK（它代表 GIMP Toolkit），作为 Motif 工具包的替代，后者在那个时候不是免费的。（当这个工具包获得了面向对象特性和可扩展性之后，才在名称后面加上了一个加号。）
 
 GTK(Gnome Toolkit)是一套跨多种平台的图形工具包,按LGPL许可协议发布的。虽然最初是为GIMP写的，但早已发展为一个功能强大、设计灵活的通用图形库。特别是被GNOME选中使得GTK+广为流传，成为Linux下开发图形界面的应用程序的主流开发工具之一，当然GTK+并不要求必须在Linux上，事实上，目前GTK+已经有了成功的windows版本。
GTK+虽然是用C语言写的，但是您可以使用你熟悉的语言来使用GTK+，因为GTK+已经被绑定到几乎所有流行的语言上，如：C++, Guile, Perl, Python, TOM, Ada95, Objective C, Free Pascal, Eiffel等。
 
## 3、Wayland 
Wayland是一个简单的“显示服务器”（Display Server），与X Window属于同一级的事物，而不是仅仅作为X Window下X Server的替代（注：X Window下分X Server和X Client）。也就是说，Wayland不仅仅是要完全取代X Window，而且它将颠覆Linux桌面上X Client/X Server的概念，以后将没有所谓的“X Client”了，而是“Wayland Client”。

 Wayland只是一个协议（Protocol），就像X Window当前的协议——X11一样，它只定义了如何与内核通讯、如何与Client通讯，具体的策略，依然是交给开发者自己。所以Wayland依然 是贯彻“提供机制，而非策略”的Unix程序。

 
 