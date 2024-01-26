# Windows编程那些事儿

FAQ是英文FrequentlyAskedQuestions的缩写，中文意思就是“经常问到的问题”，或者更通俗地叫做“常见问题解答”。
FQA常见问题回答（frequentlyquestionsanswer)多见于网站

## 1、CHAR转WCHAR
强转不报错，但是有问题，需要专门的函数：
```
// 计算数组元素个数
#define _logcountof(array)			(sizeof(array)/sizeof(array[0])) 
// 安全的以字符为单位的缓冲区大小
#define _logsafecchof(array)		(_logcountof(array) - 1)

CHAR Str[] = "abcdeg";
WCHAR Path[1024] = { 0 };
(void)MultiByteToWideChar(CP_ACP, NULL, (LPCSTR)(str),	(int)strlen(str), Path, _logsafecchof(Path));
OutputDebugStringW(Path);
printf("%S\n", Path);

注意宽字节需要使用大写S输出，使用小写s输出不全。
```

## 2、Windows错误码大全
https://www.cnblogs.com/icebutterfly/p/7834453.html
Microsoft Visual Studio自带错误码查询软件，在工具=》错误查找。
```
0000 操作已成功完成。
0001 错误的函数。
0002 系统找不到指定的文件。
0003 系统找不到指定的路径。
0004 系统无法打开文件。
0005 拒绝访问。
0006 句柄无效。
0007 存储区控制块已损坏。
0008 可用的存储区不足，无法执行该命令。
0009 存储区控制块地址无效。
0010 环境错误。
....
```

## 3、error: LNK2019: 无法解析的外部符号 __imp_PostMessageW，函数 “private: void __cdecl Widget
对于此类问题，一般来说是找不到具体报错的地方，原因是缺少库。

在对应的.cpp中添加这个文件：
```
#pragma comment  (lib, "User32.lib")
#include <SetupAPI.h>
#pragma comment  (lib, "setupapi")
```

## 4、解决vs运行程序一闪而过
方法一：程序末尾增加输入语句，这样程序运行结束前会要求用户输入，控制台就会保持存在
方法二：在程序末尾添加语句：system("pause");  加上这句后，控制台显示运行结果后会显示“请按任意键继续”
方法三：修改项目配置，右键点击项目，在右键菜单中选择属性，然后在弹出的对话框左侧列表中中选择“配置属性”-->“链接器”-->“系统”，然后在右侧的列表中，在第一项”子系统“的值中选择”控制台（/SUBSUSTEM:CONSOLE）”（解决不了生成的exe双击一闪而过问题）

## 5、缺少vcruntime140d.dll的解决办法
安装Visual C++ Redistributable for Visual Studio 2015(需要Windows7withSP1)。

发现安装之后也无法解决。

发现缺少的dll文件分布在不同的版本之中，可以通过查看属性-》详细信息。

## 6、文件夹中的文件删除不了
问题报错：操作无法完成，因为文件已在控制台窗口主进程中打开

- 在性能管理器中，CPU栏，句柄中搜索文件夹名未搜索到
- 然后重命名文件夹和文件都成功，但还是删除不了


故事起因是我重新安装beyond compare4，原先是3，鼠标右键点击比较报错。
参考这个方法未解决：https://blog.csdn.net/sanqima/article/details/100625578
各种卸载重装都不行，现在想想还是跟无法删除3的文件夹有关，重启电脑后解决。

## 7、win10拍照快捷键
shift+win+s

## 8、cd命令
```
C:\迅雷下载\tcpdump_windows>help cd
显示当前目录名或改变当前目录。

CHDIR [/D] [drive:][path]
CHDIR [..]
CD [/D] [drive:][path]
CD [..]
```

## 9、DOS窗口中文显示乱码
起因是wireshark中的dumpcap.exe -D命令执行显示中文乱码

通过修改注册表·计算机\HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe\CodePage·值为936（十进制）

## 10、为什么win10 cmd.exe 打开界面一片黑？
https://www.zhihu.com/question/371904392

原来是背景图颜色和文字颜色重叠了。。。。。

解决办法：1、打开问题cmd窗口；2、按Alt+X；3、选“属性”；4、切换到“终端”选项卡；5、取消选择“使用单独的前景”和“使用单独的背景”；6、点击“确定”。现在已经可以正常显示了，然后在“颜色”选项卡里设置好颜色，最后在“终端”选项卡里重新选择“使用单独的前景”和“使用单独的背景”，点击“确定”也不再黑屏了。

## 11、windows的更改屏幕保护程序里面的设置
计算机\HKEY_CURRENT_USER\Control Panel\Desktop

ScreenSaveTimeOut、ScreenSaverIsSecure、ScreenSaveActive

## 12、虚拟内存
计算机-》右键属性-》高级系统设置-》高级-》性能设置-》高级-》虚拟内存

## 13、#pragma alloc_text 与 ALLOC_PRAGMA
https://blog.csdn.net/youyou519/article/details/90904498

## 14、Dell电脑开机显示Alert!The AC power adapter wattage and type cannot be determined.
The AC power adapter wattage以及下面的英文意思是
电源适配器不能被正确识别，电池可能无法充电，电池电量低。系统无法启动。是电源适配器问题导致的。
解决方法：
一，检查电源适配置器有没插好，重新拔插一下。更换电源插座
二、问题依旧，更换电池适配器

## 15、如何在Windows10任务管理器中显示命令行
win10：任务管理器-》进程选项卡-》名称标题栏-》右键鼠标-》命令行
win7 ：任务管理器-》进程选项卡-》查看-》选择列-》命令行

## 16、执行脚本会出现需要按回车才能继续进行
右键-》属性-》取消勾选快速编辑模式

## 17、Win10背景设置不了已由组织隐藏或设置解决方法
https://www.xitongzhijia.net/xtjc/20201125/194748.html
1、按下WIN+R，在运行中输入gpedit.msc回车；
2、用户配置----管理模板-----控制面板----个性化-----阻止用户更改桌面----已禁用。

把阻止更改桌面背景这一项设置为已禁用。
设置之后，再打开桌面背景设置，就发现一切OK了，原因是可能使用过一些桌面软件，导致的该选项被禁用。

未重启发现暂时不能用。

## 18、此文件中的某些Unicode字符未能保存在当前代码页中，是否以Unicode编码重新保存此文件
运行程序输出字符串有乱码，发现当前文档编码是unicode，想保存为gbk，但是就是保存不了，一直报上述错误。
发现在项目中生成能看见具体的错误信息。

最终：使用notepad++打开cpp文件，终于找到问题原因，原来字符串中前面存在?号。

必现方法：在文件属性安全中拷贝文件绝对路径到vs项目中，必现，只能通过notepad++文件进行修改。

## 19、解决“请等待当前程序完成卸载与更改”
任务管理器-》进程-》dllhost.exe进程杀掉即可。

## 20、Win10电脑显示Windows无法验证此设备所需的驱动程序的数字签名怎么解决
方法一：
1、按下shift 按键 点击重启按钮 重启后。
2、疑难解答--》启动--》f7 禁用未签名强制验证。
3、即可解决。

方法二：
1、打开设置，打开开始菜单，找到里面的设置
2、2、打开进入设置界面，找到里面的“更新和安全”
3、打开更新和安全，左侧的“修复”，点击高级启动中的“立即重启”按钮。
4、系统自动进入安全操作界面，选择“疑难解答”
5、进入疑难解答，选择“高级选项”
6、进入高级选项，里面有系统修复、启动修复、命令提示符、启动设置等，我们选择“启动设置”
7、进入启动设置界面，点击“重启”按钮，重启计算机
8、进入启动设置界面，有9个不同的选项，我们是进入安全模式，按一下键盘上的F7 1=F1 2=F2 以此类推
9、然后重启电脑 ， 打开电脑 设备管理--》 在线更新驱动就好了

当然，可能也导致相关系统校验签名文件损坏，您尝试sfc修复看是否能够解决：
1、同时按“Win+X”，
2、点击“命令提示符（管理员）”，
3、在控制台输入sfc /scannow 回车。
此后系统会开始扫描，扫描完毕后关闭确认问题。

## 21、登陆服务器出现身份验证错误,登录服务器，提示“发生身份验证错误。要求的函数不受支持”的解决办法
https://blog.csdn.net/weixin_28884741/article/details/119288439
推荐：https://cloud.tencent.com/document/product/213/30813#step4

方案一：安装安全更新（推荐）无网
方案二：修改组策略配置 公司内部限制打开显示组策略错误
方案三：修改注册表
在左侧导航树中，依次展开计算机 > HKEY_LOCAL_MACHINE > SOFTWARE > Microsoft > Windows > CurrentVersion > Policies > System > CredSSP > Parameters 目录。
若该目录路径不存在，请手动创建。
右键单击 Parameters，选择新建 > DWORD(32位)值，并将文件名称命名为 “AllowEncryptionOracle”。
双击新建的 “AllowEncryptionOracle” 文件，将 “数值数据” 设置为 “2”，单击确定。
不需要重启物理机即可连接。

## 22、注册表：配置文件
注册表好比是我们用的户口簿，我们安装的程序都要在注册表中进行注册登记。注册表中可以记录程序或文件存放的位置、授权信息、外观设置……
人们通过修改注册表相应的键值，可以获得他们想要的效果而省去了复杂的操作。
https://blog.csdn.net/chenjian60665/article/details/94440814
https://www.cnblogs.com/alantu2018/p/8503883.html

## 23、versiom
version “版本”。指文件或软件的公开发行版本，强调功能性。通常在功能方面有重大改变、改进或增加，包括对一些重大bug的修复。
revision “修订版”。指在文件或软件的公开发行版本的基础上，在功能方面有细微改变、改进或增加，包括对一些小bug的修复，这是在某个version版本的基础上在不同设计阶段的标志。
所以，在每次修改时，revision都会变化，但是version 却不一定会有变化。

## 24、电脑台式机无法双屏幕显示，检测不到第二台显示器
跟之前的问题原因一样，之前是没有2k的分辨率。

这次的原因也很简单，没有安装显卡驱动。

独立显卡开启后会禁用集成显卡，从而导致集成主板上面的视频接口无法使用。
集成显卡和独立显卡同时使用需要满足特定的要求,Intel CPU的核显与A卡或N卡不能同时工作；同时只能使用一个显卡进行工作。当主板上有独显时,集成显卡会自动屏蔽的.
分为两种情况：APU自带的集成显卡和AMD的独显是可以同时使用，进行双显卡交火的。

## 25、愚昧想卸载usb3.0主控驱动重命名USBHUB3.SYS文件
键鼠无法使用，想进入安全模式，最终进入命令窗口重命名文件解决。
ren USBHUB3.SYS.bak USBHUB3.SYS
注意恢复盘在X，需要重命名。

## 26、Windows时间同步时出错该怎么解决
“Windows在与time.windows.com同步时出错”的提示，其实这个出错的原因是没有将Windows Time设置为开机自启动，或者由于使用一些第三方软件的优化功能，把该该自启动功能给关闭了。答案已经很明显，我们需要到电脑系统里面，把Windows Time的属性改为自启动，问题基本上就可以解决了。

http://www.nndssk.com/xtwt/98813whreub.html
我的电脑确实也是手动状态，但是显示已启动，这非要改为自启动吗？
Win+R，敲入service.msc，找到Windows Time，把启动类型修改为自动，点击确定退出，提示：这里一定要重启电脑才能够生效哦。

又不想重启电脑，好纠结无法验证，为了验证，只能狠心重启电脑。可以先手动修改时间，下次验证时再修改时间重启，我真是机灵鬼。

## 27、解决 Windows 照片查看器无法显示此图片，因为计算机上的可用内存可能不足
参考：https://blog.csdn.net/WannaHaha/article/details/107160492

更换软件查看。

## 28、使用Mimikatz获取密码失败
[破解windows系统登录密码](https://mp.weixin.qq.com/s/cabS2oX4_0jrFN1fA3n_AQ)
说到windows系统密码，就不得不提到一个文件，那就是SAM，因为这个文件是用来存放用户账号信息的一个文件，不过这个文件是打不开的，而且也不能修改，不然程序可能会出现未知错误，SAM文件的位置：C:\Windows\System32\config\SAM
Mimikatz是法国人benjamin 开发的一款功能强大的轻量级调试工具，他可以将windows密码以明文的形式显示出来，这款工具的包含了很多种用法。

参考：https://www.shuzhiduo.com/A/KE5QPBkMJL/
https://www.ngui.cc/el/1503049.html?action=onClick
https://blog.csdn.net/syl321314362/article/details/128868549

但是连基本的当前用户都没有获取到。
由于有安全软件，无法在物理机上面测试使用。
发现可能是我的虚拟电脑存在问题，发现使用LaZagne工具也无法获取任何信息。

简单来说就是：
在https://github.com/gentilkiwi/mimikatz/releases/tag/2.2.0-20220919下载mimikatz工具，然后执行：
```
privilege::debug
sekurlsa::logonpasswords
```

可能存在获取为null密码，但亲测没有看出有什么效果：
https://docs.microsoft.com/zh-cn/sysinternals/downloads/procdump
```
procdump64.exe  -accepteula -ma lsass.exe lsass
mimikatz.exe "sekurlsa::minidump lsass.dmp" "sekurlsa::logonPasswords full" exit 
```

还有修改注册表：
```
reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest /v UseLogonCredential /t REG_DWORD /d 1 /f
reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest /v UseLogonCredential /t REG_DWORD /d 0 /f

rundll32.exe user32.dll,LockWorkStation
```

发现使用工具还是挺好用的：
https://github.com/AlessandroZ/LaZagne
https://github.com/RowTeam/SharpDecryptPwd
https://github.com/HyperSine/how-does-navicat-encrypt-password
https://www.freesion.com/article/93941500785/

终极方法：winpe登录密码破解工具

## 29、xps文件
xps是 XML Paper Specification的简称，是电子文件格式，可以使用Microsoft XPS打开。

xps是微软公司开发的一种文档保存与查看的规范。这个规范本身描述了这种格式以及分发、归档、显示以及处理 XPS 文档所遵循的规则。最为显著的特点是，XPS 所用的置标语言是 WPF所用的 XAML的一个子集，因此显示 Windows应用程序所用的方法可以用于 XPS 文档。 XPS 是一个静态文档格式，其本身不包括类似于 PDF 所具有的动态特性。 XPS是微软推出的一种文档记录格式工具，即XPS Viewer。它可以打开xps文件，和pdf类似,但不能打开PDF。

XPS Viewer 这个工具被集成到了vista和win7操作系统中，如果你的系统是Vista或win7,那么你就可以直接浏览该XPS文件，其他系统需要下载安装XPS Viewer软件，这是微软为了对抗pdf的一种类似的新格式，不过不能用PDF阅读器打开。

对于其它操作系统的用户来说，就需要下载XPS Viewer这款软件：首先在百度搜索框中输入并下载“XPS Viewer”，下载完成后进行安装，其过程很简单，直接点下一步就可正确安装。

## 30、ActiveX控件
ActiveX是Microsoft对于一系列策略性面向对象程序技术和工具的称呼，其中主要的技术是组件对象模型（COM）。在有目录和其它支持的网络中，COM变成了分布式COM（DCOM）。
ActiveX 控件是用于互联网的很小的程序，有时称为插件程序。它们会允许播放动画，或帮助执行任务，如在 Microsoft Update 安装安全更新，因此可以增强您的浏览体验。在创建包括ActiveX程序时，主要的工作就是组件，一个可以自足的在ActiveX网络（Windows，Mac，Linux）中任意运行的程序。这个组件就是ActiveX控件。ActiveX是Microsoft为抗衡Sun Microsystems的JAVA技术而提出的，此控件的功能和java applet功能类似。

[如何解读微软的 OCX 控件和 ActiveX？](https://www.zhihu.com/question/579996174)

## 31、不能拷贝文件到桌面，但是能拷贝到D盘，能拷贝文件出去
解决方法：重启explorer即可。

## 32、为何我的右键不存在CRC SHA选项
https://www.zhihu.com/question/62726908
原因这个是7-zip软件持有的。

## 33、谷歌浏览器浏览网页卡住界面一直转圈圈
点击地址栏不安全=》Cookie=》清除对应网站的内容=》重新打开网页即可。
待验证网页重定向次数多能否使用此方法解决。

## 34、在dos终端模式下是不可以显示中文汉字的，只能显示英文
http://blog.chinaunix.net/uid-6638-id-107736.html

## 35、如何检测 CMD 是否以管理员身份运行/是否具有提升的权限？
https://www.huntsbot.com/qa/vdrD

亲测net session命令有效。