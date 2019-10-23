lsb_release -a   ===  cat /etc/redhat_release

# Ubuntu各版本主要差异

Ubuntu官方考虑到使用者的不同需求，提供各种不同的发行版。虽然发布了几种版本的Ubuntu系统，但是它们的核心系统是一模一样的。可以这么说不同发行版的Ubuntu的区别在于：桌面环境的不同和预设安装的软件的不同。

除了xubuntu，还有kubuntu，ubuntu-mate，lubuntu，ubuntu-budgie 等等，这些派生版主要是桌面不同，其他的都是相同的。

### Ubuntu

**Ubuntu** 是主要的发行版，它使用**Gnome这个桌面环境**。

> **ubuntu** 相依的虚拟套件是ubuntu-desktop。

### Xubuntu

Xubuntu采用了比较轻量级的**桌面环境Xfce**，所以这个版本的诉求是针对比较老旧的电脑。Xfce的设计理念是减少使用的系统资源，并且成为一套完整可用的桌面环境。功能来说，虽没有像Ubuntu与Kubuntu功能众多，但也具备基本文书、上网与影音等功能。

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
