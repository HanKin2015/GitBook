# 问答

## 1、columns overlap but no suffix specified: Index([‘data1‘, ‘data2‘], dtype=‘object‘)解决方法
执行最后一句语句时报错columns overlap but no suffix specified: Index(['data1', 'data2'], dtype='object'),然后发现是两个DataFrame 的列名重复了，join不会像merge一样，merge会将重名的列明自动加上_x,_y加以区分，而join直接报错。
所以，我们的解决方法是修改其列名就好了。

## 2、发现with...as这种结构无法跳出循环
它本身可能不是一种循环。
```
content = ''
index = 0
with open('./notebook.json', encoding = 'utf-8') as fd:
    ch = fd.read(1)
    print(ch)
	fd.close()
    content += ch
    
    index += 1
    #if index > 55:
    #    fd.close()
```
始终都是输入文件全部内容。

使用方法封装，return跳出是可以的，但是read()还是一次性读取完。

## 3、Python报错：'dict' object has no attribute 'iteritems'（机器学习实战kNN代码）解决方案
原因在于：python3中已经没有 “iteritems” 这个属性了，现在属性是：“ items ” 。

## 4、UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 0: inva
问题出在函数入参上，因为在前面的函数里把fw = open(filename,'w')改成了fw = open(filename,'wb')，所以在这个函数中也把fr = open(filename)改为fr = open(filename,'rb')，问题解决，事实证明确实是函数入参不同导致的。

mode参数	|可做操作	|若文件不存在	|如何处理原内容
|:---:|:---:|:---:|:---:|
r	|只可读		|报错	|-
r+	|可读可写	|报错	|是
w	|只可写		|创建	|是
w+	|可读可写	|创建	|是
a	|只可写		|创建	|否，追加
a+	|可读可写	|创建	|否，追加
x	|只可写		|创建	|-
x+	|可读可写	|创建	|-

## 5、Module ctypes has no attribute 'windll'
It seems like you're trying to use a Windows module on a non Windows enviroment, if you check the ctype module it has some conditional classes:
```
if _os.name == "nt":

    class WinDLL(CDLL):
        """This class represents a dll exporting functions using the
        Windows stdcall calling convention.
   [...]
```
https://docs.python.org/3/library/ctypes.html

linux的ctypes库没有win32api就是这么简单。

想使用这个获取文件占用空间大小，目前探索只能通过stat命令，然后通过块数量乘以块大小计算所得，没有相应的命令查询。

## 6、Python错误：TypeError: 'int' object is not callable解决办法
看到这个错误我先是一愣，心想：“int对象不可调用？我没有调用Int型数据啊，我调用的是一个函数方法！”。调来调去都没有解决。Google后才发现，这个错误之所以发生，是因为我变量名和函数名写重复了！

我的错误使用是：
print(stat.S_IEXEC(mode))

正确使用方法是：
print(mode & stat.S_IEXEC)

















