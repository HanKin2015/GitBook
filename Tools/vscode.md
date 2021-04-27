# vscode

## 自我操作笔记
outline：大纲，在视图窗口中，列举函数列表
timeline：git上库日志
解决程序无法输入：打开文件 -> 首选项 -> 设置，在上方的搜索框里输入run in terminal，勾选此项设置


## 1、sublime工具缺点
编译运行c或c++需要单独搭建环境，比较麻烦，并且不支持程序输入，中文乱码，代码追踪不完善等问题。
结论：不建议使用sublime或者notepad++等工具编写工程项目。
单个文件查看和修改可以推荐。

目前程序员必备的推荐vscode和sourceinsight工具。

vscode还有一个强大的优点：可以打开巨大的文本文件。

## 2、VS Code User和System版区别
User版本无法在系统分区(盘) 创建默认文件夹Microsoft VS Code，可见权限不足，解决方案是提前在该目录自建文件夹命名。对于System版无此问题，可next step到底。

## 3、VS Code insider和VS Code区别
前者是内测版，一般每个工作日都会有更新，后者是正式版。

## 4、软件下载
百度一下
编译器下载：https://sourceforge.net/projects/mingw-w64/files/

## 5、搭建c++编译环境
https://www.zhihu.com/question/30315894

精简版的：装gcc和c/c++扩展，打开文件夹，点开源代码，F1，build and debug active file，完。

VSC只是一个纯文本编辑器(editor)，不是IDE(集成开发环境)，不含编译器(compiler)和许多其它功能，所以编译器要自己装好。

添加bin环境变量，cmd输gcc -v可以显示出gcc的版本。

## 6、搭建python运行环境
python.exe路径添加
run code插件直接运行


### 安装扩展(extension)

- C/C++：又名 cpptools，提供Debug和Format功能
- Code Runner：右键即可编译运行单文件，很方便；但无法Debug

其他可选扩展：

- Bracket Pair Colorizer 2：彩虹花括号
- One Dark Pro：大概是VS Code安装量最高的主题

不建议/不需要装的扩展：

- GBKtoUTF8：把GBK编码的文档转换成UTF8编码的。此扩展很久没有更新了，也有严重的bug
- C++ Intellisense：用的是gtags，效果不咋样
- Include Autocomplete：提供头文件名字的补全，现在cpptools和vscode-clangd都已经自带这个功能了
- C/C++ Snippets：Snippets即重用代码块，效果自己百度；这个扩展安装量虽高，不过个人感觉用处实在不大，cpptools和clangd也自带一些；你也可以选择其他的Snippets扩展甚至自定义

**补充知识**

- 编译器是把源代码变成可执行文件的，编辑器是你打字的软件。记事本就是一个编辑器，VSC也是编辑器。**编辑器是无法编译运行程序的**，因为那是编译器的工作
- MinGW是gcc在Windows下的移植，gcc是世界上最流行的C/C++编译器组合。但gcc这个名字也指编译C语言的那个程序，g++才是C++编译器。即gcc程序和g++程序包含在gcc套件以及MinGW里，当只说gcc时要根据语境自己区分
- 其实MinGW和MinGW-w64只是名字像，它们是两个不同的项目。为了方便，本文中的MinGW指的其实都是MinGW-w64。MinGW还活着，但只能产生32位程序
- 现在MinGW-w64很久没有发布官方构建了，代码其实已经更新到了9.2.0，所以也可以考虑用基于它的TDM-GCC64。别下旧版，那是很久以前的，2020年发布了新版
- 扩展是extension，插件是plugin，VSC用的是前者这种称呼。大部分文章都是混用两者的，不严谨但是能理解就行，要学会抓主要矛盾。当然本文用的都是正确的
- 可选阅读：[[科普\][FAQ]MinGW vs MinGW-W64及其它](https://link.zhihu.com/?target=https%3A//github.com/FrankHB/pl-docs/blob/master/zh-CN/mingw-vs-mingw-v64.md)



### **快捷键**

这里主要介绍下最主要的快捷键：

- **`Ctrl+鼠标左键`**，是文件、函数等跳转。
- **`Alt + ←`** ，是跳转后返回原处。
- **`Ctrl + Shift + O`**，列出函数名
- **`Ctrl + P`**，列出近期打开的文件名
- **`Ctrl + Tab`**, 可以列出最近打开的文件，在开发时，两个文件间切换时效率很高。

上述是最常用的功能。其他功能请参考[VSCode 官网快捷键](https://link.zhihu.com/?target=https%3A//code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)



## 6、插件离线安装
教程一：将C:\Users\Administrator\.vscode\extensions下面的文件夹拷贝到环境中，重启两次vscode即可。

教程二：https://www.jianshu.com/p/17bcf79f1c85




```setting.json

{
    "editor.fontSize": 13,
    "editor.minimap.maxColumn": 40,
    "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?·～！￥…（）—【】、；：‘’“”，。《》？ ",
    "editor.fontFamily": "'Source Code Pro', Consolas, 'Courier New', monospace",
    "editor.suggest.localityBonus": true,

    "window.title": "${dirty}${activeEditorLong}${separator}${rootName}${separator}${appName}",
    "window.zoomLevel": 1,
    "window.titleBarStyle": "custom",

    "workbench.iconTheme": "material-icon-theme",
    "workbench.colorTheme": "Solarized Light",
    "workbench.sideBar.location": "right",

    //"git.path": "D:\\Program Files\\Git\\cmd\\git.exe",
    "git.path": "/usr/bin/git",
    "git.autofetch": true,
    "git.ignoreMissingGitWarning": true,

    "git-assistant.checkConfigVariables": "disabled",
    "git-assistant.pushBeforeClosingIDE": "disabled",

    "diffEditor.ignoreTrimWhitespace": false,
    //"terminal.integrated.shell.windows": "C:\\windows\\System32\\cmd.exe",

    "http.proxy": "http://公司代理地址IP:端口/",
    "http.proxyStrictSSL": false,

    "files.trimTrailingWhitespace": true,
    "files.autoGuessEncoding": true,
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/*/**": true
    },

    "C_Cpp.updateChannel": "Insiders",
    "C_Cpp.default.intelliSenseMode": "gcc-x64",
    "C_Cpp.default.includePath": [
        "/usr/include",
        "/usr/local/include",
        "${workspaceFolder}/**"
    ],

    "terminal.integrated.fontFamily": "Hack Nerd Font",
    "terminal.integrated.fontSize": 14,
}
```




