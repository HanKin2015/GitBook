# turtle

## 1、解决Python的turtle模块绘制图形闪退问题
在基于Python的turtle模块进行图形绘制过程中，图形界面窗口会一闪而过，程序运行结束。

解决方法：在程序末尾添加代码：
turtle.done()

```
import turtle
turtle.showturtle()
turtle.write("起点")
turtle.forward(300)
turtle.color("red")
turtle.done()
```

## 2、