# windows驱动编程

## 1、英语翻译
interact：互动;相互作用;交流;相互影响;沟通;合作
intend：打算;计划;想要;意指
visual: 视力的;视觉的
universal：普遍的;全体的;全世界的;共同的;普遍存在的;广泛适用的
KMDF: Kernel-Mode Driver Framwork
UMDF: User-Mode Driver Framwork

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

### vs2015实战
创建新项目-》Visual C++-》Windows Driver-》WDF-》KMDF empty
项目属性中：Driver Settings-》General-》可以指定运行平台或操作系统

在source files中新建cpp文件，复制示例代码，编译报错找不到ntddk.h头文件
在vcxproj属性 – > C/C++ – >一般 – >附加包含目录增加：
C:\Program Files (x86)\Windows Kits\10\Include\10.0.14393.0\km\

编译找不到excpt.h头文件，使用everything软件查找：
C:\Program Files (x86)\Windows Kits\10\Include\10.0.14393.0\km\crt\excpt.h

特别注意一下配置和平台与编译环境相对应，不同项会有不同的结果。

编译找不到ctype.h头文件：
C:\Program Files (x86)\Windows Kits\10\Include\10.0.19041.0\ucrt\
C:\Program Files (x86)\Windows Kits\10\Include\10.0.14393.0\km\crt\ctype.h
写错地方了。。。。，结果报错：

C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\include\vcruntime.h
C:\Program Files (x86)\Windows Kits\10\Include\10.0.19041.0\ucrt\corecrt.h

最终还是败给了一直在依赖一个不存在的lib文件。
查看了所有环境变量，path,set命令，都没有发现依赖。
最终在属性-》链接器-》命令行中找到，链接器中的输入可以进行修改，在依赖附加项，右下角宏中找到了环境变量$(DDK_INC_PATH)和$(DDK_LIB_PATH)。
但是无法怎么百度google都无法进行修改删除。

最终选择了卸载相应版本的SDK，发现果然没有了，然后再安装了相同版本的SDK，结果又出现了，开始的路径不是需要的，后面编译成功后变成了正确的。因此，这个是跟SDK有关。










## 5、WDF驱动开发（1）- 一个简单的WDF驱动(non-pnp)
https://blog.csdn.net/zj510/article/details/16983863

什么是pnp？？？

WDF驱动其实是微软公司提供的一套驱动开发的框架。有了这个框架之后，开发驱动会简单一些。WDF本身是从WDM基础上封装而成的。WDF里面封装了很多对象，如WDFDRIVER等。如果要学习使用WDF来开发驱动，个人感觉还是需要WDM的一些基础，不然很多东西挺难理解的。



