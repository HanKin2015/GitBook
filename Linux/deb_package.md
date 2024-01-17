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
dpkg: /usr/bin/dpkg-query
dpkg-awk: /usr/bin/dpkg-awk
dpkg-cross: /usr/bin/dpkg-cross
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

#### CentOS
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

dpkg也能使用-x或-X参数解压deb文件（一个显示过程一个不显示-x, --extract, -X, --vextract）。
注意：dpkg -l xxx时默认不能模糊匹配，需要dpkg -l "xxxx*"才能模糊匹配。
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
[root@ubuntu0006:/media/hankin/vdb/deb] #mkdir t
[root@ubuntu0006:/media/hankin/vdb/deb] #dpkg -X checkinstall_e1000e-3.8.4.deb t/
./
./lib/
./lib/modules/
./lib/modules/4.4.0-210-generic/modules.softdep
./usr/
./usr/share/
./usr/share/man/man7/e1000e.7.gz
./media/
./media/hankin/vdb/study/network/e1000e-3.8.4/src/e1000e.7.gz
[root@ubuntu0006:/media/hankin/vdb/deb] #mkdir y
[root@ubuntu0006:/media/hankin/vdb/deb] #dpkg -x checkinstall_e1000e-3.8.4.deb y/
[root@ubuntu0006:/media/hankin/vdb/deb] #ls y
lib  media  usr
[root@ubuntu0006:/media/hankin/vdb/deb] #ls t
lib  media  usr
```

## 3-2、dpkg参数
-i	安装软件包
-r	删除软件包
-l	显示已安装软件包列表
-L	显示于软件包关联的文件(跟-c效果差不多)
-c	显示软件包内文件列表(跟-L效果差不多)
```
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
参考：https://www.cnblogs.com/davis12/p/14365981.html

deb 是 Unix 系统(其实主要是 Linux)下的安装包，基于 tar 包，因此本身会记录文件的权限(读/写/可执行)以及所有者/用户组。

deb 包本身有三部分组成：数据包，包含实际安装的程序数据，文件名为 data.tar.XXX；安装信息及控制脚本包，包含 deb 的安装说明，标识，脚本等，文件名为 control.tar.gz；最后一个是 deb 文件的一些二进制数据，包括文件头等信息，一般看不到，在某些软件中打开可以看到。

deb 本身可以使用不同的压缩方式。tar 格式并不是一种压缩格式，而是直接把分散的文件和目录集合在一起，并记录其权限等数据信息。之前提到过的 data.tar.XXX，这里 XXX 就是经过压缩后的后缀名。

deb 默认使用的压缩格式为 gzip 格式，所以最常见的就是 data.tar.gz。常有的压缩格式还有 bzip2 和 lzma，其中 lzma 压缩率最高，但压缩需要的 CPU 资源和时间都比较长。

data.tar.gz包含的是实际安装的程序数据，而在安装过程中，该包里的数据会被直接解压到根目录(即 / )，因此在打包之前需要根据文件所在位置设置好相应的文件/目录树。

而 control.tar.gz 则包含了一个 deb 安装的时候所需要的控制信息。一般有 5 个文件：
- control，用了记录软件标识，版本号，平台，依赖信息等数据，这是最主要的文件配置，必不可少；dpkg通过这些变量来管理软件包；
- preinst，在解包data.tar.gz 前运行的脚本；
- postinst，在解包数据后运行的脚本；
- prerm，卸载时，在删除文件之前运行的脚本；
- postrm，在删除文件之后运行的脚本；在 Cydia 系统中，Cydia 的作者 Saurik 另外添加了一个脚本，extrainst_，作用与 postinst 类似；
- rules，这实际上是另外一个Makefile脚本，用来给dpkg-buildpackage用的；
- copyright文件: 不用说，版权信息，相当重要；
- ompat文件: 这个文件留着是有用的；
- irs文件：这个文件指出我们需要的但是在缺省情况下不会自动创建的目录；
- changelog文件: 这是一个必需文件，包含软件版本号，修订号，发行版和优先级。

## 4、创建deb包
参考：https://www.cnblogs.com/davis12/p/14365981.html
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp/hello] #ls -R
.:
DEBIAN  opt

./DEBIAN:
control

./opt:
hello.py
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #dpkg-deb -b hello hello_1.0_linux_amd64.deb
dpkg-deb：错误：正在解析文件 'hello/DEBIAN/control' 第 5 行附近，软件包 'hello' :
 字段名 # 后必须跟冒号
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #vim hello/DEBIAN/control
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #dpkg-deb -b hello hello_1.0_linux_amd64.deb
dpkg-deb：正在新建软件包 hello，包文件为 hello_1.0_linux_amd64.deb。
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #dpkg -c hello_1.0_linux_amd64.deb
drwxr-xr-x root/root         0 2022-07-07 22:38 ./
drwxr-xr-x root/root         0 2022-07-07 22:38 ./opt/
-rwxr-xr-x root/root        34 2022-07-07 22:38 ./opt/hello.py
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #dpkg -C hello_1.0_linux_amd64.deb
dpkg: 软件包 hello_1.0_linux_amd64.deb 没有被安装
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #rm -rf DEBIAN/
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #dpkg -e hello_1.0_linux_amd64.deb
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #ll
总用量 32
drwxr-xr-x 7 root root 4096 7月   7 22:47 ./
drwxr-xr-x 5 root root 4096 7月   7 14:58 ../
drwxr-xr-x 2 root root 4096 7月   7 22:45 DEBIAN/
drwxr-xr-x 4 root root 4096 7月   7 22:38 hello/
-rw-r--r-- 1 root root  718 7月   7 22:45 hello_1.0_linux_amd64.deb
drwxr-xr-x 5 root root 4096 7月   7 11:25 lib/
drwxr-xr-x 6 root root 4096 7月   7 17:47 usb/
drwxr-xr-x 6 root root 4096 7月   7 22:38 usc/
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #ll DEBIAN/
总用量 12
drwxr-xr-x 2 root root 4096 7月   7 22:45 ./
drwxr-xr-x 7 root root 4096 7月   7 22:47 ../
-rw-r--r-- 1 root root  194 7月   7 22:45 control
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #dpkg -I hello_1.0_linux_amd64.deb
 新格式的 debian 软件包，格式版本 2.0。
 大小 718 字节：主控包=290 字节。
     194 字节，    9 行      control
 Package: hello
 Version: 1.0
 Section: BioInfoServ
 Priority: optional
 Architecture: amd64
 Installed-Size: 4096
 Maintainer: gatieme
 Provides: bioinfoserv-arb
 Description: A test for using dpkg cmd
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #cat DEBIAN/control
Package: hello
Version: 1.0
Section: BioInfoServ
Priority: optional
Architecture: amd64
Installed-Size: 4096
Maintainer: gatieme
Provides: bioinfoserv-arb
Description: A test for using dpkg cmd
[root@ubuntu0006:/media/hankin/vdb/TransferStation/cp] #tree .
.
├── DEBIAN
│   └── control
├── hello
│   ├── DEBIAN
│   │   └── control
│   └── opt
│       └── hello.py
├── hello_1.0_linux_amd64.deb
```

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

## 6、deb包的目录树
```
|——mydeb
     |————usr
           |————lib
                 |——可执行文件（安装后，就在你的/usr/lib生成相应的可执行文件）
           |————share
                 |————icons 
                         |——deb.png(图标文件生成到/usr/share/icons/)
                 |————applications                           
                         |——deb.desktop（桌面文件生成到/usr/share/applications/）
     |————DEBIAN(大写、用来制作打包文件)
            |————control(描述deb包的信息必须的文件)
```

## 7、conrol文件
```
//包名
Package: Internet-of-things
//版本
Version: 1.0.0-2017.05.03
//包分类
Section: tuils 
//优先级
Priority: optional
//依赖软件包
Depends:
//建议
Suggests: 
//目标机架构
Architecture: i386 | amd64
//安装后大小
Installed-Size: 
//维护者
Maintainer: papa
//原维护者
Original-Maintainer: papa
//提供
Provides:  
//包描述
Description: 欢迎来到万物智联
//软件主页
Homepage: http://blog.csdn.net/qq_27818541/
```

## 8、查看控制信息
dpkg -I xxx.deb

## 9、deb包安装过程中报错/var/lib/dpkg/info/test.postinst: 7: [: x86_64: unexpected operator
问题原因在于控制信息中postinst文件存在shell语法错误。
```
mkdir package
dpkg -X test.deb package/
dpkg -e test.deb
mv DEBIAN package/
vi package/DEBIAN/postins
dpkg -b package/ package.deb    这里时间有点长3-5分钟左右

dpkg-deb: building package `test' in `package.deb'.
这里显示的test应该是控制信息中的Description
```

## 10、再次创建deb包
需求：在四种架构操作系统运行二进制文件获取信息，由于部分操作系统存在安全性，需要二进制文件签名后方可运行，因此需要将二进制文件打包成deb并签名，然后安装后执行二进制文件即可。（备注：需要打包成一个deb包，根据架构安装对应的二进制文件）

.deb 包的安装过程是由 dpkg 控制的，它会解压所有文件到相应的位置。如果不想看见可以通过postinst文件使用rm命令删除。
control文件中Architecture: all表示这个包适用于所有架构。
在postinst文件中额外的操作不会在dpkg -r中进行析构操作，只能再编辑postrm文件进行析构。
注意安装的时候通过dpkg -r xxx.deb，卸载的时候而是dpkg -r Package（control文件中的包名）。
注意control文件的每个字段首字母都是大写，需要严格要求，否则会存在系统不认识，在银河麒麟中包名没有识别出来就是由于这个原因。

## 11、dpkg --print-architecture和arch命令
dpkg --print-architecture：这个命令是Debian包管理系统的一部分，它返回的是dpkg和apt用来管理和安装软件包的架构名称。这个命令的结果可能会受到多架构设置的影响，如果你的系统支持安装多个架构的软件包，那么dpkg --print-architecture返回的将是主架构的名称。

arch：这个命令实际上是uname -m的别名，它返回的是内核提供的硬件架构信息。这个命令的结果通常更接近硬件的实际架构，而不受软件包管理系统的影响。

在你的例子中，dpkg --print-architecture返回的是amd64，这是Debian和Ubuntu用来表示x86_64架构的名称。而arch返回的是x86_64，这是内核提供的硬件架构信息。

总的来说，如果你正在编写和软件包安装相关的脚本，那么你可能需要使用dpkg --print-architecture。如果你需要获取硬件的实际架构信息，那么你应该使用arch或uname -m。

在编写control文件的时候，有个Architecture参数值就是根据dpkg --print-architecture获取的。

## 12、deb包签名
直接打包的deb包通过7zip解压后只有data.tar，但是签名后的deb包解压后存在四个文件：control.tar.xz、data.tar.xz、debian-binary、sign。

签名后的二进制文件md5值是有所变化的。


