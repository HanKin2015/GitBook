[TOC]
# python学习中的常见问题

我的意中人是个盖世英雄，我知道有一天他会在一个万众瞩目的情况下出现，身披金甲圣衣，脚踏七色云彩来娶我，我猜中了前头，可是我猜不着这结局。

FAQ 即 Frequently Asked Questions 的缩写，表示常见问题，官方列了 27 个常见问题，完整清单在此：https://mp.weixin.qq.com/s/zabIvt4dfu_rf7SmGZXqXg

# 1、IndentationError: unindent does not match any outer indentation level
占位问题，存在两种可能性：1.代码没有对齐 2.存在非法字符与其他格式的不可见的内容（输入法的问题）

# 2、AttributeError: module 'socketserver' has no attribute 'ForkingMixIn'
解决办法：将
SocketServer.ForkingMixIn 替换为 SocketServer.ThreadingMixIn

# 3、为啥不使用switch语句
该文档给出了几个建议，告诉了我们几个 switch/case 的替代方案：

使用 if-elif-else 条件判断语句
使用字典，将 case 值与调用的函数映射起来
使用内置 getattr() 检索特定的对象调用方法

# 4、靶场测试
靶场测试，即 range test，指的是对武器弹药的技术性能作各种测试验证，与药物的临床试验一样，都是在最终产品交付前的一项关键性测试。

# 5、dataframe插入空行
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

# 6、将小数转换为半分数字符串
```
sold_cnt = data.shape[0]
unsold_cnt = unsold_data.shape[0]
rate = (sold_cnt - unsold_cnt) / sold_cnt
rate = format(rate, '.2%')	# 保留两位小数
print(rate)
```

# 7、python调用python文件使用
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

# 8、python的import并不能将其py文件中的库文件import进来

# 9、class类的继承和重写函数
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

# 10、数组转list
ndarray.tolist()

# 11、Python中有没有类似c语言中#define的功能？
首先python是动态语言，不用声明变量的类型所以  #define uchar unsigned char  这个没有。#define a x-y在python 中，简单粗暴的 a = x-y
>>> total = lambda x, y: x+y
>>> total(3, 5)8

# 12、tkinter鼠标点击事件
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

# 13、浮点数比较相等
https://blog.csdn.net/xfxf996/article/details/107789006

# 14、python中import其他文件夹下的模块
将该文件夹加入系统路径下面：
```
# 增加libary库的搜索路径
sys.path.append('../../libary/')
```

# 15、_tkinter.TclError: image "pyimage1" doesn't exist
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

# 16、解决treeview的颜色样式个性化
找了好久都没有解决，几乎到了快放弃的阶段，最终在两个网站中找到了灵感。
https://www.it1352.com/1887538.html
https://www.cnpython.com/qa/113726
改变一行数据的颜色，即一个选定的项目，不能改变一个单元格。如果需要改变，则需要使用到Canvas。
[python3使用tkinter做界面之颜色](https://blog.csdn.net/chl0000/article/details/7657887)

# 17、添加tkinter.ttk.Style()变量后打开窗口会多出一个tk窗口
发现是由于把tkinter.ttk.Style()弄成全局变量了，改成局部变量后解决。

# 18、_tkinter.TclError: couldn't recognize data in image file "D:\images\1 (10).jpg"
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

# 19、AttributeError: module 'tkinter' has no attribute 'ttk'
很奇怪，添加from tkinter.ttk import Scrollbar, Checkbutton, Label, Button即可

# 20、RuntimeError: main thread is not in main loop
https://www.maixj.net/ict/runtimeerror-main-thread-is-not-in-main-loop-21037

网络上几乎找不到对这个问题的简单有效解决方案，后来自己看python官方文档，发现在线程start之前，设置一个daemon属性为True，这个问题就解决了。代码大概是这样的：
```
msg_handle = threading.Thread(target=msg_pp, args=(sock,))
msg_handle.daemon = True
msg_handle.start()
```

## 21、python报错：'gbk' codec can't decode byte 0xb9 in position 14: illegal multibyte sequence解决办法
原代码：
f = open(r'E:\0 paper\shiyan\pjdata.txt')
报错：
UnicodeDecodeError: 'gbk' codec can't decode byte 0xb9 in position 14: illegal multibyte sequence
更正代码：
f = open(r'E:\0 paper\shiyan\pjdata.txt',encoding='utf-8')
 

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




