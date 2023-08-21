# windows相关

## 1、认识Windows10系统

系统下载：https://msdn.itellyou.cn/

截图快捷键：shift+win+s

### 1-1、版本、版本号、OS版本
版本：企业版、教育版
版本号：用户根据微软后面版本发布习惯给这个版本取的名字，1507表示2015年7月发布的版本
OS版本：内部版本号

从1703版本起，每年的更新在三月和九月，即只有xx03和xx09

### 1-2、win10版本14393是什么版本
win10版本14393是：Win10一周年更新（Windows 10 Anniversary Update）。

开发代号：Red Stone 1(红石1),简称rs1,版本号1607，操作系统内部版本号：build 14393。前两个版本好像都没有正式的发行名称，从这一版开始，每个版本正式发行的时候，都会取一个名字，这个版本发布时间刚好是Win10正式版发布一周年的时间，所以取名“一周年更新”。

2018年4月11日消息 在“周二更新补丁日”，微软今天宣布停止支持Windows 10 version 1607，也就是Windows 10一周年更新14393版本，包括Windows 10家庭版和Windows 10专业版用户。如果你还停留在Win10一周年更新上，那么此后将不会收到微软推送的月度安全补丁和更新等。

Win10众多版本号：

1、Win10 RTM版，即首个正式版：

开发代号：Threshold Release 1，简称th1，版本号1507（在我印象中这个版本号，并未在发布的时候使用过，是用户根据微软后面版本发布习惯给这个版本取的名字，1507表示2015年7月发布的版本，下同），操作系统内部版本号：build 10240。

2、Win10首个重大更新：

开发代号：Threshold Release 2，简称th2，版本号1511，操作系统内部版本号：build 10586。从这个版本起，每个版本都按发布年月确定一个版本号。

3、Win10创意者更新（Creators Update)：

开发代号：Red Stone 2（红石2）,简称rs2,版本号1703，操作系统内部版本号：build 15063。从这个版本起，微软确认，每年的两次重大更新分别安排在三月和九月。

所以基本可以确定，下一个版本号是1709，而版本名称已经在四月的//build 2017开发者大会上确定：秋季创意者更新（Fall Creators Update）。

以上的版本，都叫正式版。每个正式版，还会有许多小版本的安全累积补丁更新，当前的Win10最新正式版的完整版本号就是Windows 10.0.15063.413。

windows 10 14393 是第三正式版，也就是去年 7 月份推出的周年版本。版本号 1607  OS内部版本 14393。

### 1-3、查看系统版本方法

忽然之间发现cmd可以运行的命令也可以在运行窗口输入运行。

方法一：右键点击开始——运行，输入winver确定。
方法二：点击开始——设置——系统——关于。就能看到。
方法三：右键点击开始——运行，输入dxdiag确定。
方法四：cmd窗口，输入slmgr /dlv确定。

### 1-4、Win10系统版本号怎么修改？轻松修改win10版本号的方法
在注册表编辑器中定位到 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion

然后就可以随便修改信息了。

### 1-5、您需要TrustedInstaller权限才能对此文件更改
https://jingyan.baidu.com/article/da1091fb4dcf5b027849d6d1.html

- 右击鼠标选择属性。再选择安全选项卡，点击右下角高级按钮
- 选择所有者选项卡，点击下方编辑按钮，选择您电脑的当前用户，点击确定。确保所有者为当前用户
- 切换到权限选型卡。点击更改权限按钮，如果没有当前用户，点击添加按钮。选择用户和组页面，点击左下方高级按钮。然后点中间立即查找按钮，在下方找到当前用户，最后点确定
- 设置完成后，切换到安全选型卡。点击当前用户，在下方权限选择完全控制。这样当前用户拥有了处理这个文件所有权限。当然删除就没问题了

### 1-6、关于驱动签名
Windows的sys驱动并不是一定要签名的？？？很奇怪，如usbvideo.sys驱动，有些系统签名了，有些未签名，都能正常使用。
并且发现usbvideo.sys驱动最开始在drivers中没有，当有摄像头插入的时候就会从其他地方拷贝过来。

不签名替换居然无法生效，签了名的驱动替换才能生效。很奇怪，原先使用的本身就没有签名。

#### 1-6-1、Win10关闭驱动程序强制签名的方法一
cmd命令管理员运行：
使用bcdedit /set testsigning on命令进入测试模式
恢复原样：bcdedit /set testsigning off
但是可能会遇到保护，无法进行修改，显示操作成功完成才算成功。
Win10 设置元素数据时出错。该值受安全引导策略保护，无法进行修改或删除。

bcdedit查看默认是没有testsigning选项的。
bcdedit /enum {current}

#### 1-6-2、Win10关闭驱动程序强制签名的方法二
按住shift+重启，然后选择疑难解答--高级选项--启动设置，在启动设置中重启，等待重启完成后选择禁用驱动程序强制签名。

#### 1-6-3、进行了6-2的操作，但是驱动加载还是存在问题
Win10 设置元素数据时出错。该值受安全引导策略保护，无法进行修改或删除。

1.重启电脑，按ESC（F2/F10/DELETE可能）进入BIOS
2.在Security选项中找到Secure Boot 这个选项，然后回车，Enabled是开启的意思，Disabled关闭的意思

这样就可以使用6-1的方法了。

### 1-7、wmic查看运行进程的参数
https://www.cnblogs.com/DiZhang/p/12544793.html

### 1-8、windows10文件资源管理器 显示 上周 很久以前导致无法排序
右键->分类依据->（无）

### 1-9、Windows Vista
一句话：XP系统的下一个版本，转折版本。

Windows Vista是微软公司所研发的具有重大创新意义的一个版本，其内核版本号为Windows NT 6.0。
2005年7月22日，微软宣布 Windows Vista 为这款新操作系统的名字。微软于2006年11月2日完成GA版本，向OEM 和企业用户发布。2007年1月30日，正式向普通用户出售，这是Windows 历史上间隔时间最久的一次发布。
Windows Vista较上一个版本Windows XP增加了上百种新功能，其中包括被称为“Aero”的全新图形用户界面、关机特效、加强后的搜索功能（Windows Indexing Service）、新的媒体创作工具（例如Windows DVD Maker）以及重新设计的网络、音频、输出、打印和显示子系统。Vista也使用点对点技术（Peer-to-peer,P2P）提升了计算机系统在家庭网络中的显示通信能力，将让在不同计算机或装置之间分享文件与多媒体内容变得更简单。针对开发者的方面，Windows Vista使用.NET Framework 3.0版本，比起传统的Windows API更能让开发者能简单写出高品质的程序。微软也在Vista的安全性方面进行改良，Windows Vista较Windows XP增加了用户管理机制（User Account Control,UAC）以及内置的恶意软件查杀工具（Windows Defender）等。
2011年7月12日，微软已终止Service Pack 1的支持。2012年4月10日，微软已终止Windows Vista的主流技术支持；
微软于2017年4月11日正式终止对Windows Vista的一切支持。至此，Windows Vista寿终正寝。

### 1-10、任务计划程序
windows自带的任务计划程序：
- 新建一个定时任务（创建任务）
- 触发器-》新建-》重复任务间隔-》持续时间
- 操作-》编辑-》启动程序-》程序或脚本（msg）-》添加参数（windows登录的用户名 弹框提醒的文字）

### 1-11、新版power shell和旧版power shell
管理员打开是/windows/根目录，非管理员打开是/users/根目录。
runas /user:administrator cmd

### 1-12、Windows cmd窗口的切换目录命令无法切换盘符
发现为cd命令不会切换当前的盘符，只能在一个盘符内切换
使用cd /d d:就可以了。

### 1-13、缩略图未显示
系统属性-》高级系统设置-》性能设置-》视觉效果-》显示缩略图，而不是显示图标

### 1-14、1809卡在安装界面 无法输入用户名,键盘失灵的解决方案
shift+f10 弹出cmd 输入taskmgr.exe然后按enter键回车 就会弹出任务管理器 任务管理器里面把“Microsoft IME”这个进程结束掉就行了 只要是需要输入的界面就使用这招

转别人的：
1.ctrl+shift+F3 重启后直接进入系统，我的笔记本用外接键盘按这个才好使，笔记键盘就在那调音量，重启后会弹出个对话框，我点的取消。
2.设置里把所有更新都卸载，最后剩下几个无法卸载的。不确定到底卸载哪个，于是全都卸载了。
3.重启。不确定有没有必要，重启第一遍还出来个defaultuser0账户，没密码还登录不上，又重启一遍才进入系统。
4.再次重置后一切OK，现已正常使用。

### 1-15、如何判断当前USB3.0设备是否运行在USB3.0协议下？
不借助软件查看：打开Windows设置-》设备-》蓝牙和其他设备。

### 1-16、能ping通百度但是浏览器无法访问
还有特征就是微信、qq、企业微信都能进行登录，但是无法访问百度等其他网站。

是由于使用clash客户端开启过代理。

win10系统：控制面板-》网络和Internet-》代理
win7系统：控制面板-》网络和Internet-》Internet选项-》连接-》局域网设置-》代理服务器

### 1-17、win10系统，用户名是英文，但是用户文件夹是中文名
如用户名为admin，但是C:/Users/研发/这里却是中文，如果是当前用户登录则无法重命名文件夹，但是切换用户登录则可以，但是是否能正常待验证。
还有一个在计算机管理-》系统工具-》本地用户和组-》用户发现用户名为admin，全名为研发。但是在这里修改无济于事。

### 1-18、文件资源管理器缩略图
在文件夹选项中没有找到“始终显示图标，从不显示缩略图”的选项，可能是因为该选项已被删除或更改。
导航到以下注册表路径：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced，选择“新建”>“DWORD值”，并将其命名为“IconsOnly”。
这个值存在，不是这个问题。

导航到以下注册表路径：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced，选择“新建”>“DWORD值”，并将其命名为“DisableThumbnailCache”。
这个方法不行。

后来想到之前有进行一下系统优化，可能是优化中给我关闭了。

https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/rds-vdi-recommendations-2004#per-user-services-in-windows
最终参考：D:\Github\Storage\windows\Microsoft optimization template for win10.zip
https://flings.vmware.com/vmware-os-optimization-tool
https://support.citrix.com/article/CTX224676
没有找到文件的来源，最终注册表修改为：
```
<step name="Turn off Thumbnail Previews in File Explorer" description="Enable this policy, Disable Thumbnail Previews in File Explorer." osReleaseId="" category="recommended" defaultSelected="true">
<action messageOnly="False">
<type>Registry</type>
<command>ADD</command>
<params>
<keyName>HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer</keyName>
<valueName>DisableThumbnails</valueName>
<type>REG_DWORD</type>
<data>1</data>
</params>
</action>
</step>
```
搞定，并且也有“始终显示图标，从不显示缩略图”的选项，也能显示缩略图了。

### 1-19、Outlook2016发送大图片会进行自动压缩
Outlook 支持的最大图片大小取决于您使用的 Outlook 版本和配置。以下是一些常见的 Outlook 版本和它们支持的最大图片大小：
```
Outlook 2007 和 2010：20 MB
Outlook 2013 和 2016：35 MB
Outlook 2019 和 Office 365：150 MB
```
请注意，这些数字仅供参考，实际上可能会因为您的 Outlook 配置和网络限制而有所不同。此外，即使您的 Outlook 版本支持较大的图片大小，也不建议在电子邮件中包含过大的图片，因为这可能会导致电子邮件发送和接收速度变慢，甚至无法发送或接收。建议将图片大小限制在几百 KB 或更小的范围内，以确保电子邮件能够正常发送和接收。

Outlook 默认会对发送的图片进行压缩，以减小邮件大小并加快发送和接收速度。如果您希望取消 Outlook 对图片的压缩，可以按照以下步骤操作：
在 Outlook 中，点击“文件”选项卡，然后选择“选项”。
在“Outlook 选项”窗口中，选择“电子邮件”选项卡。
在“电子邮件”选项卡下，找到“邮件格式”部分，并点击“站点和邮件编辑选项”按钮。
在“编辑选项”窗口中，找到“高级选项”部分，并找到“图像”选项。
在“图像”选项下，取消选中“自动调整大小的图像”复选框。
点击“确定”按钮保存更改。
完成上述步骤后，Outlook 将不再自动压缩您发送的图片。请注意，取消图片压缩可能会导致邮件大小变大，从而导致发送和接收速度变慢。因此，建议仅在必要时才取消图片压缩。

根本找不到上述的地方，根本行不通，还是老老实实的将图片调整为显示大小，即将图片裁剪成小图片。
另外发现使用谷歌浏览器发送邮件就可以正常显示，但是使用软件打开则不行。

### 1-20、Windows10安装的时候键盘输入失灵
只针对1809版本，因为只有这个版本有这个问题。
安装的时候，在设置用户名的时候无反应，鼠标能点击，键盘无响应。

解决方法：
- shif+F10打开DOS窗口
- taskmgr命令调出任务管理器窗口

### 1-21、工具栏卡死，15秒左右后恢复正常
但是卡死现象会频繁发生，并且物理机重启后还是会出现。
https://m.airconnectsolutions.com.cn/xtjc/2474.html

这种情况有可能是存在冲突软件引起的。如果你确定这种情况是在安装某个软件之后出现了，那么可以尝试进入安全模式中把这个软件卸载：
按window+R键，弹出运行窗口，输入msconfig调出系统配置窗口：
1、选择引导标签页，勾选安全引导选项。
2、点击确定后重启系统。
3、系统进入安全模式，在安全模式中卸载最近安装后导致任务栏系统图标无法点击的软件。
4、卸载软件之后，同样按照上面的方法调出系统配置窗口，并把安全引导选项勾除。
5、再次重启系统，看看是否问题解决。

卸载了EDGE相关的一些软件，以及一个补丁包后正常，很神奇。
不久后还是存在问题，应该之前没有解决，现在就参考http://needc.com/soft/64411/卸载windows补丁包试试。

## 2、其他windows

### 2-1、20210201
发现一个非常牛批的bug。

在2560x1440分辨率,100%推荐文本大小模式下,使用mobaxterm无法进行sftp文件拖曳,会有禁止图标问题.google查询无果.

### 2-2、D3D中的DXGI是做什么用的
举个例子，在以前图形子系统都归D3D，结果D3D8/D3D9分别有一套代码用来管理swap chain。在Vista+里，图形API越来越多，D3D9/D3D10/D3D11/D3D12，都来一套swap chain太没意义了。于是重构成所有API可以共享一份swap chain的代码，这就放在DXGI。除此之外，窗口全屏化之类的事情也都归DXGI了，你可以认为屏幕输出的部分都归DXGI。后来DXGI又加了一些底层的功能，用来跟DWM打交道，比如拷贝混合后的屏幕，设备旋转，跨屏幕窗口。。。还有些未公开的，我就不说了。归根到底，你写个程序，甚至看看sample代码，就知道DXGI做什么用了。

不论是 OGL 还是 D3D，都没有包含与窗口（HWND，安卓下的 View 啥的）打交道的函数，光是程序里画好是不够滴，还得拷贝到屏幕上呢！所以 OGL 需要 EGL、WGL、GLX 等在窗口和 API 之间交流交流。类似的 D3D （10 之后）需要 DXGI 来做这件事情。Vulkan 也有一个 WSI（Windows System Interface）

### 2-3、D3D
D3D，全称为Direct3D，是微软为提高3D游戏在Windows中的显示性能而开发的显示程序接口，目前已经升级到12版本，它提供了丰富的3D功能库，是游戏广泛采用的标准。
D3D的作用在于只需要调用D3D提供的接口函数和功能就能实现显示功能，通过分工合作，极大的降低了软件开发周期和成本。

3D加速卡就是硬件，也就是我们常说的显卡。
而操作系统和应用软件通常不能直接去使用显卡和其中的3D加速功能，必须通过系统中的一个接口去调用，这就是OPENGL和D3D的作用了。

### 2-4、查看电脑.NET Framework版本
地址栏中直接输入地址，C:\Windows\Microsoft.NET\Framework回车最高版本。
控制面板左侧打开或关闭windows功能按钮。

### 2-5、如何将exe应用程序添加到鼠标右键应用程序打开
https://www.cnblogs.com/cn2018/p/10273261.html
```sublime_addright.reg
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\*\shell\SublimeText3\command]
@="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe %1"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3\command]
@="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe %1"
```

### 2-6、DX基础 | DXGI(DirectX Graphics Infrastructure)
https://www.pianshen.com/article/40881199723/

ntoskenl 是 Windows 的内核进程，负责 Windows 核心部分的操作，也就是负责操作系统核心的五大任务：处理机管理、存储管理、设备管理、文件管理、接口，这从它的 PID = 4 就能看出来它的地位是操作系统最先启动的进程。操作系统（四）操作系统的主要功能 - 魏亚林 - 博客园​www.cnblogs.com因此它是接管整个电脑硬件的程序，具有最高权限，或者说它要运行在硬件的环境上。而我们日常使用的其他程序都是在 ntoskrnl 的掌管下运行的，而且运行方式是调用 Windows 的接口。如果你在 Windows 环境下直接运行它，那么就变成了 Windows 的环境，所以提示无法在 Win32 模式下运行。注意 win32 是指 Windows NT 系列内核，而不是指 32 位 Windows。64 位 Windows 同样也叫 Win32。应用程序在调用 Windows 接口时，功能的执行需要由 ntoskrnl 进行。因此当某些程序在大量调用系统接口或者系统功能时，会造成 ntoskrnl 的高占用。由于没有便捷的方式可以排查问题，你可以尝试逐个结束其他进程。这不会造成系统损坏。

### 2-7、给软件添加开机启动项
- 给软件创建桌面快捷方式
- 将桌面快捷方式剪切到C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp
- cmd输入msconfig就可以在启动项中看见

### 2-8、Fsutil 
命令行工具，windows自带。

Fsutil 是可用于执行多种与 FAT 和 NTFS 文件系统相关的任务（例如管理重解析点、管理稀疏文件、卸载卷或扩展卷）的命令行实用程序。由于 Fsutil 功能非常强大，因而只有完全掌握 Windows XP 的高级用户才能使用它。此外，必须作为管理员或管理员组的成员登录才能使用 Fsutil。
```
C:\WINDOWS\system32>fsutil volume diskfree D:
可用字节总数        :  87,696,003,072 ( 81.7 GB)
总字节数             : 343,596,265,472 (320.0 GB)
配额可用字节总数  :  87,696,003,072 ( 81.7 GB)

C:\WINDOWS\system32>fsutil fsinfo drives

驱动器: C:\ D:\ E:\

C:\WINDOWS\system32>fsutil fsinfo drivetype C:
C: - 固定驱动器

C:\WINDOWS\system32>fsutil fsinfo drivetype E:
E: - CD-ROM 驱动器

fsutil file createnew 4GB.txt 4294967296‬
```

### 2-9、sc命令
SC命令是XP系统中功能强大的DOS命令,SC命令能与“服务控制器”和已安装设备进行通讯。SC是用于与服务控制管理器和服务进行通信的命令行程序。
```
sc query jk
sc del jk
```

### 2-10、提示Windows已遇到关键问题一分钟后自动重新启动怎么办
> sfc/verifyonly   扫描问题
> sfc/scannow      修复问题
> shutdown-a 命令  强制取消重启 

### 2-11、win7系统设置壁纸
我有一张3840x2160的壁纸，直接右键设置壁纸发现图片会完全展开，屏幕分辨率为1920x1080，但是通过双击打开图片，然后再右键设置壁纸，这时候就会被缩放成1920x1080的壁纸。

## 3、win11那些事儿

### 3-1、提示这台电脑不符合安装此版本的Windows所需的最低系统要求
出现这个问题是因为电脑硬件配置不符合win11的要求，比如没有TPM2.0，没有开启安全启动等。解决此问题可以通过注册表来绕过检测，但是微软建议不符合要求的电脑最好不要安装，避免出问题。下面的解决步骤适用于使用U盘安装的情况。

http://www.ujiaoshou.com/xtjc/171924205.html

### 3-2、关于修改本地用户密码
起因老婆笔记本电脑密码忘记了，但是能使用指纹解锁到不影响平时使用，但是借给别人就特别麻烦。

尝试在设置-》账户-》登录选项-》密码-》更改，这时候它会让你需要输入当前的密码，这咋知道。
但是发现在计算机管理-》系统工具-》本地用户和组-》用户中右键设置密码就不需要输入当前的密码，好神奇。

然而，在笔记本win11系统上面，并没有找到本地用户和组，在搜索框中搜索，搜到了结果报错当前单元不支持。我更换了一台win11系统，在里面找到了本地用户和组。
然后问chatgpt：
如果你在Windows 11中打开计算机管理控制台，但是没有找到本地用户和组，可能是因为Microsoft已经将其移动到了“Windows PowerShell”应用程序中。以下是在Windows PowerShell中管理本地用户和组的方法：

打开“Windows PowerShell”应用程序。你可以在开始菜单中搜索“PowerShell”来找到它。
在“Windows PowerShell”窗口中，输入以下命令来列出所有本地用户：
```
Get-LocalUser
```
这将显示计算机上所有本地用户的列表。

要创建新的本地用户，请使用以下命令：
```
New-LocalUser -Name "用户名" -Password (ConvertTo-SecureString "密码" -AsPlainText -Force)
```
将“用户名”和“密码”替换为你要创建的用户名和密码。

要删除本地用户，请使用以下命令：
```
Remove-LocalUser -Name "用户名"
```
将“用户名”替换为你要删除的用户名。

要列出所有本地组，请使用以下命令：
```
Get-LocalGroup
```
这将显示计算机上所有本地组的列表。

要创建新的本地组，请使用以下命令：
```
New-LocalGroup -Name "组名"
```
将“组名”替换为你要创建的组名。

要删除本地组，请使用以下命令：
```
Remove-LocalGroup -Name "组名"
```
将“组名”替换为你要删除的组名。

请注意，使用PowerShell管理本地用户和组需要管理员权限。如果你没有管理员权限，你可能无法执行这些命令。

你可以使用以下命令在Windows PowerShell中修改本地用户的密码：
```
Set-LocalUser -Name "用户名" -Password (ConvertTo-SecureString "新密码" -AsPlainText -Force)
```
将“用户名”替换为你要修改密码的本地用户的用户名，将“新密码”替换为你要设置的新密码。


































