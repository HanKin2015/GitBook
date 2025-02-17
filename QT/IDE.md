# IDE

## 1、VS2019搭建QT环境
参考教程：https://blog.51cto.com/dlican/4882802
安装包：qt-vsaddin-msvc2019-x86-3.3.0-rev.13.vsix和qt-opensource-windows-x86-5.12.5.exe

- 双击安装qt sdk：qt-opensource-windows-x86-5.12.5.exe，安装MSVC 2017 32-bit和MSVC 2017 64-bit、Sources、Qt Creator 4.10.0 CDB Debug即可，大约3.8GB空间
- 双击安装qt-vsaddin-msvc2019-x86-3.3.0-rev.13.vsix
- 配置QT Versions：工具菜单->选项->Qt->Versions（Location填写qt sdk安装目录C:\Qt\Qt5.12.5\5.12.5\msvc2017）
- 配置Qt/MSBuild（默认已配置）：工具菜单->选项->Qt->General（C:\Users\Administrator\AppData\Local\QtMsBuild）




