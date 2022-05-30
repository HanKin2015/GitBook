# 机器学习算法

## 1、xgboost
pip install xgboost

## 2、lightgbm
pip install lightgbm

### 无法启动此程序，丢失api-ms-win-core-winrt-string-l1-1-0.dll。尝试重新安装该程序以解决此问题。
everything检查确实没有 api-ms-win-core-winrt-string-l1-1-0.dll和api-ms-win-core-winrt-l1-1-0.dll库。

解决办法：
在 https://cn.dll-files.com/ 网站上下载这两个库，并将其放入C:\Windows\System32和C:\Windows\SysWOW64目录下，然后再次运行 xwalk，问题解决。

注：这个问题在自己的Windows10上并不存在。

### 下载后报错：OSError: [WinError 193] %1 不是有效的 Win32 应用程序。
特意还是要VS的工具检查了一下dll文件的位数：
C:\Program Files (x86)\Microsoft Visual Studio\2019\Community>dumpbin /headers C:\Windows\System32\api-ms-win-core-winrt-string-l1-1-0.dll
通过VS的文件夹可以找到DOS窗口。

位数没有错，确实一直在查找32位的dll文件。
参考：https://blog.csdn.net/m0_52583356/article/details/123291924
再发现我使用pip安装的lightgbm，但是却使用的是anaconda里面的。
果断使用conda命令安装：conda install lightgbm。
运行成功。并且并没有报错缺少什么dll文件。并且与api-ms-win-core-winrt-string-l1-1-0.dll文件有无无关。

## 3、










