# qt软件打包

## 1、qt+c语言打包成单个exe文件
- 将现有的项目在QT Creater中用release方式编译成test.exe
- 将release中生成的.exe文件拷贝到新的空文件夹中，我在这里拷贝到了d:\test\test.exe中
- 在QT安装菜单中找到QT5.8 for DeskTop工具，运行。即Dos窗口
- 输入命令:cd /d d:\test\，然后使用windeployqt工具命令:windeployqt test.exe
- 这里就得到了完全程序发布集合
- 下载QT程序打包工具Enigma Virtual Box，安装完成后点击运行
- 浏览选择exe文件，然后导入整个文件夹
- 在【Files Options】中选择将文件压缩
- 点击process运行开始打包，成功后生成一个独立的.exe可执行程序。

## 2、qt+qml语言打包成单个exe文件
只需要在使用windeployqt工具命令加入qml文件编译路径即可。
windeployqt StudyQml.exe --qmldir C:\Qt\Qt5.12.5\5.12.5\mingw73_64\qml




## QDebug函数使用









