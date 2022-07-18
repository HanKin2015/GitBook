# ssh工具

## 1、MobaXterm

### 1-1、安装包
zip安装包大约在27M，免安装使用方便大约在14M。

MobaXterm 免费版（persional）和专业版（Professional）除了 sessions 数、SSH tunnels 数和其他一些定制化配置外限制外，免费版在终端底部还多了一个 “UNREGISTERED VERSION” 提示。

破解MobaXterm20.2软件方法步骤：https://www.jianshu.com/p/fa5a2fac4148

### 1-2、快捷键
快速tab切换：ctrl+tab   or    ctrl+shift+tab
保存界面：右键->save to file    选择plant text file

### 1-3、个性化设置
打开Settings – Configuration 进行相关设置
1）在Terminal下，如果需要鼠标右键快速复制粘贴，把“Paste using right-click”勾选上
2）可以修改字体，字号
3）自行选择喜欢的配色(Colors scheme)
4）勾选Log terminal output to the following directory记录日志文件
5）在Settings->Configuration->SSH下勾选SSH settings下面的SSH keepalive，防止自动退出。

MobaTextEditor

### 1-4、如何设置MobaXterm内鼠标右键粘贴的快捷键
Settings-》Terminal-》找到Paste using right-click,选择打钩，然后点ok。
只有新打开的窗口才能生效。

### 1-5、打开服务器情况
mobaxterm标签页最下方默认有个服务器内存硬盘情况信息的状态栏。

关闭与显示方法：
左边的工具栏 Sftp, 点击Remote monitoring，就出来了。这个功能应该是在11.0版本以上的才有，10.0版本的没有。

### 1-6、连接服务器出现左侧Scp栏无文件信息
一开始怀疑是MobaXterm出现了故障，结果连接其他服务器是正常的，那就应该是这个服务器的问题。
- 可以尝试重新打开一个选项卡
- 可以在Session中点击SFTP连接服务器

## 2、xshell
研究生的时候使用过，好像还不错。现在想想文件还挺大的，并且上下传文件还需要安装搭配的xshell ftp软件，整体下来整个安装包就很大。

## 3、finalshell
据说是一个非常强大的终端工具。
安装包80M，没有免安装包。

感觉还行，但是背景有点花，跟mobaxterm没太大区别，多了一些花里胡哨。
相比之下还是更加推荐mobaxterm。

## 

















