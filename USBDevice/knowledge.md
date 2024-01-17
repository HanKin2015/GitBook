# 知识大全

详情还是见libusb.h文件吧。
D:\Github\Storage\udev\library\*

## 1、标准请求
```
/** \ingroup libusb_misc
 * Standard requests, as defined in table 9-5 of the USB 3.0 specifications */
enum libusb_standard_request {
    /** Request status of the specific recipient */
    LIBUSB_REQUEST_GET_STATUS = 0x00,

    /** Clear or disable a specific feature */
    LIBUSB_REQUEST_CLEAR_FEATURE = 0x01,

    /* 0x02 is reserved */

    /** Set or enable a specific feature */
    LIBUSB_REQUEST_SET_FEATURE = 0x03,

    /* 0x04 is reserved */

    /** Set device address for all future accesses */
    LIBUSB_REQUEST_SET_ADDRESS = 0x05,

    /** Get the specified descriptor */
    LIBUSB_REQUEST_GET_DESCRIPTOR = 0x06,

    /** Used to update existing descriptors or add new descriptors */
    LIBUSB_REQUEST_SET_DESCRIPTOR = 0x07,

    /** Get the current device configuration value */
    LIBUSB_REQUEST_GET_CONFIGURATION = 0x08,

    /** Set device configuration */
    LIBUSB_REQUEST_SET_CONFIGURATION = 0x09,

    /** Return the selected alternate setting for the specified interface */
    LIBUSB_REQUEST_GET_INTERFACE = 0x0a,

    /** Select an alternate interface for the specified interface */
    LIBUSB_REQUEST_SET_INTERFACE = 0x0b,

    /** Set then report an endpoint's synchronization frame */
    LIBUSB_REQUEST_SYNCH_FRAME = 0x0c,

    /** Sets both the U1 and U2 Exit Latency */
    LIBUSB_REQUEST_SET_SEL = 0x30,

    /** Delay from the time a host transmits a packet to the time it is
      * received by the device. */
    LIBUSB_SET_ISOCH_DELAY = 0x31
};
```

## 2、速度/速率
```
/** \ingroup libusb_desc
 * Supported speeds (wSpeedSupported) bitfield. Indicates what
 * speeds the device supports.
 */
enum libusb_supported_speed {
    /** Low speed operation supported (1.5MBit/s). */
    LIBUSB_LOW_SPEED_OPERATION = (1 << 0),

    /** Full speed operation supported (12MBit/s). */
    LIBUSB_FULL_SPEED_OPERATION = (1 << 1),

    /** High speed operation supported (480MBit/s). */
    LIBUSB_HIGH_SPEED_OPERATION = (1 << 2),

    /** Superspeed operation supported (5000MBit/s). */
    LIBUSB_SUPER_SPEED_OPERATION = (1 << 3)
};

/** \ingroup libusb_dev
 * Speed codes. Indicates the speed at which the device is operating.
 */
enum libusb_speed {
    /** The OS doesn't report or know the device speed. */
    LIBUSB_SPEED_UNKNOWN = 0,

    /** The device is operating at low speed (1.5MBit/s). */
    LIBUSB_SPEED_LOW = 1,

    /** The device is operating at full speed (12MBit/s). */
    LIBUSB_SPEED_FULL = 2,

    /** The device is operating at high speed (480MBit/s). */
    LIBUSB_SPEED_HIGH = 3,

    /** The device is operating at super speed (5000MBit/s). */
    LIBUSB_SPEED_SUPER = 4,

    /** The device is operating at super speed plus (10000MBit/s). */
    LIBUSB_SPEED_SUPER_PLUS = 5
};
```

## 3、X Window
 X Window即X Window图形用户接口，是一种计算机软件系统和网络协议，提供了一个基础的图形用户界面（GUI）和丰富的输入设备能力联网计算机。其中软件编写使用广义的命令集，它创建了一个硬件抽象层，允许设备独立性和重用方案的任何计算机上实现。
 
 X Window是一种以位图方式显示的软件窗口系统，最初是1984年麻省理工学院的研究成果，之后变成UNIX、类UNIX、以及OpenVMS等操作系统所一致适用的标准化软件工具包及显示架构的运作协议。
X Window通过软件工具及架构协议来建立操作系统所用的图形用户界面，此后则逐渐扩展适用到各形各色的其他操作系统上，几乎所有的操作系统都能支持与使用X Window，GNOME和KDE也都是以X Window为基础建构成的。
 
 X-window于1984年在麻省理工学院（MIT）电脑科学研究室开始开发的，当时Bob Scheifler正在发展分散式系统（distributed system），同一时间 DEC公司的 Jim Gettys 正在麻省理工学院做 Athena 计划的一部分。两个计划都需要一个相同的东西——一套在UNIX机器上运行优良的视窗系统。因此合作关系开始展开，他们从斯坦福（Stanford）大学得到了一套叫做W的实验性视窗系统。因为是根据W视窗系统的基础开始发展的，当发展到了足以和原先系统有明显区别时，他们把这个新系统叫做X。
 
## 4、GTK+
最初，GTK+ 是作为另一个著名的开放源码项目 —— GNU Image Manipulation Program (GIMP) —— 的副产品而创建的。在开发早期的 GIMP 版本时，Peter Mattis 和 Spencer Kimball 创建了 GTK（它代表 GIMP Toolkit），作为 Motif 工具包的替代，后者在那个时候不是免费的。（当这个工具包获得了面向对象特性和可扩展性之后，才在名称后面加上了一个加号。）
 
 GTK(Gnome Toolkit)是一套跨多种平台的图形工具包,按LGPL许可协议发布的。虽然最初是为GIMP写的，但早已发展为一个功能强大、设计灵活的通用图形库。特别是被GNOME选中使得GTK+广为流传，成为Linux下开发图形界面的应用程序的主流开发工具之一，当然GTK+并不要求必须在Linux上，事实上，目前GTK+已经有了成功的windows版本。
GTK+虽然是用C语言写的，但是您可以使用你熟悉的语言来使用GTK+，因为GTK+已经被绑定到几乎所有流行的语言上，如：C++, Guile, Perl, Python, TOM, Ada95, Objective C, Free Pascal, Eiffel等。
 
## 5、Wayland 
Wayland是一个简单的“显示服务器”（Display Server），与X Window属于同一级的事物，而不是仅仅作为X Window下X Server的替代（注：X Window下分X Server和X Client）。也就是说，Wayland不仅仅是要完全取代X Window，而且它将颠覆Linux桌面上X Client/X Server的概念，以后将没有所谓的“X Client”了，而是“Wayland Client”。

 Wayland只是一个协议（Protocol），就像X Window当前的协议——X11一样，它只定义了如何与内核通讯、如何与Client通讯，具体的策略，依然是交给开发者自己。所以Wayland依然 是贯彻“提供机制，而非策略”的Unix程序。
 
## 6、什么是MSI？(Message Signaled Interrupts)
用简单的一句话就可以说明msi的原理：cpu有一段特殊的寄存器空间，往这个寄存器里面写数据，就会触发cpu的中断。pci设备经过配置以后，一旦需要上报中断就会往cpu这种寄存器里面写一个值，触发cpu的中断。

## 7、MSI和INTx的区别
MSI和INTx中断是pci/pcie总线的两种中断方式。
在PCI总线里面INTx中断是由四条可选的中断线决定的，这种中断方式是共享式的，所有的pci设备把中断信号在一条中短线上相与，再上报给cpu，cpu收到中断以后再查询具体是哪个设备产生了中断。
在PCIE总线里面已经没有了实体的INTx物理中断线了，PCIE标准使用专门的Message事务包来实现INTx中断，这是为了兼容以前的PCI软件。
MSI中断在PCI和PCIE中的机制都是一样的，往配置的CPU中断寄存器里进行memory写操作，来产生中断。

对于PCI设备来说，INTx和MSI中断两者只能选择一种，不能同时使用。比较来说，INTx是共享式的，cpu相应中断后还需要查询具体中断源，效率比较低。所以推荐使用MSI中断。

## 8、SIM卡
SIM(Subscriber Identity Module)卡是GSM系统的移动用户所持有的IC卡，称为用户识别卡。GSM系统通过SIM卡来识别GSM用户。同一张SIM卡可在不同的手机上使用。GSM手机只有插入SIM卡后，才能入网使用。
SIM卡是GSM手机连接到GSM网络的钥匙，一旦SIM卡从手机拔出，除了紧急呼叫外，手机将无法享受网络运营者提供的各种服务。SIM卡除了能作为钥匙外，还为用户提供很多方便。用户只需将SIM卡插入或嵌入任何一台GSM终端，即能实现通信。SIM卡还管理许多提供给用户业务的信息，可用来存储短信息，特别是那些当用户不开机或不在时接收的信息。
2021年5月12日，工信部在京召开信息通信行业防范治理电信网络诈骗工作电视电话会议，强化对电话卡、物联网卡等重点业务的风险整治，精准整治非法买卖“电话卡、物联网卡 ”。2022年9月，据中国移动官方消息，中国移动超级SIM卡号码标记功能开启内测，通过标记功能，可拦截骚扰和促销广告来电。

## 9、GSM系统
全球移动通信系统(Global System for Mobile Communications，GSM)是由欧洲电信标准组织ETSI（ European Telecommunications Standards Institute）制订的一个数字移动通信标准。它的空中接口采用时分多址技术。自90年代中期投入商用以来，被全球超过100个国家采用。GSM标准的无处不在使得在移动电话运营商之间签署漫游协定后，用户的国际漫游变得很平常。 GSM 较之它以前的标准最大的不同是它的信令和语音信道都是数字式的，因此GSM被看作是第二代 (2G)移动电话系统。

## 10、IC卡
IC卡 (Integrated Circuit Card，集成电路卡)，也称智能卡(Smart card)、智慧卡(Intelligent card)、微电路卡(Microcircuit card)或微芯片卡等。它是将一个微电子芯片嵌入符合ISO 7816标准的卡基中，做成卡片形式。IC卡与读写器之间的通讯方式可以是接触式也可以是非接触式。由于IC卡具有体积小便于携带、存储容量大、可靠性高、使用寿命长、保密性强安全性高等特点，IC卡的概念是在20世纪70年代初提出来的，法国的布尔公司于1976年首先创造出了IC卡产品，并将这项技术应用于金融、交通、医疗、身份证明等行业，它将微电子技术和计算机技术结合在一起，提高了人们工作、生活的现代化程度。

## 11、GSM手机
GSM全名为：，中文为全球移动通讯系统，俗称"全球通"，由欧洲开发的数字移动电话网络标准，它的开发目的是让全球各地共同使用一个移动电话网络标准，让用户使用一部手机就能行遍全球。GSM系统包括 GSM 900：900MHz、GSM1800：1800MHz 及 GSM-1900、1900MHz等几个频段 。
