[TOC]

Notepad++插件JSON viewer

# USB2.0规范初探（USB2.0协议中文版）

一句话：这本书是真的好用。

## 热插拔
热插拔 （Hot Swap） 即带电插拔，指的是在不关闭系统电源的情况下，将模块、板卡插入或拔出系统而不影响系统的正常工作，从而提高了系统的可靠性、快速维修性、冗余性和对灾难的及时恢复能力等。对于大功率模块化电源系统而言，热插拔技术可在维持整个电源系统电压的情况下，更换发生故障的电源模块，并保证模块化电源系统中其他电源模块正常运作。

## 冷备份
冷备份(cold backup)，也被称为离线备份，是指在关闭数据库并且数据库不能更新的状况下进行的数据库完整备份。并可对数据进行指定恢复

没有找到冷插拔概念和解释，只能想象跟热插拔的相反。



差分信号：差分传输是一种信号传输的技术，区别于传统的一根信号线一根地线的做法，差分传输在这两根线上都传输信号，这两个信号的振幅相等，相位相差180度，极性相反。在这两根线上传输的信号就是差分信号。


## ACPI
ACPI表示高级配置和电源管理接口（Advanced Configuration and Power Management Interface）。对于Windows2000，ACPI定义了Windows 2000、BIOS和系统硬件之间的新型工作接口。这些新接口包括允许Windows 2000控制电源管理和设备配置的机制。

## PCI总线
PCI是Peripheral Component Interconnect(外设部件互连标准)的缩写，它是目前个人电脑中使用最为广泛的接口，几乎所有的主板产品上都带有这种插槽。PCI插槽也是主板带有最多数量的插槽类型，在目前流行的台式机主板上，ATX结构的主板一般带有5～6个PCI插槽，而小一点的MATX主板也都带有2～3个PCI插槽，可见其应用的广泛性。

## USB-HID
是Human Interface Device的缩写，由其名称可以了解HID设备是直接与人交互的设备，例如键盘、鼠标与游戏杆等。不过HID设备并不一定要有人机接口，只要符合HID类别规范的设备都是HID设备。
交换的数据存储在称为报表(report)的结构内，设备的固件必须支持HID报表的格式。主机在控制与中断传输中传送与要求报表，来传送与接收数据。报表的格式非常有弹性，可以处理任何类别的数据。
设备除了HID接口之外，它可能同时还包含有其他的USB接口。例如影像显示设备可能使用HID接口来做亮度，对比，与更新率的软件控制，而使用传统的影 像接口来传送要显示的数据。USB扩音器可以使用实时传输来播放语音，同时使用HID接口来控制音量，震荡，与低音等。HID接口通常比传统的控制接口来得便宜。

--- 

总线供电最多获得500mA电流。
向下兼容
分离传输
一个USB HOST最多同时支持128个地址，地址0为设备枚举默认地址，必须使用USB HUB占用地址，所以数量小于127.


USB体系分层星型拓扑，最多7层，即最多5个USB HUB级联。
ROOT HUB不占用地址，Compound Device多个地址。

轮询的广播机制传输数据，主机发起，任何时刻整个USB体系内仅允许一个数据包的传输
USB 采用“令牌包”-“数据包”-“握手包”的传输机制
握手包表示了传输的成功与否。


数据包：SYNC（同步）、数据、EOP（End of Packet包结束符）

无格式的流管道（Stream Pipe）和有格式的信息管道（Message Pipe）。任何 USB 设备一旦上电就存
在一个信息管道，即默认的控制管道 

USB 设备连接到 HOST 时，HOST 必须通过默认的控制管道对其进行枚举

```
枚举：是 USB 体系中一个很重要的活动，由一系列标准请求组成（若设备属于某个子类，还包含
该子类定义的特殊请求）。通过枚举 HOST 可以获得设备的基本描述信息，如支持的 USB 版本、PID、
VID、设备分类（Class）、供电方式、最大消耗电流、配置数量、各种类型端点的数量及传输能力（最
大包长度）。HOST 根据 PID 和 VID 加载设备驱动程序，并对设备进行合适的配置。只有经过枚举的
设备才能正常使用。对于总线供电设备，在枚举完成前最多可从总线获取 100mA 的电流。 
```

控制传输：枚举、端点0、双向
中断传输：延迟要求高、可靠、单向、轮询的传输方式
批量传输：延迟要求宽松、可靠、单向、不支持低速USB设备、最低的优先级
同步传输：实时、不咋可靠、单向

分离传输（Split Transaction），它仅在主机控制器和 HUB 之间执行，通过分离传输，可以允许全速/低速设备连接到高速主机。分离传输对于 USB 设备来说是透明的、不可见的。

分离传输：顾名思义就是把一次完整的事务传输分成两个事务传输来完成。其出发点是高速传输和全
速/低速传输的速度不相等，如果使用一次完整的事务来传输，势必会造成比较长的等待时间，从而
降低了高速 USB 总线的利用率。通过将一次传输分成两此，将令牌（和数据）的传输与响应数据（和
握手）的传输分开，这样就可以在中间插入其他高速传输，从而提高总线的利用率。 


除端点 0 外，所有的端点只支持一个方向的数据传输。端点0 是一个特殊的端点，它支持双向的控制传输。

不同的传输类型在物理上并没有太大的区别，只是在传输机制、主机安排传输任务、可
占用 USB 带宽的限制以及最大包长度有一定的差异。

所谓单向传输，并不是说该传输只支持一个方向的传输，而是指在某个端点上该传输
仅支持一个方向，或输出，或输入。如果需要在两个方向上进行某种单向传输，需要占用
两个端点，分别配置成不同的方向，可以拥有相同的端点编号。 

标准请求、类请求、厂商请求

```
porn  色情
# 色情片
同义词 Porn一般指色情片
色情片，通常指纯粹只为了激发起观众对性欲望的影视作品或者片段。以前社会风气较为保守的年代，要偷偷摸摸小戏院里放映，发行管道不通畅，要躲在小房 [1]  间里观看，故格局比较小，俗称为小电影。
一般色情片没有实质上的情节内容。随着录像带及影碟的普及，这些电影在21世纪都以这种供个人观赏的形式来发行。有人认为，色情影片的性教育功能很直观有效；但也有人认为，色情影片的“性教育”是对社会大众性心理、性行为的错误导向。

# Pornhub 
Pornhub是一个色情影片分享网站
2007年成立于加拿大蒙特利尔，是大型色情视频分享类网站之一，被视为“色情 2.0”的先驱，在Alexa上排名第80位（最高时曾跻身前30）
2010年，Pornhub和其旗下的Youporn、Redtube等同类网站组成了全球最大的色情视频联盟

# alexa （互联网公司） 
Alexa Internet公司是亚马逊公司的一家子公司，总部位于加利福尼亚州旧金山。于1996年由布鲁斯特·卡利（Brewster Kahle）及布鲁斯·吉里亚特（Bruce Gilliat）成立，作为Internet Archive的分支，受到杰奎琳·萨福拉的埃托勒投资支持。在1999年，被亚马逊公司以约价值两亿五千万美元的股票买下。
Alexa是一家专门发布网站世界排名的网站。以搜索引擎起家的Alexa创建于1996年4月（美国），目的是让互联网网友在分享虚拟世界资源的同时，更多地参与互联网资源的组织。
Alexa每天在网上搜集超过1,000GB的信息，不仅给出多达几十亿的网址链接，而且为其中的每一个网站进行了排名。可以说，Alexa是当前拥有URL数量最庞大，排名信息发布最详尽的网站。
2018年5月，亚马逊宣布向开发者开放两种工具——技能内购买（in-skill purchases）和亚马逊支付支持技能购买（Amazon Pay for skills）。这两项工具的开发意味着为亚马逊智能语音助手Alexa开发新技能的开发者，可以通过功能和服务的开发获取利润，并由Amazon Pay提供支付平台，从而实现类似苹果App Store的闭环。
```



HUB 由 HUB 重发器（HUB Repeater）、转发器（Transaction Translator）以及 HUB 控制
器（HUB Controller）三部分组成。

HUB 在硬件上支持 Reset、Resume、Suspend。
重生与分发：指的是 HUB Repeater 需要识别从上行（下行）PORT 上接收到的数据，并分发到
下行（上行）PORT。所谓分发主要是指从上行PORT 接收到的数据包需要向所有使能的高速下行PORT
发送，即广播。 

- resume重新开始、恢复
- suspend暂停、中止

在 USB总线上和 USB 设备进行通讯。从逻辑上可以分为功能层、设备层和总线接口层三个层次。

---

USB 采用 little edian 字节顺序，在总线上先传输一个字节的最低有效位，最后传输最高
有效位，采用 NRZI 编码，若遇到连续的 6 个 1 要求进行为填充，即插入一个 0。


PID表征数据包类型：令牌、数据、握手、特殊包

CRC校验：

```
循环冗余校验码 
循环冗余校验码（CRC），简称循环码，是一种常用的、具有检错、纠错能力的校验码，在早期的通信中运用广泛。循环冗余校验码常用于外存储器和计算机同步通信的数据校验。奇偶校验码和海明校验码都是采用奇偶检测为手段检错和纠错的(奇偶校验码不具有纠错能力)，而循环冗余校验则是通过某种数学运算来建立数据位和校验位的约定关系的。


循环冗余校验码由信息码n位和校验码k位构成。k位校验位拼接在n位数据位后面，n+k为循环冗余校验码的字长，又称这个校验码（n+k,n）码。 
n位信息位可以表示成为一个报文多项式M(x)，最高幂次是xn-1。约定的生成多项式G(x)是一个k+1位的二进制数，最高幂次是xk。将M(x)乘以xk，即左移k位后，除以G(x)，得到的k位余数就是校验位。这里的除法运算是模2除法，即当部分余数首位是1时商取1，反之商取0。然后每一位的减法运算是按位减，不产生借位。

CRC码存储或传送后，在接收方进行校验过程，以判断数据是否有错，若有错则进行纠错。一个CRC码一定能被生成多项式整除，所以在接收方对码字用同样的生成多项式相除，如果余数为0，则码字没有错误；若余数不为0，则说明某位出错，不同的出错位置余数不同。对（n，k）码制，在生成多项式确定时，出错位置和余数的对应关系是确定的。

样例：https://baike.baidu.com/item/%E5%BE%AA%E7%8E%AF%E5%86%97%E4%BD%99%E6%A0%A1%E9%AA%8C%E7%A0%81?fromtitle=CRC%E6%A0%A1%E9%AA%8C&fromid=3439037

模2运算：https://baike.baidu.com/item/%E6%A8%A12%E8%BF%90%E7%AE%97/18556715?fr=aladdin

与四则运算不同的是模2运算不考虑进位和借位。

```


握手包：ACK肯定、NAK否定、STALL功能错误（熄火抛锚）、NYET尚未准备好要求等待

数据在 USB 总线上的传输以包为单位，包只能在帧内传输。高速 USB 总线的帧周期为
125uS，全速以及低速 USB 总线的帧周期为 1mS。帧的起始由一个特定的包（SOF 包）表
示，帧尾为 EOF。EOF 不是一个包，而是一种电平状态，EOF 期间不允许有数据传输。

加速度一样。
---

## 事务 （计算机术语） 
事务（Transaction），一般是指要做的或所做的事情。在计算机术语中是指访问并可能更新数据库中各种数据项的一个程序执行单元(unit)。事务通常由高级数据库操纵语言或编程语言（如SQL，C++或Java）书写的用户程序的执行所引起，并用形如begin transaction和end transaction语句（或函数调用）来界定。事务由事务开始(begin transaction)和事务结束(end transaction)之间执行的全体操作组成。


USB 允许连续 3 次以下的传输错误，会重试该传输，若成功则将错误次数计数器清零，否则累加该计数器。超过三次后，HOST 认为该端点功能错误（STALL），放弃该端点的传输任务。
一次批量传输（Transfer）由 1 次到多次批量事务传输（Transaction）组成。
翻转同步：发送端按照 DATA0-DATA1-DATA0-…的顺序发送数据包，只有成功的事务传输
才会导致 PID 翻转，也就是说发送段只有在接收到 ACK 后才会翻转 PID，发送下一个数据
包，否则会重试本次事务传输。同样，若在接收端发现接收到到的数据包不是按照此顺序
翻转的，比如连续收到两个 DATA0，那么接收端认为第二个 DATA0 是前一个 DATA0 的
重传。 


transfer：调动变换
Transaction：事务，也叫控制传输？？？
中断传输在流程上除不支持 PING 之外，其他的跟批量传输是一样的。？？？

同步传输有最高的优先级
---

包是 USB 总线是数据传输的最小单位，不能被打断或干扰，否则会引发错误。若干个数据包组
成一次事务传输，一次事务传输也不能打断，属于一次事务传输的几个包必须连续，不能跨帧完成。
一次传输由一次到多次事务传输构成，可以跨帧完成。 

# Bitmap 
位图（Bitmap），又称栅格图（英语：Raster graphics）或点阵图，是使用像素阵列(Pixel-array/Dot-matrix点阵)来表示的图像。

# 使能
使能是负责控制信号的输入和输出的，是一个动词，英文‘Enable’。英文Enable，前缀en-就是使的意思，able就是能够。合起来就是使能。使能通俗点说就是一个“允许”信号，进给使能也就是允许进给的信号，也就是说当进给使能信号有效的时候电机才能转动。一般的数控系统会将电机的进给使能信号跟急停开关和行程限位开关串联起来，当按下急停开关或者机床运转超出行程后，进给使能信号被断开，电机不能继续转动，从而保护机床在安全的行程内运行。

# 中继器
中继器（RP repeater）是工作在物理层上的连接设备。适用于完全相同的两个网络的互连，主要功能是通过对数据信号的重新发送或者转发，来扩大网络传输的距离。 中继器是对信号进行再生和还原的网络设备：OSI模型的物理层设备。
中继器是局域网环境下用来延长网络距离的，但是它属于网络互联设备，操作在OSI的物理层，中继器对在线路上的信号具有放大再生的功能，用于扩展局域网网段的长度（仅用于连接相同的局域网网段）。
中继器（RP repeater）是连接网络线路的一种装置，常用于两个网络节点之间物理信号的双向转发工作。中继器主要完成物理层的功能，负责在两个节点的物理层上按位传递信息，完成信号的复制、调整和放大功能，以此来延长网络的长度。由于存在损耗，在线路上传输的信号功率会逐渐衰减，衰减到一定程度时将造成信号失真，因此会导致接收错误。中继器就是为解决这一问题而设计的。它完成物理线路的连接，对衰减的信号进行放大，保持与原数据相同。一般情况下，中继器的两端连接的是相同的媒体，但有的中继器也可以完成不同媒体的转接工作。从理论上讲中继器的使用是无限的，网络也因此可以无限延长。事实上这是不可能的，因为网络标准中都对信号的延迟范围作了具体的规定，中继器只能在此规定范围内进行有效的工作，否则会引起网络故障。

## 枚举过程(10步)
- 时刻监听端点状态，然后返回bitmap
- HOST查询获取设备基本特性
- 等待设备上电稳定，请求复位并负责控制信号的输入和输出（使能）
- 设备defalut状态
- 端点0请求get_device_descriptor获取设备描述符
- 再次复位PORT
- set_address
- 通过新地址非0端口get_device_descriptor获取设备描述符
- get_configuration
- set_configuration

USB 设备的常用操作包括：设备连接、设备移除、设备配置、地址分配、数据传输、
设备挂起、设备唤醒等。

USB HUB 的架构，主要从 HUB Repeater、HUB Controller 以及Transaction Translator 三个方面展开。另外还包括 USB HUB 类的请求及描述符。
从功能上来说，HUB 必须支持连接行为、电源管理、设备连接/移除检测、总线错误
检测和恢复、高/全/低速设备支持。

HUB Repeater：连接的建立和撤销，连接管理
HUB Controller：通信交互
Transaction Translator：分离传输


数字系统的时钟抖动、计数器量化误差都会带来帧周期的抖动

EOF1 和 EOF2 是两个安全时间，比实际的 EOF 时间稍早。USB HUB 在转发数据包时需要参考这两个
时间，晚于这两个时间发送的包有可能因为抖动而产生 EOF 期间的干扰。

所谓状态改变包括：设备连接、复位完成、设备移除、电流过流等，USB HUB 的硬件负责检测这些
事件的发生，并通过置位反应到 Bitmap 中来。 


# TT （电脑程序中的标签）
<tt> 标签与 <code> 和 <kbd> 标签一样，<tt> 标签和必需的 </tt> 结束标签告诉浏览器，要把其中包含的文本显示为等宽字体。对于那些已经使用了等宽字体的浏览器来说，这个标签在文本的显示上就没有什么特殊效果了。

1．中文太太的简称TT。

2．另外TT（套套）在新新人类里面做为安全套的简称。

3．tt在魔兽争霸游戏中代表山丘之王的风暴之锤（t）和圣骑士的神圣之光（t）。

4．TT在网络语言中为“哭泣”的意思。因为“TT”、“T.T”或“T T”很像一个人的两只眼睛在流眼泪。
5.在游戏暗黑破坏神2毁灭之王中TT是Titan's Revenge的缩写。Titan's Revenge泰坦的复仇，暗金祭奠之标枪，亚马逊专用投掷武器。杀牛必备。

6.TT在巨人网络代理的游戏《艾尔之光》中，是第6职业新二转的机动装甲兵(Tratical Trooper)的缩写。

如：GG（哥哥）、PFPF（佩服佩服）、ZT（转贴）等，这类语言通常是提取中文词组的首个字母，比较容易理解和识别，所以能够被广泛采用传播。

与它相似的还有以英语词组缩写或变化而来的网络用语，如GF（girl friend，女朋友）、PK（来源于网游中的“playerkill”一词，挑战、末位淘汰之意）。

这类网络用语有很多也不符合英语语法规范，甚至是错误的，如CU（see you，再见）、good good study，day day up（好好学习，天天向上），但因其形式简单、输入便捷、表达内涵确切，所以在网络上有相当高的使用频率。

---

同步传输和中断传输被归为周期传输是因为它们的传输是有周期的，HOST 以固定的间隔向同步端点
和中断端点发起传输。相对应的，批量传输和控制传输没有固定的周期。 

ISO设备：

按照处理方式的区别，TT 中的分离传输可以分为两类——周期分离传输和非周期分离
传输。周期分离传输指的是同步分离传输和中断分离传输，非周期分离传输指的是批量分离
传输和控制分离传输。

OUT 型批量/中断分离传输
IN 型的批量/控制分离传输

TT 采用流水的方式处理周期型的分离传输，一次周期型的分离传输在 TT 中共有四种
状态：New、Pending、Ready 以及 Old。一次分离传输依次经历这四种状态。其中 New 态
为这次分离传输在 TT 中建立的状态，是一个暂态、最长不能超过 1 个微帧的时间；Pending
为等待传输完成的状态，最长不能超过 4 个微帧；Ready 为传输已经完成，等待 Host 取回
结果的状态，最长不能超过 2 个微帧；Old 表示传输已经全部完成，TT 中该传输所占用的
Buffer 可以重新利用。

