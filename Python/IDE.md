# 集成开发环境
集成开发环境（IDE，Integrated Development Environment ）是用于提供程序开发环境的应用程序，一般包括代码编辑器、编译器、调试器和图形用户界面等工具。集成了代码编写功能、分析功能、编译功能、调试功能等一体化的开发软件服务套。所有具备这一特性的软件或者软件套（组）都可以叫集成开发环境。如微软的Visual Studio系列，Borland的C++ Builder、Delphi系列等。该程序可以独立运行，也可以和其它程序并用。IDE多被用于开发HTML应用软件。例如，许多人在设计网站时使用IDE（如HomeSite、DreamWeaver等），因为很多项任务会自动生成。

https://mp.weixin.qq.com/s/uRevNQeHBAH-yIOMFtZ4Sw

## 1、spyder

### 1-1、缩进风格：空格和tab键

Anaconda spyder 设置tab键为2个空格
tool -> Preference-> Editor->Adevanced setting->4 spaces

### 1-2、格式化代码
- 安装：conda install autopep8
- 除此之外，还需要安装下载插件文件，通过GitHub上的库即可下载解压：https://github.com/Nodd/spyder_autopep8
- 文件夹spyder_autopep8放在指定的spyder文件目录C:\Users\Administrator\Anaconda3\Scripts
- 重启编辑器，在source菜单中可以看见run autopep8选项（Ctrl+F8快捷键）

使用这个插件：autopep8 for Spyder（https://github.com/Nodd/spyder_autopep8）
虽然Python是一种代码功能取决于空白量的语言，但美化工具永远无法以统一的方式真正格式化代码。
但Autoep8不能解决被违反的代码格式化约定(如Pylint所示)。

### 1-3、显示空格和tab键
Tools-->>preferences-->>editor-->>display-->>show blank spaces

## 2、PyCharm
官网：https://www.jetbrains.com/pycharm/
激活插件及教程：https://txx.lanzoub.com/iq6cH086qrad
解压密码：3342
右键图标找到程序安装位置bin=》放在bin同级目录=》在`jetbra`--->`scripts`目录下双击install-all-users.vbs文件
大约等待半分钟左右会弹出done框，使用事先准备好的激活码`jetbra`--->`自用激活码code.txt`即可激活，根据教程已激活PyCharm2022.3.3版本。

### 2-1、简单使用
字体主题修改：可以在“File”-“Settings”-“Editor”-“Color Scheme”中找到这些主题。
导入python环境：File=》Settings=》Project=》Python Interpreter
Interpreter：n.解释程序;口译译员;口译工作者;演绎(音乐、戏剧中人物等)的人
中文主题包：https://plugins.jetbrains.com/plugin/13710-chinese-simplified-language-pack----/versions
    File=>Settings=>Plugins=>Install from Disk(离线安装选择lib/zh.232.172.jar即可)
    注意PyCharm的版本一定需要和中文汉化包版本对应，否则安装不上。
    
### 2-2、快捷键
https://baijiahao.baidu.com/s?id=1765421542320923566&wfr=spider&for=pc
- Ctrl + /：行注释/取消行注释
- Ctrl + Alt + L：代码格式化
- Ctrl + Alt + I：自动缩进
- Ctrl + Numpad+/-：展开/折叠代码块（当前位置的：函数，注释等）
- Ctrl + shift + Numpad+/-：展开/折叠所有代码块

### 2-3、pycharm启动慢、卡顿的问题
https://zhuanlan.zhihu.com/p/17039590286
找到PyCharm安装路径，并打开PyCharm安装路径下的bin文件夹，找到pycharm64.exe.vmoptions文件，双击打开，进行编辑。
在打开的pycharm64.exe.vmoptions文件内容中，要修改两个变量的值。
- Xms：表示PyCharm启动时可用的内存大小。
- Xmx：表示PyCharm运行时可用的内存大小。

另外就是关闭插件，我把所有的插件都关闭后pycharm确实变快了！
在 PyCharm 中，依次点击 File -> Settings -> Plugins。在此页面中，查看已安装的插件，禁用那些不常用或不必要的插件。每个插件都需要占用一定的资源，因此减少插件数量能有效提升性能。
仅仅保留了中文语言包和style sheets和UI，为了黑色主题。





