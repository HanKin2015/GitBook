# pyqt5

pyqt5的官方网站：http://www.riverbankcomputing.co.uk/news
英文教程1：http://zetcode.com/gui/pyqt5/
英文教程2：https://pythonspot.com/pyqt5/
中文教程（网站暂时无法访问）：http://code.py40.com/pyqt5/16.html

https://github.com/maicss/PyQt-Chinese-tutorial
https://maicss.gitbook.io/pyqt-chinese-tutoral/pyqt5
生成pdf文档：D:\迅雷下载\PyQt5中文教程.pdf

## 1、简介
pyqt5是一套Python绑定Digia QT5应用的框架。它可用于Python2和3。
pyqt5不向后兼容pyqt4。

## 2、windows安装

### 2-1、安装 PyQt5
一种是从官网下载源码安装，另外一种是使用 pip 安装。
pip3 install PyQt5 
pip install PyQt5 -i https://pypi.douban.com/simple

### 2-2、安装 PyQt5-tools
PyQt5 不再提供常用Qt工具，比如图形界面开发工具Qt Designer、国际化翻译工具Liguist 如果开发中使用到这些，必须自行安装Qt工具。
pip install PyQt5-tools
pip install PyQt5-tools -i https://pypi.douban.com/simple

### 2-3、QT Designer
window 平台， PyQt-tools 默认安装 QT Designer.exe。

我的电脑位置：C:\Users\Administrator\Anaconda3\Library\bin\designer.exe

## 3、hello world
系统教程参考：https://maicss.gitbook.io/pyqt-chinese-tutoral/pyqt5
代码：D:\Github\Storage\qt\python

### 3-1、exec函数
```
sys.exit(app.exec_())
sys.exit(app.exec())
```
Python 3之前，exec was a reserved keyword，所以PyQt开发人员在其中添加了下划线。
在PyQT5中提供一个没有下划线的版本与C++文档一致，但保持一个带有下划线的版本以向后兼容是有意义的。所以对于Python 3的PyQt5，两个exec函数是相同的。对于较旧的PyQt，只有exec_()可用。

### 3-2、简单的窗口
### 3-3、带窗口图标
### 3-4、提示框
### 3-5、关闭窗口
### 3-6、消息盒子
### 3-7、窗口居中

## 4、菜单和工具栏

### 4-1、主窗口
### 4-2、状态栏
### 4-3、菜单栏
### 4-4、子菜单
### 4-5、勾选菜单
### 4-6、右键菜单
### 4-7、工具栏

## 5、布局管理

### 5-1、绝对定位
### 5-2、盒布局
### 5-3、栅格布局
### 5-4、制作提交反馈信息的布局

## 6、事件和信号

### 6-1、事件
signals and slots被其他人翻译成信号和槽机制。

所有的应用都是事件驱动的。事件大部分都是由用户的行为产生的，当然也有其他的事件产生方式，比如网络的连接，窗口管理器或者定时器等。调用应用的exec_()方法时，应用会进入主循环，主循环会监听和分发事件。在事件模型中，有三个角色：
- 事件源
- 事件
- 事件目标

### 6-2、Signals & Slots
### 6-3、重构事件处理器
### 6-4、事件对象
### 6-5、事件发送
### 6-6、信号发送

## 7、对话框
对话框是一个现代GUI应用不可或缺的一部分。对话是两个人之间的交流，对话框就是人与电脑之间的对话。对话框用来输入数据，修改数据，修改应用设置等等。

### 7-1、输入文字
### 7-2、选取颜色
### 7-3、选择字体
### 7-4、选择文件

## 8、控件（1）
### 8-1、QCheckBox
### 8-2、切换按钮
### 8-3、滑块
### 8-4、进度条
### 8-5、日历

## 9、控件（2）
### 9-1、图片
### 9-2、行编辑
### 9-3、QSplitter
### 9-4、下拉选框

## 10、拖拽
在GUI里，拖放是指用户点击一个虚拟的对象，拖动，然后放置到另外一个对象上面的动作。一般情况下，需要调用很多动作和方法，创建很多变量。
拖放能让用户很直观的操作很复杂的逻辑。
一般情况下，我们可以拖放两种东西：数据和图形界面。把一个图像从一个应用拖放到另外一个应用上的实质是操作二进制数据。把一个表格从Firefox上拖放到另外一个位置 的实质是操作一个图形组。

### 10-1、简单的拖放
### 10-2、拖放按钮组件

## 11、绘图
PyQt5绘图系统能渲染矢量图像、位图图像和轮廓字体文本。一般会使用在修改或者提高现有组件的功能，或者创建自己的组件。使用PyQt5的绘图API进行操作。
绘图由paintEvent()方法完成，绘图的代码要放在QPainter对象的begin()和end()方法之间。是低级接口。

### 11-1、文本涂鸦
### 11-2、点的绘画
### 11-3、颜色
### 11-4、QPen
### 11-5、QBrush
### 11-6、贝塞尔曲线
贝塞尔曲线(Bézier curve)，又称贝兹曲线或贝济埃曲线，是应用于二维图形应用程序的数学曲线。一般的矢量图形软件通过它来精确画出曲线，贝兹曲线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋，我们在绘图工具上看到的钢笔工具就是来做这种矢量曲线的。贝塞尔曲线是计算机图形学中相当重要的参数曲线，在一些比较成熟的位图软件中也有贝塞尔曲线工具，如PhotoShop等。在Flash4中还没有完整的曲线工具，而在Flash5里面已经提供出贝塞尔曲线工具。
贝塞尔曲线于1962，由法国工程师皮埃尔·贝塞尔（Pierre Bézier）所广泛发表，他运用贝塞尔曲线来为汽车的主体进行设计。贝塞尔曲线最初由Paul de Casteljau于1959年运用de Casteljau演算法开发，以稳定数值的方法求出贝兹曲线。

## 12、自定义组件
PyQt5有丰富的组件，但是肯定满足不了所有开发者的所有需求，PyQt5只提供了基本的组件，像按钮，文本，滑块等。如果你还需要其他的模块，应该尝试自己去自定义一些。
自定义组件使用绘画工具创建，有两个基本方式：根据已有的创建或改进；通过自己绘图创建。

## 13、俄罗斯方块游戏
方块是由四个小方格组成的。

俄罗斯方块游戏是世界上最流行的游戏之一。是由一名叫Alexey Pajitnov的俄罗斯程序员在1985年制作的，从那时起，这个游戏就风靡了各个游戏平台。

俄罗斯方块归类为下落块迷宫游戏。游戏有7个基本形状：S、Z、T、L、反向L、直线、方块，每个形状都由4个方块组成，方块最终都会落到屏幕底部。所以玩家通过控制形状的左右位置和旋转，让每个形状都以合适的位置落下，如果有一行全部被方块填充，这行就会消失，并且得分。游戏结束的条件是有形状接触到了屏幕顶部。

### 13-1、开发
没有图片，所以就自己用绘画画出来几个图形。每个游戏里都有数学模型的，这个也是。

开工之前：
- 用QtCore.QBasicTimer()创建一个游戏循环
- 模型是一直下落的
- 模型的运动是以小块为基础单位的，不是按像素
- 从数学意义上来说，模型就是就是一串数字而已

代码由四个类组成：Tetris, Board, Tetrominoe和Shape。Tetris类创建游戏，Board是游戏主要逻辑。Tetrominoe包含了所有的砖块，Shape是所有砖块的代码。

《其实整体来说，还是有一些难度的，学习完后如果自己来做，没有思路》

游戏很简单，所以也就很好理解。程序加载之后游戏也就直接开始了，可以用P键暂停游戏，空格键让方块直接落到最下面。游戏的速度是固定的，并没有实现加速的功能。分数就是游戏中消除的行数。

个人觉得还是有必要吃透这个代码的。

### 13-2、画出7中方块图片（状态栏提示）

### 13-3、方块上下变形

### 13-4、方块上下左右移动

### 13-5、理解contentsRect函数
- self.contentsRect().height()函数在不同的位置大小不同
- 状态栏也占用一些高度
- 无法理解的self.contentsRect()在状态栏和画布两者高度相加超越总的高度
- 因为默认值是100x30

终于理解为啥bottom不等于width了：https://blog.csdn.net/zhizhengguan/article/details/115710723
请注意，由于历史原因，由bottom()和right()函数返回的值偏离了矩形真正的右下角:right()函数返回left() + width() - 1, bottom()函数返回top() + height() - 1。由bottomRight()函数返回的point也是同样的情况。另外，topRight()函数和bottomLeft()函数的x坐标和y坐标与右真边和底边的偏差是相同的。

我们建议使用x() + width()和y() + height()来找到真正的右下角，避免使用right()和bottom()。另一种解决方案是使用QRectF: QRectF类使用浮点精度在坐标上定义平面中的矩形，QRectF::right()和QRectF::bottom()函数确实返回右坐标和底坐标。

还可以使用adjust()函数向这个矩形的坐标添加偏移量，也可以使用adjusted()函数根据对原矩形的调整获取新的矩形。如果宽度和高度是负的，使用normalized()函数来获取一个边角被交换的矩形。

此外，QRect提供了getCoords()函数，它提取矩形的左上角和右下角的位置，以及getRect()函数，它提取矩形的左上角、宽度和高度。使用setCoords()和setRect()函数一次性操作矩形的坐标和尺寸。

### 13-6、paintEvent函数的基本原理
绘制的自动触发机制如下：
- 窗口第一次显示时，
- 窗口大小调整时，
- 窗口切换或遮挡，

以上操作系统会自动产生一个绘图事件，强制这个paintEvent的运行

绘制的”手动“触发机制：

这里的手动不是手动操作正在运行的窗口程序，而是在程序中使用update或者repaint进行重绘

repaint()函数会强制产生一个即时的重绘事件；
update()函数只是在Qt下一次处理事件时才调用一次绘制事件
多次调用update(),Qt会把连续多次的绘制事件压缩成一个单一的绘制事件，这样可避免闪烁现象。

所以建议在需要重绘的时候尽量使用update，在必须实时显示绘制的时候使用repaint。

## 14、中英文翻译
参考：
https://www.jianshu.com/p/f21167a3a573
https://www.cnblogs.com/pythonsnowhiwte/p/13434853.html

PyQt 有一个可以快捷改变程序语言的方案，分三个步骤：
- hehe.ui → hehe.py (用pyuic)
- hehe.py → hehe.ts (用pylupdate)
- hehe.ts → hehe.qm (用Qt Linguist)
然后在程序中导入 hehe.qm 即可。

代码见：D:\Github\Storage\qt\python\中英文翻译
注意执行pylupdate5命令时，py文件不能放在中文路径下面。

pylupdate的目录：Python\Scripts\pylupdate5.exe（直接在anaconda prompt中直接使用命令）
Qt Linguist的目录：C:\Users\Administrator\Anaconda3\Library\bin\linguist.exe

修改py文件后，再加上一个参数 noobsolete 重新打开english.ts显示不变，但是重新打开linguist.exe程序就可以了。
pylupdate5 test.py -ts english.ts
pylupdate5 -noobsolete test.py -ts english.ts

使用linguist.exe程序打开ts文件，然后弹出设置界面，一般来说源语言是中文，目标语言是英文。
```
dialog.setTitle(_translate("Form", "标题栏"))
括号中的 'Form' 是自己指定的一个上下文（Context）。
```
需要每项每项的在linguist.exe程序中进行手动翻译，py文件中的英文是上下文，可以理解为是变量名。
将每一个进行翻译，翻译完成后，点击File-Release,就会在当前目录生成english.qm文件。

## 15、《快速掌握PyQt5》第三十五章 网络应用
https://zhuanlan.zhihu.com/p/75665490










