

Docker 是一个[开源](https://baike.baidu.com/item/开源/246339)的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 [Linux](https://baike.baidu.com/item/Linux)或Windows 机器上，也可以实现[虚拟化](https://baike.baidu.com/item/虚拟化/547949)。容器是完全使用[沙箱](https://baike.baidu.com/item/沙箱/393318)机制，相互之间不会有任何接口。

 gdm是Linux的[图形界面](https://www.baidu.com/s?wd=图形界面&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)
GDM (The GNOME Display Manager)是GNOME显示环境的管理器，并被用来替代原来的X Display Manager。与其竞争者(X3DM,KDM,WDM)不同，GDM是完全重写的，并不包含任何XDM的代码。GDM可以运行并管理本地和[远程登录](https://www.baidu.com/s?wd=远程登录&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的X服务器(通过XDMCP)。gdm仅仅是一个脚本，实际上是通过他来运行GDM二进制可执行文件。gdm-stop是用来迅速终止当前正在运行的gdm守护进程的一个脚本。gdm-restart脚本将迅速重启当前守护进程。然而gdm-safe-restart会当所有人都注销后再重启。gdmsetup是一种可以很简单的修改多数常用选项的图形化界面工具。GNOM的帮助里有更完整的文档，在“应用程序”/“系统工具”这一章节。 



修改c++编译标准只能在makefile里面 gcc -std=c99 -o xx xx.c 



# The system is running in low-graphics mode时解决方法

1. df -h
2. cd /etc/X11
3. sudo cp xorg.conf.failsafe xorg.conf
4. sudo reboot

命令1：getconf LONG_BIT
结果：64

命令2：uname -a
结果：Linux Test004MUJUP 2.6.32-431.23.3.el6.x86_64 #1 SMP Wed Jul 16 06:12:23 EDT 2014 x86_64 x86_64 x86_64 GNU/Linux

命令3：uname -r
结果：2.6.32-431.23.3.el6.x86_64

命令4：cat /proc/version
结果：Linux version 2.6.32-431.23.3.el6.x86_64 (mockbuild@x86-027.build.eng.bos.redhat.com) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-4) (GCC) ) #1 SMP Wed Jul 16 06:12:23 EDT 2014



# chroot: failed to run command `/bin/bash': No such file or directory

缺少依赖，lib和lib64、sbin虽然是软链接，但是chroot后路径会变化

 https://www.bbsmax.com/A/pRdBB4vDdn/ 



# linux 上删除所有的无效文件链接

## linux删除文件夹软链接

 (2018-09-02 00:00:29)

错误：rm dirname/ 

正确：rm dirname --> 只删除链接文件夹，元文件夹不变



# [shell之列表的定义与循环](https://www.cnblogs.com/zyy98877/p/10234527.html)



 https://cloud.tencent.com/developer/ask/92780 