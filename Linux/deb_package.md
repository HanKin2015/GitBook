# deb打包过程

## 1、dpkg-deb和dpkg命令区别
dpkg命令的英文全称是“Debian package”，故名意思是Debian Linux系统用来安装、创建和管理软件包的实用工具。
dpkg-deb命令是Debian linux下的软件包管理工具，它可以对软件包执行打包和解包操作以及提供软件包信息。
可以通过dpkg命令调用dpkg-deb命令的功能，dpkg命令的任何选项将被传递给dpkg-deb命令去执行。

```
[root@ubuntu0006:/home] #dpkg --version
Debian dpkg 软件包管理程序 1.18.4 (amd64) 版。
本软件是自由软件；要获知复制该软件的条件，请参阅 GNU 公共许可证
第二版或其更新的版本。本软件【不】提供任何担保。
[root@ubuntu0006:/home] #dpkg-deb --version
Debian dpkg-deb 软件包后端打包程序 1.18.4 (amd64) 版。
本软件是自由软件；要获知复制该软件的条件，请参阅 GNU 公共许可证
第二版或其更新的版本。本软件【不】提供任何担保。
[root@ubuntu0006:/home] #dpkg -l dpkg
期望状态=未知(u)/安装(i)/删除(r)/清除(p)/保持(h)
| 状态=未安装(n)/已安装(i)/仅存配置(c)/仅解压缩(U)/配置失败(F)/不完全安装(H)/触发器等待(W)/触发器未决(T)
|/ 错误?=(无)/须重装(R) (状态，错误：大写=故障)
||/ 名称                              版本                  体系结构：            描述
+++-=================================-=====================-=====================-========================================================================
ii  dpkg                              1.18.4ubuntu1.7       amd64                 Debian package management system
[root@ubuntu0006:/home] #dpkg -l dpkg-deb
dpkg-query: 没有找到与 dpkg-deb 相匹配的软件包
[root@ubuntu0006:/home] #dpkg-query -l dpkg-deb
dpkg-query: 没有找到与 dpkg-deb 相匹配的软件包
[root@ubuntu0006:/home] #dpkg-query -l dpkg
期望状态=未知(u)/安装(i)/删除(r)/清除(p)/保持(h)
| 状态=未安装(n)/已安装(i)/仅存配置(c)/仅解压缩(U)/配置失败(F)/不完全安装(H)/触发器等待(W)/触发器未决(T)
|/ 错误?=(无)/须重装(R) (状态，错误：大写=故障)
||/ 名称                              版本                  体系结构：            描述
+++-=================================-=====================-=====================-========================================================================
ii  dpkg                              1.18.4ubuntu1.7       amd64                 Debian package management system
[root@ubuntu0006:/home] #which dpkg
/usr/bin/dpkg
[root@ubuntu0006:/home] #which dpkg-deb
/usr/bin/dpkg-deb
[root@ubuntu0006:/home] #ll /usr/bin/dpkg
-rwxr-xr-x 1 root root 278264 4月  21  2021 /usr/bin/dpkg*
[root@ubuntu0006:/home] #ll /usr/bin/dpkg-deb
-rwxr-xr-x 1 root root 134584 4月  21  2021 /usr/bin/dpkg-deb*
[root@ubuntu0006:/home] #dpkg -l dpkg-query
dpkg-query: 没有找到与 dpkg-query 相匹配的软件包
```

个人感觉是dpkg-deb和dpkg命令是同一个命令。

### 1-1、dpkg和dpkg-query命令的区别
```
[root@ubuntu0006:/home] #dpkg-query --version
Debian dpkg-query 软件包管理程序查询工具 1.18.4 (amd64) 版。
本软件是自由软件；要获知复制该软件的条件，请参阅 GNU 公共许可证
第二版或其更新的版本。本软件【不】提供任何担保。
[root@ubuntu0006:/home] #ll /usr/bin/dpkg-query
-rwxr-xr-x 1 root root 146872 4月  21  2021 /usr/bin/dpkg-query*
```
不能说是一样的，只能说明是一模一样的。

```
[root@ubuntu0006:/home] #apt-file search /usr/bin/dpkg
devscripts: /usr/bin/dpkg-depcheck
devscripts: /usr/bin/dpkg-genbuilddeps
dpkg: /usr/bin/dpkg
dpkg: /usr/bin/dpkg-deb
dpkg: /usr/bin/dpkg-divert
dpkg: /usr/bin/dpkg-maintscript-helper
dpkg: /usr/bin/dpkg-query
dpkg: /usr/bin/dpkg-split
dpkg: /usr/bin/dpkg-statoverride
dpkg: /usr/bin/dpkg-trigger
dpkg-awk: /usr/bin/dpkg-awk
dpkg-cross: /usr/bin/dpkg-cross
dpkg-dev: /usr/bin/dpkg-architecture
dpkg-dev: /usr/bin/dpkg-buildflags
dpkg-dev: /usr/bin/dpkg-buildpackage
dpkg-dev: /usr/bin/dpkg-checkbuilddeps
dpkg-dev: /usr/bin/dpkg-distaddfile
dpkg-dev: /usr/bin/dpkg-genchanges
dpkg-dev: /usr/bin/dpkg-gencontrol
dpkg-dev: /usr/bin/dpkg-gensymbols
dpkg-dev: /usr/bin/dpkg-mergechangelogs
dpkg-dev: /usr/bin/dpkg-name
dpkg-dev: /usr/bin/dpkg-parsechangelog
dpkg-dev: /usr/bin/dpkg-scanpackages
dpkg-dev: /usr/bin/dpkg-scansources
dpkg-dev: /usr/bin/dpkg-shlibdeps
dpkg-dev: /usr/bin/dpkg-source
dpkg-dev: /usr/bin/dpkg-vendor
dpkg-repack: /usr/bin/dpkg-repack
dpkg-sig: /usr/bin/dpkg-sig
dpkg-www: /usr/bin/dpkg-www
pkgbinarymangler: /usr/bin/dpkg-deb
ruby-debian: /usr/bin/dpkg-checkdeps
ruby-debian: /usr/bin/dpkg-ruby
xdiagnose: /usr/bin/dpkg-log-summary
[root@ubuntu0006:/home] #apt-file search /usr/bin/dpkg-deb
dpkg: /usr/bin/dpkg-deb
pkgbinarymangler: /usr/bin/dpkg-deb
[root@ubuntu0006:/home] #apt-file search /usr/bin/dpkg-query
dpkg: /usr/bin/dpkg-query
```
发现三者其实来源同一个安装包。

### 1-2、查询Linux某命令来自哪个包

dpkg能看命令的版本，但是无法查看来自哪个安装包。

#### Debian：（Ubuntu等）
先安装apt-file(update有必要，下载了很多东西)
```
sudo apt-get install -y apt-file
apt-file update
```

查询命令：(以查询ifconfig为例)
一定要指定命令的具体路径，否则会查找出很多结果。查询时间大概在20秒左右。
指定/usr/bin/dpkg也会找到所有以这个为前缀的命令结果。
apt-file search -x(--regexp) 后可接正则表达式。
```
[root@ubuntu0006:/home] #which ifconfig
/sbin/ifconfig
[root@ubuntu0006:/home] #ll /usr/share/man/zh_CN/man8/ifconfig.8.gz
ls: 无法访问'/usr/share/man/zh_CN/man8/ifconfig.8.gz': 没有那个文件或目录
[root@ubuntu0006:/home] #apt-file search `which ifconfig`
net-tools: /sbin/ifconfig
[root@ubuntu0006:/home] #apt-file search -x '/usr/bin/rz$'
lrzsz: /usr/bin/rz
[root@ubuntu0006:/home] #apt-file search --regexp '/usr/bin/rz$'
lrzsz: /usr/bin/rz
```

#### CentOS：
```
root@CentOS7 ~ # yum provides *bin/ifconfig
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.shuosc.org
 * extras: mirrors.shuosc.org
 * updates: mirrors.163.com
net-tools-2.0-0.22.20131004git.el7.x86_64 : Basic networking tools
Repo        : base
Matched from:
Filename    : /sbin/ifconfig

net-tools-2.0-0.22.20131004git.el7.x86_64 : Basic networking tools
Repo        : @base
Matched from:
Filename    : /sbin/ifconfig
```

## 2、deb包下载地址
http://ftp.acc.umu.se/debian/pool/main/v/vim/
http://ftp.de.debian.org/debian/pool/main/v/vim/
https://pkgs.org/download/python2.7-minimal

各种镜像地址：https://packages.debian.org/sid/ppc64el/vim/download

```
[root@ubuntu0006:/media/hankin/vdb] #dpkg -i vim_8.2.3995-1+b3_ppc64el.deb
dpkg: 处理归档 vim_8.2.3995-1+b3_ppc64el.deb (--install)时出错：
 软件包体系架构(ppc64el)与本机系统体系结构(amd64)不符
在处理时有错误发生：
 vim_8.2.3995-1+b3_ppc64el.deb
```

## 3、常用命令

## 3-1、dpkg-deb参数
dpkg-deb -I xxx.deb
dpkg-deb -e xxx.deb

-c	显示软件包中的文件列表
-e	将主控信息解压
-f	把字段内容打印到标准输出
-x	将软件包中的文件释放到指定目录下
-X	将软件包中的文件释放到指定目录下，并显示释放文件的详细过程
-w	显示软件包的信息
-l	显示软件包的详细信息
-R	提取控制信息和存档的清单文件
-b	创建Debian软件包

dpkg也能使用-x或-X参数解压deb文件。


```
[root@ubuntu0006:/media/hankin/vdb/deb] #dpkg -e vim_7.4.488-7+deb8u3_amd64.deb
[root@ubuntu0006:/media/hankin/vdb/deb] #ll
总用量 944
drwxr-xr-x  3 root root   4096 3月  31 17:40 ./
drwxrwxrwx 19 root root   4096 3月  31 17:28 ../
drwxr-xr-x  2 root root   4096 3月  10  2017 DEBIAN/
-rw-r--r--  1 root root 952520 3月  31 14:16 vim_7.4.488-7+deb8u3_amd64.deb
[root@ubuntu0006:/media/hankin/vdb/deb] #ll DEBIAN/
总用量 24
drwxr-xr-x 2 root root 4096 3月  10  2017 ./
drwxr-xr-x 3 root root 4096 3月  31 17:40 ../
-rw-r--r-- 1 root root  956 3月  10  2017 control
-rw-r--r-- 1 root root  237 3月  10  2017 md5sums
-rwxr-xr-x 1 root root 2471 3月  10  2017 postinst*
-rwxr-xr-x 1 root root 1218 3月  10  2017 prerm*
```

## 3-2、dpkg参数
-i	安装软件包
-r	删除软件包
-l	显示已安装软件包列表
-L	显示于软件包关联的文件(跟-c效果差不多)
-c	显示软件包内文件列表(跟-L效果差不多)
```
[root@ubuntu0006:/media/hankin/vdb] #dpkg -l
期望状态=未知(u)/安装(i)/删除(r)/清除(p)/保持(h)
| 状态=未安装(n)/已安装(i)/仅存配置(c)/仅解压缩(U)/配置失败(F)/不完全安装(H)/触发器等待(W)/触发器未决(T)
|/ 错误?=(无)/须重装(R) (状态，错误：大写=故障)
||/ 名称                              版本                  体系结构：            描述
+++-=================================-=====================-=====================-=======================================================================
ii  accountsservice                   0.6.40-2ubuntu11.6    amd64                 query and manipulate user account information
ii  acl                               2.2.52-3              amd64                 Access control list utilities
.......
[root@ubuntu0006:/media/hankin/vdb] #dpkg -l vim
期望状态=未知(u)/安装(i)/删除(r)/清除(p)/保持(h)
| 状态=未安装(n)/已安装(i)/仅存配置(c)/仅解压缩(U)/配置失败(F)/不完全安装(H)/触发器等待(W)/触发器未决(T)
|/ 错误?=(无)/须重装(R) (状态，错误：大写=故障)
||/ 名称                              版本                  体系结构：            描述
+++-=================================-=====================-=====================-=======================================================================
ii  vim                               2:7.4.1689-3ubuntu1.5 amd64                 Vi IMproved - enhanced vi editor
[root@ubuntu0006:/media/hankin/vdb] #dpkg -L vim
/.
/usr
/usr/share
/usr/share/bug
/usr/share/bug/vim
/usr/share/bug/vim/script
/usr/share/bug/vim/presubj
/usr/share/doc
/usr/share/lintian
/usr/share/lintian/overrides
/usr/share/lintian/overrides/vim
/usr/bin
/usr/bin/vim.basic
/usr/share/doc/vim
[root@ubuntu0006:/media/hankin/vdb] #dpkg -r vim
(正在读取数据库 ... 系统当前共安装有 251610 个文件和目录。)
正在卸载 vim (2:7.4.1689-3ubuntu1.5) ...
update-alternatives: 使用 /usr/bin/vim.tiny 来在自动模式中提供 /usr/bin/vi (vi)
update-alternatives: 使用 /usr/bin/vim.tiny 来在自动模式中提供 /usr/bin/view (view)
update-alternatives: 使用 /usr/bin/vim.tiny 来在自动模式中提供 /usr/bin/ex (ex)
update-alternatives: 使用 /usr/bin/vim.tiny 来在自动模式中提供 /usr/bin/rview (rview)
[root@ubuntu0006:/media/hankin/vdb] #dpkg -l vim
期望状态=未知(u)/安装(i)/删除(r)/清除(p)/保持(h)
| 状态=未安装(n)/已安装(i)/仅存配置(c)/仅解压缩(U)/配置失败(F)/不完全安装(H)/触发器等待(W)/触发器未决(T)
|/ 错误?=(无)/须重装(R) (状态，错误：大写=故障)
||/ 名称                              版本                  体系结构：            描述
+++-=================================-=====================-=====================-=======================================================================
un  vim                               <无>                  <无>                  (无可用描述)
[root@ubuntu0006:/media/hankin/vdb] #dpkg -i vim_8.2.3995-1+b3_amd64.deb
正在选中未选择的软件包 vim。
(正在读取数据库 ... 系统当前共安装有 251605 个文件和目录。)
正准备解包 vim_8.2.3995-1+b3_amd64.deb  ...
正在解包 vim (2:8.2.3995-1+b3) ...
dpkg: 依赖关系问题使得 vim 的配置工作不能继续：
 vim 依赖于 vim-common (= 2:8.2.3995-1)；然而：
系统中 vim-common 的版本为 2:7.4.1689-3ubuntu1.5。
 vim 依赖于 vim-runtime (= 2:8.2.3995-1)；然而：
系统中 vim-runtime 的版本为 2:7.4.1689-3ubuntu1.5。
 vim 依赖于 libc6 (>= 2.33)；然而：
系统中 libc6:amd64 的版本为 2.23-0ubuntu11.3。
 vim 依赖于 libgpm2 (>= 1.20.7)；然而：
系统中 libgpm2:amd64 的版本为 1.20.4-6.1。
 vim 依赖于 libselinux1 (>= 3.1~)；然而：
系统中 libselinux1:amd64 的版本为 2.4-3build2。
 vim 依赖于 libsodium23 (>= 1.0.14)；然而：
  未安装软件包 libsodium23。
 vim 依赖于 libtinfo6 (>= 6)；然而：
  未安装软件包 libtinfo6。

dpkg: 处理软件包 vim (--install)时出错：
 依赖关系问题 - 仍未被配置
在处理时有错误发生：
 vim
[root@ubuntu0006:/media/hankin/vdb] #dpkg -i vim_7.4.488-7+deb8u3_amd64.deb
dpkg：警告：即将把 vim 从 2:8.2.3995-1+b3 降级到 2:7.4.488-7+deb8u3
(正在读取数据库 ... 系统当前共安装有 251616 个文件和目录。)
正准备解包 vim_7.4.488-7+deb8u3_amd64.deb  ...
正在将 vim (2:7.4.488-7+deb8u3) 解包到 (2:8.2.3995-1+b3) 上 ...
dpkg: 依赖关系问题使得 vim 的配置工作不能继续：
 vim 依赖于 vim-common (= 2:7.4.488-7+deb8u3)；然而：
系统中 vim-common 的版本为 2:7.4.1689-3ubuntu1.5。
 vim 依赖于 vim-runtime (= 2:7.4.488-7+deb8u3)；然而：
系统中 vim-runtime 的版本为 2:7.4.1689-3ubuntu1.5。

dpkg: 处理软件包 vim (--install)时出错：
 依赖关系问题 - 仍未被配置
在处理时有错误发生：
 vim
[root@ubuntu0006:/media/hankin/vdb] #dpkg -i vim-common_7.4.488-7+deb8u3_amd64.deb
dpkg：警告：即将把 vim-common 从 2:7.4.1689-3ubuntu1.5 降级到 2:7.4.488-7+deb8u3
(正在读取数据库 ... 系统当前共安装有 251611 个文件和目录。)
正准备解包 vim-common_7.4.488-7+deb8u3_amd64.deb  ...
正在将 vim-common (2:7.4.488-7+deb8u3) 解包到 (2:7.4.1689-3ubuntu1.5) 上 ...
正在设置 vim-common (2:7.4.488-7+deb8u3) ...

配置文件 '/etc/vim/vimrc'
 ==> 在安装后曾被修改(您或者某个脚本修改了它)。
 ==> 软件包的提交者同时提供了一个更新了的版本。
   您现在希望如何处理呢？ 您有以下几个选择：
    Y 或 I  ：安装软件包维护者所提供的版本
    N 或 O  ：保留您原来安装的版本
      D     ：显示两者的区别
      Z     ：把当前进程切换到后台，然后查看现在的具体情况
 默认的处理方法是保留您当前使用的版本。
*** vimrc (Y/I/N/O/D/Z) [默认选项=N] ?
正在处理用于 mime-support (3.59ubuntu1) 的触发器 ...
正在处理用于 gnome-menus (3.13.3-6ubuntu3.1) 的触发器 ...
正在处理用于 desktop-file-utils (0.22-1ubuntu5.2) 的触发器 ...
正在处理用于 man-db (2.7.5-1) 的触发器 ...
正在处理用于 hicolor-icon-theme (0.15-0ubuntu1.1) 的触发器 ...
[root@ubuntu0006:/media/hankin/vdb] #dpkg -i vim-runtime_7.4.488-7+deb8u3_all.deb
dpkg：警告：即将把 vim-runtime 从 2:7.4.1689-3ubuntu1.5 降级到 2:7.4.488-7+deb8u3
(正在读取数据库 ... 系统当前共安装有 251610 个文件和目录。)
正准备解包 vim-runtime_7.4.488-7+deb8u3_all.deb  ...
正在将 vim-runtime (2:7.4.488-7+deb8u3) 解包到 (2:7.4.1689-3ubuntu1.5) 上 ...
正在设置 vim-runtime (2:7.4.488-7+deb8u3) ...
Processing /usr/share/vim/addons/doc
正在处理用于 man-db (2.7.5-1) 的触发器 ...
[root@ubuntu0006:/media/hankin/vdb] #dpkg -i vim_7.4.488-7+deb8u3_amd64.deb
(正在读取数据库 ... 系统当前共安装有 251566 个文件和目录。)
正准备解包 vim_7.4.488-7+deb8u3_amd64.deb  ...
正在将 vim (2:7.4.488-7+deb8u3) 解包到 (2:7.4.488-7+deb8u3) 上 ...
正在设置 vim (2:7.4.488-7+deb8u3) ...
update-alternatives: 使用 /usr/bin/vim.basic 来在自动模式中提供 /usr/bin/vim (vim)
update-alternatives: 使用 /usr/bin/vim.basic 来在自动模式中提供 /usr/bin/vimdiff (vimdiff)
update-alternatives: 使用 /usr/bin/vim.basic 来在自动模式中提供 /usr/bin/rvim (rvim)
update-alternatives: 使用 /usr/bin/vim.basic 来在自动模式中提供 /usr/bin/rview (rview)
update-alternatives: 使用 /usr/bin/vim.basic 来在自动模式中提供 /usr/bin/vi (vi)
update-alternatives: 使用 /usr/bin/vim.basic 来在自动模式中提供 /usr/bin/view
[root@ubuntu0006:/media/hankin/vdb] #dpkg -c vim_7.4.488-7+deb8u3_amd64.deb
drwxr-xr-x root/root         0 2017-03-10 08:56 ./
drwxr-xr-x root/root         0 2017-03-10 08:55 ./usr/
drwxr-xr-x root/root         0 2017-03-10 08:56 ./usr/bin/
-rwxr-xr-x root/root   2240936 2017-03-10 08:56 ./usr/bin/vim.basic
drwxr-xr-x root/root         0 2017-03-10 08:55 ./usr/share/
drwxr-xr-x root/root         0 2017-03-10 08:55 ./usr/share/bug/
drwxr-xr-x root/root         0 2017-03-10 08:55 ./usr/share/bug/vim/
-rw-r--r-- root/root       516 2014-10-23 09:01 ./usr/share/bug/vim/presubj
-rwxr-xr-x root/root       204 2014-10-23 09:01 ./usr/share/bug/vim/script
drwxr-xr-x root/root         0 2017-03-10 08:55 ./usr/share/doc/
drwxr-xr-x root/root         0 2017-03-10 08:55 ./usr/share/lintian/
drwxr-xr-x root/root         0 2017-03-10 08:55 ./usr/share/lintian/overrides/
-rw-r--r-- root/root       138 2017-03-10 08:55 ./usr/share/lintian/overrides/vim
lrwxrwxrwx root/root         0 2017-03-10 08:55 ./usr/share/doc/vim -> vim-common
[root@ubuntu0006:/media/hankin/vdb] #dpkg --configure vim
dpkg: 处理软件包 vim (--configure)时出错：
 您已经安装并配置了软件包 vim
在处理时有错误发生：
 vim
```

## 3、认识deb包
control
postinst
postrm
preinst
prerm


pidof compton 输出进程id

## 4、原理
1) deb包通常包含两部分：控制信息(DEBIAN目录)、安装内容(模拟"/"目录)

2) 通过解开已有的deb包看其中内容

i. 释放安装内容到dirname目录中

$ dpkg -X xxx.deb dirname
ii. 释放控制信息到当前目录下的DEBIAN子目录中

$ dpkg -e xxx.deb

## 5、源码转deb包
以linux网卡驱动为例：

下载源码：https://www.intel.cn/content/www/cn/zh/download/14611/15817/intel-network-adapter-driver-for-pcie-intel-gigabit-ethernet-network-connections-under-linux.html?_ga=1.159975677.114505945.1484457019

安装环境：sudo apt-get install dh-make checkinstall

### 5-1、方法一: 使用checkinstall方法创建deb包
checkinstall不仅可以生成deb包，还可以生成rpm包，使用简单。

$ tar xvjf e1000e-3.8.4.tar.gz # 解包
$ cd e1000e-3.8.4; make # 编译
$ checkinstall -D -install=no--pkgversion=0.98--pkgname=e1000e-3.8.4 make install # 制作deb包
此时当前目录下生成了deb包。

### 5-2、方法二: 使用dpkg方法创建deb包
dpkg是最基本的制作deb包的方法，推荐使用

$ mkdir e1000e-3.8.4 必须创建目录名字为包名-版本号
$ cd e1000e-3.8.4
$ dh_make -f ../e1000e-3.8.4.tar.gz # 生成制作deb包所需的默认信息
此时当前目录下生成了debian目录，此时通常修改两个文件：

修改debian/control文件，配置你的信息，具体字段见参考资料部分
修改debian/rules脚本，它决定编译参数(也可以不改)
$ dpkg-buildpackage -rfakeroot
此时可以看到，上层目录中已建立了deb包。

这里可能有报错：
```
dpkg-deb：正在新建软件包 src，包文件为 ../src_3.8.4-1_amd64.deb。
 dpkg-genchanges  >../src_3.8.4-1_amd64.changes
dpkg-genchanges: 上传数据中包含完整的原始代码
 dpkg-source --after-build src-3.8.4
dpkg-buildpackage: 完整上载（包含原始的代码）
 signfile src_3.8.4-1.dsc
gpg: starting migration from earlier GnuPG versions
gpg: porting secret keys from '/root/.gnupg/secring.gpg' to gpg-agent
gpg: migration succeeded
gpg: “root <root@unknown>”已跳过：没有秘匙
gpg: dpkg-sign.aSNEHAvy/src_3.8.4-1.dsc: clearsign failed: 没有秘匙

dpkg-buildpackage: 错误: failed to sign .dsc and .changes file
```
但是其实已经成功了，你去上一级目录看看，deb包应该已经生成在上一级目录。

