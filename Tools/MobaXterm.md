# ssh工具

## 1、MobaXterm
mobaxterm 的功能非常全面，几乎提供了所有重要的远程网络工具（比如 SSH、X11、RDP、VNC、FTP、MOSH 等），以及 Windows 桌面上的 Unix 命令（bash、ls、cat、sed、grep、awk、rsync 等），登录之后默认开启 sftp 模式。
mobaxterm.mobatek.net
大多企业运维都喜欢用它。

### 1-1、安装包
zip安装包大约在27M，免安装使用方便大约在14M。
注意一点：免安装的便携款你会发现主界面左边根本没有Sftp选项，这时候你可能就会放弃。但是并不是没有，它可以在Session-》SFTP即可。

MobaXterm 免费版（persional）和专业版（Professional）除了 sessions 数、SSH tunnels 数和其他一些定制化配置外限制外，免费版在终端底部还多了一个 “UNREGISTERED VERSION” 提示。

中文版：https://github.com/RipplePiam/MobaXterm-Chinese-Simplified
现在专业版需要先付款再下载。。。

破解MobaXterm20.2软件方法步骤：https://www.jianshu.com/p/fa5a2fac4148

### 1-2、快捷键
https://blog.csdn.net/weixin_51658262/article/details/115318692
快速tab切换：ctrl+tab   or    ctrl+shift+tab
保存界面：右键->save to file    选择plant text file
启动一个新的终端：Ctrl + Alt + T
关闭当前标签页：Ctrl + Alt + Q
上一个标签：Ctrl + Alt +左
下一个标签：Ctrl + Alt + RIGHT
切换全屏模式：F11

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
如果MobaXterm的SCP程序无法显示服务器的文件内容，可能是由于以下原因之一：
- 服务器上的文件权限不正确：如果服务器上的文件权限不正确，可能会导致SCP程序无法读取文件内容。您可以尝试使用SSH连接到服务器，然后使用ls -l命令查看文件权限，使用chmod命令修改文件权限。
- MobaXterm的SCP程序版本过旧：如果您使用的是较旧版本的MobaXterm，可能会存在SCP程序的Bug。您可以尝试升级到最新版本的MobaXterm，或者使用其他SCP客户端，比如WinSCP。
- 服务器上的文件编码不正确：如果服务器上的文件编码不正确，可能会导致SCP程序无法正确显示文件内容。您可以尝试使用file命令查看文件编码，使用iconv命令转换文件编码。
- 服务器上的文件内容为空：如果服务器上的文件内容为空，SCP程序自然无法显示文件内容。您可以尝试使用其他方法查看文件内容，比如使用cat命令或者使用FTP客户端。
如果您尝试了以上方法仍然无法解决问题，建议您联系服务器管理员进行检查和修复。

一开始怀疑是MobaXterm出现了故障，结果连接其他服务器是正常的，那就应该是这个服务器的问题(使用物理机进行连接也是正常的)。
- 可以尝试重新打开一个选项卡
- 可以在Session中点击SFTP连接服务器

可能上面的方法行不通，终极办法是：打开Session-》SSH，在里面进行连接。（这个方法果然行的通，+1）

还有一个方法是更换软件，WInSCP你值得选择。

### 1-7、使用scp命令
直接可以在MobaXterm软件上面使用，注意需要插件CygUtils.plugin文件。

### 1-8、使用23.05版本报错缺少mottynew.exe文件
因此无法直接使用MobaXterm_Personal_23.5.exe，需要通过安装这个版本文件，然后才会在电脑上面生成这个文件。这个算是一个bug，试过两台电脑都不行。但是我又试了两台电脑却又可以，会自动生成mottynew.exe文件。那应该不是bug，不然早就被人发现了。

## 2、xshell
研究生的时候使用过，好像还不错。现在想想文件还挺大的，并且上下传文件还需要安装搭配的xshell ftp软件，整体下来整个安装包就很大。

xshell 是一个非常强大的安全终端模拟软件，它支持 SSH1, SSH2, 以及 Windows 平台的 TELNET 协议。Xshell 可以在 Windows 界面下用来访问远端不同系统下的服务器，从而比较好的达到远程控制终端的目的。
https://www.netsarang.com/zh/xshell/

## 3、finalshell
FinalShell 是一体化的服务器网络管理软件 (java 语言编写)，不仅是 ssh 客户端，FinalShell 还是功能强大的开发、运维工具，充分满足用户的开发运维需求。
可以直观的看出远程服务器的硬件运行情况。
http://www.hostbuf.com/

据说是一个非常强大的终端工具。
安装包80M，没有免安装包。

感觉还行，但是背景有点花，跟mobaxterm没太大区别，多了一些花里胡哨。
相比之下还是更加推荐mobaxterm。

## 4、secureCRT
SecureCRT 支持 SSH，同时支持 Telnet 和 rlogin 协议。SecureCRT 是一款用于连接运行包括 Windows、UNIX 和 VMS 的理想工具。通过使用内含的 VCP 命令行程序可以进行加密文件的传输，网工应该很熟这个软件，经常使用它连接设备。
https://www.vandyke.com

## 5、WinSCP
WinSCP 是一个 Windows 环境下使用 SSH 的开源图形化 SFTP 工具客户端。同时支持 SCP 协议。它的主要功能就是在本地与远程计算机间安全的复制传输文件。
https://winscp.net/

## 6、PuTTY
PuTTY 是 SSH 和 telnet 客户端，最初由 Simon Tatham 为 Windows 平台开发。用 MIT 许可证授权。包含的组件有：PuTTY, PuTTYgen,PSFTP, PuTTYtel, Plink, PSCP, Pageant, 默认登录协议是 SSH，默认的端口为 22。
Putty 主要是用来远程连接服务器，它支持 SSH、Telnet、Serial 等协议的连接。
官网：putty.org
注册表位置：计算机\HKEY_CURRENT_USER\SOFTWARE\SimonTatham\PuTTY\SshHostKeys

### 6-1、plink命令行工具
与 SSH（Secure Shell）相关的命令行工具，通常与 PuTTY 套件一起使用。可以用作 SSH 客户端，允许用户通过命令行连接到远程服务器。
```
plink username@hostname -pw password
```

### 6-2、pscp命令行工具
用于通过 SSH 协议在本地计算机和远程计算机之间安全地复制文件。允许用户从本地计算机向远程计算机上传文件，或从远程计算机下载文件到本地计算机。
```
pscp localfile.txt username@hostname:/path/to/remote/directory/
pscp username@hostname:/path/to/remote/file.txt localfile.txt
```

### 6-3、使用集成的exe程序上传文件失败（签名工具）
通过wireshark软件抓包发现本地向22端口发送数据失败，一直在重试，使用ping命令没有问题。
原因是没有把对端的主机密钥缓存在注册表中（计算机\HKEY_CURRENT_USER\SOFTWARE\SimonTatham\PuTTY\SshHostKeys）
可以使用plink命令行工具进行添加:
```
C:\Users\Administrator\Desktop\Windows双签名工具>plink 1.2.3.4
The server's host key is not cached in the registry. You
have no guarantee that the server is the computer you
think it is.
The server's rsa2 key fingerprint is:
ssh-rsa 1024 00:3a:fd:42:ac:77:ec:6d:99:fe:89:a3:8d:7b:d3:8e
If you trust this host, enter "y" to add the key to
PuTTY's cache and carry on connecting.
If you want to carry on connecting just once, without
adding the key to the cache, enter "n".
If you do not trust this host, press Return to abandon the
connection.
Store key in cache? (y/n) y
后面全回车键即可
```

## 7、老版本连接报错
Couldn't agree a host key algorithm (available: rsa-sha2-512,rsa-sha2-256)

服务端更新了ssh库，需要高版本的mobaxterm软件才行，因此需要重新破解。

亲测24.2、25.1版本破解有效。
链接：https://pan.baidu.com/s/15Wbg5gDLHkjW6zVPzFA6PA
提取码：ipc9
我的网盘->我的资源->Mobaxterm破解软件
运行crack中的keygen.exe，单击Get Version from File从文件中获取版本，然后选择安装目录中的MobaXterm.exe，最后点击Generate即可。
最终会在安装目录中生成一个C:\program files (x86)\Mobatek\MobaXterm\Custom.mxtpro文件。

## 8、设置主密码
- 可以显示本地保存session密码（Settings->Genneral->MobaXterm passwords mannagement->Show passwords）
- 设置主密码（Settings->Genneral->MobaXterm passwords mannagement->Set a "Master Password" for strong passwords encryption）
- 主密码重置工具（全部session密码都无了）（https://mobaxterm.mobatek.net/resetmasterpassword.html）
- 主密码手动重置（全部session密码都无了）（找到Mobaxterm.ini文件，然后将mobauser@mobaserver=s0NHvIaCuVJN9zu+YhFX7mHz5uBkn6/8一行删除即可）

## 9、使用local terminal读取GB2312（简体中文）文件出现中文乱码
解决方案：Settings->Terminal->Default font settings->Courier New字体、字体集ANSI或者DEFAULT都行，终端集选择ISO-8859-1即可。
进一步测试发现，只需要修改Term charset为ISO-8859-1就行了。

注意：使用ISO-8859-1后其他编码的文件或者程序原先正常的此刻大概率会是中文乱码，因此还是建议恢复默认值UTF-8（设置成GBK也行），即鱼和熊掌不可兼得。

## 10、Mobaxterm使用ssh命令连接不上服务器，但是通过Session连接正常
使用git窗口的ssh命令也是正常的。
更换过CygUtils.plugin和CygUtils64.plugin组件，确实sshd版本更换了，更换过其他版本Mobaxterm软件。
大概率连接是失败的，极小概率会成功那么一两次，但是通过Session连接正常。
在服务端通过journal -f查看日志连接是成功的，说明是Mobaxterm出现了问题，目前想到的方法只能`重启电脑`。
```
没有任何连接相关日志打印：
2025-03-31   11:12.45   /home/mobaxterm  ssh -v root@172.22.1.26
2025-03-31   11:14.42   /home/mobaxterm 

服务端有连接成功日志：
Mar 28 14:21:20 adesk audit[32459]: CRED_REFR pid=32459 uid=0 auid=0 ses=6375 msg='op=PAM:setcred acct="root" exe="/usr/sbin/sshd" hostname=172.22.64.246 addr=172.22.64.246 terminal=ssh res=success'
```
经测试跟软件版本无关系，跟操作系统环境有关系。

## 11、XTerminal
官方网站：https://www.terminal.icu/
和MobaXterm一样是收费软件
https://mp.weixin.qq.com/s/CXNkdQSM3Duly366-BuUzQ

