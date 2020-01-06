# [ubuntu 16.04网络连接出现：未找到合法的活动链接](https://www.cnblogs.com/vitalq/p/7088978.html)

网络管理显示:未托管

编辑`/etc/NetworkManager/NetworkManager.conf`，将`managed=false`改成`managed=true 然后重启.`



Linux里面有两套管理网络连接的方案：

1. /etc/network/interfaces（/etc/init.d/networking）
2. Network-Manager

两套方案是冲突的，不能同时共存。
第一个方案适用于没有桌面的环境，如：服务器；或者那些完全不需要改动连接的场合。
第二套方案使用于有桌面的环境，特别是网络连接情况随时会变的情况。

这两个为了避免冲突，又能共享配置，就有了下面的解决方案：
1、当Network-Manager发现/etc/network/interfaces被改动的时候，则关闭自己（显示为未托管），除非managed设置成真。
2、当managed设置成真时，/etc/network/interfaces，则不生效。

## 解决

知道了问题所在就好解决了.可是网上都说要修改一个文件“/etc/NetworkManager/nm-system-settings.conf”
我去我的系统目录里却没有发现.
![这里写图片描述](https://www.linuxidc.com/upload/2016_12/161213094157971.png)
原来这个文件已经是NetworkManager过时的配置文件了,虽然也可以使用,但最新的ubuntu(我的是Ubuntu16.04)里都已经删除,用NetworkManager.conf 文件替代了.具体可以参见http://manpages.ubuntu.com/manpages/precise/man5/nm-system-settings.conf.5.html
搜索信息滞后也真造成一些麻烦.
修改方式倒是一致的,修改managed=true,然后重启电脑.

```
[main]
plugins=ifupdown,keyfile,ofono
dns=dnsmasq

[ifupdown]
managed=true
```

重启之后,就可以使用有线连接了.

