# 学习QML

## 1、简介
声明式脚本语言，称为 QML（Qt Meta Language 或者 Qt Modeling Language），作为 C++ 语言的一种替代。
Qt Quick 就是使用 QML 构建的一套类库。 QML 是一种基于 JavaScript 的声明式语言。
同 C++ 并列成为 Qt 的首选编程语言。

一个 QML 文档分为 import 和 declaration 两部分。

qsTr()函数就是 QObject::tr()函数的 QML 版本，用于返回可翻译的字符串。

## 2、简单hello world例子

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
