# Python新式格式化输出：f-string

参考：https://www.bilibili.com/read/cv15716944
https://blog.csdn.net/qq_45726327/article/details/115042863

## 1、f-string简介
python3.6引入了一种新的字符串格式化方式：f-string格式化字符串。从%s格式化到format格式化再到f-string格式化，格式化的方式越来越直观，f-string的效率也较前两个高一些，使用起来也比前两个简单一些。

同时值得注意的是，f-string就是在format格式化的基础之上做了一些变动，核心使用思想和format一样，因此大家可以学习完%s和format格式化，再来学习f-string格式化。

## 2、f-string的常见使用方式

### 2.1 基本使用
① f-string用大括{ }表示被替换字段，其中直接填入替换内容即可。

>>> name = "Huang Wei">>> f"Hello, my name is {name}"'Hello, my name is Huang Wei'>>> num = 2>>> f"I have {num} apples"'I have 2 apples'>>> price = 95.5>>> f"He has {price}$"'He has 95.5$'

### 2.2 表达式求值与函数调用
① f-string的大括号{ }可以填入表达式或调用函数，Python会求出其结果并填入返回的字符串内。 作者：木叶盒子 https://www.bilibili.com/read/cv15716944 出处：bilibili

### 2.3 f-string中引号使用存在的问题
① f-string大括号内使用的引号不能和大括号外的引号定界符引号冲突，需根据情况灵活切换使用单引号、双引号、单三引号、双三引号。
注意：只要大括号内外的引号不同，就没有问题。但是大括号中只能是但引号和 双引号 ，大括号外的引号定界符引号可以使用单引号、双引号、单三引号、双三引号。

② 大括号外的引号还可以使用\转义，但大括号内不能使用\转义。

### 2.4 f-string中大括号使用存在的问题
① f-string大括号外如果需要显示大括号，则应输入连续两个大括号\{\{ \}\}；大括号内需要引号，使用引号即可。 

### 2.5 f-string填充
① 什么是填充？
概念：当我们指定了字符串最终的长度的时候，如果现有的字符串没有那么长，那么我们就用某种字符（填充字符）来填满这个长度，这就是“填充”。

② 演示代码如下：默认使用空格填充

③ 用指定字符进行填充
注意：填充分为左填充、右填充、居中填充。左填充表示在字符串左侧填充，右填充表示在字符串右侧填充，居中填充表示在字符串左右两侧对称填充。>表示左填充，<表示右填充，^表示居中填充。记忆方法：括号口朝左边，就表示左填充；括号口朝右边，就表示右填充。 

### 2.6 f-string数字符号相关格式描述符：仅针对数值有效
![](https://i0.hdslb.com/bfs/article/95aa58cf5c6836cc09be8925d82a58fa9cd509c0.png@629w_201h_progressive.webp)

### 2.7 f-string宽度与精度相关格式描述符：保留小数点位数

### 2.8 f-string截断与填充的结合使用
当需要格式化的数据类型是“字符串”的时候，才会发生截断。截断的含义，以及发生截断的条件。

### 2.9 f-string针对date、datetime和time对象，进行年月日、时分秒等信息提取
说明：针对date、datetime和time对象，进行年月日、时分秒等提取，我们直接可以使用datetime模块中的方法就可以解决。

## 3、format格式化输出
https://www.cnblogs.com/2016024291-/p/8047285.html

```
vid_pid = "{:04x}:{:04x}".format(int(device_info.get("idVendor")), int(device_info.get("idProduct")))

>>> print('{} and {}'.format('hello','world'))  # 默认左对齐
hello and world
>>> print('{:10s} and {:>10s}'.format('hello','world'))  # 取10位左对齐，取10位右对齐
hello      and      world
>>> print('{:^10s} and {:^10s}'.format('hello','world'))  # 取10位中间对齐
  hello    and   world
>>> print('{} is {:.2f}'.format(1.123,1.123))  # 取2位小数
1.123 is 1.12
>>> print('{0} is {0:>10.2f}'.format(1.123))  # 取2位小数，右对齐，取10位
1.123 is       1.12
```

## 4、新特性
在 print(f"{monkey.Me.who_am_i = }") 和 print(f"{monkey.Me.who_am_i = }") 这两行代码中，使用了 f-string 的新特性，即在字符串中使用 = 来打印变量名和值。这是 Python 3.8+ 的语法，如果你的 Python 版本低于 3.8，这些行会引发 SyntaxError。如果你的 Python 版本低于 3.8，请将这两行代码修改为普通的打印语句。








