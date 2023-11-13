# python学习笔记
Pythonic: python化、python风格

## 1、python2.x
2020年1月1日停止更新python2.x。

## 2、学习预告
- 下载：使用you-get
you-get -d 视频网址
youtube-dl

词云学习：https://blog.csdn.net/lys_828/article/details/105200000

```
@echo off
::2016年9月4日 13:36:02 codegay
::you-get配置文件
::本代码另存为g.bat

if "%1" == "" (
    echo you-get配置脚本
    echo 用法：
    echo g url
    echo g https://vimeo.com/181027959
    exit /b 0
    )

set outputdir="D:/迅雷下载"

::操SB GFW
echo "%1" | findstr /i "youtube vimeo google" && set proxy=--socks-proxy 127.0.0.1:7070
you-get --output-dir %outputdir% %proxy% "%*"
```

## 3、资料
https://blog.csdn.net/lys_828/article/list/2?t=1
阿里巴巴淘宝镜像网站：

## 4、有趣的小发现，在多文件夹路径下的原位置重命名文件
很有意思，写代码时需要注意
https://blog.csdn.net/lys_828/article/details/107843255

## 5、文件或者文件夹删除
```
import os
import shutil

os.remove(path)       #删除文件
os.removedirs(path)   #删除多级空文件夹
os.rmdir(path)        #删除空文件夹

shutil.rmtree(path)   #递归删除文件夹，即：删除非空文件夹
shutil.rmtree(path, ignore_errors=True)
```

[人人都能学Python](https://gitee.com/crossin/easy-py/tree/master)

## 6、低代码
低代码是一种软件开发方法，它使用可视化建模工具和自动化代码生成技术，以减少手动编写代码的工作量。低代码平台通常提供了一系列的预构建组件和模块，使开发人员可以通过简单的拖放操作来创建应用程序。这种方法可以大大加快应用程序的开发速度，减少开发成本，并提高开发人员的生产力。低代码平台通常用于构建企业应用程序、移动应用程序和Web应用程序等。

## 7、索引
深拷贝和浅拷贝：D:\Github\Storage\python\study\others\deep_shallow_copy.py
python中base64库用法详解：https://blog.csdn.net/weixin_44799217/article/details/125949538

## 8、经常开发python一定需要了解的技巧
查看Python库内的函数：dir(math)、help(math)、
访问Python官方文档：https://docs.python.org/3/library/index.html
访问Pandas官方文档：https://pandas.pydata.org/docs/
访问Stack Overflow：https://stackoverflow.com/
访问GitHub：https://github.com/

## 9、使用python开server
我也是后来同事告诉了我这个方法，起因是环境限制了FTP协议需要使用的20和21端口，因此需要使用python开server自主设置端口号即可跳过限制。
```
python -m http.server -b 0.0.0.0 8852

C:\Users\test>telnet 172.22.64.246 20
正在连接172.22.64.246...无法打开到主机的连接。 在端口 20: 连接失败
C:\Users\test>telnet 172.22.64.246 21
正在连接172.22.64.246...无法打开到主机的连接。 在端口 21: 连接失败
C:\Users\test>telnet 172.22.64.246 8852
成功，没有错误提示
```


