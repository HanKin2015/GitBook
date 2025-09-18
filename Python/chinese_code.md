# 中文乱码问题

## 1、linux系统打开文件中文编码问题
使用过unix2dos进行转换并没有什么卵用。
但是发现可以使用dos2unix去掉末尾的换行符^M。

### 1-1、方法1
在Linux下偶尔打开txt会出现中文乱码问题。
场景：在vim编辑下使用:set fileencoding命令查看编码格式为cp936
快速解决方式： iconv -f gbk -t utf8 PythonStudy.txt > Python.txt.utf8

### 1-2、方法2
优缺点：vim打开正常，但是使用cat等打开仍然乱码。

切换至root用户，用vim打开vimrc文件。

```
vim /etc/vim/vimrc
vim /etc/vimrc
在文件的末尾加入以下内容：

set fileencodings=utf-8,gb2312,gbk,gb18030,cp936
set termencoding=utf-8
set fileformats=unix
set encoding=prc

注意第一行参数末尾有s
```

### 1-3、方法3
用记事本打开文件，点击另存为，在下方的编码方式中选择utf-8方式。

## 2、python编写的exe文件在英文版win10下运行报中文编码错误

### 2-1、dos窗口无法显示中文
很奇怪，dos窗口显示中文乱码，但是将全屏内容复制到新建的txt文档中就能正常显示中文了，dos窗口字体设置没有中文字体。

方法一：修改注册表
```
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe]
"CodePage"=dword:000003a8
```

方法二：这是一种临时的做法，每次都要修改（搞定）
打开cmd， 键入命令chcp 936，使用简体中文代码就好了

方法三：
在cmd下用如下命令：
chcp 437
graftabl 936

方法4：
在HKEY_CLASSES_ROOT下的Folder下的shell下新建DOS项类型为REG_SZ，值为任意用于在右键菜单中显示,在其下再键command，REG_SZ,值为cmd.exe /E:ON /K c:cmd专用.bat %1
在c:下建立文件：cmd专用.bat

### 2-2、UnicodeEncodeError: 'charmap' codev can't encode characters in position 60-68: character maps to \<undefined\>
其实是logging库打印中文到本地txt文件导致。
使用python的logging模块记录日志，有时会遇到中文编码问题错误。

低版本python推荐：
在logging.FileHandler(path) 中添加指定编码方式 encoding='utf-8' 即可，
```
file_handler = logging.FileHandler(path, encoding='utf-8') 
logging.basicConfig(level=logging.INFO, handlers={file_handler})
```

高版本python推荐：
在logging.basicConfig中直接设置：
```
import logging
logging.basicConfig(
    level=日志等级, 
    format=输出格式, 
    datefmt=日期时间格式, 
    encoding=日志编码格式,（Python3.9才有）
    filename=日志文件,
    filemode=日志文件写入模式，
)
```

stream : 日志的输出流，可以指定输出到 sys.stderr, sys.stdout 或者文件, 默认输出到 sys.stderr, 当 stream 和 filename 同时指定时, stream 被忽略
利用 stream 输出到文件便可以解决编码问题, 然而这样一来却也带来了一些问题
首先, 文件在程序运行过程中必须始终保持打开状态
其次, 不能同时进行写入文件与控制台输出
```
file = open("log", encoding="utf-8", mode="a")
logging.basicConfig(level=logging.DEBUG,
                    stream=file,
                    format="%(asctime)s "
                           "%(filename)s [line:%(lineno)d] "
                           "%(levelname)s"
                           "%(message)s",
                    datefmt="%a, %d %b %Y %H:%M:%S"
                    )
```

### 2-3、还会遗留一个问题
直接双击exe文件运行，dos还是显示中文乱码。
发现把字体修改成NSimSun后，dos窗口的字体就显示正常了。

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor]
"autorun"="chcp 936"
```
治标不治本的方法，如果中间调用了dos命令，就会执行上面的命令，就会把整个页面变成中文了。

个人觉得比较完美解决的方案，直接在代码中解决，不破坏宿主机的环境变量，在代码运行前添加：
```
os.system('chcp 936 & cls')
```








