# ps1

.ps1文件是PowerShell写好的脚本文件。在Windows系统中，默认情况下是不允许执行.ps1文件的。
双击即可运行了。这有点像批处理的“.bat”文件，也有点像VBScript的“.vbs”文件。这些都是Windows的脚本文件。

我们想得很美，双击一下就执行了，但是Windows系统默认是不允许执行.ps1文件的。

## 1、修改默认执行规则
打开注册表编辑器 regedit.exe

HKEY_CLASSES_ROOT\Microsoft.PowerShellScript.1\Shell\修改`默认`为以下三个值中的一个:

0         可双击和cmd执行。
Edit     使用powershell_ise.exe打开。
Open  使用记事本打开。

使用命令进行修改：ftype Microsoft.Powershellscript.1="%SystemRoot%\system32\windowspowershell\v1.0\powershell.exe" "%1"

## 2、如何让ps1脚本在系统启动时自动运行
先建立个bat文件来执行你的ps1脚本。
```
@echo off
start powershell C:\powermode1.ps1
```
把它储存为powermode1.bat，然后也放到某个好找的目录里去。这里我也放在C盘根目录。
接下来你需要用到任务计划。首先按Win+X，启动“计算机管理”。

## 3、

PowerShell.exe -file a.ps1









