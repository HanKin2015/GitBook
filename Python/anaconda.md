# anaconda

## 1、利用conda升级Anaconda及其包
以管理员身份启动Anaconda Prompt： 

升级conda(升级Anaconda前需要先升级conda)：conda update conda 
升级anaconda：conda update anaconda 
升级spyder：conda update spyder
更新所有包：conda update --all
安装包：conda install package
更新包：conda update package

查询某个conda指令使用-h后缀，如conda update -h

## 2、有时候conda没有搜索到包
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

## 3、安装
官网：https://www.anaconda.com/
个人版才是免费的，发现新版本下载只有收费版本。

distribution，没有individuation版本。
后面发现地址：https://repo.anaconda.com/archive/

## 4、配置镜像源
找到.condarc文件的位置: conda config --show-sources
查看anaconda中已经存在的镜像源: conda config --show channels
添加镜像源(永久添加):
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
设置搜索时显示通道地址: conda config --set show_channel_urls yes
若不想按照上述步骤添加镜像，可使用以下命令直接指定安装时使用的镜像地址(以opencv为例)：
conda install opencv -c https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/

## 5、当使用conda命令进行更新包的时候会失败，一直卡在更新中
```
(base) D:\Github\Storage\qt\python\PyQt中文教程\对话框>conda install pyside6
Collecting package metadata (current_repodata.json): done
Solving environment: failed with initial frozen solve. Retrying with flexible solve.
Solving environment: failed with repodata from current_repodata.json, will retry with next repodata source.

CondaError: KeyboardInterrupt
```
参考：https://zhuanlan.zhihu.com/p/504206858
出现该问题的原因有可能是镜像源的http与https的识别错误，
亲测才是最有效的：
1、在路径C:\Users\Administrator下找到文件“.condarc”
2、右键".condarc"->用记事本打开->Ctrl+A->DEL->删除所有内容
3、复制以下内容到文件中，进行替换，保存即可
```
ssl_verify: true
channels:
    - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/win-64/
    - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64
show_channel_urls: true
```
注意ssl_verify要是true，同时网址必须是http而不是https

但是，看着好像是下载成功了，还是会报其他的错误：
```
failed with repodata from current_repodata.json, will retry with next repodata source.
```
https://blog.csdn.net/kaede_xiao/article/details/129114479
https://www.jianshu.com/p/4c7b9127cf83
https://blog.51cto.com/u_16175443/6779019

真的难受，更新就是卡住不动，还是老老实实重新安装anaconda来的快些。
https://www.anaconda.com/

结果还是存在坑，win7不支持新版本的anaconda，需要下载老版本。
https://betheme.net/houduan/196685.html?action=onClick
https://zhuanlan.zhihu.com/p/616300447
更新完后就ok了，这样python就升级到了3.8.8，这样就可以使用f-string的新语法了。因此，win7支持的最高版本是python3.8。