# windows驱动编程

## 1、英语翻译
interact：互动;相互作用;交流;相互影响;沟通;合作
intend：打算;计划;想要;意指

## 2、WdfUsbTargetDeviceRetrieveConfigDescriptor function (wdfusb.h)
The WdfUsbTargetDeviceRetrieveConfigDescriptor method retrieves the USB configuration descriptor for the USB device that is associated with a specified framework USB device object.

Minimum KMDF version	1.11
Minimum UMDF version	2.0

Retrieve：检索;取回;检索操作;重新得到;收回

associated：
adj.
有关联的;相关的;有联系的;(用于联合企业的名称)联合的
v.
联想;联系;交往;(尤指)混在一起;表明支持;表示同意

specify：具体说明;明确规定;详述;详列
special：特殊的

Remarks：
n.
谈论;言论;评述;引人注目;显耀
v.
说起;谈论;评论

## 3、WdfUsbTargetDeviceCreate function (wdfusb.h)
The WdfUsbTargetDeviceCreate method creates a framework USB device object for a specified framework device object and opens the USB device for I/O operations.

Note  If you are building your driver using KMDF 1.11 or UMDF 2.0, or later, we recommend that you call WdfUsbTargetDeviceCreateWithParameters instead of WdfUsbTargetDeviceCreate.

## 4、windows10 驱动开发环境 VS2019+WDK10
https://blog.csdn.net/newnewman80/article/details/90754999

SDK可以在vs2019中在线下载，即创建新项目-》安装多个工具和功能-》使用C++的桌面开发 右侧就有Windows 10 SDK下载。
WDK需要单独下载安装：https://docs.microsoft.com/zh-cn/windows-hardware/drivers/download-the-wdk


## 5、WDF驱动开发（1）- 一个简单的WDF驱动(non-pnp)
https://blog.csdn.net/zj510/article/details/16983863

什么是pnp？？？

WDF驱动其实是微软公司提供的一套驱动开发的框架。有了这个框架之后，开发驱动会简单一些。WDF本身是从WDM基础上封装而成的。WDF里面封装了很多对象，如WDFDRIVER等。如果要学习使用WDF来开发驱动，个人感觉还是需要WDM的一些基础，不然很多东西挺难理解的。



