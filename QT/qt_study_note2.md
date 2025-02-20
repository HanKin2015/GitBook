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

## 11、低版本Qmenu插件中QAction无法显示tooltip
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




