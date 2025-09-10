# VMware Workstation 

## 1、简介
VMware Workstation（中文名“威睿工作站”）是一款功能强大的桌面虚拟计算机软件，提供用户可在单一的桌面上同时运行不同的操作系统，和进行开发、测试 、部署新的应用程序的最佳解决方案。VMware Workstation可在一部实体机器上模拟完整的网络环境，以及可便于携带的虚拟机器，其更好的灵活性与先进的技术胜过了市面上其他的虚拟计算机软件。对于企业的 IT开发人员和系统管理员而言， VMware在虚拟网路，实时快照，拖曳共享文件夹，支持 PXE 等方面的特点使它成为必不可少的工具。

## 2、安装
中文简体版：https://vmware.waltzsy.com/?bd_vid=8261744927183947044
官网下载：https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion
系统镜像：https://msdn.itellyou.cn/（只有20.04版本，但官网最新23.04版本）
官方下载：https://releases.ubuntu.com/lunar/
居然VMware是收费的。。。
由于是去年下载的，一直未安装，拖延症严重啊，已经过来半年了，安装的是16.2.4 build-20089737版本，然后在网上找了破解码，直接许可通过。
https://m.vqs.com/article/14740.html

最新下载教程：https://blog.csdn.net/m0_72217974/article/details/145002631
需要注册账号下载，并且下载链接极难找到，参考网上资料找到下载链接。
账号密码已忘记。。。。。。

## 3、安装Ubuntu23.04
存在一个bug，不管怎么输入账号密码，都无法进入虚拟机。
https://tieba.baidu.com/p/8380401274
https://askubuntu.com/questions/1464560/ubuntu-23-04-problem-with-password-authentication
这个是骗人的：https://blog.csdn.net/qevaeva/article/details/123899234

解决方法：
https://blog.csdn.net/qyfx123456/article/details/130190155

不全屏解决方法：https://blog.csdn.net/baidu_38797690/article/details/124191747

vmware一直卡在DHCP：
修改不了BIOS启动：https://zhidao.baidu.com/question/1956045758975049508.html
解决方法：注意需要在设置里面CD/DVD加载ISO文件，并且重点是设备状态勾选启动时连接，不勾选已连接。

安装VMware Tools：
安装包下载地址：https://packages-prod.broadcom.com/tools/frozen/linux/linux.iso
加载ISO文件：虚拟机设置-》硬件-》CD/DVD-》启动时连接-》使用ISO映像文件
将tar压缩包拷贝到桌面，然后解压安装sudo ./vmware-install.pl
发现根本无法完成安装，服务启动不起来：https://zhuanlan.zhihu.com/p/710754741
解决方式：
```
sudo ./vmware-install.pl走到卸载流程卸载VMware Tools
sudo apt-get autoremove open-vm-tools
sudo apt-get install open-vm-tools
sudo apt-get install open-vm-tools-desktop
reboot 
```

## 4、没有网络，没有IP地址
主机模式和NAT模式是虚拟机网络设置中的两种常见模式，它们的区别如下：

主机模式：在主机模式下，虚拟机可以访问主机所在的局域网和互联网，同时主机和其他设备也可以访问虚拟机。这种模式下，虚拟机相当于主机网络中的一个独立设备，可以获得一个独立的IP地址。

NAT模式：在NAT模式下，虚拟机可以访问主机所在的局域网和互联网，但是主机和其他设备无法直接访问虚拟机。虚拟机通过主机的IP地址和端口号进行网络通信，主机会将虚拟机的请求转发到互联网上，接收到响应后再转发给虚拟机。这种模式下，虚拟机获得的IP地址是由虚拟网络分配的，通常是一个私有IP地址。

桥接模式：在桥接模式下，虚拟机会通过虚拟网络适配器连接到主机的物理网络适配器，虚拟机会获得与主机相同的IP地址段的IP地址，主机和其他设备可以直接访问虚拟机。虚拟机可以直接访问外部网络，外部网络也可以直接访问虚拟机。

总的来说，主机模式更适合需要虚拟机与主机和其他设备进行通信的场景，而NAT模式则更适合需要虚拟机访问互联网的场景。
因此，NAT模式适合需要虚拟机与外部网络通信，但不需要外部网络直接访问虚拟机的场景；桥接模式适合需要虚拟机与外部网络通信，并且需要外部网络直接访问虚拟机的场景。

因此需要设置成桥接模式即可，这样任何主机都能进行访问（可以通过ssh命令连接），记得安装ssh，并设置root可连接。
所以就会出现一种情况，桥接模式有自己的独立ip地址，并且能ping通网段。也能ping通其他ip地址，然后却出现了火狐浏览器打不开网页的情况，排查了半天以为是代理问题，然鹅切换到NAT模式就能解决了。

uos虚拟机：桥接模式+复制物理机网络状态（注意重启虚拟机不生效，需要先关机再开机才行）

## 5、虚拟机无法全屏问题
不确认是不是需要安装VMware Tools，反正可以先安装，下载完成后需要使用命令进行安装。
从磁盘中拖出VMwareTools.tar.gz，解压，执行vmware-install.pl脚本即可，一直回车默认安装即可。

依然无法全屏原因居然是分辨率设置不对，设置正确的分辨率即可。

## 6、虚拟机和主机之间复制粘贴
虚拟机设置-》选项-》客户机隔离
如果遇到一直是灰色的不能点击（即关机状态下），则只需要安装：apt install open-vm-tools-desktop即可，需要重启虚拟机。
注意：高版本不再支持安装VMware Tools。

## 7、虚拟机使用的此版本VMware Workstation不支持的硬件版本
很奇怪，重装Windows系统后这个位置变成了19，当前最新版本才17。
- 在虚拟机名称上右键，选择【虚拟机目录】
- 找到所使用的虚拟机的.vmx目录，用记事本打开，用于查看其支持的VMware Workstation版本
- 查看字段，修改可支持的版本信息，搜索virtualHW.version，我使用的版本是VMware Workstation 16，所以改成16，你使用什么版本就改成什么版本，看你的虚拟机软件版本整数

## 8、无法将xxxx链接到该虚拟机。主机需要使用该设备进行输入
网上好多答案是配置文件.vmx里添加了一行就可以usb.generic.allowLastHID = "TRUE"。结果根本不行。
最终解决办法是再插一个hid设备，如键鼠即可。这个报错是说这是最后一个输入设备了，不能将它给映射进去。

## 9、不显示hid设备
关闭虚拟机-》虚拟机-》设置-》usb控制器-》显示所有usb输入设备

## 10、另一个程序已锁定文件的一部分，进程无法访问
删除报错的vmdk文件夹即可，只需要留下vmk文件夹就行，数据并不会丢失。可能是之前挂起或者物理机被重启后出现的问题。

## 7、UOS虚拟机配置环境
- 安装UOS操作系统：选择其他虚拟机类型，按照推荐安装会失败，原因是内存分配太少，默认才256MB，改为4GB就能正常安装了
- 安装deb软件报错签名问题：安全中心-安全工具-应用安全-将仅签名应用改为任意应用
- 进入开发者模式：
```
#! /bin/bash

if [ ! -d /var/lib/deepin/developer-mode/ ]
then
  mkdir -p /var/lib/deepin/developer-mode/
fi
chattr -i /var/lib/deepin/developer-mode/enabled
chattr -e /var/lib/deepin/developer-mode/enabled
chattr -u /var/lib/deepin/developer-mode/enabled
echo -n -E '1' | tee /var/lib/deepin/developer-mode/enabled
chattr +i /var/lib/deepin/developer-mode/enabled
```
- vmware中虚拟机拥有独立ip地址：将NAT模式改为桥接模式+复制物理机网络状态（注意重启虚拟机不生效，需要先关机再开机才行）
- 配置ssh（默认已安装ssh）：systemctl start ssh，修改/etc/ssh/sshd_config添加PermitRootLogin yes允许root登录
注意：报错root@12.22.16.33: Permission denied (publickey,password).，配置完PermitRootLogin yes后报错root@12.22.16.33: Permission denied (publickey).，原因是在本地计算机上不存在SSH密钥对（私钥和公钥）。通常，这些文件位于~/.ssh/目录下，文件名可能是id_rsa（私钥）和id_rsa.pub（公钥）。使用ssh-keygen -t rsa命令创建后即可。
- USB设备映射：虚拟机设置-硬件-添加-USB控制器
- 复制粘贴问题：apt autoremove open-vm-tools、apt install open-vm-tools、apt install open-vm-tools-desktop重启虚拟机即可（默认安装的open-vm-tools不匹配需要卸载）
- 配置ll命令：在/etc/bash.bashrc文件中添加alias ll="ls -laF"

## 8、可移动设备无外设
原因是设置-》硬件-》USB控制器-》显示所有USB输入设备

## 9、复制粘贴失效问题
大概率是vm-tools问题（如更新了vm-tools未重启虚拟机），可以尝试重启虚拟机试试。

## 10、稍后安装操作系统
https://zhuanlan.zhihu.com/p/677674195
虚拟机设置-》硬件-》CD/DVD-》启动时连接-》使用ISO映像文件

## 11、vmware主机的vulkan图形驱动程序版本不受支持
https://blog.csdn.net/qq_31828933/article/details/134159230

## 12、vmware 找不到共享文件夹
https://blog.csdn.net/weixin_42418557/article/details/80636882

执行一下这个命令vmhgfs-fuse /mnt/hgfs/  再看 mnt 目录

## 13、自动获取IP地址失败
设置为桥接和NAT模式无法正常获取IP地址，但是设置为主机模式能获取IP地址，但是这时候无法上网啊。

最终发现主机模式使用的是VMnet1网卡，而桥接模式则是使用的是VMnet0网卡，因此这就是为何有的模式能正常获取IP地址。

通过重启虚拟机无法恢复正常，最终解决方法：
打开 虚拟机-编辑-虚拟网络编辑器 选择VMnet0（点击更改设置需要获取管理员权限才能显示出来）
其中桥接模式选择本地笔记本上面实体网卡设备后保存即可。

猜测出现这种的原因是默认的自动获取实体网卡获取错误，从而选择了错误的网卡导致无法正常获取IP地址。