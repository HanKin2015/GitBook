# 重写

| 重载                                     | 重写                                            |
| :--------------------------------------- | :---------------------------------------------- |
| 同一作用域。                             | 基类与派生类之间。                              |
| 方法名称相同，但参数个数或类型必须不同。 | 方法名称、参数个数和类型都必须相同。            |
| 不需要修饰符。                           | 基类中用 ``virtual``，派生类中用 ``override``。 |

重写之前一定要先继承基类，一般来说编译不会报错，只会出现警告，有时候警告都没有，而且还能成功运行。有次我在中标麒麟上运行程序没有继承直接重写，结果还成功运行了重写结果。但是在银河麒麟上就重写失败了，但是编译都是成功的。

在Windows上creator上编译会有警告：

```
warning: C4273: “QLabel::mousePressEvent”: dll 链接不一致
c:\qt\qt5.2.1\5.2.1\msvc2010_opengl\include\qtwidgets\qlabel.h:140: 参见“mousePressEvent”的前一个定义
```

继承基类后再重写就没有这个问题了。

```
//xxx.h
class MyWebView;

class MyWebView : public QWebView
{
	Q_OBJECT
public:
	MyWebView(QWidget *parent=0): QWebView(parent){}
	~MyWebView(){}
protected:
	void mousePressEvent(QMouseEvent *event);
	void changeEvent(QEvent*);
    void mouseMoveEvent(QMouseEvent*);
    void mouseDoubleClickEvent(QMouseEvent*);
    void mouseReleaseEvent(QMouseEvent*);
};

//xxx.cpp
void MyWebView::mousePressEvent(QMouseEvent *event)
{
	QWidget::mousePressEvent(event);
}
```

