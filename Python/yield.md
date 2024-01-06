# Python yield 使用浅析
https://www.runoob.com/w3cnote/python-yield-used-analysis.html
更多见：D:\Github\Storage\python\study\生成器generator\README.md

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

## 4、Python函数式编程——生成器（generator）

### 4-1、创建生成器
列表受到内存限制，列表容量肯定是有限的。
并且，创建一个包含100万个元素的列表，不仅占用很大的存储空间，如果我们仅仅需要访问前1万个元素，那后面绝大多数元素占用的空间都被浪费了。
所以，如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？

创建 列表 和 生成器 的区别仅在于最外层的 [ ] 和 ( ) ， lst 是一个列表，而g 是一个生成器。我们可以直接打印出 lst 的每一个元素，但我们怎么打印出 g 的每一个元素呢？如果要把每个打印出来，可以通过 next() 函数获得生成器的下个返回值。

详情见：D:\Github\Storage\python\study\生成器generator\generator.py

也可以通过循环打印出来。

有两种方法创建：
1、通过列表生成式来创建，局限性：数据有限，无法写一些复杂的代码
2、通过函数来创建生成器。（yield）

### 4-2、迭代器中的StopIteration
什么是迭代器？它是一个带状态的对象，在你调用next()方法的时候返回容器中的下一个值，任何实现了__iter__和__next__()（python2中实现next()）方法的对象都是迭代器，__iter__返回迭代器自身，__next__返回容器中的下一个值，如果容器中没有更多元素了，则抛出StopIteration异常。可迭代对象实现了__iter__方法，该方法返回一个迭代器对象。

生成器保存的是算法，每次调用next(g) ，就计算出 g 的下一个元素的值，直到计算到最后一个元素，没有更多的元素时，抛出 StopIteration 的异常。当然，这种不断调用next() 实在是太繁琐了，虽然是点一次出现一次，但正确的做法是使用 for 循环，因为生成器也是可迭代对象。所以，我们创建了一个生成器后，基本上永远不会调用next() ，而是通过 for 循环来迭代它，并且不需要关心StopIteration 异常。

### 4-3、遍历生成器中元素的内容
1、通过next(g)，可能抛异常，StopIteration
2、通过for循环来遍历
3、通过object对象内置的_next_来遍历,当生成器中没有数据时，也会抛出异常StopIteration
4、调用内置的send函数 #必须传参数，且第一个值必须传空值，后面的值就没有限制了。

## 5、用列表推导来取代map和filter
列表推导（list commprehension）：根据一份列表来制作另外一份列表。

## 6、python 可迭代对象（Iterable）、迭代器（Iterator）、iter()、next()、__iter__()、__next__()、__getitem__()用法
https://blog.csdn.net/m0_59156726/article/details/128953086

### 6-1、next()和__next__()联系
可以认为next(iterator) = iterator.__nexti__()这两个是完全等效的，实际上也是这样。

### 6-2、for...in...
其实从2.1的例子中都已经介绍过for a in b，只要记住它其实是for a in iter(b),如果把它拆开就是：
```
c = iter(b)
c.__next__()
c.__next__()
```


