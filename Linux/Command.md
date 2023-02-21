
# Linux中常见的命令大全

# 1、alias
https://blog.csdn.net/chuangjinweilai/article/details/51850803
alias soff='sleep 5 && xset dpms force off'

## 2、df
显示磁盘分区上可以使用的磁盘空间
-a    #查看全部文件系统，单位默认KB
-h   #使用-h选项以KB、MB、GB的单位来显示，可读（最常用）

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



# 9、uname命令
```
[root@ubuntu0006:/media/hankin/vdb] #uname -a
Linux ubuntu0006 4.4.0-210-generic #242-Ubuntu SMP Fri Apr 16 09:57:56 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
[root@ubuntu0006:/media/hankin/vdb] #uname -s
Linux
[root@ubuntu0006:/media/hankin/vdb] #uname -n
ubuntu0006
[root@ubuntu0006:/media/hankin/vdb] #uname -r
4.4.0-210-generic
[root@ubuntu0006:/media/hankin/vdb] #uname -v
#242-Ubuntu SMP Fri Apr 16 09:57:56 UTC 2021
[root@ubuntu0006:/media/hankin/vdb] #uname -m
x86_64
[root@ubuntu0006:/media/hankin/vdb] #uname -p
x86_64
[root@ubuntu0006:/media/hankin/vdb] #uname -i
x86_64
[root@ubuntu0006:/media/hankin/vdb] #uname -o
GNU/Linux
[root@ubuntu0006:/media/hankin/vdb] #uname --version
uname (GNU coreutils) 8.25
Copyright (C) 2016 Free Software Foundation, Inc.
许可证：GPLv3+：GNU 通用公共许可证第3 版或更新版本<http://gnu.org/licenses/gpl.html>。
本软件是自由软件：您可以自由修改和重新发布它。
在法律范围内没有其他保证。

由David MacKenzie 编写。
[root@ubuntu0006:/media/hankin/vdb] #uname --help
用法：uname [选项]...
输出一组系统信息。如果不跟随选项，则视为只附加-s 选项。

  -a, --all                     以如下次序输出所有信息。其中若-p 和
                                -i 的探测结果不可知则被省略：
  -s, --kernel-name             输出内核名称
  -n, --nodename                输出网络节点上的主机名
  -r, --kernel-release          输出内核发行号
  -v, --kernel-version     print the kernel version
  -m, --machine            print the machine hardware name
  -p, --processor          print the processor type (non-portable)
  -i, --hardware-platform  print the hardware platform (non-portable)
  -o, --operating-system   print the operating system
      --help            显示此帮助信息并退出
      --version         显示版本信息并退出

GNU coreutils online help: <http://www.gnu.org/software/coreutils/>
请向<http://translationproject.org/team/zh_CN.html> 报告uname 的翻译错误
Full documentation at: <http://www.gnu.org/software/coreutils/uname>
or available locally via: info '(coreutils) uname invocation'
```

# 10、 **blkid命令**

**blkid命令**对查询设备上所采用文件系统类型进行查询。blkid主要用来对系统的块设备（包括交换分区）所使用的文件系统类型、LABEL、UUID等信息进行查询。要使用这个命令必须安装e2fsprogs软件包。 

# 11、[Linux 下查看字体](https://www.cnblogs.com/yangzp/p/10791694.html)
1.查看所有字体
命令：fc-list

2.查看中文字体
命令：fc-list :lang=zh

3.查看更多字体
命令：fc-match -v "AR PL UKai CN"

windows系统下字体：C://Windows/Fonts/微软雅黑（似乎里面没有ttf字体，格式为ttc）
/usr/share/fonts/chinese/TrueType

```
cp -rf 	"$UNPACK_FILE_DIR"/common/usr/local/share/fonts/*  "${VDI_WORD_FONT_PATH}"
chmod 755 "${VDI_WORD_FONT_PATH}"* 
mkfontscale 
mkfontdir
fc-cache -fv
cd /tmp
		
安装字体
创建 /usr/share/fonts/opentype文件夹,将要的字体opentype文件放在这个文件下
fontconfig-infinality_1-2_all.deb			字体渲染
freetype-infinality_2.4.9-3_all.deb			字体渲染
libfreetype-infinality6_2.4.9-3_amd64.deb	字体渲染
/usr/share/fonts/opentype/NotoSansCJKsc-DemiLight.otf 字体
执行如下命令
cd /usr/share/fonts/opentype/
mkfontscale
mkfontdir
fc-cache -fv
```

> 将字体文件ttf或者ttc拷贝到/usr/share/fonts/opentype
>
> 使用fc-cache -fv即安装成功
>
> fc-list可以查看到字体是否安装成功
>
> fc-list :lang=zh

命名方式（公司或者系统常用）：

- Windows系统：
- Linux系统：
- 谷歌：
- Java：
- C++：
- Python：

# 12、快捷键
ctrl+alt+F1	切换命令行模式

shift+tab	退tab

cd -	返回上一层所在工作区

1. `QWebView *view = new QWebView(this->centralWidget());`
2. `view->load(QUrl("file:///home//test.html"));`
3. `connect(view, SIGNAL(loadFinished(bool)), this, SLOT(loadFinished(bool)));`

# 13、chown
将文件 file1.txt 的拥有者设为 runoob，群体的使用者 runoobgroup :
```
chown runoob:runoobgroup file1.txt
```

将目前目录下的所有文件与子目录的拥有者皆设为 runoob，群体的使用者 runoobgroup:
```
chown -R runoob:runoobgroup *
```

chown和chmod改变目录下所有文件属性
-R : 处理指定目录以及其子目录下的所有文件
```
chown -R 属主：属组 file
chmod -R 777  file
```

## 13-1、使用chmod 777后普通用户是否可以读写root用户创建的文件
实战结论：
- 只需要给文件读写权限，普通用户就可以写入。
- 给文件赋予拥有者权限，普通用户就可以写入。

```
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #cat hj
hello
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #su hejian
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ ls -l
总用量 4
-rw-r--r-- 1 root root 6 7月  11 19:23 hj
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ chmod 777 hj
chmod: 更改'hj' 的权限: 不允许的操作
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ echo "8" > hj
bash: hj: 权限不够
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ su
密码：
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #chmod 777 hj
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #ll
总用量 12
drwxr-xr-x 2 root root 4096 7月  11 19:23 ./
drwxr-xr-x 5 root root 4096 7月  11 19:23 ../
-rwxrwxrwx 1 root root    6 7月  11 19:23 hj*
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #su hejian
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ echo "8" > hj
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ cat hj
8
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ ls -l
总用量 4
-rwxrwxrwx 1 root root 2 7月  11 19:25 hj
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #cat jh
world
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #ls -l
总用量 8
-rwxrwxrwx 1 root root 2 7月  11 19:25 hj
-rw-r--r-- 1 root root 6 7月  11 19:27 jh
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #chown hejian:hejian jh
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #ls -l
总用量 8
-rwxrwxrwx 1 root   root   2 7月  11 19:25 hj
-rw-r--r-- 1 hejian hejian 6 7月  11 19:27 jh
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj] #su hejian
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ echo "9999" > jh
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ cat jh
9999
hejian@ubuntu0006:/media/hankin/vdb/study/log4cplus/hj$ ls -l
总用量 8
-rwxrwxrwx 1 root   root   2 7月  11 19:25 hj
-rw-r--r-- 1 hejian hejian 5 7月  11 19:28 jh
```

# 14、suspend命令
Linux suspend命令用于暂停执行shell。
suspend为shell内建指令，可暂停目前正在执行的shell。若要恢复，则必须使用SIGCONT信息。

若目前执行的shell为登入的shell，则suspend预设无法暂停此shell。若要强迫暂停登入的shell，则必须使用-f参数。
```
# suspend 
-bash: suspend: 无法挂起一个登录 shell
# suspend -f
```

# 15、999用户组
usermod -g 999 abc
[root@iZ282bgtwmcZ ~dao]# grep 999 /etc/passwd
polkitd:x:999:998:User for polkitd:/:/sbin/nologin
[root@iZ282bgtwmcZ ~]# grep 999 /etc/group
ssh_keys:x:999:
一个用户至少要属于一个用户组
一个用户可以属于多个用户组

# 16、lsblk
lsblk 列出所有块设备信息（除了RAM类型的块设备）。lsblk是通过读取/sys/fs文件系统信息和udev db来收集信息。

lsblk命令包含在util-linux包中，现在该包改名为util-linux。

## 名称

udev — 动态设备管理

## 描述

udev 能够处理设备事件、管理设备文件的权限、 在 `/dev` 目录中创建额外的符号链接、重命名网络接口，等等。 内核通常仅根据设备被发现的先后顺序给设备文件命名， 因此很难在设备文件与物理硬件之间建立稳定的对应关系。 而根据设备的物理属性或配置特征创建有意义的符号链接名称或网络接口名称， 就可以在物理设备与设备文件名称之间建立稳定的对应关系。

udev守护进程([systemd-udevd.service(8)](http://www.jinbuguo.com/systemd/systemd-udevd.service.html#)) 直接从内核接收设备的插入、拔出、改变状态等事件， 并根据这些事件的各种属性， 到规则库中进行匹配，以确定触发事件的设备。 被匹配成功的规则有可能提供额外的设备信息，这些信息可能会被记录到udev数据库中， 也可能会被用于创建符号链接。

udev处理的所有设备信息都存储在udev数据库中， 并且会发送给可能的设备事件的订阅者。 可以通过 libudev 库访问udev数据库以及设备事件源。

## 规则文件

规则文件分别位于： 系统规则目录(`/usr/lib/udev/rules.d`)、 运行时规则目录(`/run/udev/rules.d`)、 本机规则目录(`/etc/udev/rules.d`)。 所有的规则文件(无论位于哪个目录中)，统一按照文件名的字典顺序处理。 对于不同目录下的同名规则文件，仅以优先级最高的目录中的那一个为准。 具体说来就是： `/etc/` 的优先级最高、 `/run/` 的优先级居中、 `/usr/lib/` 的优先级最低。 如果系统管理员想要屏蔽 `/usr/lib/` 目录中的某个规则文件， 那么最佳做法是在 `/etc/` 目录中创建一个指向 `/dev/null` 的同名符号链接， 即可彻底屏蔽 `/usr/lib/` 目录中的同名文件。 注意，规则文件必须以 `.rules` 作为后缀名，否则将被忽略。

http://www.jinbuguo.com/systemd/udev.html





