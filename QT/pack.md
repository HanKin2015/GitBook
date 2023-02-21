# qt软件打包

## 1、qt+c语言打包成单个exe文件
- 将现有的项目在QT Creater中用release方式编译成test.exe
- 将release中生成的.exe文件拷贝到新的空文件夹中，我在这里拷贝到了d:\test\test.exe中
- 在QT安装菜单中找到QT5.8 for DeskTop工具（Qt 5.14.2(MinGW 7.3.0 64-bit)），运行。即Dos窗口
- 输入命令:cd /d d:\test\，然后使用windeployqt工具命令:windeployqt test.exe
- 这里就得到了完全程序发布集合
- 下载QT程序打包工具Enigma Virtual Box（单机版虚拟文件打包工具(Enigma Virtual Box)9.50汉化去广告版.exe），安装完成后点击运行
- 主程序文件名称浏览选择exe文件，然后添加整个文件夹（添加文件夹递归）
- 在【Files Options】中选择勾选压缩文件
- 点击process（打包）运行开始打包，成功后生成一个独立的.exe可执行程序。

## 2、qt+qml语言打包成单个exe文件
只需要在使用windeployqt工具命令加入qml文件编译路径即可。
windeployqt StudyQml.exe --qmldir C:\Qt\Qt5.12.5\5.12.5\mingw73_64\qml




## QDebug函数使用









