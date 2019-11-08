[TOC]

# 1、运行时提示无法启动进程错误

在左侧项目选项中=》构建项目是红色的=》选择项目的目录=》运行

# 2、QObject::connect: No such slot . 当信号与槽不能链接

 成员函数没有放到public slots里面，信号槽函数必须要放在这里。

# 3、error: 无法打开文件“d:\Qt\2010.05\qt\lib\qtmaind.lib”

vc的编译器， 而你安装的是mingw版本的qt。

工具-选项-构建和运行-构建套件，你应该是选择的是桌面（默认）。点击它，看看编译器那个框选择的是什么？默认选择的是M..V..C++(86)。编译方式从VS2010改成Mingw，就不会报错了

# 4、make时出现/usr/bin/ld: skipping incompatible

 一个是arm架构的，一个是x86架构的，当然不兼容了 

# 5、[Qt & SSL, Handshake failed](https://stackoverflow.com/questions/21636728/qt-ssl-handshake-failed)

使用qwebview直接打开https网页报错，但是中间跳转就不会报错。

# 6、如何由qstring转化为char数组

```
Qstring str;
char* ch;
QByteArray ba = str.toLatin1();
ch=ba.data();

or

std::string str = qstr.toStdString();
const char* ch = str.c_str();
```

# 7、 error: ‘void QTimer::timeout()’ is protected within this context connect(timer, &QTimer::timeout, this, &RelayController::onTimeout); 

```
使用新风格会报错。

//old style
connect(timer, SIGNAL(timeout()), this, SLOT(onTimeout()));
//new style
//connect(timer, &QTimer::timeout, this, &RelayController::onTimeout);
```



# 8、close和hide区别

那么close和hide区别就很明显了：
hide只是隐藏窗体。不会发送任何信号。
close一般也是隐藏窗口。但是它会发送QCloseEvent事件。你可以重写void QWidget::closeEvent(QCloseEvent * event) [virtual protected]，可以隐藏widget或者不隐藏。Qt::WA_DeleteOnClose标志还会影响窗体在内存中的状态，如果设置了该标志，窗体就会被删除，而hide则不会。最后主窗体的close会导致整个程序的退出，而hide明显不会。



PS：再对一个窗体调用close函数后，如果再调用show()，这个窗体又会被显示出来。



# 9、QOBject及其之类不允许复制拷贝

# 10、QT获取系统屏幕分辨率

```
QDesktopWidget* desktopWidget = QApplication::desktop();

//获取可用桌面大小
QRect deskRect = desktopWidget->availableGeometry();

//获取设备屏幕大小
QRect screenRect = desktopWidget->screenGeometry();
```

# 11、[Qt如何去掉按钮等控件的虚线框（焦点框](https://www.cnblogs.com/findumars/p/5836143.html)

 pushButton->setFocusPolicy(Qt::NoFocus) 

 pushButton->setStyleSheet("outline: none");  

pushButton->setStyleSheet("padding: -1"); 

  playVideoButton->setEnable(false); 

# 12、[Qt 中QString 字符串操作：连接、组合、替换、去掉空白字符](https://www.cnblogs.com/meime7/p/6432529.html)

使用加号或者str = QString("%1 was born in %2.").arg("Joy").arg(1993); 

# 13、键盘时间爱你

```

void MainForm::keyPressEvent(QKeyEvent *ev)
{
    if(ev->key() == Qt::Key_F5)
    {
       ui->stackedWidget->reloadPage();
       return;
    }
 
    QWidget::keyPressEvent(ev);
}
 
void MainForm::keyReleaseEvent(QKeyEvent *ev)
{
    if(ev->key() == Qt::Key_F5)
    {
       ui->stackedWidget->reloadPage();
       return;
    }
 
    QWidget::keyReleaseEvent(ev);

```

# 14、boder:none问题

Geometry：几何形状

# error:crosses initialization of ...

```
switch(x) {
case 1:
	int tmp = 2;
case 2:
	continue;
default:
	break;
}
上面tmp的作用域是仄衡
```

