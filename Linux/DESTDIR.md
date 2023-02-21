# DESTDIR: GNU Make中的默认约定

coroutines 2014-11-07 12:08:24  7948  收藏 4
分类专栏： Linux
版权

Linux
专栏收录该内容
34 篇文章1 订阅
订阅专栏
GNU Make中，有许多约定俗成的东西，比如这个DESTDIR：用于加在要安装的文件路径前的一个前缀变量。

比如，我们本地编译了一个第三方库，但需要对其打包发布给其他人使用，一方面如果我们安装到默认目录，比如/usr，这时，安装后的文件一但数量很大，则打包时很难找全；或者我们在configure时指定了--prefix，或cmake时指定了CMAKE_INSTALL_PREFIX，则pc文件内的编译依赖关系又会出错，变成了我们指定的那个路径，使用起来会很不方便。此时，DESTDIR就会派上用场。

DESTDIR只在make install时起作用，且和Makefile是由什么工具生成的没有关系，用法如下：

make install DESTDIR=<$CUSTOM_PREFIX>

在configure或cmake时，指定了要安装的路径后，以这种方式make install安装的文件会通通安装到以$CUSTOM_PREFIX为前缀的目录中，这样，开发者直接对这目录中的文件打包，即可发布使用。



make install遇到关于这个好多坑点，编译前先source，导致修改了这个全局变量，导致后面安装第三方库后位置不对。。。。。。



