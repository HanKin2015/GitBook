# Python yield 使用浅析
https://www.runoob.com/w3cnote/python-yield-used-analysis.html

## 1、英文意思
v.出产(作物);产生(收益、效益等);提供;屈服;让步;放弃;缴出
n.产量;产出;利润

## 2、理解yield
带有 yield 的函数在 Python 中被称之为 generator（生成器）。
如果要控制内存占用，最好不要用List来保存中间结果，而是通过 iterable 对象来迭代。

for i in range(1000): pass会导致生成一个 1000 个元素的List，而代码：for i in xrange(1000): pass
则不会生成一个 1000 个元素的List，而是在每次迭代中返回下一个数值，内存空间占用很小。因为 xrange 不返回 List，而是返回一个 iterable 对象。

```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
class Fab(object): 
    def __init__(self, max): 
        self.max = max 
        self.n, self.a, self.b = 0, 0, 1 
 
    def __iter__(self): 
        return self 
 
    def next(self): 
        if self.n < self.max: 
            r = self.b 
            self.a, self.b = self.b, self.a + self.b 
            self.n = self.n + 1 
            return r 
        raise StopIteration()
 
for n in Fab(5): 
    print(n)
```
上面的类可以理解为yield的实现。
```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
def fab(max): 
    n, a, b = 0, 0, 1 
    while n < max: 
        yield b      # 使用 yield
        # print(b) 
        a, b = b, a + b 
        n = n + 1
 
for n in fab(5): 
    print(n)

f = fab(5)
while True:
	try:
		n = next(f)
		print(n)
	except Exception as ex:
        break
```
使用next函数需要注意会有抛出异常。

yield无法知道genertor中有多少元素，需要用到的时候调用一次函数，因此无法和进度条结合使用。

## 3、再次理解
可以理解yield相当于是一个return。

迭代器有终止的时候，因此需要抛出异常。






