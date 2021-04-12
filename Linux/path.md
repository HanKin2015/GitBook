# environment环境变量
Windows下path是exe文件的环境变量
linux下PATH也是脚本的环境变量

但是，在linux下还有一种也称为环境变量，全局变量
如使用env命令可查看

## 1、为什么修改LD_LIBRARY_PATH呢
因为运行时动态库的搜索路径的先后顺序是：
1.编译目标代码时指定的动态库搜索路径；
2.环境变量LD_LIBRARY_PATH指定的动态库搜索路径；
3.配置文件/etc/ld.so.conf中指定的动态库搜索路径；
4.默认的动态库搜索路径/lib和/usr/lib；

这个顺序是compile gcc时写在程序内的，通常软件源代码自带的动态库不会太多，而我们的/lib和/usr/lib只有root权限才可以修改，而且配置文件/etc/ld.so.conf也是root的事情，我们只好对LD_LIBRARY_PATH进行操作啦。

永久性添加
每次我使用该软件都需要临时修改库文件，因为上面的方法是临时设置环境变量 LD_LIBRARY_PATH ，重启或打开新的 Shell 之后，一切设置将不复存在。

为了让这种方法更完美一些，可以将该 LD_LIBRARY_PATH 的 export 语句写到系统文件中，例如 /etc/profile、/etc/export、~/.bashrc 或者 ~/.bash_profile 等等，取决于你正在使用的操作系统咯。

linux下修改的所有文件如果要立即生效，请使用命令：source .

## 2、env命令


C++调用C
func(func, n)???










