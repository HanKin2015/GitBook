# USB3.0

## 1、win7默认无USB3.0主控驱动
新架构装了win7系统后一般需要手动安装usb3.0主控驱动。

驱动精灵已开启收费模式，下载速度慢的跟狗一样，所以推荐选择360驱动大师。神！！！
瞬间秒解决USB3.0主控驱动问题，通用串行USB控制器感叹号就是因为USB3.0主控驱动没有安装导致。

另外发现驱动人生7.1版本也是不好用，安装USB3.0主控失败，并且也没有其他驱动版本可供选择，但是360驱动大师就是不一样，有各种各样的版本供安装。

注意有架构的区分：
AMD USB 3.0 Host Controller版本最新是1.1.0.0249（20170505）
Advanced Micro Devices, INC.
amdhub30.sys  amdxhc.sys

Intel(R) Corporation版本最新是5.0.4.24（20170505）
iusb3xhc.sys

Microsoft Corporation版本
USBHUB3.sys  USBXHCI.SYS  

装完后还有AMD USB 3.0 Root Hub版本最新是1.1.0.0249（20170505）

## 2、USB3.0为什么要叫USB3.1 Gen1 
USB 3.1 Gen1就是USB 3.0。而USB 3.1 Gen2才是真正的USB3.1。USB 2.0的最大传输带宽为480Mbps（即60MB/s），USB 3.0（即USB 3.1 Gen1）的最大传输带宽为5.0Gbps（625MB/s），USB 3.1 Gen2的最大传输带宽为10.0Gbps。

虽然USB 3.1标称的接口理论速率是10Gbps，但是其还保留了部分带宽用以支持其他功能，因此其实际的有效带宽大约为7.2Gbps。USB 2.0为四针接口，USB 3.0和USB 3.1为九针接口。

1. USB 3.0 的定义
- USB 3.0 是在 2008 年发布的 USB 标准，提供了高达 5 Gbps 的数据传输速率。它引入了许多新特性，如更高的带宽、更多的电力供给和更好的数据传输效率。

2. USB 3.1 的发布
- USB 3.1 于 2013 年发布，进一步提升了 USB 的性能。USB 3.1 引入了两个主要的传输速率：
    - USB 3.1 Gen 1：实际上是 USB 3.0 的重新命名，仍然提供高达 5 Gbps 的传输速率。
    - USB 3.1 Gen 2：提供高达 10 Gbps 的传输速率。

3. 为什么 USB 3.0 被称为 USB 3.1 Gen 1
- 统一命名：USB 3.1 的发布使得 USB 组织决定对 USB 3.0 进行重新命名，以便于与新标准（USB 3.1 Gen 2）进行区分。这样做的目的是为了简化市场上的产品分类，使消费者更容易理解不同版本之间的性能差异。
- 向后兼容性：USB 3.1 Gen 1 仍然与 USB 3.0 设备兼容，因此将其重新命名为 USB 3.1 Gen 1 也反映了这一点。

USB3.2 Gen1（SuperSpeed USB） = USB3.1 Gen1 = USB 3.0 : (625MB/s)
USB3.2 Gen2（SuperSpeed USB 10Gbps） = USB3.1 Gen2 : (1250MB/s)
USB3.2 Gen2（SuperSpeed USB 20Gbps） = USB 3.1 Gen 2 x 2 = USB4 20 : (2500MB/s)
USB4 40 = 雷电3 = 雷电4 : 40Gbps (5000MB/s)

![USB家族](https://pic2.zhimg.com/v2-4468b539cd2f238b85acab3ae130b1ea_r.jpg?source=1940ef5c)

## 3、正确识别USB3.0接口
USB3.0接口一定是蓝色的吗？

答案是否定的。

USB3.0规范中并没有规定接口必须使用什么颜色，使用蓝色或其他颜色只是为了更直观的和2.0接口作区分，突出产品特点（或卖点）。因此不能直接简单地以蓝色接口来区分USB3.0。

联想电脑中，USB3.0除了蓝色的，也可能是红色（或桔红色）或者黑色（和USB2.0一样）。

## 4、USB3.X、USB4与雷电4的区别

### 4-1. USB 3.x
- 定义：USB 3.x 是 USB（通用串行总线）标准的一个系列，主要包括 USB 3.0、USB 3.1（分为 Gen 1 和 Gen 2）和 USB 3.2。
- 传输速率：
    - USB 3.0：最高 5 Gbps（即 USB 3.1 Gen 1）。
    - USB 3.1 Gen 2：最高 10 Gbps。
    - USB 3.2：可支持多达 20 Gbps（通过双通道传输）。
- 接口类型：USB 3.x 通常使用 USB Type-A 和 USB Type-C 接口。
- 向后兼容性：USB 3.x 向后兼容 USB 2.0 和 USB 1.1。

### 4-2. USB4
- 定义：USB4 是 USB 标准的最新版本，于 2019 年发布，旨在统一 USB 生态系统并提高性能。
- 传输速率：USB4 支持高达 40 Gbps 的数据传输速率。
- 接口类型：USB4 仅使用 USB Type-C 接口。
- 兼容性：USB4 向后兼容 USB 3.x 和 USB 2.0 设备。
- 多功能性：USB4 支持多种协议，包括 DisplayPort 和 PCIe，允许同时传输数据和视频信号。
- Thunderbolt 3 兼容性：USB4 兼容 Thunderbolt 3 设备，允许更广泛的设备互操作性。

### 4-3. Thunderbolt 4（雷电 4）
- 定义：Thunderbolt 4 是 Intel 开发的高性能接口标准，于 2020 年发布。它基于 USB4，但提供了更严格的性能和功能要求。
- 传输速率：Thunderbolt 4 支持高达 40 Gbps 的数据传输速率。
- 接口类型：Thunderbolt 4 仅使用 USB Type-C 接口。
- 兼容性：Thunderbolt 4 向后兼容 Thunderbolt 3、USB4、USB 3.x 和 USB 2.0 设备。
- 功能要求：
    - 支持至少两个 4K 显示器或一个 8K 显示器。
    - 支持 PCIe 数据传输，提供高达 32 Gbps 的带宽。
    - 支持充电功能，提供至少 15W 的电力供给。
    - 支持更高的安全性和更好的电缆长度（最长可达 2 米的主动电缆）。

### 4-4. 结论
- USB 3.x 适合一般的数据传输需求，提供了良好的性能和兼容性。
- USB4 提供了更高的传输速率和多功能性，适合需要高带宽和多协议支持的应用。
- Thunderbolt 4 是高端用户和专业应用的理想选择，提供了更严格的性能标准和更高的功能要求，适合需要高性能数据传输和多显示器支持的场景。