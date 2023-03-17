# hosts

## 1、hosts本仓库在线同步地址
参考：https://github.com/JohyC/Hosts

1. Github https://github.com/JohyC/Hosts/blob/main/hosts.txt
2. Gitee    https://gitee.com/yuchi-shentang/GithubHosts/blob/main/hosts.txt
3. Gitea https://www.foul.trade:3000/Johy/Hosts/raw/branch/main/hosts.txt

使用 SwitchHosts （https://swh.app/zh/）工具（推荐）自动同步
https://raw.githubusercontent.com/JohyC/Hosts/main/hosts.txt

## 2、手动查询需要翻墙的域名实际ip并配置
打开https://www.ipaddress.com/网站，查询下面3个网址对应的IP地址
```
github.com
assets-cdn.github.com
github.global.ssl.fastly.net

140.82.113.4 https://github.com

ipconfig /flushdns
```

进阶可以写个爬虫程序。

## 3、学习他人项目(能运行但无法在本地获取正确结果)
https://github.com/HanKin2015/Hosts

原理：python从域名解析出对应ip地址列，编辑hosts后GitHub域名直接映射到 ip 地址，从中间环节杜绝dns污染。

addrs = socket.getaddrinfo(domain, None)
主要命令如上，但是只是解析了当前电脑环境的hosts文件结果，即ping显示出的结果，除非在一个买了vpn的环境运行该脚本。

## 4、学习使用SwitchHosts工具
推荐使用  [SwitchHosts](https://swh.app/zh/) 配置`hosts`，操作简单，支持跨平台。

详细介绍 :   [SwitchHosts! 还能这样管理hosts，后悔没早点用](https://mp.weixin.qq.com/s/A37XnD3HdcGSWUflj6JujQ) 。

1. 打开  SwitchHosts ，点击左上角加号 添加hosts同步规则。
2. 规则配置：
   - 方案名：HanKin/hosts (自行命名)
   - 类型：远程
   - URL 地址：https://www.suni.cf:8880/Hosts/hosts.txt (url: 推荐用服务器地址，国内同步更稳定)
   - 自动更新：24小时 （hosts地址变更不会特别频繁）

![image](https://user-images.githubusercontent.com/38210128/127502984-7ef25b7c-1901-4164-ab29-e5dbc487e63d.png)

## 5、使用trojan-qt5.exe进行科学上网
- 谷歌访问助手2.3.0
- 集装箱
- iGG谷歌访问助手（好像用不了）

Trojan-Qt5-Windows.7z

配置文件已上传：D:\Github\Storage\others\gui-config.zip

trojan 是较新的代理软件，trojan官网是 https://trojan-gfw.github.io/trojan/。与强调加密流量的SS/SSR等工具不同，trojan重点在将流量伪装成互联网最常见的https流量，从而规避防火墙的探测和干扰，相当于配置了流量伪装的精简版V2ray。在敏感时期，基本上只有 trojan 和 V2ray流量伪装 能提供稳如狗的服务。

trojan的缺点在于关注度不够，除了ios平台，官方客户端都比较简陋。trojan安装和使用请参考：[trojan教程](https://shop.mac163.com/17157/)，服务端一键部署请参考：[trojan一键脚本](https://shop.mac163.com/14326/)。

## 6、发现新大陆（有bug）
以notepad++软件升级为例，无法打开地址：https://notepad-plus-plus.org/

百度一下DNS检测工具，发现：
https://tool.chinaz.com/dns/    （不好用，好多地址是污染的，无法区分）
https://www.boce.com/dns/notepad-plus-plus.org      （每天只能免费5次，可以排除被污染的ip地址，这个地址无法ping通）

然后修改hosts文件，添加：
172.67.213.166 notepad-plus-plus.org  

cmd窗口：ipconfig /flushdns

有了这次体验，那岂不是自己也能手动修改hosts翻墙了：
试一下谷歌：http://www.google.com.hk/
这个搜索出来的ip地址是无法直接打开的，需要添加到hosts文件中才行：
64.233.187.199 www.google.com.hk

果然结果不能保证百分百正确，发现这次就翻车了，没有解决翻墙问题。

## 7、Shadowsocks工具
官网：https://github.com/shadowsocks/shadowsocks-windows

## 8、其他人使用的工具
我也来个AFF，全专线，全流媒体解锁，千兆网速，延迟低，高峰期网速快https://flower.yt/aff.php?aff=1166
3元一个月20G   https://cv2.work/auth/register?code=lwBC
5月一个月18G   fengchi.buzz

## 9、Clash for Windows
https://clash.razord.top/#/proxies?host=127.0.0.1&port=12040&secret=ab6faad5-ee55-446f-963d-3292e5f76719
https://github.com/Dreamacro/clash/releases/tag/premium
https://github.com/Dreamacro/clash

A rule-based tunnel in Go.

订阅地址：https://sub.100oj.top/api/v1/client/subscribe?token=43e6c8c6584d6d17fa03cbc83e6ff942

教程：https://easydoc.net/doc/15209814/WtVubGO0/mgJA1B8H
MAC软件：https://github.com/yichengchen/clashX