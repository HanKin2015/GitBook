# 强大的git bash软件

## 1、功能一
git是程序员必需品，因此git bash也是必需的。

## 2、功能二
git bash是一个不错的Linux终端，可以在Windows下畅所欲言的使用各种bash命令。

这样就无需再去安装其他Linux终端，如。

## 3、升级更新
输入：git update-git-for-windows
使用命令更新下载太慢。

国内镜像站下载：https://github.com/waylau/git-for-win
https://npm.taobao.org/mirrors/git-for-windows/

## 4、中文界面配置
右键-》Options-》Window-》UI language-》zh_CN

## 5、git status显示中文
原因：
在默认设置下，中文文件名在工作区状态输出，中文名不能正确显示，而是显示为八进制的字符编码。

解决办法：
将git 配置文件 core.quotepath项设置为false。
quotepath表示引用路径
加上--global表示全局配置

git bash 终端输入命令：
git config --global core.quotepath false




