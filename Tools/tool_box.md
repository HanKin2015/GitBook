# 工具箱

## 1、进程监视器
组件注册表被某某管控软件给删除掉，但又无奈找不到罪魁祸首。
火绒软件可以进行注册表监控，当监控的注册表被操作时，会在右下角弹出框提醒。
另外微软有自带的进程监视器：https://learn.microsoft.com/zh-cn/sysinternals/downloads/procmon

教程监控注册表：
只Show Regeistry Activity->Filter->Path->contains->'hejian'->Add->OK
Filter->Operation->is->RegDeleteKey 或 RegDeleteValue

注意日志爆满：并没有找到可以设置日志相关的地方，虽然过滤了，只是方便了显示，但是还是会捕获全部事件。但是从下面写着Backed by virtual memory来看，ProcMon软件提高性能，将日志数据存储在虚拟内存中，而不是直接写入磁盘文件，除非您手动保存。

## 2、Sysinternals
官网地址：https://learn.microsoft.com/zh-cn/sysinternals/
Sysinternals 是一套由微软提供的免费工具集，主要用于 Windows 系统的管理和故障排除。这些工具由 Mark Russinovich 和 Bryce Cogswell 开发，后来被微软收购并集成到微软的官方工具库中。Sysinternals 工具集包含了许多功能强大的实用程序，涵盖了文件系统、注册表、进程、网络、安全等多个方面。

### 2-1、Sysinternals 的主要特点
功能强大：提供了许多高级功能，能够深入分析和监控 Windows 系统的内部行为。
免费使用：所有工具都是免费的，并且由微软官方提供支持。
跨平台支持：支持 Windows 操作系统的多个版本，包括 Windows 10、Windows 11 以及 Windows Server。
开源精神：虽然工具本身不开源，但微软提供了详细的文档和使用说明，用户可以自由下载和使用。

### 2-2、Sysinternals 的主要工具
以下是一些常用的 Sysinternals 工具：
1. Process Explorer
功能：进程管理工具，比 Windows 自带的任务管理器更强大。
用途：查看系统中运行的进程、线程、DLL 文件、句柄等信息。

2. Process Monitor (ProcMon)
功能：实时监控系统活动，包括文件系统、注册表、进程、网络等。
用途：调试和分析系统行为，查找问题根源。

3. Autoruns
功能：查看和管理系统的启动项。
用途：分析和禁用不必要的启动程序，优化系统启动速度。

4. TCPView
功能：查看系统中所有 TCP 和 UDP 连接。
用途：监控网络连接，查找恶意软件或异常连接。

5. Filemon (已集成到 Process Monitor)
功能：监控文件系统活动。
用途：分析文件操作，查找文件访问问题。

6. Regmon (已集成到 Process Monitor)
功能：监控注册表活动。
用途：分析注册表操作，查找注册表访问问题。

7. Sysmon (System Monitor)
功能：系统监控工具，记录系统事件日志。
用途：监控系统中的关键事件，用于安全分析。

8. Disk2vhd
功能：将物理磁盘转换为虚拟硬盘文件（VHD）。
用途：备份系统或创建虚拟机。

9. PsTools
功能：一组命令行工具，用于管理远程和本地系统。
用途：远程执行命令、管理进程、查看系统信息等。

10. BgInfo
功能：在桌面上显示系统信息。
用途：快速查看系统配置、IP 地址、硬盘信息等。

## 3、3D显卡帧率工具
presentmon：https://www.geeks3d.com/dl/show/10230