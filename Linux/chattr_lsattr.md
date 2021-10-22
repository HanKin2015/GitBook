# chattr和lsattr命令

## 1、chattr和chmod的区别
利用chattr锁定文件，防止更改，与chmod这个命令相比，chmod只是改变文件的读写、执行权限，更底层的属性控制是由chattr来改变的。
chattr +i file，可以防止系统中某个(关键)文件被修改，有需要的话，不妨试试。

chattr -i /etc/resolv.conf
加锁：chattr +i /etc/passwd 文件不能删除，不能更改，不能移动
查看加锁： lsattr /etc/passwd 文件加了一个参数 i 表示锁定
解锁：chattr -i /etc/passwd 表示解除

小结：
1.设置有 i 属性的文件，即便是 root 用户，也无法删除和修改数据
2.与chmod这个命令相比，chmod只是改变文件的读写、执行权限，更底层的属性控制是由chattr来改变的
3.只有拥有root权限，才拥有设置chattr的权限

## 2、简介

Linux lsattr命令用于显示文件属性。
用chattr执行改变文件或目录的属性，可执行lsattr指令查询其属性。

Linux chattr命令用于改变文件属性。
这项指令可改变存放在ext2文件系统上的文件或目录属性，这些属性共有以下8种模式：
a：让文件或目录仅供附加用途。
b：不更新文件或目录的最后存取时间。
c：将文件或目录压缩后存放。
d：将文件或目录排除在倾倒操作之外。
i：不得任意更动文件或目录。
s：保密性删除文件或目录。
S：即时更新文件或目录。
u：预防意外删除。





