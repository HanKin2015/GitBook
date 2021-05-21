# 免费的linux服务器

如果学习Linux命令，可以使用git bash。
如果需要服务器，一般来说没有太好的免费，我觉得github服务器就很不错。

总的来说，应该搜索免费的虚拟主机和免费的云服务器，这样比较好搜到结果。

- 三丰云服务器[https://www.sanfengyun.com](https://www.sanfengyun.com/)

  - ```
    三丰云的8H8G服务器一年599元，如果是需要商用的同学，建议购买这个，超高性价比。
    一、配置
    1核1G5M带宽,数据盘10G,Linux系统盘有15G，Windows系统盘有10G.有公网IP，没有内网IP,没有弹性IP.
    安装操作系统
    可以安装的操作系统有Windows,Unbuntu和CentOS.基于习惯，明哥选择了CentOS.其中CentOS又提供了以下选项：
    1.centOS 6.5纯净版
    2.CentOS7.0纯净版
    3.CentOS7.0带宝塔
    4.CentOS7.6纯净版
    二、网速
    没有用测速工具测试，但是平时用来做测试，感觉5M带宽够用。
    三、控制台操作
    1.控制台提供了VNC连接，感觉不是很好用，所以我一直用的是Mac电脑终端的SSH远程登陆
    2.控制台没有提供安全端口管理，需要自己远程登陆设置
    总体就先说这些。
    ```

  - 

- [我的免费云]([https://www.myfreeyun.com](https://www.myfreeyun.com/))

# 在线练习服务器

# 在线练习的服务器

参考:<https://blog.csdn.net/dieyong/article/details/101805623>

1. http://cb.vu/
2. https://copy.sh/v86/?profile=linux26 
3. https://bellard.org/jslinux/
4. https://www.masswerk.at/jsuix/index.html

中间两个没有打开，可能是网络问题。

# linux系统选择

  抛开[内核版本](http://www.so.com/s?q=%E5%86%85%E6%A0%B8%E7%89%88%E6%9C%AC&ie=utf-8&src=internal_wenda_recommend_textn)来说，Linux各发行版用的[内核](http://www.so.com/s?q=%E5%86%85%E6%A0%B8&ie=utf-8&src=internal_wenda_recommend_textn)都是一样的，不同的只是安装的[软件包](http://www.so.com/s?q=%E8%BD%AF%E4%BB%B6%E5%8C%85&ie=utf-8&src=internal_wenda_recommend_textn)。
CentOS是RedHat的社区版本，可以兼容RedHat的RPM[安装包](http://www.so.com/s?q=%E5%AE%89%E8%A3%85%E5%8C%85&ie=utf-8&src=internal_wenda_recommend_textn)，一般用作[服务器](http://www.so.com/s?q=%E6%9C%8D%E5%8A%A1%E5%99%A8&ie=utf-8&src=internal_wenda_recommend_textn)，预安装的也都是服务器的内容。除了没有RedHat服务外（反正要钱的咱也不会买），用起来与RedHat相差不大。包管理一般用rpm或者yum来管理。
Ubuntu是基于Debian发行版和GNOME[桌面环境](http://www.so.com/s?q=%E6%A1%8C%E9%9D%A2%E7%8E%AF%E5%A2%83&ie=utf-8&src=internal_wenda_recommend_textn)，也有KDE版本，属于较流行的发行版，它强化了[图形](http://www.so.com/s?q=%E5%9B%BE%E5%BD%A2&ie=utf-8&src=internal_wenda_recommend_textn)方面的功能，有面向一般用户的桌面版本，也有服务器版本。因为其桌面版本比较漂亮，有较多多媒体方面的[软件](http://www.so.com/s?q=%E8%BD%AF%E4%BB%B6&ie=utf-8&src=internal_wenda_recommend_textn)和ubuntu[软件中心](http://www.so.com/s?q=%E8%BD%AF%E4%BB%B6%E4%B8%AD%E5%BF%83&ie=utf-8&src=internal_wenda_recommend_textn)的支持，对一般用户也还算好用，所以较流行。其服务器版本也就没什么好说了，都差不太多。包管理一般用apt-get。

要说哪个好，这个大部分是主观的感觉了。如果做服务器，当然选CentOS，或者Ubuntu Server版，如果用做桌面系统，那就用ubuntu desktop了。
我用ubuntu desktop好些年了，不过感觉linux在多媒体上、软件支持上还是远远不及windows，[基本上](http://www.so.com/s?q=%E5%9F%BA%E6%9C%AC%E4%B8%8A&ie=utf-8&src=internal_wenda_recommend_textn)不能用来娱乐。[没办法](http://www.so.com/s?q=%E6%B2%A1%E5%8A%9E%E6%B3%95&ie=utf-8&src=internal_wenda_recommend_textn)还是得安装[双系统](http://www.so.com/s?q=%E5%8F%8C%E7%B3%BB%E7%BB%9F&ie=utf-8&src=internal_wenda_recommend_textn)，因为家人想玩下QQ游戏什么的，linux下实在不方便。  