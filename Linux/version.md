lsb_release -a   ===  cat /etc/redhat_release

# Ubuntu各版本主要差异

Ubuntu官方考虑到使用者的不同需求，提供各种不同的发行版。虽然发布了几种版本的Ubuntu系统，但是它们的核心系统是一模一样的。可以这么说不同发行版的Ubuntu的区别在于：桌面环境的不同和预设安装的软件的不同。

除了xubuntu，还有kubuntu，ubuntu-mate，lubuntu，ubuntu-budgie 等等，这些派生版主要是桌面不同，其他的都是相同的。

### Ubuntu

**Ubuntu** 是主要的发行版，它使用**Gnome这个桌面环境**。

> **ubuntu** 相依的虚拟套件是ubuntu-desktop。

### Xubuntu

Xubuntu采用了比较轻量级的桌面环境Xfce，所以这个版本的诉求是针对比较老旧的电脑。Xfce的设计理念是减少使用的系统资源，并且成为一套完整可用的桌面环境。功能来说，虽没有像Ubuntu与Kubuntu功能众多，但也具备基本文书、上网与影音等功能。

xubuntu 相依的虚拟套件是xubuntu-desktop





[课程](https://www.imooc.com/course/list)

\

- 分享
-  

-  





# apt-get -y install中的-y是什么意思?

是同意的意思。没有 -y的命令也可以执行，系统会提示你是否安装，输入y，回车，就会安装了

apt-get -y install这个指令则是跳过系统提示，直接安装。



rm -rf  dir     

- r是递归文件夹
- f 忽略不存在的文件，从不给出提示。 force，如果没有f就会提示是否确认删除，有f就没有提示了。



dhclient命令而不是dhcp命令

 DHCP（动态主机配置协议）是一个局域网的网络协议。指的是由服务器控制一段lP地址范围，客户机登录服务器时就可以自动获得服务器分配的lP地址和子网掩码。默认情况下，DHCP作为Windows Server的一个服务组件不会被系统自动安装，还需要管理员手动安装并进行必要的配置。 



 1./etc/issue 和 /etc/redhat-release都是系统安装时默认的发行版本信息，通常安装好系统后文件内容不会发生变化。

2.lsb_release -a ：FSG（Free Standards Group）组织开发的LSB (Linux Standard Base)标准的一个命令，用来查看linux兼容性的发行版信息。

3./proc/version 和 uname -a 显示的内容相同，显示[linux内核](https://www.baidu.com/s?wd=linux内核&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)版本号。

关于lsb_release -a和/etc/issue显示的发行版本号不同，原因只有一个：系统内核手动升级了。 

# 护网行动

“护网行动”是国家网络安全主管部门为落实全国网络安全和信息化工作会议精神而发起的长期专项行动，旨在检验各单位信息基础设施和重点网站网络安全的综合防御能力和水平，实战验证相关单位“监测发现、安全防护和应急处置”的能力，发现并整改网络系统存在的深层次安全问题，进一步以防攻击、防破坏、防泄密、防重大故障为重点，构建多层次多渠道合作、各单位各行业和全民共同参与、众人受益的“钢铁城墙”。



为此，各个企业或单位都在积极准备应对方案，检测网络中存在的安全隐患，并向各大安全厂商寻求支持。在日前中美贸易战的大背景下，网络安全尤为重要，可谓是，“没有网络安全，就没有国家安全”。

在中文里,最普通的变调规则即是在一组两个第三声的合音节中,须将合音节中领先的第一个音节提升到第二声.

 三声＋三声→二声＋三声
例如:蒙古 好傻
不＋四声 不读二声
例如:不是 不要 不用 

修改Windows系统的自动校对时间的服务器地址：右下角时间-》更改时间和日期时间-》Internet时间-》更改设置-》服务器

# [SCP和Rsync远程拷贝的几个技巧](https://www.cnblogs.com/kevingrace/p/8529792.html)



# Linux远程拷贝避免软连接

2018-06-25 00:05:25  更多



版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。本文链接：https://blog.csdn.net/ymaini/article/details/80796134

## 介绍

scp是最常用的Linux远程拷贝命令， 无论是拷贝单个文件还是文件夹。

但是针对存在软连接的文件夹的远程拷贝要尤为注意， 使用不当可能会导致整个硬盘被塞满。

## 问题描述

前段时间由于服务器的Linux系统出了问题， 导致所有的文件均不能进行写操作， 为此需进行文件转移， 进行系统重装。

在文件转移的过程中，直接对home目录下的用户数据用scp命令远程拷贝的另外一台服务器， 结果将另一台服务器的硬盘接近打爆。

查看问题发现远程拷贝的用户数据， 有一个文件夹中存在一个递归的软连接， scp的拷贝是递归拷贝， 导致一直拷贝，最终将硬盘塞满。

## 如何避免

- 将待远程拷贝的文件夹压缩之后再拷贝， 可以避免软连接的拷贝

  ```
  利用tar等压缩命令将文件夹压缩
  但是如果文件夹无法操作， 则需要用下面的命令替换。12
  ```

- 使用**rsync**命令可以**避免软连接**问题

  ```
  # 列出几个参数如下， 具体请man rsync查看
  
  -u, --update：
  skip files that are newer on the receiver 增量同步，跳过比本地较新的文件
  -a, --archive：
  archive mode; equals -rlptgoD (no -H,-A,-X) 归档模式，
  相当于-rlptgoD, 不包括(no -H,-A,-X);最常用的参数
  -z, --compress：
  compress file data during the transfer 输过程中压缩文件数据12345678910
  ```

## 参考

> Linux系统：scp， rsync命令