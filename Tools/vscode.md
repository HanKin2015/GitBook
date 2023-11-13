# vscode

## 自我操作笔记（个性化）
outline：大纲，在视图窗口中，列举函数列表
timeline：git上库日志
解决程序无法输入：打开文件 -> 首选项 -> 设置，在上方的搜索框里输入run in terminal，勾选此项设置
显示空格和tab键：
打开setting,在搜索框中输入renderControlCharacters,选中勾选框,即可显示tab.
在搜索框中输入renderWhitespace,选择all,即可显示空格.

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
教程一（需要版本匹配）：将C:\Users\Administrator\.vscode\extensions下面的文件夹拷贝到环境中，重启两次vscode即可。

教程二：https://www.jianshu.com/p/17bcf79f1c85

教程三（插件网搜索下载vsix插件）：https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh
在右边Resources-》Downloads Extension即可。

## 7、输出窗口中文乱码
由于没有配置g++环境变量，导致报错'g++' 不是内部或外部命令，也不是可运行的程序或批处理文件。

在输出窗口除了g++能清晰看见，其余全是乱码。

可以添加"code-runner.runInTerminal": true,让程序运行在终端窗口就不会有乱码问题。

https://amahv.github.io/2020/06/24/vscode-shu-chu-chuang-kou-zhong-wen-luan-ma/#!
这个是对于python代码，不清楚有没有效果，待测试。

## 8、设置默认的终端
- 打开左下角设置
- 找到 Terminal › Integrated › Shell: Windows 设置项
```
{
    "window.zoomLevel": 2,
    "workbench.colorTheme": "Monokai",
    "terminal.integrated.automationShell.windows": "",
    "code-runner.runInTerminal": true,
    "terminal.integrated.shell.windows": "C:\\Windows\\system32\\cmd.exe"
}
```
注意：不是automation shell。

## 9、解决vscode上编辑gb2312编码的源码导致乱码的问题
痛点1：默认情况下vscode是用utf-8打开文件，因此我们打开一个gb2312编码的文件会是乱码的，必须手动调整用gb2312编码打开。
痛点2：在默认用utf-8编码打开的情况下，改了一行gb2312编码格式的源文件，一保存，整个文件都乱码了，一旦提交之后，再恢复就会很麻烦。
痛点3：通常又不能随便批量的该文件编码（不方便看上次修改记录，不方便Review…）

解决方式：打开设置 -> 搜索“Auto Guess Encoding” -> 勾选。User,Remote,Workspace 都勾选上该选项。

## 10、使用vscode搭建你的远程linux开发环境
### 10-1、远程linux服务器的版本要求
kernel >= 3.10        uname -r
glibc >= 2.17         strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBC
libstdc++ >= 3.4.18   dpkg -l | grep libstdc++

通过VS Code官方支持的SSH Remote插件，我们可以直接进行远程开发，不需要进行各种麻烦的代码同步。

### 10-2、安装最最最最重要的一个插件：Remote-SSH
插件搜索安装：Remote-SSH
在线安装：打开VSCode，按快捷键 Ctrl+Shift+X进入扩展商店，搜索Remote - SSH， 点击install
离线安装：
C:\Users\Administrator\.vscode\extensions\ms-vscode-remote.remote-ssh-0.66.0
拷贝到另外一个环境C:\Users\User\.vscode\extensions中即可。

注意版本的一致性，只要相差不大就行，如果一个是user版本一个是system版本就可能有问题，会出现安装成功，但是无法使用问题。

结果下载的vsix插件报错不匹配安装，下载了稍早的历史版本也不行（找不到更早的了），无奈试试更新vscode试试，然后就成功了。

### 10-3、配置远程连接
- 左侧导航栏电脑图标（新版本的vscode还变样了，不再是电脑图标，显示在左下角，勾选Connect to Host）
- 放在SSH TARGETS上面，点击齿轮设置
- 选择C:\Users\User\.ssh\config配置
- 第一行显示名称、第二行服务器ip地址、第三行登录账户，可以填写多个服务器
- 点击打开窗口会显示Setting up SSH Host my_linux_vm: ([details](command:opensshremotes.showDetails "Show details")) Initializing VS Code Server
- 由于未连接外网，所以肯定是无法正常连接的。
```C:\Users\User\.ssh\config
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
Host my_linux_vm
    HostName 172.22.65.15
    User root

# 我的编译环境，使用root账户登录
Host linux_x86_compile
    HostName 172.22.48.65
    User root
```
保存之后，左侧的远程资源管理面板中会显示刚刚添加的远程服务器。同样鼠标悬停在上面，右侧会显示一个文件夹图标，我们点击文件夹，会新开一个窗口并尝试连接该远程服务器。然后输入密码，会提示出错，因为我们的编译环境同样也无法连接外网，因此，vscode无法安装必须的远程代理。

### 10-4、离线安装远程vs-server代理
- 进入远程服务器， 执行 ps aux | grep vscode，结果没有找到commit字符串，然后直接在windows的vscode的帮助-》关于中获取
- 目录/root/.vscode-server/bin/下面有个文件夹名是commit，即~/.vscode-server/bin/
- 稳定版：https://update.code.visualstudio.com/commit:c3f126316369cd610563c75b1b1725e0679adfb3/server-linux-x64/stable
- insider版：https://update.code.visualstudio.com/commit:c3f126316369cd610563c75b1b1725e0679adfb3/server-linux-x64/insider
- 下载成功后上传到远程服务器。复制到 ~/.vscode-server-insiders/bin/【commit号】，通过使用tar -xvf vscode-server-linux-x64.tar.gz --strip-components 1解压文件
- 使用chmod +x node server.sh为node和server.sh添加可执行权限
- 重新打开vscode。

## 11、visual studio code 重置所有设置（还原默认设置）
a.打开如下目录：C:\Users\pcName\AppData\Roaming\Code\User（ 注意替换pcName为自己电脑设置的名称）
b.用记事本打开目录下的settings.json，修改里面的对应配置可以解决对应的问题，重置的话全部删除就好了

## 12、关于个性化配置
```
{
    "workbench.startupEditor": "newUntitledFile",
    "workbench.iconTheme": "vscode-icons",
    "breadcrumbs.enabled": false,
    "editor.multiCursorModifier": "alt",
    "editor.renderWhitespace": "none",
    "editor.renderControlCharacters": false,
    "vsicons.dontShowNewVersionMessage": true,
    "files.autoSave": "afterDelay",
    "editor.tabSize": 2,
    "files.associations": {
        "*.vue": "vue"
    },
    "eslint.autoFixOnSave": true,
    "eslint.options": {
        "extensions": [
            ".js",
            ".vue"
        ]
    },
    "eslint.validate": [
        "javascript", {
            "language": "vue",
            "autoFix": true
        }, "html", "vue"
    ],
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "vue": "html",
        "vue-html": "html"
    },
    "git.confirmSync": false,
    "window.zoomLevel": 0,
    "editor.cursorBlinking": "smooth",
    "editor.minimap.enabled": true,
    "editor.minimap.renderCharacters": false,
    "window.title": "${dirty}${activeEditorMedium}${separator}${rootName}",
    "editor.codeLens": true,
    "editor.snippetSuggestions": "top",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "diffEditor.ignoreTrimWhitespace": false,
    "liveServer.settings.donotShowInfoMsg": true
}
```

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

## 13、将Vscode添加右键打开文件夹功能
参考：https://blog.csdn.net/Trees__/article/details/123390459

计算机\HKEY_CLASSES_ROOT\Directory\Background\shell\VisualCode\command
"C:\Program Files\Microsoft VS Code\Code.exe" "%V"

## 14、显示git上库记录
Vscode-gitlens 隐藏每行代码的git历史记录

默认情况下，gitlens插件会显示每行代码的blame历史记录，如果为了保持界面的简洁，可以修改以下配置进行隐藏
```
"gitlens.currentLine.enabled": false
```

下载安装gitlens插件：https://marketplace.visualstudio.com/vscode
- 搜索gitlens
- 选择评价高的
- 右边Resources-》点击Download Extension
- 点击VSCode中的插件管理-》右上角Install from VSIX即可
- 安装失败，不兼容，需要下载一个老版本
- https://marketplace.visualstudio.com/items/eamodio.gitlens/changelog
- 找到github项目主页，右边Release即可https://github.com/gitkraken/vscode-gitlens
- 找到老版本即可，结果github打不开，无奈使用文件夹安装方式
- 安装成功之后，vscode 左侧边栏便会出现 gitlens 小图标。如果没有出现，则使用快捷键 ctrl + shift + p，输入命令 GitLens set，点击 GitLens: Set Views Layout 即可

## 15、