# 暴力破解rar安装包

## 错误2：Python-使用unrar库时Couldn't find path to unrar library的解决办法
下载rarlib的库文件，地址：http://www.rarlab.com/rar/UnRARDLL.exe
下载安装，默认设置就好了
安装完成后要设置环境变量
UNRAR_LIB_PATH
C:\Program Files (x86)\UnrarDLL\x64\UnRAR64.dll

## 错误3：unrar.unrarlib.BadDataError: File CRC error
就是文件没下载完全，或者破坏可，使得文件循环冗余检验错误（file CRC error）
下个最新的重新安装
crc校验出错，重新下载

无意中在piporg中看见unrardll安装包，果断安装试试
pip install unrardll

## 错误4：ERROR: Failed building wheel for unrardll
error: Microsoft Visual C++ 14.0 is required. Get it with "Microsoft Visual C++ Build Tools": https://visualstudio.microsoft.com/downloads/

根据提示去官网下载一个最新C++2019试试。



