# python学习笔记
Pythonic: python化、python风格

## 1、python2.x
2020年1月1日停止更新python2.x。

## 2、学习预告
- 下载：使用you-get
you-get -d 视频网址
youtube-dl

词云学习：https://blog.csdn.net/lys_828/article/details/105200000

```
@echo off
::2016年9月4日 13:36:02 codegay
::you-get配置文件
::本代码另存为g.bat

if "%1" == "" (
    echo you-get配置脚本
    echo 用法：
    echo g url
    echo g https://vimeo.com/181027959
    exit /b 0
    )

set outputdir="D:/迅雷下载"

::操SB GFW
echo "%1" | findstr /i "youtube vimeo google" && set proxy=--socks-proxy 127.0.0.1:7070
you-get --output-dir %outputdir% %proxy% "%*"
```

## 3、资料
https://blog.csdn.net/lys_828/article/list/2?t=1
阿里巴巴淘宝镜像网站：

## 4、有趣的小发现，在多文件夹路径下的原位置重命名文件
很有意思，写代码时需要注意
https://blog.csdn.net/lys_828/article/details/107843255

## 5、文件或者文件夹删除
```
import os
import shutil

os.remove(path)       #删除文件
os.removedirs(path)   #删除多级空文件夹
os.rmdir(path)        #删除空文件夹

shutil.rmtree(path)   #递归删除文件夹，即：删除非空文件夹
shutil.rmtree(path, ignore_errors=True)
```

```
import shutil
import os
import stat

def remove_readonly(func, path, _):
    """清除文件的只读属性，并重试删除操作"""
    os.chmod(path, stat.S_IWRITE)
    func(path)

# 使用自定义的错误处理函数来删除非空目录
shutil.rmtree('dir_name', onerror=remove_readonly)
```

[人人都能学Python](https://gitee.com/crossin/easy-py/tree/master)

## 6、低代码
低代码是一种软件开发方法，它使用可视化建模工具和自动化代码生成技术，以减少手动编写代码的工作量。低代码平台通常提供了一系列的预构建组件和模块，使开发人员可以通过简单的拖放操作来创建应用程序。这种方法可以大大加快应用程序的开发速度，减少开发成本，并提高开发人员的生产力。低代码平台通常用于构建企业应用程序、移动应用程序和Web应用程序等。

## 7、索引
深拷贝和浅拷贝：D:\Github\Storage\python\study\others\deep_shallow_copy.py
python中base64库用法详解：https://blog.csdn.net/weixin_44799217/article/details/125949538

## 8、经常开发python一定需要了解的技巧
查看Python库内的函数：dir(math)、help(math)、
访问Python官方文档：https://docs.python.org/3/library/index.html
访问Pandas官方文档：https://pandas.pydata.org/docs/
访问Stack Overflow：https://stackoverflow.com/
访问GitHub：https://github.com/

## 9、使用python开server
我也是后来同事告诉了我这个方法，起因是环境限制了FTP协议需要使用的20和21端口，因此需要使用python开server自主设置端口号即可跳过限制。
```
python -m http.server -b 0.0.0.0 8852

C:\Users\test>telnet 172.22.64.246 20
正在连接172.22.64.246...无法打开到主机的连接。 在端口 20: 连接失败
C:\Users\test>telnet 172.22.64.246 21
正在连接172.22.64.246...无法打开到主机的连接。 在端口 21: 连接失败
C:\Users\test>telnet 172.22.64.246 8852
成功，没有错误提示
```

## 10、python -m中-m参数详解
python -m 是 Python 解释器的一个命令行选项，用于执行一个指定的模块。当你使用 python -m <module_name> 时，Python 解释器会在 sys.path 中查找指定的模块，并执行它。

例如，如果你有一个名为 example_module 的模块，你可以使用以下命令来执行它：
```
python -m example_module
```
这将导入 example_module 并执行它。这种方式的好处是，不需要担心模块所在的路径，Python 解释器会自动帮你找到它。

另外，python -m 也可以用来执行 Python 自带的工具模块，比如 unittest、pdb 等。例如，你可以使用以下命令来执行 unittest 模块：
```
python -m unittest
```
这样做可以方便地在不同的环境中执行 Python 模块，而不用担心模块所在的路径或者环境变量的设置。

可以通过加载-m参数来指定当前文件夹下的python环境。

特别注意：-m参数是来执行命令的，如python -m pip install xxx，而不是来执行py脚本的，这个是错误的python -m xxx.py。

### Error while finding module specification for 'solve_mariaDB_data_question.py' (ModuleNotFoundError: _
_path__ attribute not found on 'solve_mariaDB_data_question' while trying to find 'solve_mariaDB_data_question.py')
这是由于加了-m参数导致，或者在代码中增加：
```
import sys
sys.path.append('D:\\迅雷下载\\Tools4.5.10\\python')
```

### requests.exceptions.SSLError: HTTPSConnectionPool(host='11.6.30.54', port=8001): Max retries exceeded with url: /totals (Caused by S
or(1, '[SSL: WRONG_VERSION_NUMBER] wrong version number (_ssl.c:1124)')))
原因：本来http连接的请求，我写成了https。

这个错误表明你的程序尝试通过 HTTPS 连接到 121.46.130.154 的 8001 端口，但是遇到了 SSL 错误。错误信息 "[SSL: WRONG_VERSION_NUMBER] wrong version number (_ssl.c:1124)" 表明 SSL 库检测到了错误的版本号。

可能的原因包括：

服务器端 SSL 配置问题，导致无法正确处理连接请求。
客户端和服务器之间的 SSL/TLS 版本不兼容。
为了解决这个问题，你可以尝试以下方法：

检查目标服务器的 SSL 配置，确保其支持所需的 SSL/TLS 版本，并且没有配置错误。
确保你的客户端程序使用的是与服务器兼容的 SSL/TLS 版本。你可能需要更新你的 SSL 库或调整 SSL 配置。
另外，你也可以尝试使用非加密的 HTTP 连接，或者联系服务器管理员寻求帮助。

## 11、安全编程
使用sshpass免密连接：方法详细见D:\Github\GitBook\gitbook\Linux\sshpass.md
使用ssh免密连接：方法详细见D:\Github\Storage\shell\ssh\SSH_ASKPASS.sh
其实这两种方法都会暴露密码

## 12、Cython

### 12-1、简介
Cython 估计很多人都听说过，它是用来对 Python 进行加速的。如果你在使用 Python 编程时，有过如下想法，那么 Cython 非常适合你。

1）因为某些需求导致不得不编写一些多重嵌套的循环，而这些循环如果用 C 语言来实现会快上百倍，但是不熟悉 C 或者不知道 Python 如何与 C 进行交互；
2）因为 Python 解释器的性能原因，如果将 CPython 解释器换成 PyPy，或者干脆换一门语言，比如 Rust，将会得到明显的性能提升，可是换不得。因为你的项目组规定只能使用 Python 语言，解释器只能是 CPython；
3）Python 是一门动态语言，但你希望至少在数字计算方面，能够加入可选的静态类型，这样可以极大地加速运算效果。因为单纯的数字相加不太需要所谓的动态性，尤其是当你的程序中出现了大量的计算逻辑时；
4）对于一些计算密集型的部分，你希望能够写出一些媲美 Numpy, Scipy, Pandas 的算法；
5）你有一些已经用 C、C++ 实现的库，你想直接在 Python 内部更好地调用它们，并且不使用 ctypes、cffi 等模块；
6）也许你听说过 Python 和 C 可以无缝结合，通过 C 来为 Python 编写扩展模块，将 Python 代码中性能关键的部分使用 C 进行重写，来达到提升性能的效果。但是这需要你对 Python 解释器有很深的了解，熟悉底层的 Python/C API，而这是一件非常痛苦的事情；

如果你有过上面的一些想法，那么证明你的 Python 水平是很优秀的，然而这些问题总归是要解决的，于是 Cython 便闪亮登场了。注意：Cython 并不是一个什么实验性的项目，它出现的时间已经不短了，并且在生产环境中久经考验，我们完全是有理由学习它的。


1）Cython 是一门编程语言，它将 C 和 C++ 的静态类型系统融合在了 Python 身上。Cython 源文件的后缀是 .pyx，它是 Python 的一个超集，语法是 Python 语法和 C 语法的混血。当然我们说它是 Python 的一个超集，因此你写纯 Python 代码也是可以的。
2）当我们编写完 Cython 代码时，需要先将 Cython 代码翻译成高效的 C 代码，然后再将 C 代码编译成 Python 的扩展模块。

在早期，编写 Python 扩展都是拿 C 去写，但是这对开发者有两个硬性要求：一个是熟悉 C，另一个是要熟悉解释器提供的 C API，这对开发者是一个非常大的挑战。此外，拿 C 编写代码，开发效率也非常低。

而 Cython 的出现则解决了这一点，Cython 和 Python 的语法非常相似，我们只需要编写 Cython 代码，然后再由 Cython 编译器将 Cython 代码翻译成 C 代码即可。所以从这个角度上说，拿 C 写扩展和拿 Cython 写扩展是等价的。

至于如何将 Cython 代码翻译成 C 代码，则依赖于相应的编译器，这个编译器本质上就是 Python 的一个第三方模块。它就相当于是一个翻译官，既然用 C 写扩展是一件痛苦的事情，那就拿 Cython 去写，写完了再帮你翻译成 C。

因此 Cython 的强大之处就在于它将 Python 和 C 结合了起来，可以让你像写 Python 代码一样的同时还可以获得 C 的高效率。所以我们看到 Cython 相当于是高级语言 Python 和低级语言 C 之间的一个融合，因此有人也称 Cython 是 "克里奥尔编程语言"（creole programming language）。
克里奥尔人是居住在西印度群岛的欧洲人和非洲人的混血儿，以此来形容 Cython 也类似于是一个（Python 和 C 的）混血儿。

### 12-2、cython的速度提高
https://zhuanlan.zhihu.com/p/373236956



