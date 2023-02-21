# 解决离线安装psutil库

## 1、需求
离线安装psutil-5.2.2版本库

## 2、找包
https://pypi.org/project/psutil/5.2.2/#files

发现whl没有linux版本的。
python低版本查看：
32位查看：
>>> import pip
>>> print(pip.pep425tags.get_supported())

64位查看：
>>> import pip._internal
>>> print(pip._internal.pep425tags.get_supported())

只能通过tar.gz源码安装

## 3、缺省gcc
python setup.py build
python setup.py install

```
unable to execute 'gcc': No such file or directory
error: command 'gcc' failed with exit status 1
```
好吧，安装gcc离线包，rpm格式包能正常安装。
rpm -i *.rpm

出现一个奇怪现象，报错找不到xxx.rpm包，但是包就在当前目录下面啊。。。。

单独安装其中一个rpm又是正常安装。

后面尝试使用全路径试试，结果成功了。rpm -i /home/data/hankin/*.rpm

## 4、GLBC版本不匹配
装好时候报错： libc.so.6: version `GLIBC_2.14' not found
strings /lib64/libc.so.6 |grep GLIBC_ 查看目前支持的glibc版本
strings /lib/x86_64-linux-gnu/libc.so.6 | grep GLIBC_

官网： http://www.gnu.org/software/libc/

然鹅安装这个需要make命令

## 5、安装make命令
https://centos.pkgs.org/7/centos-x86_64/make-3.82-24.el7.x86_64.rpm.html

然鹅安装make命令后报错GLBC版本太低，这。。。。。。

陷入了无限循环状态。













