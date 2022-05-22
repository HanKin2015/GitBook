# hosts

## 1、hosts本仓库在线同步地址

1. Github https://github.com/JohyC/Hosts/blob/main/hosts.txt
2. Gitee    https://gitee.com/yuchi-shentang/GithubHosts/blob/main/hosts.txt
3. 私人服务器 
   - hosts:        		 https://www.suni.cf:8880/Hosts/hosts.txt 
   - GithubHosts:        https://www.suni.cf:8880/Hosts/GithubHosts.txt
   - EpicHosts:          https://www.suni.cf:8880/Hosts/EpicHosts.txt
   - SteamDomains:       https://www.suni.cf:8880/Hosts/SteamDomains.txt

使用 SwitchHosts （https://swh.app/zh/）工具（推荐）自动同步

由于私人服务器经常出现崩溃无法访问问题，而Gitee非常稳定，因此填写：https://gitee.com/yuchi-shentang/GithubHosts/raw/main/hosts.txt

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

## 5、使用qt5进行翻墙







