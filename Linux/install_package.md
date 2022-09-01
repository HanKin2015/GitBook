[TOC]

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
apt
yum

apt 和 apt-get区别
apt search 和 apt-cache search区别

## 4、apt命令
sudo apt-get clean
sudo apt-get update
apt autoremove

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
跟着教程走解决。

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

## 6、Ubuntu的软件源格式详解

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




