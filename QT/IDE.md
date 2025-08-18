# IDE

## 1、VS2019搭建QT环境
参考教程：https://blog.51cto.com/dlican/4882802
安装包：qt-vsaddin-msvc2019-x86-3.3.0-rev.13.vsix和qt-opensource-windows-x86-5.12.5.exe

- 双击安装qt sdk：qt-opensource-windows-x86-5.12.5.exe，安装MSVC 2017 32-bit和MSVC 2017 64-bit、Sources、Qt Creator 4.10.0 CDB Debug即可，大约3.8GB空间
- 双击安装qt-vsaddin-msvc2019-x86-3.3.0-rev.13.vsix（安装后在工具菜单->选项中就会出现Qt字样以及添加Qt项目）
- 配置QT Versions：工具菜单->选项->Qt->Versions（Location填写qt sdk安装目录C:\Qt\Qt5.12.5\5.12.5\msvc2017）
- 配置Qt/MSBuild（默认已配置）：工具菜单->选项->Qt->General（C:\Users\Administrator\AppData\Local\QtMsBuild）

备注：qt-vsaddin-msvc2019-x86-3.3.0-rev.13.vsix 是一个用于 Microsoft Visual Studio 的插件，具体来说，它是 Qt Visual Studio Add-in 的一个版本。这个插件的主要功能是将 Qt 框架与 Visual Studio 集成，使得开发者可以在 Visual Studio 环境中更方便地使用 Qt 进行应用程序开发。

## 2、关闭dos控制台窗口
默认开启了dos控制台窗口，可以方便打印日志，但有时候不需要这个东西。
关闭方法：项目-》属性-》链接器-》系统-》子系统-》切换到窗口

## 3、创建空白qt项目
创建QtWidgetsApplication1项目，会有一个问题，就是里面使用了ui文件，不能直接在ui文件中进行修改，需要额外创建函数调用修改。后来才发现qt creator也是这样，我最开始在ui_QtWidgetsApplication1.h文件中修改，然后点击重新生成后，修改的内容全没了，因为ui_QtWidgetsApplication1.h文件是由ui文件临时生成的。

创建空白项目自力更生，根据qt creator项目编写代码文件。

需要以下几个重要步骤：
实现以下文件目录结构：
QtApplication1
    ---
    QtApplication1.sln
    QtApplication1
        --- Resource.qrc
            QtApplication1.cpp
            QtApplication1.h
修改QtApplication1.sln文件即可，在QtApplication1.vcxproj之前加上QtApplication1文件夹名即可。

项目-》属性-》Qt Project Settings-》Qt Modules-》core；gui；widgets

## 4、编译错误
[QtRunWork] Error starting process /rcc: 系统找不到指定的文件。	QtWidgetsApplication1	C:\Users\Administrator\AppData\Local\QtMsBuild\qt_work.targets	138	

There's no Qt version assigned to project QtWidgetsApplication1.vcxproj for configuration Release/Win32.
Please set a Qt installation in 'Project|Properties|Configuration Properties|Qt Project Settings|Qt Installation'.	QtWidgetsApplication1	C:\Users\Administrator\AppData\Local\QtMsBuild\qt_vars.targets	43	

原因是更改过QT Versions名称，因此需要在项目-》属性-》Qt Project Settings-》Qt Installation-》选择当前环境的QT Versions名称即可

## 5、ubuntu安装qt creator
```
wget https://mirrors.tuna.tsinghua.edu.cn/qt/official_releases/qtcreator/17.0/17.0.0/qt-creator-opensource-linux-x86_64-17.0.0.run
chmod +x qt-creator-opensource-linux-x86_64-17.0.0.run
./qt-creator-opensource-linux-x86_64-17.0.0.run
中间需要登录个人账户，密码xx@123xxx
```
默认安装目录：/opt/qtcreator-17.0.0

安装完后无法正常打开，需要安装apt-get install libxcb-cursor0

## 6、ubuntu安装qt
```
wget https://mirrors.nju.edu.cn/qt/official_releases/online_installers/qt-online-installer-linux-x64-online.run
```
离线安装包：https://mirrors.tuna.tsinghua.edu.cn/qt/official_releases/qt/6.9/6.9.1/single/
估计是走编译安装路线。
