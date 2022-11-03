# chattr和lsattr命令

## 1、chattr和chmod的区别
利用chattr锁定文件，防止更改，与chmod这个命令相比，chmod只是改变文件的读写、执行权限，更底层的属性控制是由chattr来改变的。

实战可以使用：
chattr +i file，可以防止系统中某个(关键)文件被修改。
chmod 444 file, 设置为只读文件

但是chmod的文件可以通过vim命令，然后使用q!强制修改。但是chattr的文件强制修改保存后实际上文件内容不改变。

## 2、文件只读属性
chattr -i /etc/resolv.conf
加锁：chattr +i /etc/passwd 文件不能删除，不能更改，不能移动
查看加锁： lsattr /etc/passwd 文件加了一个参数 i 表示锁定
解锁：chattr -i /etc/passwd 表示解除

小结：
1.设置有 i 属性的文件，即便是 root 用户，也无法删除和修改数据
2.与chmod这个命令相比，chmod只是改变文件的读写、执行权限，更底层的属性控制是由chattr来改变的
3.只有拥有root权限，才拥有设置chattr的权限

## 3、简介
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

## 4、文件的隐藏属性
linux下没有隐藏文件属性这个概念，凡是以 . 开头的文件或目录，比如 .bashrc ，都是隐藏的，用 ls看不到，必须用 ls -a l或ll才能看到。

让他们转换状态，就是重命名文件……
比如说有个.a文件,用ls -a或ll 找到它,之后用命令 mv .a a 就可以了！

其实在Linux中还有几个文件的隐藏属性，文件的隐藏属性通过chattr这个命令进行操作。不过这边需要提醒的是chattr这个命令只能在ext2、ext3、ext4的Linux文件系统中完全生效。

```
https://www.cnpython.com/qa/353342

import subprocess

def is_immutable(fname):
    p = subprocess.Popen(['lsattr', fname], bufsize=1, stdout=subprocess.PIPE)
    data, _ = p.communicate()
    #print(data)
    return 'i' in data

def is_immutable_safe(file_path):
    """Check if the immutable flag is set on a Linux file path

    Uses the lsattr command, and assumes that the immutable flag
    appears in the first 16 characters of its output.
    """
    return 'i' in subprocess.check_output(['lsattr', file_path])[:16]

# These assertions will pass if the immutable bit is not set on
# /etc/inittab on your system
assert is_immutable('/etc/inittab') is True
assert is_immutable_safe('/etc/inittab') is False
```

## 5、lsattr: Inappropriate ioctl for device While reading flags
https://serverfault.com/questions/324975/lsattr-inappropriate-ioctl-for-device-while-reading-flags
```
(base) hankin@aifirst-196fa-0:~$ cat /proc/version 
Linux version 3.10.0-1160.42.2.el7.x86_64 (mockbuild@kbuilder.bsys.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC) ) #1 SMP Tue Sep 7 14:49:57 UTC 2021
(base) hankin@aifirst-196fa-0:~$ lsattr result.csv 
lsattr: Inappropriate ioctl for device While reading flags on result.csv
(base) hankin@aifirst-196fa-0:~$ mount | grep home
10.72.1.27:/matrix/data/nfs/aifirst33-aifirst-pvc-85e5b443-3e21-4666-bb74-981db97463ff on /home/hankin type nfs4 (rw,relatime,vers=4.2,rsize=1048576,wsize=1048576,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=10.72.1.34,local_lock=none,addr=10.72.1.27)
(base) hankin@aifirst-196fa-0:~$ stat -f AIFirst_data/train/black/0045bf6cb027267bcf719858de6757af 
  File: "AIFirst_data/train/black/0045bf6cb027267bcf719858de6757af"
    ID: 0        Namelen: 255     Type: nfs
Block size: 1048576    Fundamental block size: 1048576
Blocks: Total: 5240838    Free: 3340328    Available: 3340328
Inodes: Total: 536870464  Free: 534506921
```
果然是nfs格式的文件系统，把文件拷贝到其他格式的文件系统，然后使用lsattr命令就成功了。

Note that for ext4 both user_xattr and acl are enabled by default. This varies for other filesystems.

重新为根目录挂载文件系统属性：
mount -o remount,user_xattr /

## 6、linux下无法删除文件的原因，提示：不允许的操作
当使用rm删除文件和文件夹的时候提示：rm: 无法删除"bash": 不允许的操作

解决方法：

1、查看文件属性
```
lsattr filetodel<br>----ia-------e- filetodel
```
可以看到此文件有-i 和-a属性，此时我们只要将此属性删除掉即可

通过命令 chattr,可以设置文件/文件夹的隐藏属性,来保证文件/文件夹的安全.其中比较重要的参数为i和a.这两个属性只有root用户才可以设置或清除.而通过命令 lsattr 可以查看这些属性.

2、删除属性：
```
chattr -i authorized_keys2
chattr -a authorized_keys2
chattr -u authorized_keys2
```
再次删除该文件，即可正常删除了