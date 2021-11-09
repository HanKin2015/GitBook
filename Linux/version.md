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
```
[ubuntu@hj_arm_debain8:~/src] ((TAG/ISO1.2.0)) $ lsb_release -a
No LSB modules are available.
Distributor ID: Debian
Description:    Debian GNU/Linux 8.11 (jessie)
Release:        8.11
Codename:       jessie
```



