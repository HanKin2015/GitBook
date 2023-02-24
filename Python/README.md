# python学习笔记

Pythonic: python化、python风格

# python2.x

2020年1月1日停止更新python2.x。

# 学习预告
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

## 资料
https://blog.csdn.net/lys_828/article/list/2?t=1
阿里巴巴淘宝镜像网站：

## 有趣的小发现，在多文件夹路径下的原位置重命名文件
很有意思，写代码时需要注意
https://blog.csdn.net/lys_828/article/details/107843255

## 
```
import os
import shutil

os.remove(path)   #删除文件
os.removedirs(path)   #删除空文件夹

shutil.rmtree(path)    #递归删除文件夹
```

https://gitee.com/crossin/easy-py/tree/master
