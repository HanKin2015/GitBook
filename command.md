
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

# memory
du -h -d 1 .
df -h

# process
pidof


# internet
iftop
ifconfig
ipconfig
ip addr


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













































source是一个Shell内置命令，用以在当前上下文中执行某文件中的一组命令。[1]
“当前的上下文”一般指的是在交互式会话中，用户当前敲入命令的那个终端。source命令可简写为一个点（.） 。
一些bash脚本应该使用source 脚本名式的语法运行，而不是直接作为一个可执行脚本运行。例如，如果用户希望通过执行一个包含的cd命令的脚本文件来改变工作目录，或者用户希望执行一个没有执行权限的脚本文件。通过文件名直接运行的脚本会运行在子Shell中，而不是当前的上下文中。
————————————————
版权声明：本文为CSDN博主「小旋锋」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wwwdc1012/article/details/78666793