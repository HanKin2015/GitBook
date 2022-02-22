# tkinter学习

示例可以看python文件夹中study_tkinter.py。
参考文档：https://docs.python.org/3/library/tkinter.ttk.html

https://blog.csdn.net/nilvya?t=1

## 0、简介
类似qt。

这个问题就像你写个文档, 可以用自带记事本, 也可以用word.简单写几句话用记事本没问题, 简单做个小GUI用TK也没问题.但复杂的文档, 还是用Word这类更好的工具吧, 同理, 复杂的GUI还是用QT吧.比尔盖茨说他可以用basic写出任何程序, 咱们不是盖茨, 还是选个好工具吧. TK是打包直接送给你的东西, 就像记事本就是Windows送给你的一样.不用去了解具体的不同, 如果你想真正做Python GUI, 选PyQt就好了. 这样以后转其实开发, C++什么的, QT还是那个QT...

我们都知道当一个东西比较匮乏的时候，我们会比较苦恼，苦恼找不到好的替代。但是但一个东西比较丰富的时候，我们也会苦恼，苦恼的是如何进行选择。就比如每天我们都面临的一个巨大的难题就是今天中午吃什么？

python开发图形界面也有这样的烦恼，有很多gui框架提供我们选择，让我们眼花缭乱，我们很难从中选择一个。目前主流的有三个python gui框架。

## 1、text获取内容和设置内容
目前来看，先删除文本，然后再插入内容。

```
获取Text文本内容：text.get('0.0','end')
该方式表示获取text中现有的全部内容；
第一个参数‘0.0’是指从第0行第0列开始读取（‘1.3’表示从第一行第3列开始读取），第二个参数End表示最后一个字符

删除Text文本内容：
text.delete('0.0','end')：该方法是将text文本内的内容全部清空。

设置Text文本内容：
text.insert('end',s):该方法是将s插入到text的末尾，原来的内容不变；
text.insert('insert',s)；该方法是将s插入到鼠标点击的地方；
```

## 2、组件之文本
Text 文本域： 多行文字区域，可用来收集(或显示)用户输入的文字，可以编辑文本格式，改变文本框的宽高
Entry 文本框：单行文字域，用来收集键盘输入，自带宽高，不可改变文本格式
entry.get()

Label

## 3、小组件上的焦点
takefocus选项设置为0将禁用选项卡专注于创建按钮。

## 4、小组件上的字体
```
style = ttk.Style()
style.configure("BW.TLabel", foreground="black", background="white")

l1 = ttk.Label(text="Test", style="BW.TLabel")
l2 = ttk.Label(text="Test", style="BW.TLabel")
```

## 5、pyinstaller无法打包图片到exe问题
打包成功后，报failed execute script xxx错误。
本来想打印日志来查错误，这也是最好的方法
https://blog.csdn.net/sinat_27382047/article/details/81304065

解决方案：将图片转换成编码保存到py文件里面，然后使用的时候导入py文件然后解码成图片。

Python\Python38-32\Scripts\build路径下打包项目文件里的warn-XXX.txt文件，一打开发现很多包丢失了missing，然后各种百度找解决办法，改路径hooks和rthook文件，折腾了大半天并没有解决问题。实际上根本就不是missing包引起的。
因为正常打包的文件可以使用的也同样有大量的missing包，例如我打包可以正常用的这个软件文件夹下同样有warn，实际上这都是误导。

## 6、ftp连接几分钟后自动断开
except ftplib.error_perm as err:

数据库、FTP等连接在长时间不使用之后会自动断开，导致下次使用时尚未登录而直接进行操作，将会导致出错。

原因
FTP或数据库服务器设置了会话无操作的timeout，当无操作的时间大于这个值的时候，将会导致服务器将连接切断(connection reset by peer)

解决
方法一：将服务器的timeout值设置得更长或者禁止服务器自动切断连接
方法二：曲线救国：在程序中使用一个定时任务或线程，每隔一段时间就向服务器发送一些无关紧要的请求使连接保持活跃，这样就不会超出timeout时间，因此就不会被服务器自动切断了。

线程写个timeout心跳？看其他人说心跳不管用，由于ftp连接本身的超时时间就已经挺大了，所以超时后再重新连接吧。

记事本参考：https://blog.csdn.net/lys_828/article/details/105380540

## 7、解决from PIL import ImageTk问题
注意细节，继承的类错误，找了半天网络答案。

## 8、python3tkinter去掉边框
```
import tkinter as tk
root = tk.Tk()
root.overrideredirect(True)
root.mainloop()
```

## 9、TclError: image "pyimage2" doesn't exist
因为在一个程序中只能存在一个根窗口，也就是说只能存在一个Tk()，其他的窗口只能以顶层窗口（Toplevel()）的形式存在。

## 10、读取文件内容存储到一个字符串中
```
content = ''
try:
    with open(file_path, 'r', encoding='utf-8') as f:
		content = f.read() 
except Exception as ex:
    print('打开文件失败, error=', ex)
```

## 11、Failed to execute script copy_tool
https://blog.csdn.net/haimianjie2012/article/details/108058354

打包指令：pyinstaller -F -w copy_tool.py

-F（注意大写）是所有库文件打包成一个exe，-w是不出黑色控制台窗口。
不加-F参数生成一堆文件，但运行快。压缩后比单个exe文件还小一点点。
加-F参数生成一个exe文件，运行起来慢。

问题定位去掉w参数：pyinstaller -F copy_tool.py
双击exe文件会一闪而过，使用dos窗口运行exe，出现报错的具体原因。

原因：找不到库，修改相对路径为绝对路径解决
```
# 增加libary库的搜索路径
#sys.path.append('../../libary/')
sys.path.append('D:/Github/Storage/python/libary/')
# 导入自定义的Entry库
from entrywithplaceholder import EntryWithPlaceholder
```

然鹅把exe文件移到别处运行还是会报错，原因同样如此，最终发现是pyinstaller不会把自定义的module导入进来，解决办法如下：
```
https://q.cnblogs.com/q/111110

pyinstaller -F -w copy_tool.py D:\Github\Storage\python\libary\entrywithplaceholder.py --onefile

-F, --onefile         Create a one-file bundled executable.
```

## 12、python中tkinter时出现两个弹窗的解决方案
今天在做tkinter弹窗时一直出现两个窗口，其中一个是正常的tkinter窗口，而另一个是以tk开头的弹窗，经过网上查阅资料得到了以下解决方案，亲测有效。

解决办法
在程序中加入以下代码即可：
```
root = tkinter.Tk()
root.withdraw()
```

正确代码
```
import tkinter
import tkinter.messagebox#弹窗库

#此处为解决问题的代码，其中tkinter为上方import的tkinter
root = tkinter.Tk()
root.withdraw()

tkinter.messagebox.showinfo('提示','你的输入有误')
```