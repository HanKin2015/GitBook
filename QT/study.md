
[TOC]
# QT学习笔记3

# 1、QStandardItemModel 

QStandardItemModel 是标准的以项数据（item data）为基础的标准数据模型类，通常与 QTableView 组合成 Model/View 结构，实现通用的二维数据的管理功能。 

# 2、Qt中通过ui怎么引用不了pushbutton呢？ 原来是这样…
可能是博主在创建ui时，使用可视化设计，用拖拽的方式进行布置按钮的。

# 3、qt的相对路径
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









