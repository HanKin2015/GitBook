# qt6教程

大佬：https://gitee.com/feiyangqingyun
https://blog.csdn.net/ccf19881030/article/details/113007901
[Qt学习路线一条龙](https://mp.weixin.qq.com/s/tY4eMky_Zvdx-x2PeWbUsQ)

## 英语
Horizontal 水平
spider 滑动块
spin 快速旋转

## 1、搭建环境
参考：https://zhuanlan.zhihu.com/p/683591671
在线安装工具文件：https://mirrors.nju.edu.cn/qt/official_releases/online_installers/

打开windows Powershell,配置镜像源：./文件名 --mirror https://mirror.nju.edu.cn/qt
中间需要注册qt账户，密码则是xx@123xxx。

## 2、学习教程
参考：https://www.w3cschool.cn/learnroadqt/qx5u1j3w.html

Swing 是 Java 语言的一个图形用户界面（GUI）工具包，属于 Java Foundation Classes (JFC) 的一部分。它提供了丰富的组件（如按钮、文本框、下拉菜单等）和布局管理器，用于开发跨平台的桌面应用程序。

## 3、接口查询
https://doc.qt.io/qt-6/zh/qwebsocket.html

## 4、qdoc文档工具
```
//! [0] //! [1]
AnalogClock::AnalogClock(QWidget *parent)
//! [0] //! [2]
    : QWidget(parent)
//! [2] //! [3]
{
//! [3] //! [4]
    QTimer *timer = new QTimer(this);
//! [4] //! [5]
    connect(timer, &QTimer::timeout, this, QOverload<>::of(&AnalogClock::update));
//! [5] //! [6]
    timer->start(1000);
//! [6]

    setWindowTitle(tr("Analog Clock"));
    resize(200, 200);
//! [7]
}
```

## 5、通过sender函数获取调用者
```
Button *clickedButton = qobject_cast<Button *>(sender());
```

## 6、QOverload
“QOverload” 通常与 Qt 框架相关，是 Qt 中用于处理函数重载（Function Overloading）的机制，尤其在信号与槽（Signals & Slots）系统中频繁使用。它的主要作用是帮助编译器区分同名但参数不同的重载函数，确保信号与槽能够正确连接。
```
class MyClass : public QObject {
    Q_OBJECT
public slots:
    void onValueChanged(int value);       // 重载1：参数为int
    void onValueChanged(QString value);   // 重载2：参数为QString
};

MyClass obj;
// 连接到 onValueChanged(int)
connect(sender, &Sender::valueInt, &obj, QOverload<int>::of(&MyClass::onValueChanged));
// 连接到 onValueChanged(QString)
connect(sender, &Sender::valueString, &obj, QOverload<QString>::of(&MyClass::onValueChanged));
```

## 7、可能某个组件未安装
参考：https://blog.csdn.net/qq_47494297/article/details/108387141
进入QT安装目录,打开MaintenanceTool.exe
在设置中添加镜像源：
```
https://mirrors.tuna.tsinghua.edu.cn/qt/online/qtsdkrepository/windows_x86/desktop/tools_mingw/
https://mirrors.tuna.tsinghua.edu.cn/qt/online/qtsdkrepository/windows_x86/desktop/qt6_691/
https://mirrors.tuna.tsinghua.edu.cn/qt/online/qtsdkrepository/windows_x86/desktop/qt6_dev_src_doc_examples/
https://mirrors.tuna.tsinghua.edu.cn/qt/online/qtsdkrepository/windows_x86/desktop/qt6_691_dev_wasm/
```