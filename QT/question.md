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

 QOject 中没有提供一个拷贝构造函数和赋值操作符给外界使用，其实拷贝构造和赋值的操作都是已经声明了的，但是它们被使用了Q_DISABLE_COPY () 宏放在了private区域。因此所有继承自QObject的类都使用这个宏声明了他们的拷贝构造函数和赋值操作符为私有。 

 试想如果我们有一个QPushButton对象btnSubmit，如果我们可以复制出一个和btnSubmint完全一样的button对象，那么新的button对象的名字应该是什么？如果也叫btnSubmit，当我们给其中的btnSubmit接收事件或发出信号时，系统如何区分把事件由哪个button对象接收，或者哪个对象发送了信号？ 

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

如果在一个按钮的样式中添加了这个属性，图片会变得有点细和颜色淡。

网上搜索了很多也找不到结果。

PS：border:none和border:0的区别。

# 15、error:crosses initialization of ...

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

# 16、Linux下QT执行shell命令

```
#inlucde <QProcess>

QProcess::execute("ls");
system("ls");//调用Linux C函数库中的system(const char *string);

QProcess *proc = new QProcess；
proc->start("ls");
```

[Qt5.6 QProcess::start获取标准输出](https://segmentfault.com/q/1010000014544738)

可以使用这个进行调用python文件，并且使用start可以获取shell命令的返回值。

[QT QProcess执行终端命令并实时输出回显]()

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

# 17、Qt中控件new之后需不需要delete的问题

这里也牵涉到内存管理机制

        可以参考文章：https://blog.csdn.net/Aidam_Bo/article/details/85698862
    
       QT的父子对象机制是在 QWidget和QOject中实现的。当我们使用父对象来创建一个对象的时候 ，父对象会把这个对象添加到自己的子对象列表中。当这个父对象被删除的时候，它会遍历它的子对象类表并且删除每一个子对象，然后子对象们自己再删除它们自己的子对象，这样递归调用直到所有对象都被删除。 
       这种父子对象机制会在很大程度上简化我们的内存管理工作，减少内存泄露的风险。我们需要显式删除（就是用Delete删除）的对象是那些使用new创建的并且没有父对象的对象(切记是new的才要delete,通过成员函数获得的对象,没有特殊说明的,千万不要随便delete.)。如果我们在删除一个对象的父对象之前删除它，QT会自动地从它的父对象的子对象列表中移除它的。
    
      Qt 自动回收不像Java这种，有垃圾回收机制。 Qt 自动回收是靠父子关系。父亲销毁了。他的孩子也销毁。 所以为什么main函数里面main widget/dialog/mainWindow是分配在栈上的原因。其他new出来的东西都以这个widget作为父亲。 当程序最后结束了，main widget弹栈。父类被销毁。子类跟着被销毁。 所以如果你自己new 出来的。没有父类，不删除就会造成内存泄漏。
————————————————
版权声明：本文为CSDN博主「MANY_L」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Aidam_Bo/article/details/86303096

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



# 18、qt编译解决-make[1]：lrelease：未找到命令

ts文件翻译命令，需要安装。

apt install -y qt5-linguist



[*彩虹屁*_百度百科](https://www.baidu.com/link?url=0f4ZrtxF5t_wxTRaGNmiq9zmZnJA-3i82JyYnhFj4aK2A_0Q2rR8SWf1w4ntnSHuvtkgEPIRMAcxky2qNxsdRLKRuhw_AitQRhV97AV7as_&wd=&eqid=9371048f0012d79e000000035dc1420b)

“彩虹屁，网络流行语，饭圈常用语，最早流行起来的时间是在2017年。意思为粉丝们花式吹捧自己的偶像，浑身是宝，全是优点，字面意思为就连偶像放屁都能把它出口成章面不改色的吹成是彩虹。”

## 提示Windows已遇到关键问题一分钟后自动重新启动怎么办

> sfc/verifyonly   扫描问题
>
>  sfc/scannow    修复问题
>
>  shutdown-a 命令 强制取消重启 





## 哈达是什么意思?

哈达是什么意思?哈达就是藏族和部分蒙古族人表示敬意和祝贺用的长条丝巾或纱巾，族人认为白色象征纯洁、吉利,所以,哈达多为白色，也有黄、蓝等色，而在藏族人心中五彩哈达是最为尊贵的，只有在特殊场合才会使用。

 扯哈达是什么意思?因为哈达多为丝织品，像围脖、围巾等丝织品是轮匹,撕开成条，有点像一条长长的卫生纸,所以叫扯哈达。 

 在藏族人送哈达时，往往会对客人说扎西德勒，藏语扎西德勒是什么意思呢?扎西德勒在藏语中是吉祥如意IDE意思。德勒”(delek，bde legs)是好的意思，连起来可以翻译成“吉祥如意”。在藏族，如果对方对说“扎西德勒”，可译为“欢迎”或“吉祥如意”，必须回答的是“扎西德勒，shu(第四声)”，而并不是“扎西德勒”。 

 当时的情况是：

小姑娘林茜是一名大三的学生，眼下正在[长沙](https://www.baidu.com/s?wd=长沙&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)某公司实习。到[单位一](https://www.baidu.com/s?wd=单位一&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)周，每天去厕所都能看到个别蹲位的挂钩上垂着长长短短的卫生纸，“想接着用，又怕不干净了。只想求那些姑娘少扯点。”

　　2014年8月28日，林茜借鉴网上的图片，在[洗手间](https://www.baidu.com/s?wd=洗手间&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)也贴出一张告示——是扯卫生纸，不是扯哈达。

林茜说，“我们又不要在厕所跳‘巴扎嘿’，扯那么多干吗?希望大家从点滴做起，节约用纸。” 



































