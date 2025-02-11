# 深入理解描述符请求

# 1、设备描述符解读
```
Device Descriptor:
bcdUSB:             0x0110
bDeviceClass:         0x00
bDeviceSubClass:      0x00
bDeviceProtocol:      0x00
bMaxPacketSize0:      0x40 (64)
idVendor:           0x1483
idProduct:          0xC007
bcdDevice:          0x0100
iManufacturer:        0x01
iProduct:             0x02
iSerialNumber:        0x00
bNumConfigurations:   0x01

ConnectionStatus: DeviceConnected
Current Config Value: 0x01
Device Bus Speed:     Full
Device Address:       0x01
Open Pipes:              1

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0008 (8)
bInterval:            0x0A

Configuration Descriptor:
wTotalLength:       0x0022
bNumInterfaces:       0x01
bConfigurationValue:  0x01
iConfiguration:       0x00
bmAttributes:         0x80 (Bus Powered )
MaxPower:             0x32 (100 mA)

Interface Descriptor:
bInterfaceNumber:     0x00
bAlternateSetting:    0x00
bNumEndpoints:        0x01
bInterfaceClass:      0x03 (HID)
bInterfaceSubClass:   0x00
bInterfaceProtocol:   0x00
iInterface:           0x00

HID Descriptor:
bcdHID:             0x0110
bCountryCode:         0x00
bNumDescriptors:      0x01
bDescriptorType:      0x22
wDescriptorLength:  0x0121

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0008 (8)
bInterval:            0x0A
```

参考资料：《圈圈教你玩USB》

GET_DESCRIPTOR获取描述符请求是在枚举过程中用得最多的一个请求。
请求类型是0x80，获取描述符请求代码是0x06，因此开头为0x80 0x06的是获取描述符请求。

总体来说注意一点，一个双字节的域抓取的数据包显示和usbview是相反的，即大端和小端的区别。

1. 设备描述符
请求数据包：80 06 0100 0000 0012 18
长度为18字节，描述符类型为1，因此开头是0x12,0x01。
后面16个字节可以通过usbview软件看见其值。
bcdUSB：USB协议版本

2. 配置描述符
请求数据包：80 06 0200 0000 0009 9
长度为9字节，描述符类型为2，因此开头是0x09,0x02。
后面7个字节可以通过usbview软件看见其值。

3. 字符串描述符
当索引值为0时，表示获取语言ID。语言ID是一个描述该设备支持的语言种类的数组，每个ID占2个字节。
请求数据包：80 06 0300 0000 00ff 255
回包：4 = 04030904

厂商字符串请求数据包：80 06 0301 0409 00ff 255
产品字符串请求数据包：80 06 0302 0409 00ff 255
产品序列号请求数据包：80 06 0303 0409 00ff 255

可选的，一般来说可能没有。
长度不固定，描述符类型为3，因此开头是0xxx,0x03。
后面x个字节可以通过usbview软件看见其值。

4. 接口描述符
注意在配置描述符+接口描述符+HID描述符+端点描述符中。
假设每个描述符只有一个，则总共长度为34=9+9+9+7。

长度为9字节，描述符类型为4，因此开头是0x09,0x04。
后面7个字节可以通过usbview软件看见其值。

5. 端点描述符
长度为7字节，描述符类型为5，因此开头是0x07,0x05。
后面5个字节可以通过usbview软件看见其值。

6. HID描述符
长度为9字节，描述符类型为0x21，因此开头是0x09,0x21。
后面7个字节可以通过usbview软件看见其值。

# 2、学习分析盒子数据包
抓取的枚举数据包：
```
d891c280 2116911208 S Ci:3:006:0 s 80 06 0100 0000 0012 18 <
d891c280 2116956319 C Ci:3:006:0 0 18 = 12011001 00000040 831407c0 00010102 0001
d891c280 2116956346 S Ci:3:006:0 s 80 06 0200 0000 0009 9 <
d891c280 2116958194 C Ci:3:006:0 0 9 = 09022200 01010080 32
d891c280 2116958214 S Ci:3:006:0 s 80 06 0200 0000 0022 34 <
d891c280 2116960692 C Ci:3:006:0 0 34 = 09022200 01010080 32090400 00010300 00000921 10010001 22210107 05830308
d891c280 2116960740 S Ci:3:006:0 s 80 06 0300 0000 00ff 255 <
d891c280 2116961318 C Ci:3:006:0 0 4 = 04030904
d891c280 2116961333 S Ci:3:006:0 s 80 06 0302 0409 00ff 255 <
d891c280 2116962192 C Ci:3:006:0 0 12 = 0c035400 6f006b00 65006e00
d891c280 2116962208 S Ci:3:006:0 s 80 06 0301 0409 00ff 255 <
d891c280 2116962942 C Ci:3:006:0 0 8 = 08035500 53004200
d891c280 2116963464 S Co:3:006:0 s 00 09 0001 0000 0000 0
d891c280 2116963822 C Co:3:006:0 0 0
d891c280 2116964267 S Co:3:006:0 s 21 0a 0000 0000 0000 0
d891c280 2116964442 C Co:3:006:0 0 0
d891c280 2116964481 S Ci:3:006:0 s 81 06 2200 0000 0121 289 <
d891c280 2116974580 C Ci:3:006:0 0 289 = 06a8ff09 00a10115 0026ff00 75088501 95070901 b1828502 950f0901 b1828503
```

# 3、usbview查看usb设备信息
```
Device Descriptor:
bcdUSB:             0x0210
bDeviceClass:         0x00
bDeviceSubClass:      0x00
bDeviceProtocol:      0x00
bMaxPacketSize0:      0x40 (64)
idVendor:           0x0BDA (Realtek Semiconductor Corp.)
idProduct:          0x8152
bcdDevice:          0x2000
iManufacturer:        0x01
0x0409: "Realtek"
iProduct:             0x02
0x0409: "USB 10/100 LAN"
iSerialNumber:        0x03
0x0409: "00E04C36006B"
bNumConfigurations:   0x02

ConnectionStatus: DeviceConnected
Current Config Value: 0x01
Device Bus Speed:     High
Device Address:       0x05
Open Pipes:              3

Endpoint Descriptor:
bEndpointAddress:     0x81  IN
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x02  OUT
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0002 (2)
bInterval:            0x08

Configuration Descriptor:
wTotalLength:       0x0027
bNumInterfaces:       0x01
bConfigurationValue:  0x01
iConfiguration:       0x00
bmAttributes:         0xA0 (Bus Powered Remote Wakeup)
MaxPower:             0x32 (100 mA)

Interface Descriptor:
bInterfaceNumber:     0x00
bAlternateSetting:    0x00
bNumEndpoints:        0x03
bInterfaceClass:      0xFF
bInterfaceSubClass:   0xFF
bInterfaceProtocol:   0x00
iInterface:           0x00

Endpoint Descriptor:
bEndpointAddress:     0x81  IN
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x02  OUT
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0002 (2)
bInterval:            0x08
```

# 4、两次配置描述符
```
d87ae880 2886323691 S Ci:2:041:0 s 80 06 0100 0000 0012 18 <
d87ae880 2886324348 C Ci:2:041:0 0 18 = 12010002 ef020140 164b0c28 00010102 0301
d87ae880 2886324374 S Ci:2:041:0 s 80 06 0200 0000 0009 9 <
d87ae880 2886324535 C Ci:2:041:0 0 9 = 09028b04 030100c0 32
d87ae880 2886324554 S Ci:2:041:0 s 80 06 0200 0000 048b 1163 <
d87ae880 2886325173 C Ci:2:041:0 0 1163 = 09028b04 030100c0 32080b00 030e0300 00090400 00010e01 00000e24 0100015a
d87ae880 2886325203 S Ci:2:041:0 s 80 06 0300 0000 00ff 255 <
d87ae880 2886325404 C Ci:2:041:0 0 4 = 04030904
d87ae880 2886325421 S Ci:2:041:0 s 80 06 0302 0409 00ff 255 <
d87ae880 2886325656 C Ci:2:041:0 0 14 = 0e034800 57002d00 32003800 4600
d87ae880 2886325672 S Ci:2:041:0 s 80 06 0301 0409 00ff 255 <
d87ae880 2886325906 C Ci:2:041:0 0 28 = 1c034c00 74006900 61006e00 20004300 6f002000 4c007400 64002000
d87ae880 2886325922 S Ci:2:041:0 s 80 06 0303 0409 00ff 255 <
d87ae880 2886326162 C Ci:2:041:0 0 18 = 12033000 31002e00 30003000 2e003000 3000
d87ae880 2886326685 S Co:2:041:0 s 00 09 0001 0000 0000 0
d87ae880 2886326836 C Co:2:041:0 0 0
d87ae880 2886327571 S Co:2:041:0 s 01 0b 0000 0001 0000 0
d87ae880 2886327718 C Co:2:041:0 0 0
d87ae880 2886327792 S Ci:2:041:0 s a1 87 0100 0001 001a 26 <
d87ae880 2886340179 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 000000fc 0300f807 0000
d87ae880 2886340202 S Co:2:041:0 s 21 01 0100 0001 001a 26 = 00000101 80969800 00000000 3d000000 000000fc 0300f807 0000
d87ae880 2886340423 C Co:2:041:0 0 26 >
d87ae880 2886340491 S Ci:2:041:0 s a1 81 0100 0001 001a 26 <
d87ae880 2886340669 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 000000fc 0300f807 0000
d87ae880 2886340928 S Co:2:041:0 s 01 0b 0000 0002 0000 0
d87ae880 2886341080 C Co:2:041:0 0 0
d87ae880 2886341116 S Ci:2:041:0 s a1 87 0100 0002 001a 26 <
d87ae880 2886347479 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 00000058 0200f807 0000
d87ae880 2886347497 S Co:2:041:0 s 21 01 0100 0002 001a 26 = 00000101 80969800 00000000 3d000000 00000058 0200f807 0000
d87ae880 2886347652 C Co:2:041:0 0 26 >
d87ae880 2886347747 S Ci:2:041:0 s a1 81 0100 0002 001a 26 <
d87ae880 2886347922 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 00000058 0200f807 0000
d87ae880 2887583522 S Ii:2:041:7 -115:1 16 <
d87ae880 2887590621 C Ii:2:041:7 -2:1 0
d87ae880 2887593960 S Ii:2:041:7 -115:1 16 <
d87ae880 2887601025 C Ii:2:041:7 -2:1 0
d87ae880 2887601422 S Ii:2:041:7 -115:1 16 <
d87ae880 2887601710 C Ii:2:041:7 -2:1 0
d87ae880 2887601904 S Ii:2:041:7 -115:1 16 <
```
比较可疑的地方是两次配置描述符请求，第二次居然有1163字节大小的配置数据包。

看了一下书，每个USB设备至少都要有一个配置描述符，在设备描述符中规定了该设备有多少种配置，每种配置都有一个描述符。真是少见多怪。

## 5、端点描述符中的传输类型
详情见usb_20.pdf中的270页：
在USB端点描述符中，bmAttributes 字段表示端点的属性。它是一个8位的字段，其中包含了端点的传输类型和同步类型。具体取值的含义如下：

位 0 和 1：表示端点的传输类型。以下是可能的取值及其含义：
- 00: 控制传输
- 01: 等时传输
- 10: 批量传输
- 11: 中断传输

位 2 和 3：表示端点的同步类型。以下是可能的取值及其含义：
- 00: 无
- 01: 异步
- 10: 自适应
- 11: 同步

因此，通过分析 bmAttributes 字段的不同取值，可以了解端点的传输类型和同步类型，从而更好地理解 USB 设备的通信特性。
因此通过usbtreeview软件就会看见1和5都是代表着等时传输的情况。

## 6、设备限定描述符(Device Qualifier Descriptor)
https://blog.csdn.net/u012028275/article/details/109276309
设备限定描述符(Device Qualifier Descriptor)说明了能进行高速操作的设备在其他速度时产生的变化信息。例如，如果设备当前在全速下操作，设备限定描述符返回它如何在高速运行的信息。

如果设备既支持全速状态又支持高速状态，那么就必须含有设备限定描述符(Device Qualifier Descriptor)。设备限定描述符(Device Qualifier Descriptor)中含有当前没有使用的速度下这些字段的取值。

设备限定描述符(Device Qualifier Descriptor)不包含标准设备描述符中的厂商、产品、设备、制造厂商、产品和序列号场，因为在所有支持的速度下设备的这些信息都是常数。这个描述符的版本号至少是2.0(0200H)。

如果只能进行全速(full-speed)操作的设备(设备描述符的版本号等于0200H)接收到请求设备限定符的Get Descriptor请求，它必须用请求错误响应，回复STALL来响应。

主机端只能在成功取得设备限定描述符(Device Qualifier Descriptor)之后，才能请求其他速度配置(other_speed_configuration)描述符。

## 7、二进制设备对象存储描述符BOS Descriptor

### 7-1、简介
二进制设备对象存储描述符(Binary Device Object Store Descriptor)，简写成BOS描述符(BOS Descriptor)。

BOS描述符(BOS Descriptor)是用于存储特定某项技术或设备功能信息的描述符，和设备功能描述符(Device Capability Descriptor)一起由Wireless Universal Serial Bus Specification Revision 1.0规范引入，之后在USB 2.0 ECN: Link Power Management (LPM) 、USB3.x Specification、Microsoft OS 2.0 Descriptors Specification 等协议规范都加入了定义。

BOS描述符(BOS Descriptor)定义了一个与配置描述符(Configuration Descriptor)类似的根描述符(root descriptor)，是一个或多个设备功能描述符(Device Capability Descriptor)的基础描述符。主机端通过BOS描述符的wTotalLength字段获取整个BOS描述符集的大小，再通过这个大小来获取完整的描述符集。

主机使用GetDescriptor()请求获取BOS描述符(BOS Descriptor)。主机端不能单独读取单个的设备功能描述符(Device Capability Descriptor)，只能通过GetDescriptor()请求获取BOS描述符(BOS Descriptor)并通过wTotalLength字段得到长度来读取整个描述符集。

在USB 2.0 ECN: Link Power Management (LPM)中定义，标准usb 2.0设备描述符(Device Descriptor)中bcdUSB字段的值，用于指示设备支持读取BOS描述符(即GetDescriptor（BOS）)的请求。支持BOS描述符的设备的bcdUSB值必须是0201H或更大的值。 另外，Microsoft OS 2.0 Descriptors Specification中定义，设备描述符(Device Descriptor)中的USB版本必须是usb 2.1及更高版本。

bLength以字节为单位的描述符大小 (0x05)。
bDescriptorTypeBOS描述符类型，为BOS(0x0F)。
wTotalLength 此描述符及其所有子描述符的总长度。主机端通过BOS描述符的wTotalLength字段获取整个BOS描述符集的大小，再通过这个大小来获取完整的描述符集。
bNumDeviceCaps 在BOS中独立的设备功能描述符(Device Capability Descriptor)数量。

详细参考：https://blog.csdn.net/u012028275/article/details/109953472

### 7-2、进一步理解
BOS 描述符（Binary Object Store Descriptor）是 USB 设备中的一个可选描述符，用于标识设备中存储的二进制对象（Binary Objects）。这些二进制对象可以是固件、配置数据或其他设备相关的数据。BOS 描述符的作用是告诉主机设备中存在哪些二进制对象，以及如何访问它们。
```
typedef struct {
    uint8_t  bLength;          // 描述符的总长度
    uint8_t  bDescriptorType; // 描述符类型（BOS 描述符类型为 0x0F）
    uint16_t wTotalLength;    // 所有 BOS 描述符的总长度（包括 BOS 描述符本身和后续的 BOS 元素描述符）
    uint8_t  bNumDeviceCaps;   // 设备功能的数量（即后续 BOS 元素描述符的数量）
    // 后续是 bNumDeviceCaps 个 BOS 元素描述符
} BOS_DESCRIPTOR;
```

根据USB规范的官方定义，BOS描述符并不是USB 2.1版本引入的，而是USB 3.0及以上版本设备所特有的。USB 2.1版本主要改进了低速和全速设备的性能，以及引入了新的充电检测和电池充电规范，但并未包含BOS描述符的相关内容。

因此，只有符合USB 3.0及以上版本规范的设备才会包含BOS描述符。BOS描述符的引入是为了支持USB 3.0新增的功能，如设备固件更新（DFU）和电源交付（PD）。这些功能在USB 2.1版本中并不存在，因此BOS描述符也是USB 3.0版本特有的。

### 7-3、跳过BOS描述符查询
注册表位置：计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\usbflags\0C4564AF2925
其中0C4564AF是设备硬件ID，2925是设备描述符中的bcdDevice，用于标识USB当前产品的固件版本号，在Windows中生成的硬件ID中为REV，如USB\VID_12D1&PID_3A07&REV_0024。
然后在当前路径下可以添加osvc、SkipBOSDescriptorQuery、SkipContainerIdQuery等二进制值，其中：
osvc 是 "Operating System Vendor Class" 的缩写，用于标识设备的操作系统供应商类。
SkipBOSDescriptorQuery 系统将跳过对该设备的 BOS 描述符的查询。这可能用于优化性能，或者处理某些不支持 BOS 描述符的设备。
SkipContainerIdQuery 系统将跳过对该设备的 ContainerId 的查询。这可能用于优化性能，或者处理某些不需要 ContainerId 查询的设备。

二进制值示例为01 00 00 00，ContainerId 是一个全局唯一标识符（GUID），用于标识 USB 设备的容器。这个容器可以是 USB 集线器、设备或其他类型的连接点。ContainerId 的主要作用是帮助操作系统识别和管理连接到计算机的 USB 设备，尤其是在多个设备连接到同一 USB 控制器时。












