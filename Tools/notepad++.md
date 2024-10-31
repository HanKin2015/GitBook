# 工具之notepad++

我平时办公配置：Obsidian主题、Consolas字体/微软雅黑、10大小、使用全局字体及大小
可能左边行号字体小，也可以调整(语言格式设置-》line number margin)。
markdown主题：markdown.material.udl.xml（注意不要勾选使用全局前景色）

## 1、notepad++工具下载
github：https://github.com/notepad-plus-plus/notepad-plus-plus
官网（翻墙）：https://notepad-plus-plus.org/

## 2、markdown主题包
网址：https://github.com/Edditoria/markdown-plus-plus

没有获得满意的主题，还是使用typora写md满意。
真相了，原来是我配置错了。有些markdown主题需要配套其notepad++主题。真香~
typora软件使用占用cpu偏高，通过修改主题还是能接受。

在线更新：
```
:: Check whether you have Node.js installed
node -v

:: Go to UDL folder of Notepad++. Usually...
cd %AppData%\Notepad++\userDefineLangs

:: Example: Download Zenburn UDL file
npx markdown-plus-plus zenburn

:: Read help for details
npx markdown-plus-plus --help
```

离线更新：
将目录C:\Users\Administrator\AppData\Roaming\Notepad++\userDefineLangs下的xml文件拷贝到对应的目录下。该文件也可以在网站上面下载。

推荐使用：Obsidian主题

## 3、notepad++三步配置markdown环境
### 3-1、下载预览插件（可以不进行这一步）
https://github.com/nea/MarkdownViewerPlusPlus/releases
也可以在notepad++软件插件栏搜索下载

安装完毕后在工具栏末尾有个M↓按钮。

### 3-2、下载高亮语法
https://github.com/Edditoria/markdown-plus-plus
可以在GitHub中看看各个主题的预览。
解压后，在C:\迅雷下载\markdown-plus-plus-3.3.0\markdown-plus-plus-3.3.0\udl中有主题包。

打开notepad++，语言 -> 自定义格式 -> 导入，选择文件解压得到的markdown.material.udl.xml文件。

### 3-3、实时预览（结合3-1步骤）
关于实时预览，默认是不开启的，需要我们手动勾上。
插件-》markdownviewer++-》synchronize

## 4、显示空格和tab键字符
python对缩进要求高，需要统一全部使用4个空格或者tab键。

视图-》显示符号

整体替换：
		tab键
        空格
		
使用ctrl+f整体替换，复制4个空格或者tab键

设置tab键为四个空格：点击设置 -> 首选项... -> 语言 -> 制表符设置。

## 5、20201021放弃使用
由于Windows7系统无缘无故出现桌面右键刷新会导致死机或者卡顿5秒左右，使用360杀毒软件杀毒后，无缘无故把notepad++删除了。后来我去官网下载软件，发现作者居然是个反动人员，果断不安装了，转sublime text。

参考过vs code 55M软件太大，sublime text3 10M，notepad2和nodepad3 4M，但是没有多标签页功能。

## 6、代码主字体（英文）
### 推荐标准
- 等宽字体：代码才会对齐的整齐，看起来更整洁
- 支持扩展字符集
- 相似字符必须拥有高辨识度！譬如 [‘i’, ‘1’, ‘l’] 与 [‘0′, ‘o’, ‘O’]，还有左右双引号、单引号、尖括号、大括号、中括号、小括号等必须容易辨认区分出来

anti-aliasing

- Consolas【6】
- Source Code Pro【6】
- Monaco（只支持Mac）【10】
- Profont（代替Mnoaco）【7】
- Monofur【4】
- Proggy【8】
- Droid Sans Mono【9】
- Deja Vu Sans Mono【8】
- Inconsolata【9】
- Microsoft Yahei Consolas Hybrid
- Microsoft Yahei UI（不错，但是不是等宽字体）

### 中文字体
Microsfot JhengHei UI

## 7、notepad++主题和字体
主题：不刺激眼睛，代码关键字各种颜色变化
Zerburn+Consolas感觉不错
- Obsidian

### 主题下载
- 使用git克隆到本地
- 直接下载git压缩包

直接拷贝xml文件到C:\Users\User\AppData\Roaming\Notepad++\themes
或者在notepad++中设置-导入-导入主题（失败）。

支持多种编辑器主题：
[Dracula主题](https://draculatheme.com/notepad-plus-plus/)

一是图标，在“设置---首选项---常用”里设置为小图标，二是把标签栏改到了左侧，具体设置方法是，在“标签栏”的选项里勾选“垂直显示”，并去掉“变暗”选项即可（可以顺便勾选一下“双击关闭标签哦，用起来挺方便的”）。

设置完主题后鼠标光标是黑色，不好识别：
windows10系统，搜索鼠标设置-》更改鼠标和大小-》更改指针大小即可或者更换颜色。

## 8、替换换行符
查找模式更换为 正则表达式
换行符为 \r

## 9、显示换行符，并且linux和Windows换行符转换
视图-》显示符号-》显示行尾符
编辑-》文档格式转换-》转为Unix(LF)

## 10、notepad++以二进制模式打开文件，也可查看二进制文件
1.首先第一步我们需要下载一个插件，名称为“HexEditor.dll”，下载之后将它放入到软件的安装目录中。
2.成功下载插件之后，需要将他放入到软件安装目录plugins这个目录下，如下图中所示，然后重新启动软件。
3.重新启动软件之后，我们打开二进制文件，可以看到二进制文件的内容全部为乱码，如下图中所示。
4.接下来下一步我们需要点击插件选项，然后在出现的菜单中选择安装的插件Hex-Editor选项，选择View in HEX这个选项并点击。
5.点击这个选择之后，二进制文件的内容乱码就会恢复正常的二进制文件样式了。

插件-》插件管理-》搜索hex，安装HEX-Editor即可。
然后C:\Program Files (x86)\Notepad++\plugins目录下面有个HexEditor文件夹，拷贝到其他电脑中重启notepad++就可以使用了。

## 11、工具栏显示和隐藏
设置-》首选项-》常用-》工具栏

## 12、Notepad++插件JSON viewer
如何让notepad++ 能够用于格式化json的功能，我们可以安装JSON-view插件。

## 13、无法缩小字体大小
原因是设置的最小字体过大，字体无法缩小到设置的字体大小之下。
设置-》语言格式设置-》字体大小          把字体设置小点即可。

## 14、关于搜索结果字体大小
直接使用滚轮缩大放小，然后再次搜索字体大小不变

## 15、光标设置
设置-》首选项-》编辑-》光标设置
有时候在编辑框内时光标似乎消失了，其实是颜色和内容背景融合了，需要修改系统的鼠标光标。（发现使用mstsc远程连接有这个问题，但是使用VNC Viewer软件则不会）
Windows11：设置-》辅助功能-》鼠标指针与触控-》鼠标指针样式
Windows10：设置-》轻松使用-》鼠标指针-》更改指针颜色

## 16、搜索结果框消失了
https://blog.csdn.net/u010142729/article/details/127963874

请尝试将鼠标移到软件窗口的最下边，往上面拉一下，就可以看到查询结果。反之，如果你想将悬浮窗口固定在最下面，也可以将窗口拖到最下面，它就会自动被磁贴进来。

## 17、个性设置标签栏
设置==》首选项==》常用==》标签栏：多行显示，不缩小
设置==》首选项==》语言==》替换为空格

## 18、设置搜索选中背景色以及相同字段背景色
设置-》语言格式设置-》Selected text colour
设置-》语言格式设置-》Smart HighLighting

## 19、日志文件中搜索结果只显示行号，内容未显示
原因：
写文件的时候，每行开头含有特殊字符，通过在视图-》显示符号-》Show Control Characters & Unicode EOL后，看见开头含有NUL字符。

解决方案：
将日志重新复制粘贴到另外一个文件再搜索即可。或者直接转成其他编码格式也能消除。

生成方式可能：
WideCharToMultiByte函数写入宽字符，或者CP_ACP关键字，不研究。

## 20、右键快捷方式创建
注册表：
```
HKEY_CLASSES_ROOT\*\shell\Notepad++\command（"C:\Program Files\Notepad++\notepad++.exe" "%1"）

针对特定文件类型: HKEY_CLASSES_ROOT\<FileType>\shell
针对所有文件: HKEY_CLASSES_ROOT\*\shell
针对文件夹: HKEY_CLASSES_ROOT\Directory\shell
针对驱动器: HKEY_CLASSES_ROOT\Drive\shell
针对快捷方式: HKEY_CLASSES_ROOT\lnkfile\shell
针对特定用户: HKEY_CURRENT_USER\Software\Classes\*\shell
针对所有用户: HKEY_LOCAL_MACHINE\SOFTWARE\Classes\*\shell
```

notepad++很有趣：
通过计算机\HKEY_CLASSES_ROOT\*\shell\ANotepad++64指向了一个CLSID（HKEY_CLASSES_ROOT\CLSID\{B298D29A-A6ED-11DE-BA8C-A68E55D89593}）
然后再在CLSID中进行具体的操作，不同的版本配置不一样。

在 Windows 注册表中，ThreadingModel 是与 COM（Component Object Model）对象相关的一个配置项。它定义了 COM 对象的线程模型，即对象如何处理来自不同线程的调用。虽然 Notepad++ 本身不是一个 COM 服务器，但它可能会使用某些插件或扩展，这些插件或扩展可能会注册 COM 组件。