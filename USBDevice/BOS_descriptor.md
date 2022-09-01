# 二进制设备对象存储描述符BOS Descriptor

## 1、简介
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






