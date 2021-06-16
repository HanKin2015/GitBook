# 利用conda升级Anaconda及其包

以管理员身份启动Anaconda Prompt： 

升级conda(升级Anaconda前需要先升级conda)：conda update conda 
升级anaconda：conda update anaconda 
升级spyder：conda update spyder
更新所有包：conda update --all
安装包：conda install package
更新包：conda update package

查询某个conda指令使用-h后缀，如conda update -h


## 有时候conda没有搜索到包
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


