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
不清楚原因，主要是不要使用tk.PhotoImage调用图片，
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

# 21、Failed to eexecute script ***
怀疑跟ftp服务器不能使用有关。










