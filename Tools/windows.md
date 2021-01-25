# Windows知识

## 1、查看电脑.NET Framework版本
地址栏中直接输入地址，C:\Windows\Microsoft.NET\Framework回车最高版本。
控制面板左侧打开或关闭windows功能按钮。

## 2、如何将exe应用程序添加到鼠标右键应用程序打开
https://www.cnblogs.com/cn2018/p/10273261.html
```sublime_addright.reg
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\*\shell\SublimeText3\command]
@="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe %1"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3\command]
@="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe %1"
```

## 3、











