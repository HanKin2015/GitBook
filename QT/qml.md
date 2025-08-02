# 学习QML
官方文档（强烈推荐）：https://doc.qt.io/qt-6/zh/qtquick-bestpractices.html
QML Book中文版：https://www.bookstack.cn/read/QmlBook-In-Chinese/meet_qt_5-qt5_introduction.md

## 1、简介
QML（Qt Meta-Object Language）可以帮助您创建现代的用户界面。QML 是一种声明式语言，专门用于设计用户界面，结合 C++ 可以实现强大的功能。

qsTr()函数就是 QObject::tr()函数的 QML 版本，用于返回可翻译的字符串。

QML 自 Qt 4.7 引入以来，已成为 Qt 框架中构建跨平台 UI 的核心技术。Qt 5 和 Qt 6 均支持 QML 2.x，但功能不断演进。建议新项目使用 Qt 6.x 以获取最佳性能和最新特性，同时注意检查 API 文档以确保兼容性。

最佳实践：根据项目需求灵活选择，必要时采用混合开发模式，充分发挥两者优势。

## 2、示例
直接在Qt Createor新建项目->Qt Quick Application即可运行。
demo见：D:\Github\Storage\qt\c++\QmlExample-helloworld
蒙版见：D:\Github\Storage\qt\c++\QmlExample-蒙版
这是一个使用QtQuick 2.0编写的窗口应用程序，它创建了一个全屏的黑色窗口，并在窗口中心显示了一个白色文本标签，内容为“这是一个蒙版”。该窗口设置了三个标志：Qt.FramelessWindowHint表示窗口没有边框，Qt.WindowStaysOnTopHint表示窗口总是在最顶层，Qt.WindowTransparentForInput表示窗口对输入透明。
注意：需要双屏经过任务管理器才能杀死，否则只能重启电脑，根本关不掉。

## 3、自定义一个button组件
导入时报错，只需要将qml文件放在同一个文件夹即可直接调用，注意名字的正确性。

## 4、qms和qss的区别
QML（Qt Meta-Object Language）和 QSS（Qt Style Sheets）是 Qt 框架中用于用户界面设计的两种不同技术。它们各自有不同的用途和特点。以下是它们之间的主要区别：

### 1. 定义和用途
QML:
- QML 是一种声明式语言，主要用于设计用户界面。
- 它允许开发者以一种直观的方式定义 UI 组件的结构和行为。
- QML 支持动画、状态管理和动态属性绑定，适合构建现代、流畅的用户界面。

QSS:
- QSS 是 Qt Style Sheets 的缩写，类似于 CSS（层叠样式表），用于为 Qt Widgets 应用程序设置样式。
- QSS 主要用于控制 Qt Widgets 的外观和样式，例如按钮、窗口、文本框等。
- 它不支持复杂的 UI 逻辑或动态行为，只用于样式定义。

### 2. 语法
QML 使用一种类似 JSON 的语法，支持嵌套和组件化。
QSS 的语法类似于 CSS，使用选择器和属性来定义样式。

### 3. 功能
QML:
支持动态属性绑定、信号和槽机制、状态管理和动画。
适合构建复杂的用户界面和交互逻辑。

QSS:
仅用于样式定义，不支持动态行为或复杂的逻辑。
适合简单的样式定制和外观调整。

### 4. 适用场景
QML:
适用于需要高度交互和动态内容的应用程序，如移动应用、桌面应用和嵌入式系统。
适合需要丰富动画和用户体验的场景。

QSS:
适用于传统的 Qt Widgets 应用程序，主要用于样式定制。
适合需要快速调整外观的场景。

### 5. 性能
QML 通过 Qt Quick 引擎进行渲染，通常在性能上表现良好，尤其是在处理动画和复杂界面时。
QSS 的性能相对较低，因为它主要用于静态样式定义，且不支持动态更新。

### 总结
QML 是一种用于构建现代用户界面的声明式语言，支持复杂的交互和动画。
QSS 是一种样式表语言，主要用于定制 Qt Widgets 的外观。

## 6、QML和Qt Quick区别
QML 是 Qt Quick 的基础：Qt Quick 依赖 QML 语言来描述 UI，但 QML 本身可以独立存在（如仅用于配置文件）。
C++ 是 Qt Quick 的补充：通过QObject子类和Q_PROPERTY宏，C++ 代码可暴露功能给 QML 使用。
典型工作流程：
设计师用 QML 创建 UI 原型。
开发者用 Qt Quick 框架扩展功能（如添加网络请求、数据库操作）。
通过 C++ 优化性能瓶颈。

Qt Quick是Qt5界面开发技术的统称，是以下几种技术的集合：
QML - 界面标记语言
JavaScript - 动态脚本语言
Qt C++ - 跨平台C++封装库

