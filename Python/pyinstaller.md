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
注：多个py文件只需要打包主文件即可

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

3，PYTHONHASHSEED，如果该环境变量被设定为 random ，相当于 -R 命令行参数。 Python 会用一个随机的种子来生成 str/bytes/datetime 对象的 hash 值。 如果该环境变量被设定为一个数字，它就被当作一个固定的种子来生成 str/bytes/datetime 对象的 hash 值。在深度学习模型训练中，为了在同样的数据集上获得可复现的训练结果，通常把该值设定为一个固定值。

```
python3
import sys
sys.path

可以通过设置和不设置进行对比，发现值真的有所变化。
```

官方文档解释：https://askingthelot.com/what-is-pythonhome/

## 4、能不能直接在windows下打包成linux下可执行文件
需要到linux下用pyinstaller打包。
windows 10（1607以上）安装bash支持，windows 10以下，安装虚拟机跑linux。

## 5、pyinstaller打包exe加入版本和版权信息
1.先取得一个标准的windows 电脑软件的版本信息文件
```
pyi-grab_version.exe upan_auto_copy.exe file_version_info.txt
```
pyi-grab_version.exe是pyinstaller自带的一个工具，用于获得其他.exe程序的版本信息文件，版本信息文件里面包括公司名，程序内部名称版本号之类，然后再把这个信息里面的相关信息更改成你想要的信息，再使用pyinstaller --version-file=ver_file 参数的把版本信息注射到.exe中去。

其中注意因为这个版本信息是严格的数据结构，所以最好不要随意修改，有可能导致版本信息文件失效，推荐使用是notepad++更改。

2.修改产生的版本信息文件(file_version_info.txt)就在程序的当前目录下，生成单个exe或整包工程文件都可以用(by navy)，更改好版本信息文件之后就可以开始使用了

3.选取一个喜欢.ico文件，作为自己软件的图标，打包进exe中，实际操作时发现有bug，需要把exe复制到其他目录才能正常显示图标。
```
pyinstaller.exe --version-file=doc/file_version_info.txt -i doc/dog.ico -F upan_auto_copy.py
```

## 6、pyinstaller中的spec文件
1.可以在官网了解一下
简单介绍：
通过pyi-makespec name.py命令来生成一个自定义的spec文件
```
# -*- mode: python -*-
block_cipher = None
a = Analysis(['name.py'],
             pathex=['D:\\ME'],
             binaries=[],
             datas=[],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='name',
          debug=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               name='name')
```
spec文件分为Analysis, pyz, exe, coll四个部分
①Analysis:首先是需要打包的py文件，通过一个字符串列表储存；然后是py文件的路径；datas是需要引用的文件（图片等）
②exe：要生成exe文件时，name是exe文件的名字， console是是否在打开exe文件时打开命令框
③coll：收集前三个部分的内容进行整合
pyinstaller通过最开始生成的spec文件进行打包，也可以自定义spec文件后，使用pyinstaller -F name.spec命令来打包

2.打包后的spec文件
如果使用了--add-data命令后， 在Analysis中的datas中出现引用的图片的名称;使用-i 命令后，在exe在最后会出现icon = 图标名。
注意：使用--add-data命令时，使用方式如：--add-data 图片名；位置（同一目录下可以用.）
该命令可以打包使用绝对路径引用的图片，但一旦通过该路径找不到图片时即会报错（如在其他电脑上打开exe文件，原路径上图片删除或转移）

## 7、与你运行的windows版本不兼容
用python写的脚本，打包成exe可执行程序，放到其他的windows上去执行，有的是可以执行成功，有的却是失败。

发现自己的python开发环境是64位Windows操作系统，python编译环境也是64位，所以打包的软件也自然是64位的，将之放到32位环境下执行，显然出现这种报错是必然的。

总之，64位程序无法在32位系统上面运行。

## 8、文件版本信息永远是1.0.0.1
不明白为啥file_version_info.txt文件版本信息只能修改filevers参数，而产品版本则是修改ProductVersion参数，很奇怪。

## 9、打包图标只能是ico格式

## 10、打包报错hook-zmq.py 'utf-8' codec can't decode byte 0xce in position 89: invalid continuation by
https://blog.csdn.net/itnerd/article/details/103498853

修改C:\Users\Administrator\Anaconda3\Lib\site-packages\PyInstaller\compat.py 431行，增加：
```
out = out.decode(encoding, errors='ignore')
```

## 11、pyqt5打包过大
打出来居然有326MB，并且软件启动很慢。

尝试使用pipenv打包：

### 报错：AttributeError: 'AnsiToWin32' object has no attribute 'fileno'
解决方法：https://github.com/pypa/pipenv/issues/5560
pip install pipenv==2022.11.30

### 报错：Creating virtual environment...PermissionError: [Errno 13] Permission denied: 'C:\\Users\\Administrator\\.virtualenvs\\Administrator-S9WHhKuh\\Scripts\\python.exe'
这个问题解决不了。。。

pipenv --venv 获取当前venv
pipenv shell
pipenv --python "C:\\Users\\Administrator\\.virtualenvs\\k-ykYYjHD4\\Scripts\\python.exe"

放弃。

### Python利用conda创建新环境，以及利用Pyinstaller打包exe文件
https://zhuanlan.zhihu.com/p/507865434
看到结论200MB就OK了。

### 找到一个详细博主教程
https://www.cnblogs.com/strides/p/16422602.html

### 发现numpy是大头
使用D:\Github\Storage\qt\python\usb_camera_monitor_tool\tool.py文件获取了pip list的所有第三方库，然后在D:\Github\Storage\qt\python\usb_camera_monitor_tool\usb_camera_monitor_tool.spec文件中排除了这些所有库。
意料之中肯定运行不了，大约也有74MB的大小，然后添加numpy库后达到273MB的大小，一个numpy库占到了200MB左右的大小。。。。。

所有文件都没有引入numpy库，但是却要往里面打包加入，很是让人费解。

我发现：
```
import math
import operator
from functools import reduce
import cv2
```
删除了以上这些库打包成72.4MB就可以正常运行了，这些库只是引入了但是代码中并没有使用，继续探寻具体是哪一个库造成的。
正常：
```
import math
import operator
from functools import reduce
```
异常：
```
import cv2
```
很说明问题，就是cv2这个库导致的。

### 依赖cv2的python项目需要打包成exe,但是它太大了
chatGPT的回答：
打包成exe文件时，cv2库的体积较大，这是因为cv2库依赖于许多底层的C++库，所以无法避免。但是，可以尝试通过以下几种方法来减小exe文件的体积：

只打包项目需要的cv2模块：可以使用PyInstaller等打包工具，通过--exclude-module参数排除掉cv2库中不需要的模块，只打包项目中需要的模块。例如，如果项目只需要cv2中的视频捕获模块，可以使用以下命令打包：
```
pyinstaller --exclude-module numpy --exclude-module tkinter --exclude-module PyQt5 --exclude-module PyQt5.QtGui --exclude-module PyQt5.QtCore --exclude-module PyQt5.QtWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtPrintSupport --exclude-module PyQt5.QtSvg --exclude-module PyQt5.QtNetwork --exclude-module PyQt5.QtSql --exclude-module PyQt5.QtXml --exclude-module PyQt5.QtOpenGL --exclude-module PyQt5.QtMultimedia --exclude-module PyQt5.QtMultimediaWidgets --exclude-module PyQt5.QtPositioning --exclude-module PyQt5.QtQuick --exclude-module PyQt5.QtQml --exclude-module PyQt5.QtTest --exclude-module PyQt5.QtBluetooth --exclude-module PyQt5.QtNfc --exclude-module PyQt5.QtSerialPort --exclude-module PyQt5.QtWebSockets --exclude-module PyQt5.QtWebChannel --exclude-module PyQt5.QtWebEngine --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtX11Extras --exclude-module PyQt5.QtWinExtras --exclude-module PyQt5.QtMacExtras --exclude-module PyQt5.QtAndroidExtras --exclude-module PyQt5.QtWebEngineWidgets --exclude-module PyQt5.QtWebEngineCore --exclude-module PyQt5.QtWebChannel -F -w -i icon.ico main.py
```
在上面的命令中，我们排除了许多不需要的模块，只打包了项目中需要的cv2模块。
根据答案命令确实只有29.7MB了，但是运行失败：
```
D:\Github\Storage\python\图片处理\比较两张图片\dist>identify_black_white_image_optimize.exe
ImportError: numpy.core.multiarray failed to import
Traceback (most recent call last):
  File "identify_black_white_image_optimize.py", line 12, in <module>
  File "c:\users\administrator\anaconda3\lib\site-packages\PyInstaller\loader\pyimod03_importers.py", line 623, in exec
module
    exec(bytecode, module.__dict__)
  File "site-packages\cv2\__init__.py", line 5, in <module>
ImportError: numpy.core.multiarray failed to import
[6156] Failed to execute script identify_black_white_image_optimize
```
去掉numpy之后又回到了241MB，看来这问题是没法解决的。

使用PyOxidizer：PyOxidizer是一个新型的Python打包工具，它可以将Python应用程序打包成一个单独的可执行文件，包括Python解释器和所有依赖的库。使用PyOxidizer可以将cv2库打包进可执行文件中，从而减小exe文件的体积。具体使用方法可以参考PyOxidizer的官方文档。

使用虚拟环境：在打包之前，可以使用虚拟环境来减小cv2库的体积。在虚拟环境中只安装项目所需的cv2模块，从而减小依赖库的体积。具体使用方法可以参考Python的虚拟环境文档。

## 12、PyOxidizer

### 12-1、简介
作为打包和分发领域的最新产品之一，PyOxidizer非常有前途。它利用了为Rust编程语言创建的打包工具。

与PyInstaller非常相似，你可以完全控制想要绑定到其中的所有内容，但它也可以允许你执行类似Pex或Shiv的代码。这意味着你可以创建你的包，使它作为一个REPL运行，其中的所有依赖项都已预先安装。

分发一个包括REPL的完整Python环境会产生一些令人兴奋的应用程序，特别是对于需要多个包来进行数据探索的研究团队或科学计算。

与PyInstaller相比的一个优点是，它不是提取到文件系统，而是将自身提取到内存中，从而大大缩短了实际的Python应用程序的启动时间。

这个特性与PyInstaller有类似的缺点。你必须将任何内部引用调整为__file__或类似的操作，因此它们依赖于运行时PyOxidizer配置的环境。

### 12-2、简单使用
PyOxidizer是一个新型的Python打包工具，它可以将Python应用程序打包成一个单独的可执行文件，包括Python解释器和所有依赖的库。下面是一个简单的PyOxidizer使用示例：

安装PyOxidizer
PyOxidizer可以通过pip安装：
```
pip install pyoxidizer
```
创建PyOxidizer项目

在项目的根目录下创建一个名为pyoxidizer.toml的文件，用于配置PyOxidizer项目。例如：
```
[project]
name = "myapp"
version = "0.1.0"

[build]
target = "x86_64-pc-windows-msvc"

[python]
interpreter = "python3"
packages = [
    { name = "numpy", version = "1.20.3" },
    { name = "opencv-python", version = "4.5.3.56" },
]
```
在上面的配置文件中，我们指定了项目的名称和版本号，以及使用的Python解释器和依赖的库。这里使用了numpy和opencv-python两个库作为示例。

构建PyOxidizer项目

在项目的根目录下打开命令行，执行以下命令构建PyOxidizer项目：
```
pyoxidizer build
```
这个命令会下载Python解释器和依赖的库，并将它们打包进一个可执行文件中。构建完成后，在项目的target目录下会生成一个名为myapp的可执行文件。

运行PyOxidizer项目

在命令行中执行生成的可执行文件即可运行PyOxidizer项目：
```
./target/myapp
```
这个命令会启动Python解释器，并执行项目中的代码。

以上是一个简单的PyOxidizer使用示例。PyOxidizer还提供了许多高级功能，例如自定义打包逻辑、交叉编译等等。如果需要了解更多信息，可以参考PyOxidizer的官方文档。

### 12-3、需要rust环境
https://pyoxidizer.readthedocs.io/en/stable/pyoxidizer_getting_started.html

是的，PyOxidizer是基于Rust编程语言开发的，因此在使用PyOxidizer之前需要安装Rust编程环境。
安装Rust的方法因操作系统而异。在Linux和macOS上，可以使用以下命令安装Rust：
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
在Windows上，可以从Rust官网下载安装程序进行安装。

安装完成后，需要运行以下命令来验证Rust是否正确安装：
```
rustc --version
```
如果输出了Rust的版本号，则说明Rust已经成功安装。

需要注意的是，PyOxidizer会自动下载和安装所需的Rust工具链，因此不需要手动安装任何Rust工具链。但是，为了能够成功构建PyOxidizer项目，需要确保系统中已经安装了正确版本的Rust编程环境。

然而并没有，需要单独下载rust。

### 12-4、报错：error: unable to find PyOxidizer config file at .
可能就是缺乏rust环境。
PyOxidizer is a Rust application and requires Rust (1.61 or newer) to be installed in order to build PyOxidizer.

下载rustup-init.exe：https://www.rust-lang.org/learn/get-started
虽然安装文件只有9.53MB，然而安装的时候还需要225MB左右，还是挺大的。

安装了rust还是不行。。。。。。

### 12-5、pyoxidizer.bzl和pyoxidizer.toml文件区别
pyoxidizer.bzl和pyoxidizer.toml都是用于配置和构建PyOxidizer项目的文件，但它们的作用和使用方式有所不同。

pyoxidizer.toml是一个PyOxidizer项目的配置文件，用于指定项目的名称、版本、依赖库、构建选项等等。它使用TOML格式，可以通过编辑器或文本编辑器进行编辑。通常情况下，我们会在项目的根目录下创建一个名为pyoxidizer.toml的文件，并在其中指定项目的配置信息。

pyoxidizer.bzl是一个Bazel构建文件，用于在Bazel构建系统中使用PyOxidizer。它定义了一个名为pyoxidizer_binary的Bazel规则，用于构建PyOxidizer项目。通常情况下，我们会在Bazel项目的构建文件中引入pyoxidizer.bzl文件，并使用pyoxidizer_binary规则构建PyOxidizer项目。

需要注意的是，pyoxidizer.toml和pyoxidizer.bzl都是可选的文件，您可以根据具体需求选择是否使用它们。如果您只需要使用PyOxidizer的命令行工具构建项目，可以只使用pyoxidizer.toml文件；如果您需要在Bazel构建系统中使用PyOxidizer，可以使用pyoxidizer.bzl文件。

### 12-6、怎么搞都不成功，哎，已放弃，还是老老实实选择pyinstaller吧
一个用Rust编写的新项目旨在使Python应用程序作为独立的二进制可执行文件进行打包和发布变得更加容易--这一直是Python开发人员的痛点。

PyOxidizer，根据其GitHub README，是 "一个Rust crates的集合，便于构建包含Python解释器的库和二进制文件"。它的开发者声称，有了PyOxidizer，就可以为一个嵌入了Python解释器的Python应用构建一个可执行文件，而没有其他的运行时依赖。

PyOxidizer需要安装Rust 1.31或更高版本，并且只打包使用Python 3.7编写的应用程序。要使用PyOxidizer，开发者需要创建一个TOML文件，描述如何嵌入特定的Python应用程序，然后通过指向该TOML文件的环境变量构建并运行PyOxidizer。

PyOxidizer与其他打包解决方案不同，它使用的是Python解释器的自定义构建，旨在静态链接并嵌入到另一个程序。其他解决方案，如PyInstaller，重新分配现有的CPython .DLL--方便且兼容，但不是很灵活。PyOxidizer也将Python应用程序的字节码打包到可执行镜像中，并直接从内存中加载（快速），而不是从文件系统中加载（较慢）。

不过，与PyInstaller一样，PyOxidizer并没有对Python代码进行任何优化。另一个项目，Nuitka，不仅将Python应用程序编译为独立的可执行文件，而且还试图对编译后的代码进行性能优化。然而，Nuitka仍被认为是一个测试级别的项目，许多预期的性能改进还没有实现。

PyOxidizer本身仍是一个非常早期的项目。它只能生成Linux二进制文件，因为它所依赖的上游项目之一，即CPython的可嵌入版本，目前仅在Linux构建中可用。

## 12-7、Fatal Python error: initfsencoding: unable to load the file system codec
还把python环境弄坏了。
原来是我在下载的缺失库文件导致，删除api-ms-win-core-path-l1-1-0.dll即可。

## 13、Nuitka
Nuitka是一个用于编译Python代码的工具，可以将Python代码编译为C语言代码，并生成可执行文件。下面是使用Nuitka的一些步骤：

安装Nuitka
您可以从官方网站下载适用于您操作系统的Nuitka安装包，并按照提示进行安装。在安装过程中，您可以选择是否安装Nuitka的依赖项，例如Python解释器、C编译器等等。

编写Python代码
使用任何您喜欢的文本编辑器编写Python代码。需要注意的是，Nuitka在编译Python代码时需要一些特殊的注释和语法，以便正确地转换Python代码为C语言代码。具体语法和注释请参考Nuitka的官方文档。

编译Python代码
使用以下命令编译Python代码：

nuitka --standalone --recurse-all your_script.py
其中，--standalone选项表示生成独立的可执行文件，不需要依赖于Python解释器；--recurse-all选项表示递归地编译所有依赖的Python模块。

运行生成的可执行文件
在编译完成后，会生成一个名为your_script.exe的可执行文件。您可以通过以下命令运行它：

./your_script.exe
需要注意的是，由于Nuitka是一个第三方工具，可能会存在一些兼容性和稳定性问题。如果您遇到任何问题，请参考Nuitka的官方文档或者在社区中寻求帮助。

## 14、获取python项目的依赖包和对应版本号，生成requirements.txt文件
1、先安装pipreqs库
pip install pipreqs -i http://pypi.douban.com/simple --trusted-host pypi.douban.com

2、进入项目目录，使用以下命令生成
```
pipreqs ./
会报错：
UnicodeDecodeError: 'gbk' codec can't decode byte 0x87 in position 32: illegal multibyte sequence

pipreqs ./ --encoding=utf8
还是会报错：
requests.exceptions.ConnectionError: HTTPSConnectionPool(host='pypi.org', port=443): Max retries exceeded with url: /pypi/pillow/json (Caused by NewConnectionError('<urllib3.connection.VerifiedHTTPSCo
nnection object at 0x0000000003938E48>: Failed to establish a new connection: [WinError 10060] 由于连接方在一段时间后没有正确答复或连接的主机没有反应，连接尝试失败。'))

正确方式：
pipreqs ./ --encoding=utf8 --force
```

3、生成的requements.txt文件内容类似下图
使用中发现会有些依赖包的信息无法自动生成，如pytest-html、pytest-assume，需要手动添加进去，可不用添加版本号。

4、使用requirements.txt文件
迁移项目后就不需要逐个pip安装依赖包了，使用以下命令一次安装依赖包
```
pip install -r requirements.txt -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
```

## 15、使用docker环境打包
居然从900MB到30MB，pipenv居然也要200MB。
https://blog.csdn.net/weixin_44424296/article/details/112078218

这个方法后面有时间可以进行尝试。

## 16、conda环境进行打包
https://zhuanlan.zhihu.com/p/507865434

## 17、使用pipenv环境打包
https://blog.csdn.net/m0_37188294/article/details/115619510

包含库文件后exe的大概大小：https://wenku.baidu.com/view/5864e46a28160b4e767f5acfa1c7aa00b52a9d32.html?_wkts_=1678755240712&bdQuery=pyqt5+%E6%89%93%E5%8C%85%E8%BF%87%E5%A4%A7

## 18、使用upx进行压缩
https://upx.github.io/

下载文件后解压放在一个目录，然后直接使用命令即可。
pyinstaller office_assistant.spec --upx-dir="D:\upx-4.0.2-win64"

最终还是逃不过numpy库。
使用upx后，从318MB降到了219MB。
另外一个文件从249MB降到了155MB。

但是存在一个问题，报错qt.qpa.plugin: Could not find the Qt platform plugin "windows" in "" This ap
解决方式：http://hk.aiuxian.com/article/p-dmovcgyq-mc.html

使用 PyInstaller 打包的可执行文件，如果使用了 UPX 压缩，可能会出现依赖 Qt 插件的情况。这是因为 UPX 压缩会将可执行文件中的一些动态链接库压缩，导致运行时无法找到这些库。

如果你的 PyInstaller 打包的可执行文件依赖 Qt 插件，可以尝试以下解决方法：
- 不使用 UPX 压缩，或者使用 UPX 的 --lzma 选项，这样可以避免压缩 Qt 插件。
- 将 Qt 插件打包到可执行文件中，可以使用 PyInstaller 的 --add-data 选项将 Qt 插件打包到可执行文件中。
- 将 Qt 插件放到可执行文件同级目录下，这样可执行文件就可以找到 Qt 插件。

需要注意的是，不同的操作系统和 Qt 版本可能需要不同的 Qt 插件，需要根据实际情况选择正确的 Qt 插件。

将生成exe拷贝到upx文件夹，然后执行命令upx.exe office_assistant.exe搞笑的吧，就压缩了一点点。

## 19、python pyusb 打包exe 报错
在调试pyusb时，发现直接python scripts.py可以正常运行，但是打包成exe，即经过了pyinstaller -F scripts.py ./scripts.exe运行就失败，提示错误是
````
usb.core.NoBackendError: No backend available.
```

不过我如何的写libusb-1.0.dll文件的路径，就是找不到这个文件。

最终解决方案：
将libusb-1.0.dll文件拷贝到C:\Windows\System32目录下，并且可以在py文件中直接调用libusb接口，并不需要进行backend指定。
这时候打出来的包就是正常的。

## 20、打包成windows安装包
https://blog.csdn.net/xhc6666/article/details/129179497
https://blog.csdn.net/hj960511/article/details/128220877

## 21、虚拟文件打包工具(Enigma Virtual Box)9.50汉化去广告版.exe
从927MB压缩成347MB，效果还行吧。

## 22、20230609
放弃再研究打包问题了，总之一句话，能不使用numpy就不使用numpy，使用了就接受现实。
文件增大了，并且打开速度从原来的8秒也增加到了15秒。

## 23、Failed to execute script 
其实是确认库文件，你会发现很难排查，可以通过去掉w参数，然后在dos窗口执行exe文件即可。

程序中使用了pyzbar库，这个库需要依赖libzbar-64.dll和libiconv.dll文件。因此需要将这个文件C:\Users\Administrator\Anaconda3\Lib\site-packages\pyzbar放在C:\Windows\System32目录下，以及src目录下。

但是为什么没有把这两个文件依赖给打包进去呢？？？
一种方法就是写入py文件里面然后程序还原成dll文件，放入当前环境或者放入C:\Windows\System32目录下。

排查20231220遇到的这个问题，下载Dependency Walker和PE Explorer查看，只看见四个dll文件依赖，使用objdump命令（对于Windows系统，你可以下载MinGW或Cygwin等工具集，它们包含了objdump命令）查看也是这四个dll文件。
```
D:\FTP服务器>objdump -x office_assistant.exe | findstr dll
        DLL Name: USER32.dll
        DLL Name: KERNEL32.dll
        DLL Name: ADVAPI32.dll
        DLL Name: WS2_32.dll
D:\FTP服务器>objdump -p office_assistant.exe | findstr dll
        DLL Name: USER32.dll
        DLL Name: KERNEL32.dll
        DLL Name: ADVAPI32.dll
        DLL Name: WS2_32.dll
```
Dependency Walker工具（DEPENDS.EXE）下载：http://www.dependencywalker.com/
PE Explorer工具（只支持32位程序查看）下载：http://www.pe-explorer.com/
PE Explorer工具（支持64位程序查看）下载：https://github.com/zodiacon/PEExplorerV2

放弃还是去掉w参数老老实实排查问题吧。
之前anaconda重装过，导致好多库缺失，导致exe运行缺失库依赖，先解决这些依赖问题。
没有安装这些依赖之前打包出来才46MB，安装后居然276MB，就四个库安装pyusb、pyzbar、pyqtchart、pyautogui。

但是之前有修改过spec文件，过滤掉部分占用大的无用的库，过滤后还是46MB左右。
命令中使用-w参数关闭dos窗口，spec文件修改console参数为True打开dos窗口。

## 24、打包dll文件进入exe文件中
```
pyinstaller.exe --version-file=doc/file_version_info.txt -i img/office_assistant.ico --add-binary "D:\\Github\\Storage\\qt\\python\\office_assistant\\src\\libzbar-64.dll;." --add-binary "D:\\Github\\Storage\\qt\\python\\office_assistant\\src\\libiconv.dll;." -F src/office_assistant.py
```

另外可以通过修改spec文件配置：
```
binaries=[('D:\\Github\\Storage\\qt\\python\\office_assistant\\src\\libzbar-64.dll', '.'), ('D:\\Github\\Storage\\qt\\python\\office_assistant\\src\\libiconv.dll', '.')],
```

## 25、Pyinstaller打包后运行，程序一闪而过，正常运行退出了
```
import os

#原始代码
...
os.system("pause")
```



