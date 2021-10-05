# devcon工具

## 1、官方介绍
Windows 设备控制台 (Devcon.exe)

备注
请使用 PnPUtil 工具，而不使用 DevCon。

DevCon (Devcon.exe)（即设备控制台）是一种命令行工具，用于显示有关运行 Windows 的计算机上的设备的详细信息。 可以使用 DevCon 启用、禁用、安装、配置以及删除设备。

DevCon 在 Microsoft Windows 2000 和更高版本的 Windows 上运行。

https://docs.microsoft.com/zh-cn/windows-hardware/drivers/devtest/devcon

## 2、其他介绍
是一种命令行实用工具，可以替代设备管理器。使用 DevCon，您可以启用、禁用、重新启动、更新、删除和查询单个设备或一组设备。DevCon 提供与开发人员有关但无法在设备管理器中看到的信息。

您可以将 DevCon 用于 Windows 2000 、Windows XP和Windows vista。不能将 Devcon 用于 Microsoft Windows 95、Windows 98、或 Windows Millennium Edition。
 

看到有人用这个工具开关硬件,小巧也方便,微软出的很官方,哈哈
以后可以在au3里面使用一下,当然能调用命令行的都可以使用:
据个例子: devcon disable "PCI\VEN_10EC&DEV_8136*" 这个是关闭我机器上的lan;

devcon.exe [-r] [-m:\\<machine>] <command> [<arg>]-r if specified will reboot machine after command is complete, if needed.<machine> 目标机器名字.<command> 命令(见下面).<arg>传给命令的参数.For help on a specific command, type: devcon.exe help <command>classfilter 允许修改class filters.classes 显示设备安装classes.disable 用指定的硬件名称或者instance ID禁用设备driverfiles 列出设备安装的驱动文件.drivernodes 显示设备的所有节点的驱动.enable 用指定的硬件名称或者instance ID启用设备.find 用指定的硬件名称或者instance ID查找设备.findall 查找所有硬件设备包括不显示的.help 显示帮助信息.hwids 显示设备硬件ID.install 手动安装设备.listclass 显示所有设备的安装 class.reboot 重启本地机器.remove 用指定的硬件名称或者instance ID删除设备.rescan 从新扫描硬件信息.resources 显示设备使用的硬件资源.restart 用指定的硬件名称或者instance ID重启设备.stack 列出设备的驱动堆栈.status 列出设备的状态.update 手动更新设备驱动.updateNI 不显示用户界面的更新设备状态SetHwID 添加、删除、编辑硬件ID的顺序.

现在看看例子:

devcon -m:\\test find pci\*如果你开启了test机器上的IPC$的话，就可以列出test上所有知道的PCI设备devcon -r install %WINDIR%\Inf\Netloop.inf *MSLOOP安装一个新的Microsoft loopback adaptor实例，如果要重启的话，该命令会自动重启devcon classes显示所有知道的安装类。包括未认识的设备如： "USB" 和描述名字如："Universal Serial Bus controllers". devcon classfilter upper !filter1 !filter2删除两个指定的classfilter .devcon classfilter lower !badfilter +goodfilter 用"goodfilter"替换"badfilter".devcon driverfiles =ports列出被ports安装类使用的设备驱动文件devcon disable *MSLOOP禁用所有硬件ID结尾有"MSLOOP"的设备devcon drivernodes @ROOT\PCI_HAL\PNP0A03列出所有 ROOT\PCI_HAL\PNP0A03的兼容驱动. devcon enable '*MSLOOP启用所有硬件ID有"*MSLOOP". 用'修饰的*不再是通配符，而是普通字符devcon find *列出所有设备实例. devcon find pci\*列出所有本地的PCI设备devcon find =ports *pnp*列出 ports 中包含"PNP"的硬件设备. devcon find =ports @root\*列出所有在顶层的 ports . devcon listclass usb 1394显示安装类是 USB 和 1394的设备. devcon remove @usb\*删除所有USB设备 devcon rescan重新扫描即插即用设备. devcon resources =ports列出ports 使用的资源. devcon restart =net @'ROOT\*MSLOOP\0000重启 loopback adaptor ROOT\*MSLOOP\0000. devcon hwids=mouse显示所有鼠标设备.devcon sethwid @ROOT\LEGACY_BEEP\0000 := beep 关联设备 beep和the legacy beep device.devcon status @pci\*列出所有PCI设备的状态. Lists the status of all COM ports. devcon update mydev.inf *pnp0501强制更新硬件ID有pnp0501 的设备使用Mydev.inf 驱动. 执行该命令后可能返回结果1 级错误，除非你指定了 -r, 让机器自动重启. 错误等级：0：表示成功1：表示需要重启2：表示失败3：语法错误

一般情况下的用法：(介绍几个常用的命令和语法)

1、devcon find

devcon find * [这个命令可以列出列出本地计算机上存在的所有设备的设备实例]
devcon find pci\* [列出本地计算机上所有已知的“外围组件互连”(PCI) 设备（如果一个设备的硬件 ID 以“PCI\”为前缀，此命令就认为该设备是 PCI 设备]
2、devcon disable *msloop [禁用硬件 ID 以“MSLOOP”结尾（包括“*MSLOOP”）的所有设备]
3、devcon enable '*MSLOOP
[启用硬件 ID 为“*MSLOOP”的所有设备。单引号指示必须严格按字面解释硬件 ID（换句话说，星号 [“*”] 真的是 一个星号，而不是通配符]
4、devcon remove @usb\*
删除所有 USB 设备。被删除的设备列出时将显示其删除状态

因为下面要讲一个实例，所以先说说硬件ID是啥玩艺，说实在的就是让大家知道怎么找出它，请看：
find pci\* 下面就是找出的一部分:
PCI\VEN_10EC&DEV_8139&SUBSYS_813910EC&REV_10\3&13C0B0C5&0&58: Realtek RTL8139 Family PCI Fast Ethernet NIC
PCI\VEN_1106&DEV_0571&SUBSYS_18271019&REV_06\3&13C0B0C5&0&89: VIA Bus Master IDE Controller
PCI\VEN_1106&DEV_3038&SUBSYS_18271019&REV_80\3&13C0B0C5&0&80: VIA Rev 5 or later USB Universal Host Controller
这几行“：”前面的就是硬件ID，后面是设备名称.
偶要禁用网卡了，请看仔细：
devcon disable *DEV_8139* [就这样就行了，前提是你电脑里有devcon.exe]
偶要启用它了，同样的搞一下： devcon enable *DEV_8139*
如果您指定 -r 并且需要重新启动，则在处理完所有设备后，将在无任何警告信息的情况下重新启动就行了。