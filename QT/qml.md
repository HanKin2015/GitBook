# 学习QML

## 1、简介
QML（Qt Meta-Object Language）可以帮助您创建现代的用户界面。QML 是一种声明式语言，专门用于设计用户界面，结合 C++ 可以实现强大的功能

qsTr()函数就是 QObject::tr()函数的 QML 版本，用于返回可翻译的字符串。

## 2、简单hello world例子
直接在Qt Createor新建项目->Qt Quick Application即可运行。
```main.cpp
#include <QGuiApplication>
#include <QQmlApplicationEngine>

int main(int argc, char *argv[])
{
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);

    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    const QUrl url(QStringLiteral("qrc:/main.qml"));
    QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
                     &app, [url](QObject *obj, const QUrl &objUrl) {
        if (!obj && url == objUrl)
            QCoreApplication::exit(-1);
    }, Qt::QueuedConnection);
    engine.load(url);

    return app.exec();
}
```
```main.qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Hello World")

    MouseArea {
        anchors.fill: parent
        onClicked: {
            Qt.quit();
        }
    }

    Text {
        text: qsTr("Hello World")
        anchors.centerIn: parent
    }
}
```

## 3、自定义一个button组件
导入时报错，只需要将qml文件放在同一个文件夹即可直接调用，注意名字的正确性。

## 4、
```
import QtQuick 2.0
import QtQuick.Window 2.0

Window {
    id: root
    visible: true
    width: Screen.width
    height: Screen.height
    color: “black”
    flags: Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint | Qt.WindowTransparentForInput

    Text {
        id: text
        text: "这是一个蒙版"
        font.pixelSize: 30
        color: "white"
        anchors.centerIn: parent
    }
}
```
这是使用QtQuick语言编写的代码。QtQuick是一种基于QML（Qt Meta-Object Language）的声明性语言，用于创建用户界面和应用程序逻辑。它是Qt框架的一部分，可以与C++和其他编程语言一起使用。

这是一个使用QtQuick 2.0编写的窗口应用程序，它创建了一个全屏的黑色窗口，并在窗口中心显示了一个白色文本标签，内容为“这是一个蒙版”。该窗口设置了三个标志：Qt.FramelessWindowHint表示窗口没有边框，Qt.WindowStaysOnTopHint表示窗口总是在最顶层，Qt.WindowTransparentForInput表示窗口对输入透明。