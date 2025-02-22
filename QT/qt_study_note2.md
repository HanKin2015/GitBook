# QT学习笔记2

接qt_study_note1.md文件内容

## 1、QString和string之间的转换
```
string str;
QString qstr;

qstr = QString::fromStdString(str);
str = qstr.toStdString();
```

## 2、size_t和int之间的转换
```
vector<int> vec;
size_t cnt = vec.size();
int i = static_cast<int>(cnt);
```
## 3、中文乱码
qt中使用的是unicode编码或者utf8编码。注意转换。
return QString::fromLocal8Bit(str.c_str());
并且可以使用base64编码进行转码保存，然后再解码读取。安全可靠。

## 4、QStandardItemModel 

QStandardItemModel 是标准的以项数据（item data）为基础的标准数据模型类，通常与 QTableView 组合成 Model/View 结构，实现通用的二维数据的管理功能。 

## 5、Qt中通过ui怎么引用不了pushbutton呢？ 原来是这样…
可能是博主在创建ui时，使用可视化设计，用拖拽的方式进行布置按钮的。

## 6、qt的相对路径
https://blog.csdn.net/love_gaohz/article/details/12085905
https://tieba.baidu.com/p/3150302863

①绝对路径：QApplication::applicationDirPath();是获取的执行文件exe所在的路径（qdebug的路径）。
②相对路径：这里所说的是QtCreater所用到的相对路径。在QtCreater中的“./”这个路径是bulid directory的路径。在QtCreater中可以手动设置。
Qt资源的相对路径：必须在工程的qrc文件中增加你需要的文件或者资源，引用方法是：":/路径/你的资源.png"

总结：最好在main中手动设置当前代码的路径。

```
//当前相对路径设置
QDir::setCurrent(CURRENT_DEMO_PATH);

QString applicationDirPath = QCoreApplication::applicationDirPath();
qDebug()<< "applicationDirPath = " <<applicationDirPath;

QString applicationFilePath = QCoreApplication::applicationFilePath();
qDebug()<< "applicationFilePath = " <<applicationFilePath;

QString currentPath = QDir::currentPath();  //方法一
qDebug() << "currentPath = " << currentPath;

char *current_path;     //方法二
current_path = getcwd(nullptr, 0);
if (current_path == nullptr) {
	qDebug("get current_path faild! err=%u, %s", errno, strerror(errno));
}

qDebug("current_path = %s", current_path);
currentPath = QDir::homePath();
qDebug() << "currentPath = " << currentPath;
currentPath = QDir::tempPath();
qDebug() << "currentPath = " << currentPath;
```

## 7、Qt休眠函数
可以使用Qt自带的Sleep()方法，但使用这个方法会导致主线程休眠，UI卡顿，所以采用以下函数进行休眠。
```
// 调用此函数时，传入所需休眠的毫秒数
bool MainWindow::sleep(unsigned int msec)
{
    QTime dieTime = QTime::currentTime().addMSecs(msec);
    while (QTime::currentTime() < dieTime)
        QCoreApplication::processEvents(QEventLoop::AllEvents, 100);
    return true;
}
```

## 8、QAbstractButton
在 Qt 框架中，QAbstractButton 是一个抽象基类，代表所有按钮类的公共接口。它是 Qt GUI 模块中用于创建按钮的基础类，提供了按钮的基本功能和属性。QAbstractButton 主要用于定义按钮的行为和外观，而具体的按钮类型（如 QPushButton、QRadioButton、QCheckBox 等）则继承自这个类。

- QAbstractButton 提供了按钮的状态管理功能，包括按下、释放、选中和未选中等状态。可以通过 isChecked() 和 setChecked(bool) 方法来获取和设置按钮的选中状态。
- QAbstractButton 定义了一些信号，例如 clicked() 和 toggled(bool)。

## 9、QListWidgetItem
QListWidgetItem 是 Qt 中用于处理列表项的类。用于在 QListWidget 中表示单个列表项。它是 QListWidget 的一部分，提供了基本的功能来管理列表项的显示和行为。

适用于一般的列表项管理，适合大多数需要在列表中显示数据的场景。

## 10、托盘
```
QSystemTrayIcon *mSystemTray = new QSystemTrayIcon(this);
mSystemTray->setIcon(QIcon(QString::fromStdString(".\\images\\logo.png")));
mSystemTray->setToolTip(QString::fromLocal8Bit("VDI Client"));
mSystemTray->setVisible(true); // 显示图标
mSystemTray->setContextMenu(mMenu); /* 设置系统托盘的上下文菜单 */
connect(mSystemTray, SIGNAL(activated(QSystemTrayIcon::ActivationReason)), this, SLOT(ActiveTray(QSystemTrayIcon::ActivationReason)));
```

## 11、低版本Qmenu组件中QAction无法显示tooltip
高版本方法：
```
QAction *mAction = new QAction("test");
mAction->setToolTip("This is a QAction");
mMenu->addAction(mAction);
// 启用菜单项的工具提示（高版本QT支持，测试5.14.2支持，4.8.7不支持）
mMenu->setToolTipsVisible(true);
```

低版本方法：https://blog.csdn.net/zhaoshuzhi/article/details/6178322
```
class CustomMenu : public QMenu {
public:
    CustomMenu(QWidget *parent = nullptr) : QMenu(parent) {
        // 添加菜单项
        QAction *action1 = new QAction("Action 1", this);
        QAction *action2 = new QAction("Action 2", this);
        addAction(action1);
        addAction(action2);
    }

    CustomMenu(const QString &title, QWidget *parent = nullptr) : QMenu(title, parent) {
    }

protected:
    bool event(QEvent *event) override {
        if (event->type() == QEvent::ToolTip) {
            QHelpEvent *helpEvent = static_cast<QHelpEvent *>(event);
            QAction *action = actionAt(helpEvent->pos());
            if (action && action->objectName() == TOOLTIP_VISIBLE_ACTION) {
                qDebug("%s\n", action->text().toStdString().c_str());

                // 显示自定义工具提示
                QToolTip::showText(helpEvent->globalPos(), action->toolTip(), this);
                return true; // 事件已处理
            } else {
                // 如果鼠标不在该 action 上，隐藏工具提示
                QToolTip::hideText();
            }
        }
        return QMenu::event(event); // 处理其他事件
    }
    
    void enterEvent(QEvent *event) override {
            // 鼠标进入菜单时执行的操作
            QMessageBox::information(this, "Info", "Mouse entered the menu!");
            QMenu::enterEvent(event); // 调用基类的 enterEvent
        }
    
    void leaveEvent(QEvent *event) override {
        // 鼠标离开菜单时执行的操作
        QMessageBox::information(this, "Info", "Mouse left the menu!");
        QMenu::leaveEvent(event); // 调用基类的 leaveEvent
    }
};
```

## 12、信号和槽机制
两个类之间消息传递可以使用信号和槽机制。

发送方定义信号并发射信号，接收方实例化发送方类，并connect信号和槽机制。
```
class CustomMenu : public QMenu {
    Q_OBJECT

public:
    CustomMenu(QAction *action1, const QString &title, QWidget *parent = nullptr) 
        : QMenu(title, parent), mAction1(action1) {
    }

signals:
    void menuShown(const QString &message); // 定义信号

protected:
    void showEvent(QShowEvent *event) override {
        // 在菜单显示之前禁用 action1
        if (mAction1) {
            mAction1->setDisabled(true);
            emit menuShown("Action 1 is now disabled!"); // 发射信号
        }
        QMenu::showEvent(event); // 调用基类的 showEvent
    }

private:
    QAction *mAction1; // 指向主菜单中 action1 的指针
};

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    MainWindow() {
        // 创建主菜单
        QMenu *menu = new QMenu("Main Menu", this);
        mAction1 = new QAction("Action 1", this);
        menu->addAction(mAction1);
        
        // 创建自定义菜单并传递 action1
        CustomMenu *customMenu = new CustomMenu(mAction1, "Custom Menu", this);
        menu->addMenu(customMenu);
        
        // 将主菜单添加到菜单栏
        menuBar()->addMenu(menu);

        // 连接信号和槽
        connect(customMenu, &CustomMenu::menuShown, this, &MainWindow::onMenuShown);
    }

private slots:
    void onMenuShown(const QString &message) {
        QMessageBox::information(this, "Info", message); // 处理接收到的消息
    }

private:
    QAction *mAction1; // 主菜单中的 action1
};
```

### 12-1、Q_OBJECT
Q_OBJECT 是 Qt 的元对象系统的一部分，它是一个宏，用于启用 Qt 的信号和槽机制、属性系统以及其他一些特性。具体来说，Q_OBJECT 宏的作用包括以下几个方面：

#### 1. 启用信号和槽机制
在 Qt 中，信号和槽是用于对象之间通信的机制。通过在类中使用 Q_OBJECT 宏，您可以定义信号和槽，并在运行时连接它们。没有这个宏，Qt 的元对象系统将无法识别信号和槽。

#### 2. 支持动态属性
使用 Q_OBJECT 宏的类可以使用 Qt 的动态属性系统。这意味着您可以在运行时为对象添加、修改或删除属性。

#### 3. 生成元对象代码
当您使用 Q_OBJECT 宏时，Qt 的元对象编译器（MOC）会生成额外的代码，以支持信号和槽、属性等功能。您需要确保在构建项目时，MOC 能够处理包含 Q_OBJECT 的类。

#### 4. 需要的条件
类定义: Q_OBJECT 宏必须放在类的定义中，通常是在类的公有部分之前。
MOC 处理: 确保您的构建系统（如 qmake 或 CMake）能够正确处理 MOC 生成的代码。

### 12-2、发现在mainwindow.cpp文件中QMenu正常调用，但是在mainwindow.h文件中则缺头文件
另外一个问题就是Q_OBJECT定义的类基本上一定要在mainwindow.h文件中，否则就报错debug/mainwindow.o:mainwindow.cpp:(.rdata$.refptr._ZTV10CustomMenu[.refptr._ZTV10CustomMenu]+0x0): undefined reference to `vtable for CustomMenu'。
常表示 C++ 中的虚拟表（vtable）未能正确生成。主要是因为 C++ 的编译和链接机制以及 Qt 的元对象编译器（MOC）工作原理。

## 13、不要依赖于文本内容去比较组件
使用 tr("SBC Peripheral Manage") 进行比较时，如果存在中文翻译，可能会导致比较不匹配的问题。为了确保比较的准确性，您可以使用 QAction 的 objectName 或者直接使用 QAction 的指针进行比较，而不是依赖于文本内容。

## 14、menu->menuAction()->setVisible(true);
设置与 QMenu 相关联的 QAction 的可见性，直接也把自身给隐藏了。




