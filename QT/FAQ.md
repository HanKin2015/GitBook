# QT学习中遇到的问题

## 1、运行时提示无法启动进程错误
在左侧项目选项中=》构建项目是红色的=》选择项目的目录=》运行

## 2、QObject::connect: No such slot . 当信号与槽不能链接
成员函数没有放到public slots里面，信号槽函数必须要放在这里。

## 3、error: 无法打开文件“d:\Qt\2010.05\qt\lib\qtmaind.lib”
vc的编译器， 而你安装的是mingw版本的qt。

工具-选项-构建和运行-构建套件，你应该是选择的是桌面（默认）。点击它，看看编译器那个框选择的是什么？默认选择的是M..V..C++(86)。编译方式从VS2010改成Mingw，就不会报错了

## 4、make时出现/usr/bin/ld: skipping incompatible
一个是arm架构的，一个是x86架构的，当然不兼容了 

## 5、[Qt & SSL, Handshake failed](https://stackoverflow.com/questions/21636728/qt-ssl-handshake-failed)
使用qwebview直接打开https网页报错，但是中间跳转就不会报错。

## 6、如何由QString转化为char数组
```
QString str;
char* ch;
QByteArray ba = str.toLatin1();
ch=ba.data();

or

std::string str = qstr.toStdString();
const char* ch = str.c_str();
```

## 7、 error: ‘void QTimer::timeout()’ is protected within this context connect(timer, &QTimer::timeout, this, &RelayController::onTimeout); 
```
使用新风格会报错。

//old style
connect(timer, SIGNAL(timeout()), this, SLOT(onTimeout()));
//new style
//connect(timer, &QTimer::timeout, this, &RelayController::onTimeout);
```

## 8、close和hide区别
那么close和hide区别就很明显了：
hide只是隐藏窗体。不会发送任何信号。
close一般也是隐藏窗口。但是它会发送QCloseEvent事件。你可以重写void QWidget::closeEvent(QCloseEvent * event) [virtual protected]，可以隐藏widget或者不隐藏。Qt::WA_DeleteOnClose标志还会影响窗体在内存中的状态，如果设置了该标志，窗体就会被删除，而hide则不会。最后主窗体的close会导致整个程序的退出，而hide明显不会。

PS：再对一个窗体调用close函数后，如果再调用show()，这个窗体又会被显示出来。

## 9、QOBject及其之类不允许复制拷贝
QOject 中没有提供一个拷贝构造函数和赋值操作符给外界使用，其实拷贝构造和赋值的操作都是已经声明了的，但是它们被使用了Q_DISABLE_COPY () 宏放在了private区域。因此所有继承自QObject的类都使用这个宏声明了他们的拷贝构造函数和赋值操作符为私有。 

试想如果我们有一个QPushButton对象btnSubmit，如果我们可以复制出一个和btnSubmint完全一样的button对象，那么新的button对象的名字应该是什么？如果也叫btnSubmit，当我们给其中的btnSubmit接收事件或发出信号时，系统如何区分把事件由哪个button对象接收，或者哪个对象发送了信号？ 

## 10、QT获取系统屏幕分辨率
```
QDesktopWidget* desktopWidget = QApplication::desktop();

//获取可用桌面大小
QRect deskRect = desktopWidget->availableGeometry();

//获取设备屏幕大小
QRect screenRect = desktopWidget->screenGeometry();
```

## 11、[Qt如何去掉按钮等控件的虚线框（焦点框](https://www.cnblogs.com/findumars/p/5836143.html)
```
pushButton->setFocusPolicy(Qt::NoFocus) 
pushButton->setStyleSheet("outline: none");  
pushButton->setStyleSheet("padding: -1"); 
playVideoButton->setEnable(false); 
```

## 12、[Qt 中QString 字符串操作：连接、组合、替换、去掉空白字符](https://www.cnblogs.com/meime7/p/6432529.html)
使用加号或者str = QString("%1 was born in %2.").arg("Joy").arg(1993); 

## 13、键盘事件案例
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

## 14、boder:none问题
如果在一个按钮的样式中添加了这个属性，图片会变得有点细和颜色淡。
网上搜索了很多也找不到结果。
PS：border:none和border:0的区别。

## 15、error:crosses initialization of ...
```
switch(x) {
case 1:
	int tmp = 2;
case 2:
	continue;
default:
	break;
}
上面tmp的作用域是switch整个区域，如果x!=1就会出现tmp未定义错误，所以要么添加大括号，要么写在外面声明。
```

## 16、Linux下QT执行shell命令
```
#inlucde <QProcess>

QProcess::execute("ls");
system("ls");//调用Linux C函数库中的system(const char *string);

QProcess *proc = new QProcess；
proc->start("ls");
```

[Qt5.6 QProcess::start获取标准输出](https://segmentfault.com/q/1010000014544738)

可以使用这个进行调用python文件，并且使用start可以获取shell命令的返回值。

[QT QProcess执行终端命令并实时输出回显](https://blog.csdn.net/zhizhengguan/article/details/110917027)

注意：[解决QProcess对象调用execute执行cmd命令不支持中文和空格的问题](http://qiusuoge.com/12038.html)

```
QProcess pro(0); 
QString t1 ="C:/Documents and Settings/Administrator/桌面/新建文件夹/regasm2.0.exe"; 
QStringList t2; 
t2.append("/s"); 
t2.append("/nologo"); 
t2.append("/codebase"); 
t2.append("C:/aa.dll"); 
int bret = pro.execute(t1,t2); 
```

## 17、Qt中控件new之后需不需要delete的问题
这里也牵涉到内存管理机制

可以参考文章：https://blog.csdn.net/Aidam_Bo/article/details/85698862

QT的父子对象机制是在 QWidget和QOject中实现的。当我们使用父对象来创建一个对象的时候 ，父对象会把这个对象添加到自己的子对象列表中。当这个父对象被删除的时候，它会遍历它的子对象类表并且删除每一个子对象，然后子对象们自己再删除它们自己的子对象，这样递归调用直到所有对象都被删除。 
这种父子对象机制会在很大程度上简化我们的内存管理工作，减少内存泄露的风险。我们需要显式删除（就是用Delete删除）的对象是那些使用new创建的并且没有父对象的对象(切记是new的才要delete,通过成员函数获得的对象,没有特殊说明的,千万不要随便delete.)。如果我们在删除一个对象的父对象之前删除它，QT会自动地从它的父对象的子对象列表中移除它的。

Qt 自动回收不像Java这种，有垃圾回收机制。 Qt 自动回收是靠父子关系。父亲销毁了。他的孩子也销毁。 所以为什么main函数里面main widget/dialog/mainWindow是分配在栈上的原因。其他new出来的东西都以这个widget作为父亲。 当程序最后结束了，main widget弹栈。父类被销毁。子类跟着被销毁。 所以如果你自己new 出来的。没有父类，不删除就会造成内存泄漏。

```
#include "mainwindow.h"
#include <QApplication>
#include <QTextCodec>
#include <QLabel>
 
int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
    QLabel *label =new QLabel("hello",&w);
    //这里使用new之后不需要执行delete，因为label的父类是w，而w是在栈中创建，在程序关闭的时候会自动释放，所以作为w的子类内存也被释放。
 
    QLabel *label1 =new QLabel("world");
    //这个是需要执行delete label1，否则会造成内存泄漏，因为label没有父类，所以不会为label释放内存
    w.show();
    a.exec();
    delete label1;
    label1=NULL;
    return 0;
}
```

卧槽无情，写代码要注意了，并不是所有在类中new的对象就是它的子类，检查检查检查。

纯c++的问题，其实基本上Qt已经自成一个阵营了。c++里面new出来的，你自己需要delete置空，但是Qt只要继承QObject，也就是说在对象树系统里，一般只要你delete ui，那么很多new出来的，你自己不用管的，Qt核心会帮你完成。而纯c++不行 。

## 18、qt编译解决-make[1]：lrelease：未找到命令
ts文件翻译命令，需要安装。
apt install -y qt5-linguist

## 19、defaultServiceProvider::requestService(): no service found for - "org.qt-project.qt.camera"
发现在“彩虹屁，网络流行语，饭圈常用语，最早流行起来的时间是在2017年。意思为粉丝们花式吹捧自己的偶像，浑身是宝，全是优点，字面意思为就连偶像放屁都能把它出口成章面不改色的吹成是彩虹。”

## 20、QSystemTrayIcon::setVisible: No Icon set
原因是在继承QSystemTrayIcon类后，里面单独创建了QSystemTrayIcon对象，只给创建的对象添加了图标，然后在调用类的时候还使用了show函数。
```
app = QApplication(sys.argv)
systemTrayIcon = Ui_SystemTrayIcon()
#systemTrayIcon.show()  # 注释掉就可以了
sys.exit(app.exec_())
```

## 21、调用子窗口
必须要集成相关类才行，如QDialog\QObject，还需要调用exec_()函数。
```
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QDialog

class SubWindow(QDialog):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('子窗口')
        self.setGeometry(100, 100, 300, 200)

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('主窗口')
        self.setGeometry(100, 100, 500, 400)

        button = QPushButton('打开子窗口', self)
        button.setGeometry(50, 50, 100, 30)
        button.clicked.connect(self.open_sub_window)

    def open_sub_window(self):
        sub_window = SubWindow()
        sub_window.exec_()

if __name__ == '__main__':
    app = QApplication([])
    main_window = MainWindow()
    main_window.show()
    app.exec_()
```
在Qt中，子窗口类数据可以通过信号和槽机制传递到父窗口。

## 22、程序崩溃
gdb调试无法跟踪：
```
(gdb) bt
#0  0x00007f905e1843ff in __GI___poll (fds=0x5566374221a0, nfds=3, timeout=4) at ../sysdeps/unix/sysv/linux/poll.c:29
#1  0x00007f905d83e0ae in  () at /lib/x86_64-linux-gnu/libglib-2.0.so.0
#2  0x00007f905d83e1cf in g_main_context_iteration () at /lib/x86_64-linux-gnu/libglib-2.0.so.0
#3  0x00007f905e7688e1 in QEventDispatcherGlib::processEvents(QFlags<QEventLoop::ProcessEventsFlag>) ()
    at /lib/x86_64-linux-gnu/libQtCore.so.4
#4  0x00007f905ece9207 in  () at /lib/x86_64-linux-gnu/libQtGui.so.4
#5  0x00007f905e73a38f in QEventLoop::processEvents(QFlags<QEventLoop::ProcessEventsFlag>) ()
    at /lib/x86_64-linux-gnu/libQtCore.so.4
#6  0x00007f905e73a65e in QEventLoop::exec(QFlags<QEventLoop::ProcessEventsFlag>) () at /lib/x86_64-linux-gnu/libQtCore.so.4
#7  0x00007f905e73fb2a in QCoreApplication::exec() () at /lib/x86_64-linux-gnu/libQtCore.so.4
#8  0x0000556635780599 in main ()
```

直接运行程序找到原因：
```
root@1BP3290329:/usr/local/bin# ./hankin-bar
hankin-bar: cannot connect to X server
root@1BP3290329:/usr/local/bin# export DISPLAY=:0
root@1BP3290329:/usr/local/bin# ./hankin-bar
QObject::connect: Cannot queue arguments of type 'QPair<size_t,char*>'
(Make sure 'QPair<size_t,char*>' is registered using qRegisterMetaType().)

recv: 资源暂时不可用
```

需要在代码中增加：
```
// 自定义信号槽函数参数所需
qRegisterMetaType<QPair<size_t, char*>>("QPair<size_t, char*>");
```

## 23、面试问题
https://mp.weixin.qq.com/s/oXj7fwC9649rxUSe-GI04g

学 C++ 到底能干啥？热门就业方向全攻略！：https://mp.weixin.qq.com/s/JaR0vF1UFKjx5e-KR-js7w