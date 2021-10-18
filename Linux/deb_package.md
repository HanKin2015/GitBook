# deb打包过程

## 1、dpkg-deb和dpkg命令区别

## 2、常用命令
dpkg-deb -I xxx.deb
dpkg-deb -e xxx.deb

## 3、认识deb包
control
postinst
postrm
preinst
prerm


pidof compton 输出进程id

## 4、 原理
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

