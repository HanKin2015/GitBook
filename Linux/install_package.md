# 安装包命令

第三方包下载地址：https://pkgs.org/download/libsysfs.so.2

## 1、deb包进行安装
dbkg -i **.deb
更多信息见D:\Github\GitBook\gitbook\Linux\deb_package.md

## 2、扩展屏关于使用xinput支持x86盒子鼠标校准的问题
目前只有xinput_1.6.1-1_amd64.deb这个版本的xinput在x86盒子上面正常使用，新版本的如xinput_1.6.2-1+b1_amd64.deb可能会有问题。
首先dpkg -i xinput_1.6.1-1_amd64.deb安装软件
输入xinput查看是否检测到了VGA和HDMI屏
xrandr -d :0查看有哪些屏
export DISPLAY=:0 在用xinput查看
xinput map-to-output 10 VGA1 把鼠标定位到VGA屏
xinput map-to-output 10 HDMI1 把鼠标定位HDMI屏

https://my.oschina.net/u/174445/blog/33329

## 3、常见的安装命令

### 3-1、apt 和 apt-get区别
参考：https://blog.csdn.net/a3192048/article/details/86618314
Ubuntu 16.04 发布时，一个引人注目的新特性便是 apt 命令的引入。其实早在 2014 年，apt 命令就已经发布了第一个稳定版，只是直到 2016 年的 Ubuntu 16.04 系统发布时才开始引人关注。

随着 apt install package 命令的使用频率和普遍性逐步超过 apt-get install package，越来越多的其它 Linux 发行版也开始遵循 Ubuntu 的脚步，开始鼓励用户使用 apt 而不是 apt-get。

apt 命令的引入就是为了解决命令过于分散的问题，它包括了 apt-get 命令出现以来使用最广泛的功能选项，以及 apt-cache 和 apt-config 命令中很少用到的功能。

在使用 apt 命令时，用户不必再由 apt-get 转到 apt-cache 或 apt-config，而且 apt 更加结构化，并为用户提供了管理软件包所需的必要选项。

简单来说就是：apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合。

虽然 apt 与 apt-get 有一些类似的命令选项，但它并不能完全向下兼容 apt-get 命令。也就是说，可以用 apt 替换部分 apt-get 系列命令，但不是全部。

目前还没有任何 Linux 发行版官方放出 apt-get 将被停用的消息，至少它还有比 apt 更多、更细化的操作功能。对于低级操作，仍然需要 apt-get。

### 3-2、apt和yum
一般来说著名的linux系统基本上分两大类：
1.RedHat系列：Redhat、Centos、Fedora等
2.Debian系列：Debian、Ubuntu等

RedHat 系列 
1 常见的安装包格式 rpm包,安装rpm包的命令是“rpm -参数” 
2 包管理工具 yum 
3 支持tar包

Debian系列 
1 常见的安装包格式 deb包,安装deb包的命令是“dpkg -参数” 
2 包管理工具 apt-get 
3 支持tar包

tar 只是一种压缩文件格式，所以，它只是把文件压缩打包而已。 
rpm 相当于windows中的安装文件，它会自动处理软件包之间的依赖关系。 
优缺点来说，rpm一般都是预先编译好的文件，它可能已经绑定到某种CPU或者发行版上面了。 
tar一般包括编译脚本，你可以在你的环境下编译，所以具有通用性。 
如果你的包不想开放源代码，你可以制作成rpm，如果开源，用tar更方便了。 
tar一般都是源码打包的软件，需要自己解包，然后进行安装三部曲，./configure, make, make install. 来安装软件。

rpm是redhat公司的一种软件包管理机制，直接通过rpm命令进行安装删除等操作，最大的优点是自己内部自动处理了各种软件包可能的依赖关系。

## 4、apt命令
sudo apt-get clean
sudo apt-get update
apt autoremove
修改源：vim /etc/apt/source.list，然后需要apt update
升级软件包：sudo apt upgrade
列出可更新的软件包及版本信息：apt list --upgradeable
升级软件包，升级前先删除需要更新软件包：sudo apt full-upgrade

### 4-1、安装安装包时报其他错误
```
[root@ubuntu0006:/media/hankin/vdb/null] #apt upgrade
正在读取软件包列表... 完成
正在分析软件包的依赖关系树
正在读取状态信息... 完成
正在计算更新... 完成
下列软件包是自动安装的并且现在不需要了：
  libevent-core-2.0-5 linux-headers-4.4.0-164 linux-headers-4.4.0-164-generic linux-image-4.4.0-164-generic linux-modules-4.4.0-164-generic linux-modules-extra-4.4.0-164-generic
使用'apt autoremove'来卸载它(它们)。
下列软件包的版本将保持不变：
  xorg
升级了 0 个软件包，新安装了 0 个软件包，要卸载 0 个软件包，有 1 个软件包未被升级。
有 4 个软件包没有被完全安装或卸载。
解压缩后会消耗 0 B 的额外空间。
您希望继续执行吗？ [Y/n] y
正在设置 update-notifier-common (3.168.15) ...
Traceback (most recent call last):
  File "/usr/lib/update-notifier/package-data-downloader", line 24, in <module>
    import debian.deb822
ModuleNotFoundError: No module named 'debian'
dpkg: 处理软件包 update-notifier-common (--configure)时出错：
 子进程 已安装 post-installation 脚本 返回错误状态 1
正在设置 ubuntu-advantage-tools (27.1~16.04.1) ...
Traceback (most recent call last):
  File "<string>", line 2, in <module>
ModuleNotFoundError: No module named 'uaclient'
dpkg: 处理软件包 ubuntu-advantage-tools (--configure)时出错：
 子进程 已安装 post-installation 脚本 返回错误状态 1
dpkg: 依赖关系问题使得 ubuntu-minimal 的配置工作不能继续：
 ubuntu-minimal 依赖于 ubuntu-advantage-tools；然而：
  软件包 ubuntu-advantage-tools 尚未配置。

dpkg: 处理软件包 ubuntu-minimal (--configure)时出错：
 依赖关系问题 - 仍未被配置
因为错误消息指示这是由于上一个问题导致的错误，没有写入 apport 报告。
                                                                    dpkg: 依赖关系问题使得 update-notifier 的配置工作不能继续：
 update-notifier 依赖于 update-notifier-common (= 3.168.15)；然而：
  软件包 update-notifier-common 尚未配置。

dpkg: 处理软件包 update-notifier (--configure)时出错：
 依赖关系问题 - 仍未被配置
由于已经达到 MaxReports 限制，没有写入 apport 报告。
                                                    在处理时有错误发生：
 update-notifier-common
 ubuntu-advantage-tools
 ubuntu-minimal
 update-notifier
E: Sub-process /usr/bin/dpkg returned an error code (1)
```
https://blog.51cto.com/lovexx/1975545
跟着教程走解决。可能会出现问题未解决的问题，但是如果再走一遍发现问题解决了。很神奇。
脚本见：D:\Github\Storage\shell\solve_dpkg_install_error.sh

uname -a
dpkg --get-selections| grep linux-image
带install的是已经安装的，除了正在使用的可以全面删掉；
带deinstall的是没有安装的，但是卸载有残留；
先处理deinstall：sudo dpkg -P linux-image-4.10.0-28-generic
然后再处理install：sudo apt purge linux-image-4.13.0-36-generic
最后保留:
```
linux-image-4.4.0-210-generic                   install
linux-image-generic                             install
```
rm /var/lib/dpkg/info -rf
mkdir /var/lib/dpkg/info -p
apt install hollywood
搞定。

### 4-2、使用apt install安装失败
```
root@hejian-H81M-S1:/home/hejian# apt install vim
E: Could not get lock /var/lib/dpkg/lock-frontend - open (11: Resource temporarily unavailable)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), is another process using it?
root@hejian-H81M-S1:/home/hejian# rm /var/lib/dpkg/lock-frontend
root@hejian-H81M-S1:/home/hejian# apt install ssh
E: Could not get lock /var/lib/dpkg/lock - open (11: Resource temporarily unavailable)
E: Unable to lock the administration directory (/var/lib/dpkg/), is another process using it?
root@hejian-H81M-S1:/home/hejian# rm /var/lib/dpkg/lock
搞定
```

### 4-3、aptitude命令
aptitude命令与apt-get命令一样，都是Debian Linux及其衍生系统中功能极其强大的包管理工具。

与apt-get不同的是，aptitude在处理依赖问题上更佳一些。举例来说，aptitude 在删除一个包时，会同时删除本身所依赖的包。这样，系统中不会残留无用的包，整个系统更为干净。它通过文本操作菜单和命令两种方式管理软件包。

相对来说，更加推荐使用aptitude命令来代替apt-get，特别是在下载或者删除依赖包的时候，aptitude都要比apt-get更好。

更新可用的包列表：aptitude update 
执行一次安全的升级：aptitude safe-upgrade
安装包：aptitude install pkgname 
删除包及其配置文件：aptitude purge pkgname
删除下载的包文件：aptitude clean 
搜索包：aptitude search pkgname 

## 5、rpm命令
centos系统使用。

1）查询系统中已经安装的软件
rpm -qa

2）查询一个已经安装的文件属于哪个软件包；
rpm -qf 文件名的绝对路径

3）查询已安装软件包都安装到何处；
rpm -ql 软件名

4）查询一个已安装软件包的信息
rpm -qi 软件名

5）查看一下已安装软件的配置文件；
rpm -qc 软件名

6）查看一个已经安装软件的文档安装位置：
rpm -qd 软件名

7）查看一下已安装软件所依赖的软件包及文件；
rpm -qR 软件名

### 5-1、安装软件
rpm -Uvh *.rpm --nodeps --force

### 5-2、rpm离线包下载地址
http://www.rpmfind.net/linux/rpm2html/search.php?query=vim&submit=Search+...&system=&arch=

## 6、配置镜像源
```
#!/bin/bash
set -e

code_name=$(lsb_release -c |awk '{print $2}')
if [ "$code_name" = "" ]; then
  echo "Failed!"
  exit 1
fi
cp /etc/apt/sources.list /etc/apt/sources.list.bak
echo "/etc/apt/sources.list  was bakup to /etc/apt/sources.list.bak"
wget http://mirrors.hankin.org/assistants/ubuntu/sources.list -O /etc/apt/sources.list
sed -i "s/CODE_NAME/${code_name}/" /etc/apt/sources.list
apt update || apt-get update
```

### 6-1、软件源格式详解
Ubuntu的软件源配置文件路径：/etc/apt/sources.list
```
## Generated by deepin-installer
deb https://professional-packages.chinauos.com/desktop-professional eagle main contrib non-free
#deb-src https://professional-packages.chinauos.com/desktop-professional eagle main contrib non-free
```
以这个地址为例，居然打不开地址，然后修改为https://uos.deepin.cn/uos/，发现有两个目录，dists目录名不需要写上，默认选择。
eagle为子目录
main contrib non-free则为多个子子目录

### 6-2、UOS系统配置
本机源地址配置文件路径：/etc/apt/sources.list
```
## Generated by deepin-installer
deb https://professional-packages.chinauos.com/desktop-professional eagle main contrib non-free
#deb-src https://professional-packages.chinauos.com/desktop-professional eagle main contrib non-free
```
参数解释：网址需要能访问打开，eagle表示一个目录，在网址的dists目录下，然后eagle目录下会存在main、contrib、non-free三个目录。
注意在eagle目录下一般还需要存在InRelease和Release文件，否则使用apt update命令会报错“仓库https://professional-packages.chinauos.com/desktop-professional eagle Release没有Release文件”

apt update

发现存在其他网址访问获取软件更新列表：
```
/etc/apt/sources.list.d/printer.list
/etc/apt/sources.list.d/appstore.list
/etc/apt/sources.list.d/driver.list
/etc/apt/sources.list.d/security.list
```
要么进行配置修改，要么就进行注释。

另外UOS一般可以使用debian镜像源和deepin或者ubuntu镜像源，参考https://zhuanlan.zhihu.com/p/644769450和https://bbs.chinauos.com/zh/post/4196，实测deepin镜像源使用正常。
[欢迎访问网易开源镜像站](http://mirrors.163.com/)

### 6-3、kylin系统配置
默认镜像源地址填写：
```
root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:/home/admin/usbip_driver# cat /etc/apt/sources.list
# 本文件由源管理器管理，会定期检测与修复，请勿修改本文件
deb http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1 main restricted universe multiverse
deb http://archive2.kylinos.cn/deb/kylin/production/PART-V10-SP1/custom/partner/V10-SP1 default all

是不是写错了：http://archive2.kylinos.cn/deb/kylin/production/PART-V10-SP1/custom/partner/V10-SP1/dists/default/all/
很奇怪，直接打开链接，然后点击dists会报错：
HTTP 404: Not found.
The URL you requested was not found on this server.
但是通过点击Parent Directory，然后再重新点击就可以了。
```

http://archive.kylinos.cn/kylin/KYLIN-ALL/

在系统的/etc/apt/sources.list文件中，根据不同版本填入以下内容:
```
#V10 SP1 2107版本:
deb http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107-updates main restricted universe multiverse

root@admin-LM-LS3A5000-7A1000-1w-V01-pcA2101:~# cat /etc/.kyinfo
[dist]
name=Kylin
milestone=Desktop-V10-SP1-Release-2107
arch=loongarch64
beta=False
time=2021-09-22 12:03:40
dist_id=Kylin-Desktop-V10-SP1-Release-2107-loongarch64-2021-09-22 12:03:40

[servicekey]
key=0124212

[os]
to=
term=2023-04-12
```
使用apt update命令更新库源。

发现一个神奇的事情，难道是我理解错了？？？官网写着：
```
#V10 SP1版本:
deb http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1 main restricted universe multiverse

#V10 SP1 2107版本:
deb http://archive.kylinos.cn/kylin/KYLIN-ALL 10.1-2107-updates main restricted universe multiverse
```
但是使用10.1-2107-updates根本无法获取clang库，但是写成10.1就可以了。
那是不是应该理解为这两个链接地址都要添加上去，后面的是前面的补充，updates嘛。

## 7、linux中make install指定安装目录
### 7-1、修改configure文件中prefix的值：
用vi/vim打开configure文件，然后找到prefix值，修改未prefix=你的安装目录，然后保存退出，再执行./configure & make & sudo make install就可以，不过该方法比较麻烦，会容易改动到configure文件的其他的参数，不建议使用。

### 7-2、执行configure文件时指定安装目录：
```
./configure --prefix=/home/user/zws/build
```

### 7-3、在make install指定DESTDIR参数：
```
./configure
make 
make install DESTDIR= /home/user/zws/build
```

## 8、dpkg：警告：无法找到软件包 libconfuse-common 的文件名列表文件，现假定该软件包目前没有任何文件被安装在系统里
猜测可能是因为我删除了/var/lib/dpkg/info文件夹导致。

参考：https://mkaliez.com/all/3076.html

因为在apt-get install 安装一个新包时 先回去检查/var/lib/dpkg/info/目录下的已安装包的配置文件信息；如果发现有已经安装的应用 的配置文件信息不在info目录下 就会提示这个错误。所以这个时候我们可以通过：sudo dpkg --configure -a
然后通过：dpkg -l | grep ^ii | awk '{print $2}' | grep -v XXX | xargs sudo aptitude reinstall 
重新获取包内容配置信息 ，这样一步步重新安装下去 很快就可以解决这个问题了

二.当然也还有第二种方法，那就是通过：sudo apt-get --reinstall install dpkg --get-selections | grep '[[:space:]]install' | cut -f1
来重新安装全部软件，会全部刷新info目录 不过这个方法就要多花点时间去等了

## 9、E: 软件包 ufw 需要重新安装，但是我无法找到相应的安装文件。
```
rm -rf /var/lib/dpkg/info/ufw.*
dpkg -r --force-remove-reinstreq ufw
[root@ubuntu0006:/media] #apt install xar
正在读取软件包列表... 完成
正在分析软件包的依赖关系树
正在读取状态信息... 完成
E: 无法定位软件包 xar
```

## 10、使用apt安装失败但是更新一下apt后就成功了
```
E: Failed to fetch http:/www.bai.com/linux-libc_6.2.0-23.23_amd64.deb 404 Not Found [IP: 199.200.1.1 80]
E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?

然后使用apt-get update更新后，再使用apt install clang就成功了。
```

## 11、apt update更新索引失败
报错如下：
```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 54404762BBB6E853 NO_PUBKEY BDE6D2B9216EC7A8
```
原因：apt 在尝试更新软件包时无法验证某些软件源的签名，因为缺少相应的公钥。说白了就是填写的镜像源内部含有较新的软件安装包，而本地的操作系统版本过于老旧，从而出现了此问题（缺失公钥54404762BBB6E853 BDE6D2B9216EC7A8）。

尝试方案：不可行
```
# 临时禁用校验
sudo apt-get update --allow-unauthenticated

# 永久禁用校验
cat <<EOF > /etc/apt/apt.conf.d/99myconfig
Acquire::AllowInsecureRepositories "true";
Acquire::AllowDowngradeToInsecureRepositories "true";
EOF
```

解决方案1：在线导入
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 54404762BBB6E853
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BDE6D2B9216EC7A8

或

gpg --keyserver keyserver.ubuntu.com --recv-keys F8D2585B8783D481
gpg --export --armor F8D2585B8783D481 > public.key
sudo apt-key add public.key
```

解决方案2：离线导入
- 外网下载公钥：https://keyserver.ubuntu.com/
- 输入公钥信息搜索然后一般下载最后一项即可（文件后缀为asc）
- sudo apt-key add *.asc即可完成安装
- apt update

解决方案3：更换镜像源

其他获得公钥的地址：
```
keyring.debian.org
keyserver.ubuntu.com
pgp.mit.edu
subkeys.pgp.net
www.gpg-keyserver.de
```

