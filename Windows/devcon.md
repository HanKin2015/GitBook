# devcon工具

## 1、官方介绍
Windows 设备控制台 (Devcon.exe)

备注：
请使用 PnPUtil 工具，而不使用 DevCon。
PnPUtil命令能直接使用，devcon需要配置环境变量。
```
C:\Users\User>where devcon
C:\Program Files\EDR\agent\bin\devcon.exe

C:\Users\User>where cmd
C:\Windows\System32\cmd.exe

C:\Users\User>where pnputil
C:\Windows\System32\pnputil.exe

C:\Users\Administrator>where devcon
信息: 用提供的模式无法找到文件。
```

DevCon (Devcon.exe)（即设备控制台）是一种命令行工具，用于显示有关运行 Windows 的计算机上的设备的详细信息。 可以使用 DevCon 启用、禁用、安装、配置以及删除设备。
DevCon 在 Microsoft Windows 2000 和更高版本的 Windows 上运行。
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/devtest/devcon

## 2、其他介绍
是一种命令行实用工具，可以替代设备管理器。使用 DevCon，您可以启用、禁用、重新启动、更新、删除和查询单个设备或一组设备。DevCon 提供与开发人员有关但无法在设备管理器中看到的信息。

您可以将 DevCon 用于 Windows 2000 、Windows XP和Windows vista。不能将 Devcon 用于 Microsoft Windows 95、Windows 98、或 Windows Millennium Edition。
看到有人用这个工具开关硬件,小巧也方便,微软出的很官方,举个例子: devcon disable "PCI\VEN_10EC&DEV_8136*" 这个是关闭我机器上的lan;

## 3、介绍几个常用的命令和语法
```
devcon find *     [这个命令可以列出列出本地计算机上存在的所有设备的设备实例]
devcon find pci\* [列出本地计算机上所有已知的“外围组件互连”(PCI) 设备（如果一个设备的硬件 ID 以“PCI\”为前缀，此命令就认为该设备是 PCI 设备]

devcon disable *msloop [禁用硬件 ID 以“MSLOOP”结尾（包括“*MSLOOP”）的所有设备]

devcon enable '*MSLOOP [启用硬件 ID 为“*MSLOOP”的所有设备。单引号指示必须严格按字面解释硬件 ID（换句话说，星号 [“*”] 真的是 一个星号，而不是通配符]

devcon remove @usb\* [删除所有 USB 设备。被删除的设备列出时将显示其删除状态]
```

可以在属性中查找设备示例路径：
```
C:\Users\User>devcon find USB\*
USB\ROOT_HUB\4&2002FA77&1                                   : USB Root Hub
USB\ROOT_HUB20\4&2ACC3A04&0                                 : USB Root Hub
USB\ROOT_HUB\4&3457D897&0                                   : USB Root Hub
USB\ROOT_HUB\4&17BD5F01&0                                   : USB Root Hub
USB\ROOT_HUB\4&F9F7C6&0                                     : USB Root Hub
USB\ROOT_HUB\4&1CB239E3&0                                   : USB Root Hub
USB\ROOT_HUB\4&32218256&0                                   : USB Root Hub
USB\ROOT_HUB20\4&326BD9DE&0                                 : USB Root Hub
USB\ROOT_HUB\4&192D568&0                                    : USB Root Hub
USB\ROOT_HUB\4&36880E1&0                                    : USB Root Hub
10 matching device(s) found.
```
可以通过usb前缀查找usb主控下面挂载的usb设备。

查找vid为30de的usb设备：devcon find *VID_30DE*。
禁用设备：devcon disable *VID_30DE*。
启用设备：devcon disable *VID_30DE*。

注意：需要管理员运行cmd窗口。

## 4、PCI 设备
外设组件互连标准PCI(Peripheral Component Interconnect)是一种由英特尔（Intel）公司1991年推出的用于定义局部总线的标准。
PCI总线系统要求有一个PCI控制卡，它必须安装在一个PCI插槽内。这种插槽是主板带有最多数量的插槽类型，在当前流行的台式机主板上，ATX结构的主板一般带有5～6个PCI插槽，而小一点的MATX主板也都带有2～3个PCI插槽。根据实现方式不同，PCI控制器可以与CPU一次交换32位或64位数据，它允许智能PCI辅助适配器利用一种总线主控技术与CPU并行地执行任务。PCI允许多路复用技术，即允许一个以上的电子信号同时存在于总线之上。

## 5、pnputil工具
个人感觉不好用。

在win7和win10系统上面看见两个版本的pnputil工具。

枚举具有问题的所有设备并显示硬件/兼容 ID:
  pnputil /enum-devices /problem /ids

不好找到指定USB设备。



