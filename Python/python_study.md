[TOC]
# python学习

画画的baby 画画的baby

奔驰的小野马 和带刺的玫瑰

我说不开心也拍手拍走伤痕累累

用干涩的眼泪 酿出香醇肥美

虽比茅台般辣 却有温柔的heart

讲出窝心的话 又像个多金的爸

多金的爸带你去巴黎度假

让凡尔赛宫的艺术家改毛笔作画

# 1、打开和杀死exe文件
```
import os
    
if __name__ == "__main__":
    app_dir = r'G:\yeshen\Nox\bin\Nox.exe'#指定应用程序目录
	os.startfile(app_dir) #os.startfile（）打开外部应该程序，与windows双击相同
```

# 2、线程
Windows下没有fork函数。

# 3、将py文件打包成exe文件
转icon图标网址：http://www.bitbug.net/
安装打包软件：pip install pyinstaller
示例：pyinstaller -F -w -i F:\code\image.ico demo.py
注意：icon可能需要是绝对路径
icon是指定点击的图标，并不是demo中的title。

# 4、程序：枚举Windows下运行的程序

# 5、快速进行多个字符替换的方法
要替换的字符数量不多时，可以直接链式replace()方法进行替换，效率非常高；
如果要替换的字符数量较多，则推荐在 for 循环中调用 replace() 进行替换。

# 6、两个列表转换成字典
a = ['x', 'y', 'z']
b = [1, 2, 3]
c = dict(zip(a, b))

# 7、json格式
```
>>> import json
>>> print json.dumps({'a': 'Runoob', 'b': 7}, sort_keys=True, indent=4, separators=(',', ': '))
{
    "a": "Runoob",
    "b": 7
}
```

# 8、rsa加密解密



# 9、异常



# 10、字符串拼接
- 使用join
- 使用逗号
- 使用加号
- 使用format

# 10、文件读写

# 11、提示弹框
需要安装pywin32模块，pip install pywin32。不推荐，麻烦，还不能复制粘贴。

##pip install pywin32
import win32api,win32con
  
##提醒OK消息框
win32api.MessageBox(0, "这是一个测试提醒OK消息框", "提醒",win32con.MB_OK)
MB_YESNO、MB_HELP、MB_ICONWARNING、MB_ICONQUESTION、MB_ICONASTERISK、MB_OKCANCEL、MB_RETRYCANCEL、MB_YESNOCANCEL。

# 12、UnicodeDecodeError: 'utf-8' codec can't decode byte 0xbc in position 2: invalid start byte
无外乎两种类型，utf-8和gbk。

# 13、ImportError: no module named md5
md5 is (from the python docs:) "deprecated since version 2.5: Use the hashlib module instead".

# 14、repr()函数
https://blog.csdn.net/fate252/article/details/94576506
```
>>> print('123'.__repr__())
'123'
>>> print('123'.__str__())
123
```

# 15、raise()函数
因此，虽然程序中使用了 raise 语句引发异常，但程序的执行是正常的，手动抛出的异常并不会导致程序崩溃。

# 16、startswith()方法
```
str = "this string example....wow!!!";
print(str.startswith('str', 4, 10))
print(str.startswith('is', 3, 8))
print(str.startswith('is', 2, 8))
print(str.startswith('this', 2, 4))
```





























