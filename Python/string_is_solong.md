# python代码长度过长时候换行的几种方式

字符串过长
```
# 三个双引号, print(a) 出来的是两行
a = """hello world
hello world"""

# 三个单引号, print(b) 出来的是两行
b = ''' hello world
hello world'''

# 使用 \ , print(c) 出来的是一行
c = "hello " \
	"world"
```

表达式过长
```
# 使用 \
d = a + \
	c

# 使用括号
d = (a + 
	c)
```