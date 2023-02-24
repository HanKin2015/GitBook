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





