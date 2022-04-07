# pip

## 1、python离线安装包下载地址
https://www.python.org/ftp/python/
清华：https://pypi.tuna.tsinghua.edu.cn/simple
阿里云：http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
华中理工大学：http://pypi.hustunique.com/
山东理工大学：http://pypi.sdutlinux.org/

python第三方库包下载：https://pypi.org/project/pyinstaller/#files

## 2、安装whl文件
直接使用pip install xxx.whl

需要注意查看当前系统能安装支持的版本，否则会报错：xxx.whl is not a supported wheel on this platform

- 升级pip，安装pip.whl可能会报错“Error:could not install packages due to an environmenterror…
Consider using the ‘–user’ option or check the permissions。”，使用--user参数即可，或者使用管理员运行dos窗口
- pip debug --verbose查看当前系统支持的具体版本（Compatible tags）
参考：https://blog.csdn.net/happywlg123/article/details/107281936

在我的xubuntu中上面方法居然不可取。
```
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/pyinstaller-2.0] #pip debug --verbose
Traceback (most recent call last):
  File "/usr/lib/command-not-found", line 27, in <module>
    from CommandNotFound.util import crash_guard
ModuleNotFoundError: No module named 'CommandNotFound'
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/pyinstaller-2.0] #pip3 debug --verbose
ERROR: unknown command "debug"
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/pyinstaller-2.0] #python3
Python 3.6.5 (default, Feb 27 2021, 16:40:34)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import pip
print(pip.pep425tags.get_supported())>>>
[('cp36', 'cp36m', 'manylinux1_x86_64'), ('cp36', 'cp36m', 'linux_x86_64'), ('cp36', 'abi3', 'manylinux1_x86_64'), ('cp36', 'abi3', 'linux_x86_64'), ('cp36', 'none', 'manylinux1_x86_64'), ('cp36', 'none', 'linux_x86_64'), ('cp35', 'abi3', 'manylinux1_x86_64'), ('cp35', 'abi3', 'linux_x86_64'), ('cp34', 'abi3', 'manylinux1_x86_64'), ('cp34', 'abi3', 'linux_x86_64'), ('cp33', 'abi3', 'manylinux1_x86_64'), ('cp33', 'abi3', 'linux_x86_64'), ('cp32', 'abi3', 'manylinux1_x86_64'), ('cp32', 'abi3', 'linux_x86_64'), ('py3', 'none', 'manylinux1_x86_64'), ('py3', 'none', 'linux_x86_64'), ('cp36', 'none', 'any'), ('cp3', 'none', 'any'), ('py36', 'none', 'any'), ('py3', 'none', 'any'), ('py35', 'none', 'any'), ('py34', 'none', 'any'), ('py33', 'none', 'any'), ('py32', 'none', 'any'), ('py31', 'none', 'any'), ('py30', 'none', 'any')]
>>> import pip._internal
print(pip._internal.pep425tags.get_supported())Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'pip._internal'
>>>
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: module 'pip' has no attribute '_internal'
>>>
```

manylinux项目的目标是提供一种方便的方法来分发二进制Python扩展作为Linux上的轮子。这项工作已产生了PEP 513，PEP 571通过定义manylinux2010_x86_64和manylinux2010_i686平台标签进一步增强了该功能。

manylinux tag	Client-side pip version required
manylinux2014	pip >= 19.3
manylinux2010	pip >= 19.3
manylinux1		pip >= 8.1.0

```
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/pyinstaller-2.0] #pip --version
Traceback (most recent call last):
  File "/usr/lib/command-not-found", line 27, in <module>
    from CommandNotFound.util import crash_guard
ModuleNotFoundError: No module named 'CommandNotFound'
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/pyinstaller-2.0] #pip3 --version
pip 9.0.3 from /usr/local/lib/python3.6/site-packages (python 3.6)
```

## 3、pip2和pip3区别
如果系统中只安装了Python3，那么既可以使用pip也可以使用pip3，二者是等价的。
如果系统中同时安装了Python2和Python3，则pip默认给Python2用，pip3指定给Python3用。

## 4、使用pip和conda安装软件时注意
Linux都有个问题，首先需要做的事情是更新安装脚本命令

## 5、pip命令相关操作
更新pip命令
python -m ensurepip
python -m pip install --upgrade pip


pip检测更新
命令：pip list –outdated

pip升级包
命令：pip install --upgrade packagename

pip卸载包
命令：pip uninstall packagename

pip list：显示所有已安装的python包
pip -v list：显示所有已安装的python包的详细信息（安装地址），默认pypi源地址
pip uninstall 包名：卸载python包
pip uninstall 包名 -y：卸载python包时不用再输入参数y表示确定要卸载
pip show 包名：显示安装的python包的详细信息，包括安装路径

## 6、高级进阶之requirements.txt
python项目如何在另一个环境上重新构建项目所需要的运行环境依赖包？

使用的时候边记载是个很麻烦的事情，总会出现遗漏的包的问题，这个时候手动安装也很麻烦，不能确定代码报错的需要安装的包是什么版本。这些问题，requirements.txt都可以解决！

生成requirements.txt，有两种方式：

第一种 适用于 单虚拟环境的情况： 
pip freeze > requirements.txt

第二种 (推荐) 使用 pipreqs ，github地址为： https://github.com/bndr/pipreqs

使用requirements.txt安装依赖的方式：
pip install -r requirements.txt

使用pip help install查看r参数，结果如下：
-r, --requirement <file>    Install from the given requirements file. This option can be used multiple times.

## 7、python第三方包源码包安装
首先要确认本地是使用pip命令还是pip3命令，一般来说pip是安装2.x的安装包，pip3是安装3.x的安装包。
```
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #python setup.py
Traceback (most recent call last):
  File "setup.py", line 18, in <module>
    from setuptools import setup
ImportError: No module named setuptools
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #python pyinstaller.py
Traceback (most recent call last):
  File "pyinstaller.py", line 17, in <module>
    run()
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6/PyInstaller/__main__.py", line 81, in run
    import PyInstaller.building.build_main
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6/PyInstaller/building/build_main.py", line 36, in <module>
    from ..depend import bindepend
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6/PyInstaller/depend/bindepend.py", line 30, in <module>
    from . import dylib, utils
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6/PyInstaller/depend/utils.py", line 29, in <module>
    from ..lib.modulegraph import util, modulegraph
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6/PyInstaller/lib/modulegraph/util.py", line 16, in <module>
    from ._compat import StringIO, BytesIO, get_instructions, _READ_MODE
  File "/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6/PyInstaller/lib/modulegraph/_compat.py", line 23, in <module>
    from dis3 import get_instructions
ImportError: No module named dis3
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #python setup.py install
Traceback (most recent call last):
  File "setup.py", line 18, in <module>
    from setuptools import setup
ImportError: No module named setuptools
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #pip setup.py
Traceback (most recent call last):
  File "/usr/lib/command-not-found", line 27, in <module>
    from CommandNotFound.util import crash_guard
ModuleNotFoundError: No module named 'CommandNotFound'
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #pip setup.py install
Traceback (most recent call last):
  File "/usr/lib/command-not-found", line 27, in <module>
    from CommandNotFound.util import crash_guard
ModuleNotFoundError: No module named 'CommandNotFound'
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #pip
Traceback (most recent call last):
  File "/usr/lib/command-not-found", line 27, in <module>
    from CommandNotFound.util import crash_guard
ModuleNotFoundError: No module named 'CommandNotFound'
[root@ubuntu0006:/media/hankin/vdb/study/upan_auto_copy/PyInstaller-3.6] #pip3

Usage:
  pip <command> [options]

Commands:
  install                     Install packages.
```

准确的安装方式：python3 setup.py install

## 8、安装python3.5.9
教程参考：https://www.linuxprobe.com/linux-python.html

https://www.python.org/ftp/python/3.5.9/Python-3.5.9.tgz
tar xvf Python-3.5.9.tgz
cd Python-3.5.9
./configure
make -j8
make install

搞定。










