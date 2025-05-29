# Process Monitor

## 1、简介
下载地址：https://learn.microsoft.com/zh-cn/sysinternals/downloads/procmon
实战见：D:\Github\GitBook\gitbook\USBDevice\FAQ.md

## 2、办公环境频繁出现powershell命令执行
问题现象描述：每隔5分钟左右就会执行powershell脚本，然后安全软件就会拦截并警告：
运行参数: powershell  -Command "Get-AppxPackage *MicrosoftPCManager* | Remove-AppxPackage"
最近发现时间: 2025.04.23 08:51:42
事件描述: powershell脚本执行
处理结果: 阻断成功

主要是要追踪谁在执行powershell脚本，并且powershell脚本在哪里？关闭警告倒是挺简单，直接免打扰即可。

- 怀疑是Windows定时任务，计算机管理-》任务计划程序-》确实能看见一些安全软件的定时任务，但是这个脚本执行并不是固定时间间隔执行
- 使用process monitor软件监控

直接在Detail中过滤Get-AppxPackage关键字即可，然后前后关联即可追踪到是一个bat脚本"C:\ProgramData\gress\task\2024041712A3.bat"
前期没想到Get-AppxPackage关键字可以直接打出，前期在考虑cmd.exe和powershell.exe关键字，以及Process Create等等，走了不少弯路。

gress.exe 9468
cmd.exe 13772
powershell.exe 8848

PID: 8848 说明创建的子进程id
Parent PID: 13772 说明父进程id
然后去找到13772是什么时候创建的，并且查出是谁创建的，最终真相大白。
脚本如下：
```
@echo off
setlocal

set "uninstallPath=C:\Program Files\Microsoft PC Manager\Uninst.exe"
set "programDir=C:\Program Files\Microsoft PC Manager"

if exist "%uninstallPath%" (
    start /wait "" "%uninstallPath%" /S
    if exist "%programDir%" (
        rmdir /s /q "%programDir%"
    )
	exit /b 1
) else (
    powershell -Command "Get-AppxPackage *MicrosoftPCManager* | Remove-AppxPackage"
	exit /b 2
)
endlocal
```

为何其他同事不存在此弹框问题，一部分原因是开启了免打扰，一部分原因是他们的环境可以执行powershell命令。而我的环境是无法执行powershell命令，一执行就会弹出警告。
最近发现时间: 2025.05.28 10:19:11
事件描述: powershell脚本执行
运行参数: powershell
处理结果: 阻断成功

这个问题之前也困扰我许久，一段时间能执行powershell命令，一段时间又不能了。然鹅这个是可以在安全软件设置的，之前以为给powershell命令加白名单解决，发现根本不行。
最终解决方案：设置中心-》高级威胁防护-》发现可以powershell脚本-》提醒我处理-》默认允许执行powershell脚本后就行了，但是最好是开启免打扰，这样是默认放行执行powershell脚本，设置成自动阻断脚本执行才不会处理

删除2024041712A3.bat文件无果，会被自动创建。