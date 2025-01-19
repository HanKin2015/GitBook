# 命令行工具

## 1、devcon工具

### 1-1、简介
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

C:\program files (x86)\Windows Kits\10\Tools\x64>devcon.exe help
Device Console Help:
devcon.exe [-r] [-m:\\<machine>] <command> [<arg>...]
-r           Reboots the system only when a restart or reboot is required.
<machine>    Specifies a remote computer.
<command>    Specifies a Devcon command (see command list below).
<arg>...     One or more arguments that modify a command.
For help with a specific command, type: devcon.exe help <command>
classfilter          Add, delete, and reorder class filters.

classes              List all device setup classes.

disable              Disable devices.

driverfiles          List installed driver files for devices.

drivernodes          List driver nodes of devices.

enable               Enable devices.

C:\program files (x86)\Windows Kits\10\Tools\x64>devcon.exe hwids *PCI*
PCI\VEN_1AF4&DEV_1000&SUBSYS_00011AF4&REV_00\3&13C0B0C5&0&90
    Name: Sangfor FastIO Ethernet Adapter #2
    Hardware IDs:
        PCI\VEN_1AF4&DEV_1000&SUBSYS_00011AF4&REV_00
        PCI\VEN_1AF4&DEV_1000&SUBSYS_00011AF4
        PCI\VEN_1AF4&DEV_1000&CC_020000
        PCI\VEN_1AF4&DEV_1000&CC_0200
```

DevCon (Devcon.exe)（即设备控制台）是一种命令行工具，用于显示有关运行 Windows 的计算机上的设备的详细信息。 可以替代设备管理器，使用 DevCon 启用、禁用、安装、配置以及重新启动、更新、删除和查询单个设备或一组设备。DevCon 提供与开发人员有关但无法在设备管理器中看到的信息。
DevCon 在 Microsoft Windows 2000 和更高版本的 Windows 上运行。不能将 Devcon 用于 Microsoft Windows 95、Windows 98、或 Windows Millennium Edition。
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/devtest/devcon

看到有人用这个工具开关硬件,小巧也方便,微软出的很官方,举个例子: devcon disable "PCI\VEN_10EC&DEV_8136*" 这个是关闭我机器上的lan;

### 1-2、介绍几个常用的命令和语法
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

### 1-3、PCI 设备
外设组件互连标准PCI(Peripheral Component Interconnect)是一种由英特尔（Intel）公司1991年推出的用于定义局部总线的标准。
PCI总线系统要求有一个PCI控制卡，它必须安装在一个PCI插槽内。这种插槽是主板带有最多数量的插槽类型，在当前流行的台式机主板上，ATX结构的主板一般带有5～6个PCI插槽，而小一点的MATX主板也都带有2～3个PCI插槽。根据实现方式不同，PCI控制器可以与CPU一次交换32位或64位数据，它允许智能PCI辅助适配器利用一种总线主控技术与CPU并行地执行任务。PCI允许多路复用技术，即允许一个以上的电子信号同时存在于总线之上。

## 2、pnputil工具
个人感觉不好用。

在win7和win10系统上面看见两个版本的pnputil工具。

枚举具有问题的所有设备并显示硬件/兼容 ID:
pnputil /enum-devices /problem /ids
不好找到指定USB设备。

枚举安装的所有驱动
pnputil /enum-drivers

卸载驱动驱动程序包
pnputil /delete-driver oem60.inf
无法删除驱动程序包: 一个或多个设备目前使用指定的 INF 安装
pnputil /delete-driver oem60.inf /force

导出驱动程序包
pnputil /export-driver oem60.inf d:\backup

这个驱动程序包卸载后，并不影响当前驱动加载使用。是不是需要重新启动物理机才会生效？反正扫描硬件改动并没有效果。
至少sys驱动还是会存在，重启物理机后该设备驱动并不影响当前驱动加载使用。

这个时候添加程序驱动包
```
C:\Windows\system32>pnputil /add-driver "C:\Program Files (x86)\drivers_win10\Usbhub\usbhub.inf"
Microsoft PnP 工具

正在添加驱动程序包:  usbhub.inf
已成功添加驱动程序包。(系统中已存在)
发布名称:         oem19.inf

驱动程序包总数:  1
已添加驱动程序包数:  1
```

后面找到卸载参数
```
C:\Windows\system32>pnputil /delete-driver oem19.inf /uninstall
Microsoft PnP 工具

需要重新启动系统才能完成卸载操作!
已成功删除驱动程序程序包。
需要重新启动系统才能完成取消配置操作!
```
这个时候扫描检测硬件改动后设备就不存在了

## 3、sc命令

### 3-1、基本用法
计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\SamSs
```
C:\Users\User>sc query samss

SERVICE_NAME: samss
        TYPE               : 20  WIN32_SHARE_PROCESS
        STATE              : 4  RUNNING
                                (NOT_STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0

C:\Users\User>sc query hj
[SC] EnumQueryServicesStatus:OpenService 失败 1060:

指定的服务未安装。

C:\Users\User>sc query scmbus

SERVICE_NAME: scmbus
        TYPE               : 1  KERNEL_DRIVER
        STATE              : 1  STOPPED
        WIN32_EXIT_CODE    : 1077  (0x435)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
```

https://www.jb51.net/article/266527.htm
注册表服务中的Start值：
Start=0 boot
Start=1 system
Start=2 自动
Start=3 手动
Start=4 禁用

可以通过sc config命令查看其对应关系：
```
C:\WINDOWS\system32>sc config
描述:
        在注册表和服务数据库中修改服务项。
用法:
        sc <server> config [服务名称] <option1> <option2>...

选项:
注意: 选项名称包括等号。
      等号和值之间需要一个空格。
      要删除依赖关系，请使用单个“/”表示依赖关系值。
 type= <own|share|interact|kernel|filesys|rec|adapt|userown|usershare>
 start= <boot|system|auto|demand|disabled|delayed-auto>
 error= <normal|severe|critical|ignore>
 binPath= <.exe 文件的 BinaryPathName>
 group= <LoadOrderGroup>
 tag= <yes|no>
 depend= <依赖关系(以 / (正斜杠)分隔)>
 obj= <AccountName|ObjectName>
 DisplayName= <显示名称>
 password= <密码>
```

### 3-2、创建服务
demo：D:\Github\Storage\windows\MyWindowsService\MyWindowsService
安装服务：sc create MyWindowsService binPath= "C:\path\to\your\MyWindowsService.exe"
启动服务：sc start MyWindowsService
```
C:\WINDOWS\system32>sc query MywindowsService
[SC] EnumQueryServicesStatus:OpenService 失败 1060:

指定的服务未安装。


C:\WINDOWS\system32>sc create MywindowsService binpath="D:\Users\User\My Document\Visual Studio 2015\Projects\MyWindowsService\Debug\MyWindowsService.exe"
[SC] CreateService 成功

C:\WINDOWS\system32>sc query MywindowsService

SERVICE_NAME: MywindowsService
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 1  STOPPED
        WIN32_EXIT_CODE    : 1077  (0x435)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
C:\WINDOWS\system32>sc start MywindowsService

SERVICE_NAME: MywindowsService
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 4  RUNNING
                                (STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
        PID                : 22680
        FLAGS              :

C:\WINDOWS\system32>sc stop MywindowsService

SERVICE_NAME: MywindowsService
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 3  STOP_PENDING
                                (NOT_STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x4
        WAIT_HINT          : 0x0

C:\WINDOWS\system32>sc query MywindowsService

SERVICE_NAME: MywindowsService
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 1  STOPPED
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0
```

如果我在代码中不处理stop命令，则无法停止该服务，如：
```
C:\WINDOWS\system32>sc stop MywindowsService

SERVICE_NAME: MywindowsService
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 4  RUNNING
                                (STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0

C:\WINDOWS\system32>sc stop MywindowsService
[SC] ControlService 失败 1061:

服务无法在此时接受控制信息。
```

### 3-3、[SC] ControlService 失败 1052
```
C:\WINDOWS\system32>sc stop commonusb2
[SC] ControlService 失败 1052:

请求的控件对此服务无效。

C:\WINDOWS\system32>net stop commonusb2
这项服务无法接受请求的“暂停”、“继续”或“停止”操作。

请键入 NET HELPMSG 2191 以获得更多的帮助。

C:\WINDOWS\system32>sc stop srv2
[SC] ControlService 失败 1051:

停止控制被发送到其他正在运行的服务所依赖的服务。


C:\WINDOWS\system32>net stop srv2
下面的服务依赖于 Server SMB 2.xxx Driver 服务。
停止 Server SMB 2.xxx Driver 服务也会停止这些服务。

   Server

你想继续此操作吗? (Y/N) [N]: n

You can neither start nor stop PnP filters with the Service Control Manager. You need to use an INF and Device Manager (or devcon).
```
https://community.osr.com/t/driver-service-cannot-be-stopped/54781

```
C:\WINDOWS\system32>sc qc commonusb2
[SC] QueryServiceConfig 成功

SERVICE_NAME: sangfor_commonusb2
        TYPE               : 1  KERNEL_DRIVER
        START_TYPE         : 3   DEMAND_START
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : \??\C:\WINDOWS\system32\drivers\CommonUsb2.sys
        LOAD_ORDER_GROUP   : Camera LowerFilters Extend
        TAG                : 0
        DISPLAY_NAME       : commonusb2
        DEPENDENCIES       :
        SERVICE_START_NAME :

C:\WINDOWS\system32>sc qc srv2
[SC] QueryServiceConfig 成功

SERVICE_NAME: srv2
        TYPE               : 2  FILE_SYSTEM_DRIVER
        START_TYPE         : 3   DEMAND_START
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : System32\DRIVERS\srv2.sys
        LOAD_ORDER_GROUP   : Network
        TAG                : 0
        DISPLAY_NAME       : Server SMB 2.xxx Driver
        DEPENDENCIES       : srvnet
        SERVICE_START_NAME :

C:\WINDOWS\system32>sc qc mywindowsservice
[SC] QueryServiceConfig 成功

SERVICE_NAME: mywindowsservice
        TYPE               : 10  WIN32_OWN_PROCESS
        START_TYPE         : 3   DEMAND_START
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : D:\Users\User\My Document\Visual Studio 2015\Projects\MyWindowsService\Debug\MyWindowsService.exe
        LOAD_ORDER_GROUP   :
        TAG                : 0
        DISPLAY_NAME       : mywindowsservice
        DEPENDENCIES       :
        SERVICE_START_NAME : LocalSystem
```

### 3-4、优化电脑环境
任务管理器中有一些进程无法杀死或者杀死后重新拉起，就可以通过sc命令关闭其服务。
```
C:\Users\User>sc query state=all | findstr eadr
SERVICE_NAME: eadr_monitor
DISPLAY_NAME: eadr_monitor
DISPLAY_NAME: eadr_watcher

C:\Users\User>sc query state=all | findstr eio
SERVICE_NAME: eio_service
DISPLAY_NAME: eio_service

C:\WINDOWS\system32>sc qc eio_service
[SC] QueryServiceConfig 成功

SERVICE_NAME: eio_service
        TYPE               : 10  WIN32_OWN_PROCESS
        START_TYPE         : 2   AUTO_START
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : "C:/Program Files/EIO/eio_service.exe"
        LOAD_ORDER_GROUP   :
        TAG                : 0
        DISPLAY_NAME       : eio_service
        DEPENDENCIES       :
        SERVICE_START_NAME : LocalSystem

C:\WINDOWS\system32>sc config eio_service start=disabled
[SC] ChangeServiceConfig 成功

C:\WINDOWS\system32>
```
最后在任务管理器杀死该进程即可。

## 4、fltmc命令
管理员运行cmd窗口，执行fltmc命令可以管理和监控文件系统过滤器驱动程序。文件系统过滤器驱动程序是用于拦截和处理文件系统操作的驱动程序，通常用于实现反病毒软件、备份软件、加密软件等功能。

查看已加载的过滤器驱动程序：fltmc filters（和直接执行fltmc命令结果相同）
查看已安装的过滤器驱动程序：fltmc instances
列出系统中所有卷/RDR：fltmc volumes
卸载过滤器驱动程序：fltmc unload <FilterName>
加载过滤器驱动程序：fltmc load <FilterName>



