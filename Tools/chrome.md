# 谷歌浏览器

## 1、Google Chrome
Google Chrome是一款由Google公司开发的网页浏览器，该浏览器基于其他开源软件撰写，包括WebKit，目标是提升稳定性、速度和安全性，并创造出简单且有效率的使用者界面。
软件的名称来自称作Chrome的网络浏览器GUI（图形使用者界面）。软件的beta测试版本在2008年9月2日发布，提供50种语言版本，有Windows、macOS、Linux、Android、以及iOS版本提供下载。谷歌将在Chrome上推出“小程序”增强型网页应用（Progressive Web Apps，简称 PWA）。 2018年11月，Google宣布，将从2018年12月份开始在其Chrome 71网络浏览器上移除持续提供滥用使用体验的网站上的所有广告。
受2020年新冠肺炎疫情影响，谷歌于2020年3月暂停向Chrome浏览器系统增加新功能，以保证软件尽可能平稳运行。

## 2、内网中谷歌浏览器居然还能检测版本太旧
很神奇，猜测可能是通过时间来判断的。
谷歌搜索镜像：https://www.bgrdh.com/sites/4292.html

## 3、谷歌浏览器插件
- simple allow copy：任何网站实现自由复制
- onetab：标签管理

## 4、谷歌安装包下载地址
### 4-1、第三方下载地址
异次元软件世界提供的地址：https://www.iplaysoft.com/tools/chrome
浏览迷提供的地址：https://liulanmi.com/chrome
追梦人博客提供的地址：https://dream.ren/tool/chrome

### 4-2、官方离线安装版
离线版本下载地址是：https://www.google.cn/chrome/?standalone=1&platform=win64&extra=stablechannel
下载参数解释
我们在正常的下载页面后面添加了一些参数 ?standalone=1&platform=win64
其中 ?standalone=1 指离线安装包
 platform=win64 指64位Windows版本。
如果只加 ?standalone=1 则会下载32位的Chrome离线包
用 mac 替换 win ，就可以下载 Mac版本

### 4-3、官方在线安装版
https://www.google.cn/chrome/
https://www.google.cn/intl/zh-CN/chrome/

### 4-4、谷歌浏览器金丝雀版
谷歌浏览器金丝雀版（Chrome Canary）是谷歌浏览器的一个特别版本，主要用于测试最新的功能和更新。

谷歌浏览器金丝雀版是谷歌浏览器的一个测试版本，通常被称为“金丝雀版”或“金丝雀构建”（Canary build）。这个版本的主要目的是让开发者能够尽早测试浏览器的最新功能和更新，确保这些功能在正式发布前能够被广泛测试和验证。金丝雀版的特点是更新频繁，通常每天都会更新，因此它相当于开发版（Dev Channel）和Chromium的组合。

与谷歌浏览器的其他版本相比，金丝雀版具有以下特点：
- 更新频繁：金丝雀版几乎每天都会更新，确保用户能够第一时间体验到最新的功能和修复。
- 不稳定：由于频繁更新和测试新功能，金丝雀版可能存在更多的bug和不稳定性，因此适合那些愿意参与测试和提供反馈的用户使用。
- 功能丰富：由于是测试版本，金丝雀版通常包含最新的功能和改进，可能比其他版本更先进。

## 5、谷歌浏览器切换强制黑色模式方法
地址栏输入：chrome://flags/#enable-force-dark

然后选择enable

然后Relunch，OK，成功

## 6、谷歌Chrome浏览器将于1月10日停止对Win7、Win8 和 Win8.1的支持
https://baijiahao.baidu.com/s?id=1754330757870542834&wfr=spider&for=pc

Chrome 109 将是上述三个系统设备获得的最后一个版本更新。

## 7、谷歌浏览器插件离线安装
直接拖动IE_Tab_Multi_extension_1_0_0_1.crx文件到谷歌浏览器安装失败，提示程序包无效。
注意：使用谷歌浏览器下载crx文件发现会自动安装，并且会自动并删除该文件，真是无语，最终还是使用百度网盘客户端下载的。

- 下载插件文件crx
- 将后缀重命名为rar，注意只能是rar后缀，zip则无效
- 解压
- 在谷歌浏览器扩展程序里面-》加载已解压的程序

## 8、谷歌插件下载的好地方
(极简插件)[https://chrome.zzzmh.cn/index]

## 9、谷歌chrome运行activeX控件
在谷歌chrome浏览器下，安装IE_Tab_Multi_extension_1_0_0_1控件即可
具体操作：将IE_Tab_Multi_extension_1_0_0_1 拖入谷歌浏览器
然后点击：添加即可

谷歌浏览器不能直接用activeX原因：
因为Activex是由微软开发，因而目前只支持原生态支持的IE，最新版Edge已经不再支持了。其他浏览器想要支持activex, 需要额外做一些设置或安装补丁包，其中谷歌浏览器的话，需要安装 IE-Tab-Multi控件

IE_Tab_Multi_extension_1_0_0_1下载地址：
链接：https://pan.baidu.com/s/1lgLjpI4WIr8EPYVSY1VJcA
提取码：1udm

具体图例可参考：https://jingyan.baidu.com/article/af9f5a2d0ebe5543140a4596.html

但是这个版本似乎有些老了，需要找个新版本。

后面尝试安装了https://github.com/mjb0331/Chrome_extensions/tree/master中的Chrome_extensions-master.crx，发现直接安装是安装不上的，但是通过解压安装能安装上，但是还是无法使用神思的网页。
```
IE Tab Multi (Enhance)
1.0.2.1
可在Chrome内使用多标签页式的IE，同时比其它IE扩展拥有更多强大的实用功能！
```
皇天不负有心人，终于成功了。

将插件安装完毕后，居然是在网页上面通过鼠标右键，会有IE Tab Multi选项，选择用IE Tab Multi打开当前页，然后出现字样：
```
Failed to load IE Tab Multi NPAPI plugin

This extension only supports Windows.
In Windows 8, It only supports Desktop Mode. 帮助
```
确认是版本太老。

参考：https://blog.csdn.net/weixin_42567027/article/details/130268260
发现IE Tab插件，https://www.jb51.net/softs/632850.html#downintro2
然后同样鼠标右键，就会有IE Tab Options，注意在复制网址的时候，不要复制file前缀，只复制后面的C:/Users/test/Desktop/神思标准化控件_V21.6.25.1515/神思标准化控件示例网页.html即可，这时候不会有各种转义乱码情况。

嵌套葫芦娃。

## 10、ActiveX控件
ActiveX是Microsoft对于一系列策略性面向对象程序技术和工具的称呼，其中主要的技术是组件对象模型（COM）。在有目录和其它支持的网络中，COM变成了分布式COM（DCOM）。
ActiveX 控件是用于互联网的很小的程序，有时称为插件程序。它们会允许播放动画，或帮助执行任务，如在 Microsoft Update 安装安全更新，因此可以增强您的浏览体验。
在创建包括ActiveX程序时，主要的工作就是组件，一个可以自足的在ActiveX网络（Windows，Mac，Linux）中任意运行的程序。这个组件就是ActiveX控件。ActiveX是Microsoft为抗衡Sun Microsystems的JAVA技术而提出的，此控件的功能和java applet功能类似。

组件的一大优点就是可以被大多数应用程序再使用（这些应用程序称为组件容器）。一个COM组件（ActiveX控件）可由不同语言的开发工具开发，包括C++和Visual Basic或PowerBuilder，甚至一些技术性语言如VBScript。

ActiveX控件是一种微软公司开发的可重用软件组件，它可以被嵌入到其他应用程序中，以提供特定的功能。ActiveX控件可以用多种编程语言编写，如C++、Visual Basic等，它们可以在Windows操作系统上运行。ActiveX控件可以用于创建各种应用程序，如Web浏览器插件、桌面应用程序、数据库应用程序等。

然而，由于ActiveX控件存在安全漏洞，因此在现代浏览器中已经被逐渐淘汰。现在，Web开发者更倾向于使用HTML5、CSS3和JavaScript等技术来实现Web应用程序的功能，而不是使用ActiveX控件。

## 11、网页可能暂时无法连接,或者它已永久性地移动到了新网址
```
ipconfig /flushdns 
nbtstat –r 
netsh int ip reset
netsh winsock reset 
```
效果不是很明显，多等等网页也能打开，发现第二天过来看也好了。不清楚是不是被同事修好了。

- 关闭浏览器重新打开解决，重新打开另外一个谷歌浏览器窗口不行
- 清理缓存没有试试

## 12、谷歌浏览器打开代码 
星期一发现在gitlab打开代码文件后，然后使用ctrl+F键进行搜索，然后chrome就卡死了。但是上周五还是正常的。使用edge浏览器正常，没有此问题。然后重启了虚拟机问题依然，找了几个同事也是相同问题。但是其中一个同事使用chrome 91版本没有此问题，我安装后情况有啥好转，但还是卡死。

然后清理缓存，GG，就准备更换浏览器办公了，后面感觉还是可能是安全全家桶导致的问题，静静等待排查结果吧！可怜了我清理缓存操作，以后还是不能做这傻事。

电脑使用Chrome有时候页面卡顿且内存占用很高，尝试方法：找到设置 -> 系统 -> 关闭对应的两项

## 13、win7每次打开提示版本更新
HKEY_CURRENT_USER/Software/Policies/Google/Chrome。若路径中不存在/Google/Chrome，需要自行新建。具体操作为：右键点击Policies，新建一个名为Google的项，再在Google项下新建一个名为Chrome的项。最后，在Chrome项下新建一个DWORD32位值，重命名为SuppressUnsupportedOSWarning，并双击该值将其键值修改为1即可。

在政策页地址（Chrome://policy）中，您可以查看各项政策的名称和启用状态，以确认相关设置是否已正确应用。

亲测无效！放弃，好像没有办法解决。


