# Ubuntu各版本主要差异

Ubuntu官方考虑到使用者的不同需求，提供各种不同的发行版。虽然发布了几种版本的Ubuntu系统，但是它们的核心系统是一模一样的。可以这么说不同发行版的Ubuntu的区别在于：桌面环境的不同和预设安装的软件的不同。

除了xubuntu，还有kubuntu，ubuntu-mate，lubuntu，ubuntu-budgie 等等，这些派生版主要是桌面不同，其他的都是相同的。

## 1、Ubuntu

**Ubuntu** 是主要的发行版，它使用**Gnome这个桌面环境**。

> **ubuntu** 相依的虚拟套件是ubuntu-desktop。

## 2、Xubuntu

Xubuntu采用了比较轻量级的**桌面环境Xfce**，所以这个版本的诉求是针对比较老旧的电脑。Xfce的设计理念是减少使用的系统资源，并且成为一套完整可用的桌面环境。功能来说，虽没有像Ubuntu与Kubuntu功能众多，但也具备基本文书、上网与影音等功能。

xubuntu 相依的虚拟套件是xubuntu-desktop

## 3、查看发行版本
lsb_release -a   ===  cat /etc/redhat_release

lsb_release -a   ===  cat /etc/lsb-release

cat /etc/os-release === cat /usr/lib/os-release


```
[ubuntu@hankin:~/src] ((TAG/ISO1.2.0)) $ lsb_release -a
No LSB modules are available.
Distributor ID: Debian
Description:    Debian GNU/Linux 8.11 (jessie)
Release:        8.11
Codename:       jessie
root@hankin:~/Downloads# lsb_release
No LSB modules are available.
root@hankin:~/Downloads# lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 16.04 LTS
Release:        16.04
Codename:       xenial
```

## 4、查看Linux系统版本

居然有Linux系统查看不到详细的版本。。。。。目前找到以下五种查看方式。

1. /etc/issue 和 /etc/redhat-release都是系统安装时默认的发行版本信息，通常安装好系统后文件内容不会发生变化。lsb_release -a   ===  cat /etc/redhat_release。

2. lsb_release -a ：FSG（Free Standards Group）组织开发的LSB (Linux Standard Base)标准的一个命令，用来查看linux兼容性的发行版信息。

3. /proc/version 和 uname -a 显示的内容大体相同，显示[linux内核](https://www.baidu.com/s?wd=linux内核&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)版本号。

关于lsb_release -a和/etc/issue显示的发行版本号不同，原因只有一个：系统内核手动升级了。 

4. 
```
root@admin-CE3000F:/home# lsb_release -a
No LSB modules are available.
Distributor ID: Kylin
Description:    Kylin V10 SP1
Release:        v10
Codename:       kylin
root@admin-CE3000F:/home# cat /etc/os-release
NAME="Kylin"
VERSION="银河麒麟桌面操作系统V10 (SP1)"
VERSION_US="Kylin Linux Desktop V10 (SP1)"
ID=kylin
ID_LIKE=debian
PRETTY_NAME="Kylin V10 SP1"
VERSION_ID="v10"
HOME_URL="http://www.kylinos.cn/"
SUPPORT_URL="http://www.kylinos.cn/support/technology.html"
BUG_REPORT_URL="http://www.kylinos.cn/"
PRIVACY_POLICY_URL="http://www.kylinos.cn"
VERSION_CODENAME=kylin
UBUNTU_CODENAME=kylin
PROJECT_CODENAME=v10sp1
root@admin-CE3000F:/home# cat /etc/issue
Kylin V10 SP1 \n \l

root@admin-CE3000F:/home# uname -a
Linux admin-CE3000F 5.4.18-35-generic #21-KYLINOS SMP Tue Jul 20 13:31:32 UTC 2021 aarch64 aarch64 aarch64 GNU/Linux
root@admin-CE3000F:/home# cat /proc/version
Linux version 5.4.18-35-generic (buildd@localhost) (gcc version 9.3.0 (Ubuntu 9.3.0-10kylin2)) #21-KYLINOS SMP Tue Jul 20 13:31:32 UTC 2021
```

