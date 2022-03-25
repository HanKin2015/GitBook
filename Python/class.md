# class类的学习

## 1、不得不讲的self
对于python，只有针对类来说的self才有意义，所以python中的self，说的即是python类中的self。
以下我将结合python类的相关概念叙述，必须明确的是，self只能用在python类的方法（即函数）中。
在我看来，python的类有三个相关概念：属性（即变量）、方法（即函数）、继承。

详细可参考：https://www.cnblogs.com/masbay/p/10688541.html


## 继承
要让派生类调用基类的__init__()方法进行必要的初始化，需要在派生类使用super函数调用基类的__init__()方法
super().__init__()  #调用积累的__init__()方法(注意缩进)





