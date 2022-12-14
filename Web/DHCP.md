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

## 4、DMZ
DMZ，是英文“demilitarized zone”的缩写，中文名称为“隔离区”，也称“非军事化区”。它是为了解决安装防火墙后外部网络的访问用户不能访问内部网络服务器的问题，而设立的一个非安全系统与安全系统之间的缓冲区。该缓冲区位于企业内部网络和外部网络之间的小网络区域内。在这个小网络区域内可以放置一些必须公开的服务器设施，如企业Web服务器、FTP服务器和论坛等。另一方面，通过这样一个DMZ区域，更加有效地保护了内部网络。因为这种网络部署，比起一般的防火墙方案，对来自外网的攻击者来说又多了一道关卡。

DMZ 是英文“Demilitarized Zone”的缩写，中文名称为“隔离区”， 与军事区和信任区相对应，也称“非军事化区”，是为了解决外部网络不能访问内部网络服务器的问题，而设立的一个非安全系统与安全系统之间的缓冲区。作用是把单位的 FTP服务器、E-Mail服务器等允许外部访问的服务器单独部署在此区域，使整个需要保护的内部网络接在信任区后，不允许任何外部网络的直接访问，实现内外网分离，满足用户的安全需求。

DMZ 区可以理解为一个不同于外网或内网的特殊网络区域，DMZ 内通常放置一些不含机密信息的公用服务器，比如 WEB 服务器、E-Mail 服务器、FTP 服务器等。这样来自外网的访问者只可以访问 DMZ 中的服务，但不可能接触到存放在内网中的信息等，即使 DMZ 中服务器受到破坏，也不会对内网中的信息造成影响。DMZ 区是信息安全纵深防护体系的第一道屏障，在企事业单位整体信息安全防护体系中具有举足轻重的作用。

1.内网可以访问外网
2.内网可以访问DMZ
3.外网不能访问内网
4.外网可以访问DMZ
5.DMZ访问内网有限制
6.DMZ不能访问外网









DHCP服务器查询：ipconfig /all
DHCPv6
IPv6地址到底是一个什么东西






