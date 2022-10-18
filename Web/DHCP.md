# 手把手教你搭建DHCP服务器

## 1、参考
https://blog.csdn.net/weixin_56903457/article/details/120391901
http://t.zoukankan.com/jpfss-p-10918222.html

## 2、DHCP定义
DHCP（Dynamic Host Configuration Protocol，动态主机配置协议）是一个局域网的网络协议，使用UDP协议工作。它是一种流行的Client/Server协议，一般用于为主机或者为路由器等指定相关的配置信息。DHCP服务在企业和家庭中得到了大量的应用，它能够自动分配ip地址以及一些其他的相关信息，整个过程对客户透明。

## 3、DHCP分配方式
自动分配方式（Automatic Allocation），DHCP服务器为主机指定一个永久性的IP地址，一旦DHCP客户端第一次成功从DHCP服务器端租用到IP地址后，就可以永久性的使用该地址。
动态分配方式（Dynamic Allocation），DHCP服务器给主机指定一个具有时间限制的IP地址，时间到期或主机明确表示放弃该地址时，该地址可以被其他主机使用。
手工分配方式（Manual Allocation），客户端的IP地址是由网络管理员指定的，DHCP服务器只是将指定的IP地址告诉客户端主机。




DHCP服务器查询：ipconfig /all
DHCPv6
IPv6地址到底是一个什么东西
DMZ






