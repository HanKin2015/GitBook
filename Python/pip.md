# pip

## 1、python离线安装包下载地址
https://www.python.org/ftp/python/
清华：https://pypi.tuna.tsinghua.edu.cn/simple
阿里云：http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
华中理工大学：http://pypi.hustunique.com/
山东理工大学：http://pypi.sdutlinux.org/

## 2、安装whl文件
直接使用pip install xxx.whl

需要注意查看当前系统能安装支持的版本，否则会报错：xxx.whl is not a supported wheel on this platform


- 升级pip，安装pip.whl可能会报错“Error:could not install packages due to an environmenterror…
Consider using the ‘–user’ option or check the permissions。”，使用--user参数即可，或者使用管理员运行dos窗口
- pip debug --verbose查看当前系统支持的具体版本（Compatible tags）
参考：https://blog.csdn.net/happywlg123/article/details/107281936

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

