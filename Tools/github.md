# 学习github

## 1、github page

总所周知，在github上面搭建网站。

对一个仓库开启github page功能前提工作：
- 一个xxx.github.io网址网站
- 在仓库Settings->Options->Github Pages里面开启，注意有下拉页面

一开始可能显示Your site is ready to be published at https://hankin2015.github.io/learngit/.
这时候是网站在检查仓库的合法性，大概需要等待一段时间

正常可用需要显示为：
Your site is published at https://hankin2015.github.io/learngit/

异常的话会有相关错误提示，有可能还会发邮件通知。

## 2、查看GitHub仓库大小的几种方法
### GitHub自带查看仓库大小的功能（public、private）
登录github网页首页，选择自己账户的settings-》点击repository

### 利用GitHub提供的API查看（public）
https://api.github.com/repos/HanKin2015/MagicTool
其中的size就是仓库大小，单位是kb

### 利用浏览器插件：Enhanced GitHub（public、private）
操作稍微复杂，不推荐

## 3、如何从 GitHub 上下载单个文件夹？
有时候一个github项目太大，如linux：https://github.com/HanKin2015/linux
使用api查看内存大小：https://api.github.com/repos/HanKin2015/linux
3159822kb = 3085mb = 3gb

里面小文件居多，我只想下载其中的dwc2文件夹，只有几十kb，如果下载全部费时。

推荐网页版的gitzip：kinolien.github.io/gitzip/


根本打不开：https://github.dev/
在github仓库界面，然后按一下键盘的句号键即可。

## 4、special repository
HanKin2015/HanKin2015 is a ✨special ✨ repository that you can use to add a README.md to your GitHub profile. Make sure it’s public and initialize it with a README to get started.

建立一个与账户同名的仓库，可以在首页显示。

建立一个github.io后缀的仓库可以建立网站。









