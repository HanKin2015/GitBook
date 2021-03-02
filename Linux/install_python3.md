# 安装python3环境

## 查看当前python环境
python --version
python3 --version
ll /usr/bin | grep python
ll /usr/local/bin | grep python

你会发现python3是一个软连接，可以通过改变软连接来切换python3.6或者python3.9

## 安装包
python-3.6.5.tgz

tar zxvf python-3.6.5.tgz
cd python-3.6.5
./configure
make
make install


