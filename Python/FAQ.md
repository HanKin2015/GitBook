# python学习中的常见问题

我的意中人是个盖世英雄，我知道有一天他会在一个万众瞩目的情况下出现，身披金甲圣衣，脚踏七色云彩来娶我，我猜中了前头，可是我猜不着这结局。

FAQ 即 Frequently Asked Questions 的缩写，表示常见问题，官方列了 27 个常见问题，完整清单在此：https://mp.weixin.qq.com/s/zabIvt4dfu_rf7SmGZXqXg

## 1、IndentationError: unindent does not match any outer indentation level
占位问题，存在两种可能性：1.代码没有对齐 2.存在非法字符与其他格式的不可见的内容（输入法的问题）

## 2、AttributeError: module 'socketserver' has no attribute 'ForkingMixIn'
解决办法：将
SocketServer.ForkingMixIn 替换为 SocketServer.ThreadingMixIn

## 3、为啥不使用switch语句
该文档给出了几个建议，告诉了我们几个 switch/case 的替代方案：

使用 if-elif-else 条件判断语句
使用字典，将 case 值与调用的函数映射起来
使用内置 getattr() 检索特定的对象调用方法

## 4、靶场测试
靶场测试，即 range test，指的是对武器弹药的技术性能作各种测试验证，与药物的临床试验一样，都是在最终产品交付前的一项关键性测试。

## 5、dataframe插入空行
```
    analysis_result = pd.DataFrame(columns=['对应栋号', '出售状态', '总共数量', '100平方', '124平方', '142平方'])
    for sheet_name in sheet_names:
        sold_list, unsold_list, rate_list = analysis_house_sold(data)
        
        sold_list.insert(0, '全部')
        sold_list.insert(0, sheet_name)
        unsold_list.insert(0, '未售')
        unsold_list.insert(0, sheet_name)
        rate_list.insert(0, '去化率')
        rate_list.insert(0, sheet_name)
        nan_list = [np.NaN, np.NaN, np.NaN, np.NaN, np.NaN, np.NaN]
        
        df = pd.DataFrame([sold_list, unsold_list, rate_list, nan_list], columns=analysis_result.columns)
        analysis_result = analysis_result.append(df, ignore_index=True)
        print(analysis_result)
```

## 6、将小数转换为半分数字符串
```
sold_cnt = data.shape[0]
unsold_cnt = unsold_data.shape[0]
rate = (sold_cnt - unsold_cnt) / sold_cnt
rate = format(rate, '.2%')	# 保留两位小数
print(rate)
```

## 7、python调用python文件使用
```main.py
from slave import var
from slave import func

print('var = ', var)
print('10 + 20 = ', func(10, 20))
```

```
var = 12345
def func(a, b):
    return a + b
```

运行结果：
```
var = 12345
10 + 20 = 30
```

## 8、python的import并不能将其py文件中的库文件import进来

## 9、class类的继承和重写函数
```
#父类
class Animal(object):
    def run(self):
        print("animal running-----")
 
#子类
class Cat(Animal):
	# 重写
    def run(self):
        print("cat running-----")
```

## 10、数组转list
ndarray.tolist()

## 11、Python中有没有类似c语言中#define的功能？
首先python是动态语言，不用声明变量的类型所以  #define uchar unsigned char  这个没有。#define a x-y在python 中，简单粗暴的 a = x-y
>>> total = lambda x, y: x+y
>>> total(3, 5)8

## 12、tkinter鼠标点击事件
各种点击事件
事件一览表
事件	代码	备注
鼠标左键单击按下	1/Button-1/ButtonPress-1	 
鼠标左键单击松开	ButtonRelease-1	 
鼠标右键单击	3	 
鼠标左键双击	Double-1/Double-Button-1	 
鼠标右键双击	Double-3	 
鼠标滚轮单击	2	 
鼠标滚轮双击	Double-2	 
鼠标移动	B1-Motion	 
鼠标移动到区域	Enter	 
鼠标离开区域	Leave	 
获得键盘焦点	FocusIn	 
失去键盘焦点	FocusOut	 
键盘事件	Key	 
回车键	Return	 
控件尺寸变	Configure

## 13、浮点数比较相等
https://blog.csdn.net/xfxf996/article/details/107789006

## 14、python中import其他文件夹下的模块
将该文件夹加入系统路径下面：
```
# 增加libary库的搜索路径
sys.path.append('../../libary/')
```

## 15、_tkinter.TclError: image "pyimage1" doesn't exist
因為在一個程式中只能存在一個根視窗，也就是說只能存在一個Tk()，其他的視窗只能以頂層視窗（Toplevel()）的形式存在。

如果是作为一个库文件调用的话，可以这样写：
```
def picture_browser(master=None):
    if master == None:
        root = tk.Tk()
    else:
        root = tk.Toplevel()   #创建一个Tk根窗口组件
	root.title('测试')
```

## 16、解决treeview的颜色样式个性化
找了好久都没有解决，几乎到了快放弃的阶段，最终在两个网站中找到了灵感。
https://www.it1352.com/1887538.html
https://www.cnpython.com/qa/113726
改变一行数据的颜色，即一个选定的项目，不能改变一个单元格。如果需要改变，则需要使用到Canvas。
[python3使用tkinter做界面之颜色](https://blog.csdn.net/chl0000/article/details/7657887)

## 17、添加tkinter.ttk.Style()变量后打开窗口会多出一个tk窗口
发现是由于把tkinter.ttk.Style()弄成全局变量了，改成局部变量后解决。

## 18、_tkinter.TclError: couldn't recognize data in image file "D:\images\1 (10).jpg"
不清楚原因，主要是不要使用tk.PhotoImage调用图片，https://blog.csdn.net/username666/article/details/113615073
Tkinter仅支持3种文件格式，即GIF、PGM和PPM。
可以安装PIL模块，通过导入PIL模块，使用里面的函数实现。Python PIL支持GIF、JPEG、PCD、PNG、PPM、PSD等30多种图像文件格式。
```
import tkinter as tk
 
filename = 'D:\\images\\1 (10).jpg'
root = tk.Tk()
photo = tk.PhotoImage(file=filename)
label1 = tk.Label(root,text='学习python', justify='left', 
                  image=photo,compound='center',font=('Consolas',10),fg='white')
label1.pack()
root.mainloop()
```

而是使用PIL库。
```
from PIL import ImageTk,Image

img_pil = Image.open(r'./image/'+self.files[self.index])
if img_pil.size[0] > self.img_max_width or img_pil.size[1] > self.img_max_height:
	img_pil = img_pil.resize((self.img_max_width, self.img_max_height))
self.img = ImageTk.PhotoImage(img_pil)
```

## 19、AttributeError: module 'tkinter' has no attribute 'ttk'
很奇怪，添加from tkinter.ttk import Scrollbar, Checkbutton, Label, Button即可

## 20、RuntimeError: main thread is not in main loop
https://www.maixj.net/ict/runtimeerror-main-thread-is-not-in-main-loop-21037

网络上几乎找不到对这个问题的简单有效解决方案，后来自己看python官方文档，发现在线程start之前，设置一个daemon属性为True，这个问题就解决了。代码大概是这样的：
```
msg_handle = threading.Thread(target=msg_pp, args=(sock,))
msg_handle.daemon = True
msg_handle.start()
```

## 21、python报错：'gbk' codec can't decode byte 0xb9 in position 14: illegal multibyte sequence解决办法
原因：文件内容中含有中文
原代码：f = open(r'E:\0 paper\shiyan\pjdata.txt')
报错：UnicodeDecodeError: 'gbk' codec can't decode byte 0xb9 in position 14: illegal multibyte sequence
更正代码：f = open(r'E:\0 paper\shiyan\pjdata.txt',encoding='utf-8')
解决办法：将open文件路径后加上encoding='utf-8'即可解决问题

## 22、NameError:name ‘xrange’ is not defined
在Python 3中，range()与xrange()合并为range( )。

## 23、NameError: name 'unicode' is not defined
简单来说就是： Python2 的unicode 函数在 Python3 中被命名为 str。在 Python3 中使用 ·str 来代替 Python2 中的 unicode.

## 24、NameError: name 'ImageTK' is not defined
```
from tkinter import *
from PIL import Image, ImageTk

win = Tk()      # 创建窗口对象
win.title("我的窗口")   # 设置窗口标题
lab1 = Label(win, text = '你好', anchor = 'nw') # 创建Label组件
lab1.pack()     # 显示Label组件

# 显示内置的位图
lab2 = Label(win, bitmap = 'question')  # 创建显示疑问图标的Label组件
lab2.pack()     # 显示Label组件

# 显示自选的图片
bm = ImageTK.PhotoImage(file = r'turtle.jpeg')
lab3 = Label(win, image = bm)
lab3.bm = bm
lab3.pack()     # 显示Label组件
win.mainloop()
```
网上的代码，https://blog.csdn.net/username666/article/details/113615073，是真的坑。

直接拷贝运行，然后报错：NameError: name 'ImageTK' is not defined。

百度了一半天才找到原因：https://www.5axxw.com/questions/content/arxnni
原来是字母的大小写问题，这个需要着重注意一下。

## 25、Python 有三元运算符吗
Python 中没有 ?: 运算符，但是从版本 2.5 开始，加入了对三目运算符的语法支持，语法格式为：表达式1 if 布尔表达式 else 表达式2。

## 26、python没有提供求平均数的函数，建议先求和然后除以个数求得。
import numpy as np

np.mean([1, 2, 3])

## 27、TypeError: unsupported operand type(s) for +: 'int' and 'NoneType'
函数中报错出现NoneType,可以查看函数体中是否有返回None的情况, 一般是忘写return所致。

参考：https://blog.csdn.net/qq_45816346/article/details/122718132

## 28、ValueError: not enough values to unpack (expected 2, got 0)
开始发现linux能正常运行，原来是由于python2的缘故。
```
[root@ubuntu0006:/media/hankin/vdb/study] #python3 amazing_zip_error.py
******** starting ********
[103, 107, 113, 121]
process spend 0.0 s.
[root@ubuntu0006:/media/hankin/vdb/study] #
[root@ubuntu0006:/media/hankin/vdb/study] #python amazing_zip_error.py
******** starting ********
Traceback (most recent call last):
  File "amazing_zip_error.py", line 73, in <module>
    main()
  File "amazing_zip_error.py", line 66, in main
    amazing_map_error()
  File "amazing_zip_error.py", line 59, in amazing_map_error
    list_result = map(lambda x,y,z : x**2 + y + z, listx, listy, listz)
  File "amazing_zip_error.py", line 59, in <lambda>
    list_result = map(lambda x,y,z : x**2 + y + z, listx, listy, listz)
TypeError: unsupported operand type(s) for +: 'int' and 'NoneType'
```

## 29、SyntaxError: Non-ASCII character '\xe8' in file amazing_zip_error.py on line 8, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
根据错误提示，尝试首行添加：
```
# -*- coding: utf-8 -*-
```
解决。

## 30、UnicodeEncodeError: 'latin-1' codec can't encode characters in position 28-32: ordinal not in range(256)
百度了一下，都是让我转编码格式，但是我的场景是使用pylupdate5进行中英文翻译，这让我咋转。

后面我直接删掉所有中文，结果运行还是报这个错，我才发现不是当前文件中的问题。

最终报错的地方，打开pylupdate_main.py文件发现：
```
(base) D:\Github\Storage\qt\python\中英文翻译>pylupdate5 test.py  -ts english.ts
Traceback (most recent call last):
  File "C:\Users\Administrator\Anaconda3\lib\runpy.py", line 193, in _run_module_as_main
    "__main__", mod_spec)
  File "C:\Users\Administrator\Anaconda3\lib\runpy.py", line 85, in _run_code
    exec(code, run_globals)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\PyQt5\pylupdate_main.py", line 239, in <module>
    main()
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\PyQt5\pylupdate_main.py", line 225, in main
    translate_func)
UnicodeEncodeError: 'latin-1' codec can't encode characters in position 28-32: ordinal not in range(256)

fetchtr_py(fi.absoluteFilePath(), fetchedTor, defaultContext, True, codecForSource, tr_func, translate_func)
```
文件的绝对路径，我才恍然大悟，是我的中文路径问题。

使用ftplib访问中文路径报同样的错误：
```
path = '/中文路径/文件.txt'.encode('latin-1', 'ignore').decode('latin-1')
ftp.cwd(path)

这将忽略无法编码的字符，并将路径转换为 latin-1 编码，不可取。

中文路径问题：由于FTP支持ASCII编码，Python ftplib中编码方式使用latin-1,而window默认编码方式为gbk，所以使用Python处理时需先将中文路径编码为gbk之后译码为latin-1字符：

path = '/中文路径/文件.txt'.encode(encoding='gbk').decode(encoding='latin-1')
ftp.cwd(path)
```

## 31、成功解决TypeError: ‘float‘ object cannot be interpreted as an integer
在使用Python的for w in range(0.0, 4.1, 0.1):时遇到报错：TypeError: 'float' object cannot be interpreted as an integer

为什么会出现这种错误呢？因为Python的函数range(start, stop[, step])中start，stop，step都是整数，当使用了小数就会报错。
```
import numpy
for i in numpy.arange(0.0, 4.1, 0.8):
    print(i)

#输出结果：
0.0
0.8
1.6
2.4000000000000004
3.2
4.0
```
会出现精度丢失问题，计算机中所有的数据最终都是以二进制的形式存储的，小数在转换为二进制表示的时候会出现位数无限循环的情况，所以只能存储有限位数，超过这个长度的位数会被舍去（会采用 0舍1入 的方式），这样就造成了精度丢失的问题。

## 32、解决RecursionError: maximum recursion depth exceeded while calling a Python object
Python默认递归调用深度为1000（即最多递归调用1000次），而程序在运行过程中超过最大的递归深度。

```
import sys  # 导入sys模块
sys.setrecursionlimit(3000)  # 将默认的递归深度修改为3000

def infinite_lock_windows():
    """无限锁屏
    """
    
    while True:
        user = ctypes.windll.LoadLibrary("user32.dll")
        user.LockWorkStation()
        infinite_lock_windows()
        time.sleep(30)  # 应该把这行放在上面一行
```

## 33、python 报错 SyntaxError: EOL while scanning string literal 问题原因 解决方案 EOL解释
EOL = End Of Line error(翻译：行尾误差)
问题原因：通常是字符串两端的引号未正确匹配、成对造成的。

```
def set_wallpaper():
    path = os.listdir(r'C:\Users\Administrator\Downloads\picture')
    for i in path:
        print(i)
        # 原因在于这一行少写一个\，这个是个转义字符
        img_path = r'C:\Users\Administrator\Downloads\picture' + '\\' + i
        print(img_path)
```

## 34、报错：ModuleNotFoundError: No module named 'skimage.metrics'
尝试安装skimage库：pip install scikit-image
重新安装此库，运行程序仍显示错误，故查阅到可能是因为skimage库版本过低，导致没有metrics。所以运行下面代码更新了该库：
pip install scikit-image --upgrade

## 35、Configuration file contains invalid cp936 characters in C:\Users\YWX\pip\pip.ini. 已解决
在pip.ini配置文件里存在注释符号，去掉即可。
今日发现，只需要将文件编码修改成ANSI即可。

## 36、NameError: name '_thread' is not defined
首先，_thread模块是Python的内置模块，因此不需要安装额外的库。在其他文件中调用_thread模块时，需要使用import _thread语句将其导入。
其次，_thread模块中的函数需要在调用之前先定义。如果在其他文件中调用_thread模块中的函数，需要将这些函数定义在该文件中。
最后，由于_thread模块是Python的低级线程模块，使用起来比较复杂，容易出现死锁等问题。因此，建议使用更高级别的线程模块，如threading模块，来实现多线程编程。threading模块提供了更多的功能和更好的线程管理，使用起来更加方便和安全。

如果在其他文件中调用_thread模块中的函数，但是没有在该文件中定义这些函数，就会出现NameError等错误，提示相关的函数未定义。
这是因为Python中的函数作用域是基于文件的。在一个文件中定义的函数只能在该文件中使用，如果在其他文件中调用该函数，就需要将该函数从定义它的文件中导入到调用它的文件中。
如果在其他文件中调用_thread模块中的函数，但是没有将这些函数从定义它们的文件中导入到调用它们的文件中，Python解释器就无法找到这些函数的定义，从而导致错误。
因此，如果要在其他文件中调用_thread模块中的函数，需要将这些函数从定义它们的文件中导入到调用它们的文件中，或者将这些函数定义在调用它们的文件中。

## 37、包引入的奇怪错误
```
import ctypes
ctypes.wintypes.MSG()
```
报错：AttributeError: module 'ctypes' has no attribute 'wintypes'

正确方式：
```
import ctypes
from ctypes import wintypes
ctypes.wintypes.MSG()
```
感觉不能跨越式引入第三方包库。

## 38、1取反值不为0
```
i = True
print(i)
i = ~i
print(i)
i = ~i
print(i)输出结果是什么

True
-2
1
```
首先，将变量 i 赋值为 True，然后打印 i 的值，输出结果为 True。
接着，使用按位取反运算符 ~ 对 i 进行取反操作，由于 True 在 Python 中被解释为整数 1，所以取反后的结果为 -2。
最后，再次使用按位取反运算符 ~ 对 i 进行取反操作，由于 -2 在 Python 中被解释为整数 -3 的补码形式，所以取反后的结果为 1。

## 39、.py .pyd .pyw 都是干什么用文件？想分发时加密py脚本文件？
https://blog.csdn.net/popboy29/article/details/131086841
https://mp.weixin.qq.com/s/c42PuUF5Z6nL7KwUOG7Uow

- .py 文件作为Python源代码文件，自己编辑，debug用。
- .pyd 文件可以在源代码编辑完成基础上，加密打包，用于分发作业环境使用。是Python扩展模块的扩展名，用于表示使用C或C++编写的二进制Python扩展模块文件。.pyd文件是编译后的二进制文件，它包含了编译后的扩展模块代码以及与Python解释器交互所需的信息。此外，.pyd文件通过import语句在Python中导入和使用，就像导入普通的Python模块一样。由于C或C++的执行速度通常比纯Python代码快，可以使用扩展模块来优化Python代码的性能，尤其是对于计算密集型任务。
- .pyw 文件在你不想看见DOS黑窗口的时候使用。当然也可以直接使用pythonw hello.py来运行，就不用改扩展名了。
- .ipynb是Jupyter Notebook文件的扩展名，它代表"IPython Notebook"。
- .pyx是Cython源代码文件的扩展名。Cython是一种编译型的静态类型扩展语言，它允许在Python代码中使用C语言的语法和特性，以提高性能并与C语言库进行交互。
- .pyi文件是Python中的类型提示文件，用于提供代码的静态类型信息。一般用于帮助开发人员进行类型检查和静态分析。.pyi文件的命名约定通常与相应的.py文件相同，以便它们可以被自动关联在一起。
- .pyc是Python字节码文件的扩展名，用于存储已编译的Python源代码的中间表示形式，因为是二进制文件所以我们无法正常阅读里面的代码。可以使用命令生成:
```
(base) D:\Users\User\Desktop>python -O -m compileall -b k.py
Compiling 'k.py'...

(base) D:\Users\User\Desktop>python k.pyc
[2, 4, 6, 8, 10]
[2, 4, 6, 8, 10]
<generator object <genexpr> at 0x0000020423B771C8>
```

## 40、在gdb中使用python
```
[root@ubuntu0006:~] #gdb
GNU gdb (GDB) 8.2.1
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-pc-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word".
(gdb) python print("Hello, World!")
Hello, World!
(gdb) python
>print("Hello, World!")
>Hello, World!
(gdb) python
>import qemu
>Traceback (most recent call last):
  File "<string>", line 1, in <module>
ImportError: No module named qemu
Error while executing Python code.
(gdb) python
>import logging
>(gdb) help logging
Undefined command: "logging".  Try "help".
(gdb)
```

## 41、TypeError: can only concatenate str (not “int“) to str
错误原因：字符串和数字类型进行加减算法。
```
name = '小米'
age  = 30
# TypeError: can only concatenate str (not "int") to str
#print('我的名字是' + name + ',' + '今年' + age + '岁')
print('我的名字是' + name + ',' + '今年' + str(age) + '岁')

scenario_number = "-1"
if scenario_number != -1 and int(scenario_number) + 1 < 5:
    print("没有int强制转换会报错")
```

## 42、python报错：AttributeError: ‘ImageDraw‘ object has no attribute ‘textbbox‘
使用词云图wordcloud库的依赖库pillow没有安装或者版本过低。

## 43、xgettext: translation.py:14 处有非 ASCII 字符串。
xgettext是一个用于提取源代码中的文本字符串以进行国际化和本地化的工具。它通常用于提取需要翻译的字符串，并生成一个翻译文件供翻译人员使用。
在这种情况下，错误提示表明在translation.py文件的第14行存在一个非ASCII字符。非ASCII字符是指不属于ASCII字符集的字符，例如中文、日文、俄文等。
要解决这个问题，你可以尝试以下几种方法：
- 确保你的源代码文件使用了正确的字符编码。在Python中，默认的字符编码是UTF-8，所以你需要确保你的文件使用UTF-8编码保存。
- 如果你的源代码文件确实包含非ASCII字符，你可以使用Unicode转义序列来表示这些字符。例如，对于中文字符，你可以使用\uXXXX的形式来表示，其中XXXX是该字符的Unicode码点。
- 如果你使用的是Python 3.x版本，你可以在文件的开头添加以下注释来指定文件的编码：
```
# -*- coding: utf-8 -*-
```
这将告诉Python解释器该文件使用UTF-8编码。

## 44、使用lxml库的两种写法莫名其妙报错
为啥这样写是正确的：
```
from lxml import etree
with open("./data.xml", "r", encoding="utf-8") as f:
    data_xml = f.read()
tree = etree.XML(data_xml)
```

而这样写报错module 'lxml' has no attribute 'etree'：
```
import lxml
with open("./data.xml", "r", encoding="utf-8") as f:
    data_xml = f.read()
tree = lxml.etree.XML(data_xml)
```

chatgpt回答：实际上，无论是第一种写法还是第二种写法，都应该能够正常工作。
如果你在使用第二种写法时遇到了"module 'lxml' has no attribute 'etree'"的错误，可能是因为你的lxml库版本较旧或安装有问题。

请尝试更新lxml库到最新版本，可以使用以下命令来更新：
```
pip install --upgrade lxml
```

如果更新后仍然出现相同的错误，请尝试重新安装lxml库：
```
pip uninstall lxml
pip install lxml
```
如果问题仍然存在，请确保你的Python环境中没有其他与lxml冲突的库，并且确认你的代码中没有其他地方导入了名为lxml的模块。

解决方案：把lxml库更新后就正常了。

## 45、性能分析
- 函数执行时间：初步定位哪个函数有问题
- 函数自身执行时间：排除时自身函数执行时间长还是子函数执行时间长
- 单行执行时间：定位到哪个函数之后，进一步就是定位哪一行了
- 函数调用关系：明确感知调用链，发现是否进入不该进入的函数了
- 函数调用次数：调一次不可怕，1W次就比较难受

- cProfile：python自带的性能分析工具
- Qcachegrind：函数调用链路可视化分析
- pyprof2calltree：将cProfile生成的文件转换成Qcachegrind可识别的格式
- snakeviz：可视化解析cProfile生成的数据
- line_profiler：分析函数中每一行执行的耗时（需要改代码才能实现）
强推memray

## 46、os.path.exists判断文件是否存在有时候会失败
```
if os.path.exists(r"C:\Windows\System32\drivers\vdiusbfilter.sys"):
    print("hallo global")

if __name__ == '__main__':
    if os.path.exists(r"C:\Windows\System32\drivers\vdiusbfilter.sys"):
        print("hello main")
```
在两台电脑上都是这个问题，全局安装的python环境能判断文件存在，但是隔离的python环境却判断环境不存在。
怀疑1：python版本问题，但是不存在的是python3.8.6，而另外两个分别是python3.9.13和python3.7.6。
怀疑2：运行权限不同，使用net session命令发现都不是管理员权限运行。另外使用同一个dos窗口使用不同的python版本执行一样结果。
怀疑3：os库的版本不同。

后来测试判断桌面上的文件是否存在时发现都能判断文件存在，然后就怀疑到System32文件夹的特殊性，然后刚好之前解决过这类问题，见D:\Github\GitBook\gitbook\Windows\windows_program.md第9节。
https://www.coder.work/article/5023771
最终使用：
```
import platform

system32_path = r"C:\Windows\System32"
bit_number = platform.architecture()[0]
logger.debug(bit_number)
if bit_number == '32bit':
    system32_path = r"C:\Windows\Sysnative"
```

## 47、获取python环境位数
推荐：Platform库获取清晰明了，sys.maxsize虽然简洁但还是需要注释一下。
python -VV查看详细的版本信息。
demo见：D:\Github\Storage\python\study\others\get_python_env_bit.py

## 48、打印当前函数名称和行号
两种方法：inspect库和sys库。
demo见：D:\Github\Storage\python\study\others\get_python_env_bit.py

## 49、exe文件被检测出是病毒文件被杀死
https://www.zhihu.com/question/361772293/answer/2896672510

思路将其加密压缩成zip包，WinRAR软件在加密的时候有一个加密文件名，具体表现为：
https://zhuanlan.zhihu.com/p/605941280?utm_id=0

## 50、警告从外部作用域隐藏名称 'platform'
通常是由于在同一作用域中使用了与外部作用域相同的变量名。这种情况可能会导致代码的可读性降低，并可能引起意外的错误或混淆。
另外一个原因就是python第三方库模块有叫'platform'的。

## 51、PEP 8: E302 expected 2 blank lines, found 1
PEP 8 是 Python 的官方风格指南，其中包含了关于代码可读性和一致性的建议。E302 是 PEP 8 中的一条警告，表示在函数或类定义之间应该有两个空行。

## 52、神奇的问题
在桌面云文件夹执行python脚本异常，报错AttributeError: module 're' has no attribute 'compile'，但是新建一个文件夹就能正常执行。一开始还怀疑可能re库出现问题了，然鹅re 模块是 Python 的内置模块，因此你不需要单独安装它。它随 Python 的安装包一起提供，默认情况下就可以使用。
```
(base) D:\Users\User\Desktop>python
Python 3.7.6 (default, Jan  8 2020, 20:23:39) [MSC v.1916 64 bit (AMD64)] :: Anaconda, Inc. on win32
Type "help", "copyright", "credits" or "license" for more information.
SYSTEM\CurrentControlSet\Services\usbhub
None\None, [WinError 2] 系统找不到指定的文件。
SYSTEM\CurrentControlSet\Services\vusb
(4, 4)
[{'level': 'error', 'content': 'usbhub服务', 'cause': '服务不存在', 'suggestion': '该服务处于禁用状态，请检测本地是否安装了杀软软件，恢复方式为重装VDI'}, {'level': 'error', 'content': 'vusb服务', 'cause': '禁用状态', 'suggestion': '该服务处于禁用状态，请检测本地是否安装了杀软软件，恢复方式为重装VDI'}]
Failed calling sys.__interactivehook__
Traceback (most recent call last):
  File "C:\Users\User\anaconda3\lib\site.py", line 408, in register_readline
    import readline
  File "C:\Users\User\anaconda3\lib\site-packages\readline.py", line 6, in <module>
    from pyreadline.rlmain import Readline
  File "C:\Users\User\anaconda3\lib\site-packages\pyreadline\__init__.py", line 12, in <module>
    from . import logger, clipboard, lineeditor, modes, console
  File "C:\Users\User\anaconda3\lib\site-packages\pyreadline\logger.py", line 10, in <module>
    import socket, logging, logging.handlers
  File "C:\Users\User\anaconda3\lib\logging\__init__.py", line 26, in <module>
    import sys, os, time, io, traceback, warnings, weakref, collections.abc
  File "C:\Users\User\anaconda3\lib\traceback.py", line 5, in <module>
    import linecache
  File "C:\Users\User\anaconda3\lib\linecache.py", line 11, in <module>
    import tokenize
  File "C:\Users\User\anaconda3\lib\tokenize.py", line 37, in <module>
    cookie_re = re.compile(r'^[ \t\f]*#.*?coding[:=][ \t]*([-\w.]+)', re.ASCII)
AttributeError: module 're' has no attribute 'compile'
>>> exit()

(base) D:\Users\User\Desktop>cd ..

(base) D:\Users\User>python
Python 3.7.6 (default, Jan  8 2020, 20:23:39) [MSC v.1916 64 bit (AMD64)] :: Anaconda, Inc. on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()

(base) D:\Users\User>
```

原因是命名冲突：
- 确保在桌面文件夹中没有名为 re.py 的文件。Python 会优先导入当前目录中的模块，如果有同名文件，会导致导入失败。
- 检查是否有 re.pyc 或 __pycache__ 目录，这些可能是之前运行时生成的缓存文件。
果然发现桌面上面有一个我测试使用的文件，并且命名为了re.py，尴尬！

## 53、AttributeError: module 'os' has no attribute 'errno'
python3不再支持os.errno语法。
```
import os
print(os.errno)
print(os.errno.EEXIST)

改为

import errno
print(errno.EEXIST)
```