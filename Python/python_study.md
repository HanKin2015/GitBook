# python学习

画画的baby 画画的baby
奔驰的小野马 和带刺的玫瑰
我说不开心也拍手拍走伤痕累累
用干涩的眼泪 酿出香醇肥美
虽比茅台般辣 却有温柔的heart
讲出窝心的话 又像个多金的爸
多金的爸带你去巴黎度假
让凡尔赛宫的艺术家改毛笔作画

每天一个python小知识。
[68个Python内置函数，建议你吃透](https://mp.weixin.qq.com/s/jNRsCUzGfMsVmdG-F37kJg)
[Python 其实自带了小型数据库dbm和shelve](https://mp.weixin.qq.com/s/nMsZnypgc_S6hh7BPPlGRw)

## 1、打开和杀死exe文件
```
import os
    
if __name__ == "__main__":
    app_dir = r'G:\yeshen\Nox\bin\Nox.exe'#指定应用程序目录
	os.startfile(app_dir) #os.startfile（）打开外部应该程序，与windows双击相同
```

## 2、线程
Windows下没有fork函数。

## 3、两个list列表拼接
- 使用"+"号：运算符的重载
- 使用extend方法：会覆盖原始list
- 使用切片：可以将一个列表插入另一个列表的任意位置

## 4、程序：枚举Windows下运行的程序

## 5、快速进行多个字符替换的方法
要替换的字符数量不多时，可以直接链式replace()方法进行替换，效率非常高；
如果要替换的字符数量较多，则推荐在 for 循环中调用 replace() 进行替换。

## 6、两个列表转换成字典
a = ['x', 'y', 'z']
b = [1, 2, 3]
c = dict(zip(a, b))

## 7、json格式

### 7-1、json和字符串之间的转换
将字符串转换为JSON对象：
```
import json

json_str = '{"name": "Alice", "age": 25}'
json_obj = json.loads(json_str)
print(json_obj)  # 输出：{'name': 'Alice', 'age': 25}
```

将JSON对象转换为Python字典：
```
import json

json_obj = {"name": "Alice", "age": 25}
json_str = json.dumps(json_obj)
print(json_str)  # 输出：'{"name": "Alice", "age": 25}'

dict_obj = json.loads(json_str)
print(dict_obj)  # 输出：{'name': 'Alice', 'age': 25}
```
从上面可以看出，其实字典和json对象非常相似。

### 7-2、json.load和json.loads区别
json.load()函数用于从文件中读取JSON数据并将其转换为Python对象。它接受一个文件对象作为参数，并返回解析后的Python对象。示例代码如下：
```
import json

with open('data.json', 'r') as file:
    data = json.load(file)

print(data)
```

json.loads()函数用于将JSON字符串转换为Python对象。它接受一个JSON字符串作为参数，并返回解析后的Python对象。
```
import json

json_str = '{"name": "Alice", "age": 25}'
data = json.loads(json_str)

print(data)
```

## 8、rsa加密解密



## 9、异常


## 10、文件读写

## 11、提示弹框
需要安装pywin32模块，pip install pywin32。不推荐，麻烦，还不能复制粘贴。
```
##pip install pywin32
import win32api,win32con
```

### 11-1、提醒OK消息框
```
win32api.MessageBox(0, "这是一个测试提醒OK消息框", "提醒",win32con.MB_OK)
MB_YESNO、MB_HELP、MB_ICONWARNING、MB_ICONQUESTION、MB_ICONASTERISK、MB_OKCANCEL、MB_RETRYCANCEL、MB_YESNOCANCEL。
```

## 12、UnicodeDecodeError: 'utf-8' codec can't decode byte 0xbc in position 2: invalid start byte
无外乎两种类型，utf-8和gbk。

## 13、ImportError: no module named md5
md5 is (from the python docs:) "deprecated since version 2.5: Use the hashlib module instead".

## 14、repr()函数
https://blog.csdn.net/fate252/article/details/94576506
```
>>> print('123'.__repr__())
'123'
>>> print('123'.__str__())
123
```

## 15、raise()函数
因此，虽然程序中使用了 raise 语句引发异常，但程序的执行是正常的，手动抛出的异常并不会导致程序崩溃。

## 16、startswith()方法
```
str = "this string example....wow!!!";
print(str.startswith('str', 4, 10))
print(str.startswith('is', 3, 8))
print(str.startswith('is', 2, 8))
print(str.startswith('this', 2, 4))
```

## 17、字符串拼接
- 使用join
- 使用逗号
- 使用加号
- 使用format

## 18、丢弃返回值
"使用下划线"不是很安全，因为下划线_在python中有多种意义。
而且正好有两种意义在某些情况下可能会产生冲突。
推荐使用多个下划线。
```
# 丢弃第二个返回值（使用下划线_）
a, _ = f()
# 丢弃第二个返回值（使用双下划线__或更多下划线___________）
a, __ = f()
```

## 19、统计字符串中指定字符的个数
```
string = input()
char = input()
 
string = string.lower()
char = char.lower()
 
if len(string) == 0:
    exit()
 
if len(char) == 0:
    exit()
 
if len(char) > 1:
    char = char[0]
 
print(string.count(char))
```

## 20、Python如何将字符串的时间转换为时间戳
导入模块time，先将字符串的代码转为数组，然后将字符转换为时间戳。
```
import time

str_time = '2022-11-18T18:08:09'
time_array = time.strptime(str_time, '%Y-%m-%dT%H:%M:%S')
time_stamp = int(time.mktime(time_array))
```

## 21、any和all函数
Python内置的any函数用来判断一个可迭代对象中是否至少有一个值为True，如果是则返回True，否则返回False。相当于对可迭代对象的所有元素做or运算，但是返回的结果只有True或False。
all()是判断可迭代对象中每一个元素是否都是True，是则返回True，否则返回False。也就是说只要有一个是False则返回False。

但是它们对于空的迭代对象的返回结果是不一样的：
```
print(any([]))  # Fasle
print(all([]))  # True
```
对于这个结果，可以理解为：
any是“至少有一个值为True时返回True”，空列表显然不满足，所以是False。
all是“至少有一个值为False时返回False”，空列表显然不满足，所以是True。

## 22、装饰器
Python装饰器是一种函数，它可以接受另一个函数作为输入，并返回一个新的函数作为输出。装饰器可以用来修改或增强函数的行为，而不需要修改函数本身的代码。

装饰器的语法使用@符号，将装饰器函数放在被装饰函数的定义之前。

代码见：D:\Github\Storage\python\study\decorator\decorator_example.py

## 23、变量作用域
参考：https://blog.csdn.net/weixin_45479740/article/details/125906628

注：在使用global修饰后变量是不可以直接赋值的，直接赋值会报错

使用nonlocal修饰变量后，变量不会直接修改全局变量的而是修改函数体父级函数内部的同名变量，而nonlocal关键字修饰变量后标识该变量是上一级函数中的局部变量，如果上一级函数中不存在该局部变量，nonlocal位置会发生错误（最上层的函数使用nonlocal修饰变量必定会报错）。

locals()可以获取所有的局部变量，也可以像global()获取变量的值，但是不能修改变量的值，但是全局范围可以修改

vars(Object)：以字典的形式返回一个对象里面的所有变量，如果没有参数，就和locals()的功能一样

## 24、numpy
https://mp.weixin.qq.com/s/TvLD9farUXNmYo5IfSFd9A
```
numpy.sort(arr)
```

## 25、list列表

### 25-1、list插入数据
insert：指定位置插入
append：在末尾插入元素
expand：在末尾插入列表

### 25-2、排序函数
## 一维list
```
lis.sort()
lis.sort(reverse=True)
```

### 25-3、二维list
```
lis.sort(key=(lambda x:x[0]))
```

## 26、Python 函数返回两个值, 如何将其中一个省略
假设 func(parms) 返回 两个 值, 利用 ‘下划线’ _ 来省略其中一个值, 如
```
v, _ = func(parms)
```

## 27、set去重
```
inter_set = set()
inter_set.add(4)
len(inter_set)
inter_set.remove(3)

# 使用discard函数，该函数和remove函数功能一样，同时在删除不存在的元素时不会触发错误
inter_set.discard(0)

# 计算两个集合的并集
s1 = {1,2,3,4}
s2 = {3,4,5,6}
s3 = s1.union(s2)

# 计算两个集合的交集
s3 = s1.intersection(s2)

# 计算两个集合的差集
s3 = s1 - s2
```

## 28、
