# 学习github

## 1、github page
总所周知，在github上面搭建网站。

对一个仓库开启github page功能前提工作：
- 一个xxx.github.io网址网站
- 在仓库Settings->Options->Github Pages里面开启，注意有下拉页面

一开始可能显示Your site is ready to be published at https://hankin2015.github.io/learngit/.
这时候是网站在检查仓库的合法性，大概需要等待一段时间

正常可用需要显示为：
Your site is published at https://hankin2015.github.io/learngit/

异常的话会有相关错误提示，有可能还会发邮件通知。

## 2、查看GitHub仓库大小的几种方法
### GitHub自带查看仓库大小的功能（public、private）
登录github网页首页，选择自己账户的settings-》点击repository

### 利用GitHub提供的API查看（public）
https://api.github.com/repos/HanKin2015/MagicTool
其中的size就是仓库大小，单位是kb

### 利用浏览器插件：Enhanced GitHub（public、private）
操作稍微复杂，不推荐

## 3、如何从 GitHub 上下载单个文件夹？
有时候一个github项目太大，如linux：https://github.com/HanKin2015/linux
使用api查看内存大小：https://api.github.com/repos/HanKin2015/linux
3159822kb = 3085mb = 3gb

里面小文件居多，我只想下载其中的dwc2文件夹，只有几十kb，如果下载全部费时。

推荐网页版的gitzip：kinolien.github.io/gitzip/


根本打不开：https://github.dev/
在github仓库界面，然后按一下键盘的句号键即可。

## 4、special repository
HanKin2015/HanKin2015 is a ✨special ✨ repository that you can use to add a README.md to your GitHub profile. Make sure it’s public and initialize it with a README to get started.

建立一个与账户同名的仓库，可以在首页显示。

建立一个github.io后缀的仓库可以建立网站。

## 5、美化技巧之访问者统计数量
https://github.com/antonkomarev/github-profile-views-counter

## 6、进行开源项目开发
参考1：https://github.com/mackyle/xar
支持文件下载、网页规范

## 7、上库会收到大量github发的邮件
[HanKin2015/Storage] Bump nltk from 3.4.5 to 3.6.6 in /python (PR #25)
Updates to manifest files in HanKin2015/Storage introduced 5 vulnerable dependencies

以前就放其任意处置，今天仔细看，发现可能是我的一个python/requirements.txt文件导致，限制了我使用的python环境，我删除了该文件。
后面是我的python/requirements.txt文件中的库版本过低，需要提升到新版本，遇到障碍失败了。

## 8、访问人数记录
20220408-0
20230217-105

## 9、查看仓库访问流量
https://docs.github.com/zh/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository

## 10、github下载项目下到一半出现需要登陆此站点objects.githubusercontent.com
https://blog.csdn.net/bmseven/article/details/129243386 操作过于复杂

https://blog.51cto.com/u_8681773/5897904 操作简化，只有鼠标右键复制链接地址

但是不清楚为啥迅雷还是下载下载就中断了。。。。然后等啊等啊就下载好了，反正那叫一个不流畅不丝滑。
https://github.com/fandesfyf/JamTools/releases/download/0.14.0B/JamTools0.14.0BSetup_for_windows.exe

## 11、给github添加代码覆盖率微标
有时间研究研究。
https://zhuanlan.zhihu.com/p/463469133?utm_id=0

## 12、使用github加载图片
https://HanKin2015.github.io/img/cc.png
https://HanKin2015.github.io/Mount/Images/img7.jpg
https://Hankin2015.github.io/Storage/qt/python/usb_camera_monitor_tool/img/usb_camera_monitor_tool.png

一个可行是开启了github pages服务，另外一个没有开启所以打不开图片。
另外需要https://Hankin2015.github.io/网址作为开头，相当于是根目录，以及也是Hankin2015.github.io仓库的根目录。

## 13、github 一直提示 Dependabot 的解决办法

### 13-1、Dependabot 作用
Dependabot可以为你repo做的事情主要分成三大类：
- 实时检测你的repo，并keep你所有的dependency都能被updated
- 检测vulnerable dependencies并发出Dependabot alert
- 帮助你停止使用有vulnerable的dependencies
Dependabot的负面影响
一些 demo 项目不需要这么严谨的检查。但他会一直提示，甚至还会发邮件。

关闭 Dependabot 的方法
去到repo的设置界面的“Code security and analysis”，按需禁用Dependency graph 和 Dependabot alerts 即可。

如果有他创建的分支，则先处理 pull request，然后删了分支就可以了。
————————————————
版权声明：本文为CSDN博主「threewhisky」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/threewhisky/article/details/124138920






