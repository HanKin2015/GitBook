[TOC]

# 1、du

显示当前目录下每个文件和目录的磁盘使用空间。

命令参数：

-a   #显示目录中文件的大小  单位 KB 。

-b  #显示目录中文件的大小，以字节byte为单位。

-c  #显示目录中文件的大小，同时也显示总和；单位KB。

-k 、 -m  、#显示目录中文件的大小，-k 单位KB，-m 单位MB.

-s  #仅显示目录的总值，单位KB。

-H或--si                 #与-h参数相同，但是K，M，G是以1000为换算单位。   

-h  #以K  M  G为单位显示，提高可读性~~~（最常用的一个~也可能只用这一个就满足需求了）

推荐：du -h[a]



注意：

- du -h是查看当前文件夹的大小，及当前目录大小
- du -h 指定文件夹或文件


# 2、df
显示磁盘分区上可以使用的磁盘空间

-a    #查看全部文件系统，单位默认KB

-h   #使用-h选项以KB、MB、GB的单位来显示，可读性高~~~（最常用）

推荐：df -h

# 3、free
可以显示Linux系统中空闲的、已用的物理内存及swap内存,及被内核使用的buffer。

个人理解：cpu或者内存条内存

推荐： free -h

# 4、tracepath

tracepath指令可以追踪数据到达目标主机的路由信息，同时还能够发现MTU值。它跟踪路径到目的地，沿着这条路径发现MTU。它使用UDP端口或一些随机端口。它类似于Traceroute，只是不需要超级用户特权，并且没有花哨的选项。tracepath 6很好地替代了tracerout 6和Linux错误队列应用程序的典型示例。tracepath的情况更糟，因为商用IP路由器在ICMP错误消息中没有返回足够的信息。

# 5、mount使用u盘

- fdisk -l    查看存储信息（硬盘、u盘）
- mount /dev/sdb /mnt（搞了一半天报错）
  - 不应该输入Disk那里的/dev/sdb，而应该输入Device那里的/dev/sdb4
  - dmesg | tail     可以看见详细的错误信息，可以看到sdb4
- 然后就可以在/mnt中看见u盘里的内容了(ls /mnt)
- 修复该磁盘的文件系统，即运行命令`fsck -t ext4 /dev/sdb`
- umount /mnt   #卸载U盘

```
fat16：

mount -t msdos /dev/sda1 /mnt/usb

fat32：

mount -t vfat /dev/sda1 /mnt/usb

ext2格式：(ext3、ext4)

mount -t ext2 /dev/sda1 /mnt/usb
```



## 运行挂载命令如 mount /dev/sdb mnt出现错误：

```
mount: wrong fs type, bad option, bad superblock on /dev/sdc1,
       missing codepage or helper program, or other error
In some cases useful info is found in syslog - try
dmesg | tail or so.
```

# 6、wget下载文件

wget -c 后面是该网络地址和文件的位置。

例如：wget -c http://apache.opncas.or/MySQL/MySQL-7/v7.0.67/bin/MySQL.zip就是下载该网络想的MySQL.zip压缩包。

其中-c：[断点续传](https://www.baidu.com/s?wd=断点续传&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)，如果下载中断，那么连接恢复时会从上次断点开始下载。

# 7、dirname

dirname $0   当前脚步文件的目录（路径）

输出文件的目录

``这个符号可以输出shell命令的结果，如：

echo \`pwd\`     ====   echo $PWD   ====   pwd



# 8、--prefix参数

Linux编译安装中的--prefix。

1、源码安装一般包括几个步骤：**配置（configure）**，**编译（make）**，**安装（make install）**。

2、其中configure是一个可执行脚本，在源码目录中执行可以完成自动的配置工作，即`./configure`。

3、在实际的安装过程中，我们可以增加`--prefix`参数，这样可以将要安装的应用安装到**指定的目录**中，如，我们要安装git应用，在配置环节可以使用如下命令：

```bash
# --prefix
./configure --prefix=/usr/local/git
```

之后再执行`make & make install`命令就可以将git安装到了/usr/local/git目录中，这样做的好处就是方便以后的维护。



# 9、运行脚本时nohub和&的区别





# 快捷键

ctrl+alt+F1	切换命令行模式

shift+tab	退tab

cd -	返回上一层所在工作区

grep -rin 字符串 目标区域	（在目标区域内的文件内容中查找）





1. `QWebView *view = new QWebView(this->centralWidget());`
2. `view->load(QUrl("file:///home//test.html"));`
3. `connect(view, SIGNAL(loadFinished(bool)), this, SLOT(loadFinished(bool)));`

