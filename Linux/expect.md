# expect命令

常常使用scp命令拷贝东西时，需要每次都要输入密码。

一般来说有两种解决办法：
1. 配置ssh秘钥信任
2.使用expect命令


## 在线安装
apt install expect

## 离线安装
https://jaist.dl.sourceforge.net/project/expect/Expect/5.45.4/expect5.45.4.tar.gz
http://core.tcl.tk/tcl/zip/release/tcl.zip

源码安装我们需要下载两个源码包。tcl源码包和expect源码包。


我们需要先编译安装tcl，因为expect包依赖于tcl。

解压压缩包并编译安装tcl　
unzip tcl.zip && cd ./tcl/unix
./configure && make && make install

解压压缩包并编译安装expect.
cd /tmp && tar -xzvf expect5.45.4.tar.gz && cd expect5.45.4/
./configure && make && make install

检查是否安装好(显示安装好的版本号就是已经安装好了)并创建软链接。

expect -v

### 编译的时候可以指定编译安装的位置
./configure --prefix=/home/hejian/expect/out


## 然鹅还是无法使用
export LD_PRELOAD="/data/local/hj/expect/lib/libtcl8.6.so"
newPath=$(pwd)
LD_LIBRARY_PATH=${newPath}:${LD_LIBRARY_PATH}

date: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.14' not found (required by /data/local/hj/expect/lib/libtcl8.6.so)

### 查看GLIBC版本
strings /lib/x86_64-linux-gnu/libc.so.6 | grep GLIBC

放弃。。。


## LD_PRELOAD用法总结

定义与目标函数完全一样的函数，包括名称、变量及类型、返回值及类型等
将包含替换函数的源码编译为动态链接库
通过命令 export LD_PRELOAD="库文件路径"，设置要优先替换动态链接库
如果找不替换库，可以通过 export LD_LIBRARY_PATH=库文件所在目录路径，设置系统查找库的目录
替换结束，要还原函数调用关系，用命令unset LD_PRELOAD 解除
想查询依赖关系，可以用ldd 程序名称
