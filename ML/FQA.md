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











