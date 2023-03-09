# usbview

通用串行总线查看器 (USBView)（即 USBView.exe）是一种 Windows 图形 UI 应用，可用于浏览计算机上的所有 USB 控制器和连接的 USB 设备。 USBView 适用于所有版本的 Windows。

## 1、官网介绍
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/debugger/usbview

https://github.com/Microsoft/Windows-driver-samples/tree/master/usb/usbview

## 2、demo
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/ddi/usbioctl/ni-usbioctl-ioctl_usb_get_node_connection_information_ex

https://docs.microsoft.com/en-us/windows-hardware/drivers/ddi/usbioctl/ni-usbioctl-ioctl_usb_get_node_connection_information_ex_v2?redirectedfrom=MSDN

## 3、从何处获取 USBView
若要下载和使用 USBView，请完成以下步骤：

- 下载并安装 Windows SDK。（https://developer.microsoft.com/zh-cn/windows/downloads/windows-sdk/）
- 在安装过程中，仅选择“Windows 调试工具”框，然后清除所有其他框 。
- 默认情况下，在 x64 电脑上，SDK 将 USBView 安装到以下目录中。
- C:\Program Files (x86)\Windows Kits\10\Debuggers\x64
- 打开正在运行的处理器类型的工具包调试器目录，然后选择“usbview.exe”以启动该实用工具。

## 4、更加推荐使用usbtreeview软件
https://www.uwe-sieber.de/usbtreeview_e.html

信息更全，更完整，更新迅速。
比如说，现在20230228，usbview_x64版本才到2011版本，usbtreeview_x64已经到2023版本了，并且还有一些数据包信息。
