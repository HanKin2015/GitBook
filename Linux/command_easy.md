[TOC] 
# 常用的Linux命令（超级简洁版）
匹配串---
文件---text.txt
文件夹


```
# file
find / -name hj.sh
grep -Rn 
df -h
sed -i 's///g' text.txt
tail -f

# other
alas
. hj.sh
ls -l
git clone xxx.git --branch 分支名

# memory
du -h -d 1 .
df -h
free -g
cat /proc/meminfo

# process
pidof


# internet
iftop
ifconfig
ipconfig
ip addr
ifstat


wget
lsusb
usbiptool
iftop
insmod
ethtool eth0
ip addr


adb shell
adb disconnect
adb devices
tail -f
ps -ef|grep vdi
killall
ldd

```


# 偶尔使用cat命令无法正常退出
ctrl + c
ctrl + z
ctrl + j
reset followed by ctrl-j
 pkill -9 -f cat

Linux reset命令其实和 tset 是一同个命令，它的用途是设定终端机的状态。一般而言，这个命令会自动的从环境变数、命令列或是其它的组态档决定目前终端机的型态。如果指定型态是 '?' 的话，这个程序会要求使用者输入终端机的型别。

由于这个程序会将终端机设回原始的状态，除了在 login 时使用外，当系统终端机因为程序不正常执行而进入一些奇怪的状态时，你也可以用它来重设终端机o 例如不小心把二进位档用 cat 指令进到终端机，常会有终端机不再回应键盘输入，或是回应一些奇怪字元的问题。此时就可以用 reset 将终端机回复至原始状态。


# Linux 网络wifi操作常用命令，查看WiFi密码
https://blog.csdn.net/qq_27413937/article/details/99714197




















尾号39d8
尾号应该是c3d7


地址：http://nas.hankin.org:5000/sharing/scvp7oO7i
密码：hankin123



我这边测试几遍，在538R1版本上，两款kvm切换器都能够切换1920x1080分辨率，建议升级到538R1。也测试过541和542版本，分辨率的支持也是一样，但是不建议一下升级跨越太多版本。kvm切换器其中一个能支持7个分辨率，另外一个只支持4个分辨率，但是都有1920x1080分辨率。









研发环境已验证虚拟机打印正常（win7x64系统），我们正在导出虚拟机上传。
下一步计划：
1.用我们的虚拟机：将我们的虚拟机导入客户环境即可。
2.客户的虚拟机：安装我们的驱动也可以。（保证操作系统、驱动与我们研发环境的一致）










当前进展：

200盒子和pc客户端都有写拷贝速度慢问题，pc客户端走磁盘映射正常。

1、排除u盘自身问题
2、排除vdc策略配置
3、排除虚拟机模板问题

下一步计划：

1、换500盒子试试，如果还出现写拷贝速度慢问题，排除客户端问题
2、确认NTFS格式存储器是否对于vmp有日志打印问题
3、














source是一个Shell内置命令，用以在当前上下文中执行某文件中的一组命令。[1]
“当前的上下文”一般指的是在交互式会话中，用户当前敲入命令的那个终端。source命令可简写为一个点（.） 。
一些bash脚本应该使用source 脚本名式的语法运行，而不是直接作为一个可执行脚本运行。例如，如果用户希望通过执行一个包含的cd命令的脚本文件来改变工作目录，或者用户希望执行一个没有执行权限的脚本文件。通过文件名直接运行的脚本会运行在子Shell中，而不是当前的上下文中。
————————————————
版权声明：本文为CSDN博主「小旋锋」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wwwdc1012/article/details/78666793