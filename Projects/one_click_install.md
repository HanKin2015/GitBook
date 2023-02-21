# 一键装机脚本


bat脚本

安装notepad++、添加主题包

驱动精灵万能网卡版



vim打开文件出现中文乱码：
方案一：
# 命令行模式(非常重要太常用了)
:e ++enc=cp936

方案二：
vim ~/.vimrc添加
set enc=utf8一般来说就够了（只针对vim乱码的情况，操作系统乱码另说）
如果还不行，可以再添加
set fencs=utf-8,gb2312,gb18030,gbk,ucs-bom,cp936,latin1
还不行就把第一行的utf8换成gbk，第二行的gbk挪到最前。

vim打开文件，中文乱码。而用cat命令，能正确显示中文。
问题所在：vim终端编码方式
解决方案：打开~/.vimr或者/etc/vimrc配置文件
在后面加上：
fileencodings=utf-8,gb2312,gbk,gb18030
set termencoding=gbk //关键，设置为utf-8是乱码的
set encoding=prc
set fileencoding=utf-8






