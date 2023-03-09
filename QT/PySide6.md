# PySide6详细中文教程
https://www.perfcode.com/p/pyside6

## 1、安装
pip install pyside6

不摆了，默认安装了6.4.2版本，由于当前环境是win7系统，然后自动安装后缺少各种各样的dll文件。
```
(base) D:\Github\Storage\python\study\托盘>python test.py
Traceback (most recent call last):
  File "test.py", line 18, in <module>
    import PySide6.QtCore
ImportError: DLL load failed: 找不到指定的模块。
```
使用depends.exe软件查看文件依赖问题，C:\Users\Administrator\Anaconda3\Lib\site-packages\PySide6\*.pyd。
然后就是首先缺少shiboken6库的问题，明明安装却找不到，重启电脑解决。
然后就是各种各样的运行库文件，根本无法填补。

最后想到可能是版本太新的问题导致，最终降到6.0.1版本试试：
```
pip uninstall pyside6
pip install pyside6==6.0.1

pip list
pip uninstall pyside6-addons
pip uninstall  pySide6-essentials

可能在卸载上面的东西时又把pyside6的卸载掉了，需要重新卸载安装pyside6
```
然后运行就没有问题了。

## 2、系统托盘无法实现导致我放弃PySide6

## 3、PyQt、PySide、PySide2这三者到底有什么区别？
https://blog.csdn.net/luoyayun361/article/details/99281515

## 4、PyQt和PySide这两个项目目前的开发状况如何，有什么区别或者优劣之分？
https://www.zhihu.com/question/21237276

优劣的话，个人认为主要还是体现在项目成熟性和协议。PyQt是GPLv3协议，大意是你的程序中用了它，你的程序就要开源，如果闭源商用就会违反协议（后果自负，脸皮够厚无所谓）。除非你搞封装动态加载那一套来强行规避。
PySide是LGPL协议，如果你只是作为库用用它，你的程序还是可以闭源商用。所以很多人喜欢PySide。

如果不做商业项目，强烈建议使用PyQt，资料多，稳定。需要开发闭源商用软件的就用PySide。

https://www.iteye.com/blog/zhongwei-leg-753459
PyQt 是商业及 GPL 的版权， 而 PySide 是 LGPL.
也就是如果使用 PyQt 做商业应用的话就需要付费， 而使用 Nokia 的 PySide 则不需要。









