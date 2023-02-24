# 读写文件
https://www.cnblogs.com/xiugeng/p/8635862.html

一、read方法
　　特点是：读取整个文件，将文件内容放到一个字符串变量中。

　　劣势是：如果文件非常大，尤其是大于内存时，无法使用read()方法。

二、readline方法
　　特点：readline()方法每次读取一行；返回的是一个字符串对象，保持当前行的内存

　　缺点：比readlines慢得多

三、readlines方法
　　特点：一次性读取整个文件；自动将文件内容分解成一个行的列表。



# Windows系统写文件如何实现Linux风格的换行符
参考：https://blog.csdn.net/tangyin025/article/details/123108752

一个方法是将文件按wb方式打开，并且将要写入的字符转换成bytes字节写入：
```
# Linux换行符
with open('test.txt','wb') as pf:
    pf.write(bytes('juzicode.com\n',encoding='utf-8'))
    pf.write(bytes('vx:桔子code\n',encoding='utf-8'))

# Windows换行符
with open('test2.txt','wb') as pf:
    pf.write(bytes('juzicode.com\r\n',encoding='utf-8'))
    pf.write(bytes('vx:桔子code\r\n',encoding='utf-8'))
```

也可以在创建文件实例时，传入newline入参强制设定newline=’\n’：
```
# Linux换行符
with open('test.txt','w',newline='\n') as pf:
    pf.write('构建文件对象时传入newline\n') 
    pf.write('juzicode.com\n')
    pf.write('vx:桔子code\n')

# Windows换行符
with open('test2.txt','w',newline='\n') as pf:
    pf.write('构建文件对象时传入newline\r\n') 
    pf.write('juzicode.com\r\n')
    pf.write('vx:桔子code\r\n')
```