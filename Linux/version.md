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

## 5、运行lsb_release命令失败
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #lsb_release
bash: /usr/bin/lsb_release: /usr/bin/python3: 解释器错误: 没有那个文件或目录
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #/usr/bin/python3
bash: /usr/bin/python3: 没有那个文件或目录
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #ll /usr/bin/python3	
lrwxrwxrwx 1 root root 18 4月   7 20:38 /usr/bin/python3 -> /usr/local/python3
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #which python3
/usr/local/bin/python3
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #ll /usr/bin/python*
lrwxrwxrwx 1 root root 17 4月   7 20:39 /usr/bin/python -> /usr/local/python
lrwxrwxrwx 1 root root 18 4月   7 20:39 /usr/bin/python2 -> /usr/local/python2
lrwxrwxrwx 1 root root 18 4月   7 20:38 /usr/bin/python3 -> /usr/local/python3
lrwxrwxrwx 1 root root 33 1月  27  2021 /usr/bin/python3.5-config -> x86_64-linux-gnu-python3.5-config*
lrwxrwxrwx 1 root root 34 1月  27  2021 /usr/bin/python3.5m-config -> x86_64-linux-gnu-python3.5m-config*
lrwxrwxrwx 1 root root 16 3月  23  2016 /usr/bin/python3-config -> python3.5-config*
lrwxrwxrwx 1 root root 17 3月  23  2016 /usr/bin/python3m-config -> python3.5m-config*
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #ll /usr/local/python*
ls: 无法访问'/usr/local/python*': 没有那个文件或目录
```

修改了软链接后：
```
[root@ubuntu0006:~] #lsb_release
Traceback (most recent call last):
  File "/usr/bin/lsb_release", line 25, in <module>
    import lsb_release
ImportError: No module named 'lsb_release'
```

### 5-1、卸载python
猜测是python库多个版本导致的问题。
打算卸载python环境，结果怎么也卸载不干净。
```
rm -r /etc/py*
rm -r /usr/bin/py*
rm -r /usr/local/bin/py*
rm -r /usr/lib/py*
rm -r /usr/local/lib/py*
rm -r /usr/share/py*
rm -r /usr/share/man/man1/py*

/etc/python3
/usr/share/lintian/overrides/python3
/usr/share/python3
/usr/share/doc/python3
/usr/share/bash-completion/completions/python3
/usr/local/codescan/tools/lib/astroid/tests/testdata/python3
```

### 5-2、检测python是否卸载干净
```
[root@ubuntu0006:~] #python3 -version
-bash: /usr/local/bin/python3: 没有那个文件或目录
```

### 5-3、失败的尝试
```
卸载Python3
apt remove python3
 
卸载python3以及它的依赖包
apt remove --auto-remove python3

清除python3.5的配置文件和数据文件
apt purge python3
apt purge --auto-remove python3

[root@ubuntu0006:~] #python3
Could not find platform independent libraries <prefix>
Could not find platform dependent libraries <exec_prefix>
Consider setting $PYTHONHOME to <prefix>[:<exec_prefix>]
Fatal Python error: Py_Initialize: Unable to get the locale encoding
ImportError: No module named 'encodings'

Current thread 0x00007fa55722b700 (most recent call first):
已放弃
[root@ubuntu0006:~] #which dh-python
[root@ubuntu0006:~] #which python3
/usr/local/bin/python3
```

### 5-4、ImportError: cannot import name _remove_dead_weakref
出现这个错误, 和python环境有关.
电脑有多个版本造成的.  
python3 有这个_remove_dead_weakref
python 2.7.10 并没有_remove_dead_weakref

### 5-5、-bash: /usr/bin/lsb_release: /usr/bin/python3: 解释器错误: 没有那个文件或目录
原来lsb_release是一个python3脚本。

### 5-6、下载python3.6源码安装后
```
[root@ubuntu0006:/media/hankin/vdb/python-3.6.5] #lsb_release -a
-bash: /usr/bin/lsb_release: /usr/bin/python3: 解释器错误: 没有那个文件或目录
[root@ubuntu0006:/media/hankin/vdb/python-3.6.5] #python3
Python 3.6.5 (default, Jun 30 2022, 16:32:27)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
[root@ubuntu0006:/media/hankin/vdb/python-3.6.5] #ln -sf /usr/local/bin/python3 /usr/bin/python3
[root@ubuntu0006:/media/hankin/vdb/python-3.6.5] #lsb_release -a
Traceback (most recent call last):
  File "/usr/bin/lsb_release", line 25, in <module>
    import lsb_release
ModuleNotFoundError: No module named 'lsb_release'
```

### 5-7、脑壳疼
使用apt install python3 以及 python3-dev都不管用，安装完后根本没有二进制执行。
```
root@debian-hankin:~/hejian# python3 lsb_release
Traceback (most recent call last):
  File "lsb_release", line 28, in <module>
    import lsb_release
ImportError: No module named 'lsb_release'
root@debian-hankin:~/hejian# python lsb_release
Traceback (most recent call last):
  File "lsb_release", line 28, in <module>
    import lsb_release
ImportError: No module named lsb_release
root@debian-hankin:~/hejian# lsb_release
No LSB modules are available.
```
懵逼了。

使用apt-file查找安装包，傻叉了，原来安装包是lsb-release而不是lsb_release。

### 5-8、安装lsb-release
无解了，放弃了。搞不定。

有时候出现apt install安装已存在最新版本，可以使用dpkg -r卸载。

重启一下系统看看。

是不是还有一种可能，该系统本身就不支持lsb_release命令呢。

### 5-9、终于搞定
```
[root@ubuntu0006:~] #find /usr/ -name lsb_release.py
/usr/lib/python3/dist-packages/lsb_release.py
/usr/lib/python2.7/dist-packages/lsb_release.py
/usr/share/pyshared/lsb_release.py
[root@ubuntu0006:~] #cp /usr/share/pyshared/lsb_release.py /usr/local/lib/python3.6/
[root@ubuntu0006:~] #lsb_release
No LSB modules are available.
[root@ubuntu0006:~] #lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 16.04.7 LTS
Release:        16.04
Codename:       xenial
```
可能正常的环境有啥配置，使用python无法导入这个python脚本，但是能使用lsb_release命令。
花了接近3个小时，人都麻了。

### 5-10、新的问题来了
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #gdb --version
Could not find platform independent libraries <prefix>
Could not find platform dependent libraries <exec_prefix>
Consider setting $PYTHONHOME to <prefix>[:<exec_prefix>]
Fatal Python error: Py_Initialize: Unable to get the locale encoding
ImportError: No module named 'encodings'

Current thread 0x00007f673e157780 (most recent call first):
已放弃
```
其他这个问题主要的来源就是gdb一直报错，网上认为是安装问题，所以打算升级镜像源，镜像源中使用lsb_release命令。
现在gdb命令直接挂了。。。

### 5-11、想到一点，虚拟机有备份可以还原
结果还原到20210520时，确实是正常的。但是现在是20220630，中间时间间隔过于长。

这是因为lsb_release执行文件中第一行指定了脚本解释器的路径：#!/usr/bin/python3 -Es
由于当前系统安装的python3是指向python3.6.5的软链接。
然而python3.6.5不支持lsb_release -a命令。就导致出现了这个问题。
而系统原来自带的python3.5是支持这个命令的，所以将lsb_release的脚本解释器改为#!/usr/bin/python3.5 -Es，即可正常运行了。

### 5-12、外加一个晚上。。。
https://ftp.gnu.org/gnu/gdb/
下载新版本的gdb重新安装，猜测可能是apt命令出现问题了，应该python环境导致。
不清楚为啥新安装的不依赖python。
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation/gdb-8.2.1] #gdb
GNU gdb (GDB) 8.2.1
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-pc-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word".
(gdb) q
[root@ubuntu0006:/media/hankin/vdb/TransferStation/gdb-8.2.1] #ldd /usr/bin/gdb
        linux-vdso.so.1 =>  (0x00007ffe83d46000)
        libncursesw.so.5 => /lib/x86_64-linux-gnu/libncursesw.so.5 (0x00007f47c7345000)
        libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f47c711c000)
        libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f47c6f18000)
        libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f47c6cfb000)
        libutil.so.1 => /lib/x86_64-linux-gnu/libutil.so.1 (0x00007f47c6af8000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f47c67ef000)
        libexpat.so.1 => /lib/x86_64-linux-gnu/libexpat.so.1 (0x00007f47c65c6000)
        libmpfr.so.6 => /usr/local/lib/libmpfr.so.6 (0x00007f47c611b000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f47c5d51000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f47c7574000)
        libgmp.so.10 => /usr/local/lib/libgmp.so.10 (0x00007f47c5ad7000)
```
