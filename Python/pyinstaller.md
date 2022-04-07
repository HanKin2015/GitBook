# pyinstaller

github开源地址：https://github.com/pyinstaller/pyinstaller

## 1、Windows环境打包：将py文件打包成exe文件
转icon图标网址：http://www.bitbug.net/
安装打包软件：pip install pyinstaller
示例：pyinstaller -F -w -i F:\code\image.ico demo.py
注意：icon可能需要是绝对路径
icon是指定点击的图标，并不是demo中的title。

-F（注意大写）是所有库文件打包成一个exe，-w是不出黑色控制台窗口。
不加-F参数生成一堆文件，但运行快。压缩后比单个exe文件还小一点点。
加-F参数生成一个exe文件，运行起来慢。

如果生成脚本，建议去掉w参数，即pyinstaller -F demo.py


## 2、linux环境使用pyinstaller进行打包

### 2-1、
版本过低：
```
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-2.1] #python3 setup.py install
Traceback (most recent call last):
  File "setup.py", line 18, in <module>
    from PyInstaller import get_version
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-2.1/PyInstaller/__init__.py", line 32, in <module>
    from PyInstaller import compat
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-2.1/PyInstaller/compat.py", line 129
    if sys.maxint > 2L ** 32:
                     ^
SyntaxError: invalid syntax
```

版本过高(需要安装其他包，离线不能采取)：
```
Installing pyi-archive_viewer script to /usr/local/bin
Installing pyi-bindepend script to /usr/local/bin
Installing pyi-grab_version script to /usr/local/bin
Installing pyi-makespec script to /usr/local/bin
Installing pyi-set_version script to /usr/local/bin
Installing pyinstaller script to /usr/local/bin

Installed /usr/local/lib/python3.6/site-packages/PyInstaller-3.3-py3.6.egg
Processing dependencies for PyInstaller==3.3
Searching for macholib>=1.8
Reading https://pypi.python.org/simple/macholib/


^Cinterrupted


[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy] #pip3 install pyinstaller-4.10-py3-none-musllinux_1_1_x86_64.whl
pyinstaller-4.10-py3-none-musllinux_1_1_x86_64.whl is not a supported wheel on this platform.
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy] #pip3 install pyinstaller-4.10-py3-none-manylinux2014_x86_64.whl
pyinstaller-4.10-py3-none-manylinux2014_x86_64.whl is not a supported wheel on this platform.

这种虽然说是不支持的wheel，但是我认为是版本过高有些库不支持导致。
```

### 2-1、报错：You are running PyInstaller as user root. This is not supported.
/usr/local/lib/python3.6/site-packages/PyInstaller-3.0-py3.6.egg/PyInstaller/utils/misc.py
这个文件直接find命令。

教程参考：https://github.com/pyinstaller/pyinstaller/issues/1459

增加return即可。

### 2-2、IndexError: tuple index out of range
在打包python3.6的程序时，会出现“:IndexError: tuple index out of range”的错误。

现阶段pyinstaller还没更新到支持Python3.6及其以上的版本，但是它的development 版本却支持，但是还没有正式发布，可以先把原来的pyinstaller卸载再下载development 版本。

然后就是安装不上，还存在各种各样的问题。

官网目前的版本是3.2.1 只支持到python3.5 ，恰好我用的Anaconda3装的python是3.6版本的。pyinstaller3.3 还没有发行，但是官网源码里有 https://github.com/pyinstaller/pyinstaller 替换 D:\python\Python36-32\Lib\site-packages\PyInstaller 即可 这样就支持python3.6了 不过是开发版，可能还不完善。

后面决定了最简单的方式就是安装python3.5.9版本就一切解决。

### 2-3、can't find module 'encodings'
```
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/dist] #./upan_auto_copy_read
Fatal Python error: Py_Initialize: Unable to get the locale encoding
zipimport.ZipImportError: can't find module 'encodings'

Current thread 0x00007f20e894e700 (most recent call first):
已放弃
```

编辑了一个测试文件后也是报这个错误。
```
#!/usr/bin/python3
 
# 第一个注释
print ("Hello, Python!") # 第二个注释
```

网上的解决方案：升级pyinstaller 到 3.4。

坑爹啊！！！

### 2-4、那我就直接升级到高版本的pyinstaller吧
安装macholib
Collecting altgraph>=0.15 (from macholib==1.16)

安装altgraph

安装pefile

安装future

还是不行，都已经是配置3.6了。
### 2-5、迷茫
现在陷入迷茫状态。

参考：https://techglimpse.com/error-executing-python3-5-command-solution/

```
export PYTHONHOME=/usr/local/lib/python3.5/
export PYTHONPATH=/usr/local/lib/python3.5/

unset PYTHONHOME
unset PYTHONPATH


[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy] #pyinstaller
Traceback (most recent call last):
  File "/usr/local/bin/pyinstaller", line 6, in <module>
    from pkg_resources import load_entry_point
ImportError: No module named 'pkg_resources'
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #python3 setup.py install
Traceback (most recent call last):
  File "setup.py", line 18, in <module>
    from setuptools import setup
ImportError: No module named 'setuptools'

看到这里，我似乎已经明白了。这个setuptools好像是我python3.9版本安装的。
```

导致pip和pip3命令失效，无果，打算使用apt命令安装python3。

### 2-6、ImportError: No module named 'pip'


### 2-7、出现错误：‘E: 有未能满足的依赖关系。请尝试不指明软件包的名字来运行“apt-get -f install”(也可以指定一个解决办法)’
遇到此类问题，直接在终端输入sudo apt-get --fix-broken install即可解决问题。

### 2-8、Sub-process /usr/bin/dpkg returned an error code (1)
rm -rf /var/lib/dpkg/info
mkdir /var/lib/dpkg/info
apt-get update
apt-get install -f 
apt-get autoremove

花了我整整一天，不晓得明天怎么报告。。。。

然后在ubuntu上面直接打包成功，能正常运行，但是由于xubuntu的gcc版本过低，无法正常运行。
```
root@debian-hankin:~/hejian/kernel/debian8/extract/usr/src# ./upan_auto_copy_read
[10057] Error loading Python lib '/tmp/_MEIwfyAk3/libpython3.6m.so.1.0': dlopen: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.25' not found (required by /tmp/_MEIwfyAk3/libpython3.6m.so.1.0)
```

放弃，猜测可能是python版本安装太多导致，但是我也基本上卸载干净，就是弄不成功。

PYTHONHOME这个变量有毒，不能进行设置，设置后会有各种各样的问题。

## 3、PYTHONHOME变量
1，PYTHONHOME，顾名思义，Python的“家”，即Python的安装路径和标准库所在的路径。不需要开发者自己设置。

2，PYTHONPATH，默认的Python模块搜索路径，它的格式和系统PATH是一样的，需要开发者自己设置
用sys.path可以查出PYTHONHOME和PYTHONPATH，可以看到里面有当前路径、PYTHONPATH，当前用户路径(user)，PYTHONHOME。
```
python3
import sys
sys.path
```



















