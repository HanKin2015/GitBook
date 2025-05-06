# QT学习笔记

## 1、


## 2、中英文国际版

### 2-1、ts文件和qm文件处理
ts文件：
```
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh">
<context>
    <name>BindTargetSelectPanel</name>
    <message>
        <source>Are you OK?</source>
        <translation type="vanished">你们还好吗？</translation>
    </message>
    <message>
        <source>I am fine.</source>
        <translation>我很好。</translation>
    </message>
</context>
</TS>
```
Linux系统生成qm文件：lrelease test.ts
Windows系统生成qm文件：
QT Creator：在pro文件添加TRANSLATIONS += Translation_zh_CN.ts，然后工具-》外部-》Qt语言家-》更新翻译lupdate/发布翻译lrelease
Microsoft Visual Studio：右键-》添加-》新建项-》Qt Translation File，选择ts文件右键lrelease

### 2-2、qm文件加载示例
```
#define QM_FILE_PATH "./"           //目录路径
#define QMAIN_ZH_QM "qmain_ZH.qm"   //翻译文件

//#pragma comment(lib,"Qt5WebKitWidgets.lib")
//#pragma execution_character_set("utf-8")
```

```
- 在pro文件里添加

D:\Users\User\My Document\QT\test\mainwindow.cpp:-1: warning: C4819: 该文件包含不能在当前代码页(936)中表示的字符。请将该文件保存为 Unicode 格式以防止数据丢失】

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

    //加载语言
    QTranslator qtTranslator; 
    QSettings settings(LANGCONFIG_INI,QSettings::IniFormat);
    QString lang = settings.value(LANG_SCTION).toString();
    setLangBar(qtTranslator,lang);
    app.installTranslator(&qtTranslator);
}

//中文
void MainWindow::ChineseActionClicked()
{
    qDebug() << "Chinese";

    if  (translator  !=  nullptr){
        qApp->removeTranslator(translator);//如果之前加载过翻译文件，则移除之前的翻译文件。
        delete  translator;
        translator  =  nullptr;
    }

    translator  =  new  QTranslator;

    if (translator->load(application_dir_path + "\\zh_CN.qm")) {
        qApp->installTranslator(translator);
        ui->retranslateUi(this);

        qDebug() << "load zh_CN.qm sucssed!";
    } else {
        qDebug() << "load zh_CN.qm failed!";
    }
}
//切换位原本英文语言
void MainWindow::EnglishActionClicked()
{
    qDebug() << "English";

    if (translator  !=  nullptr){
        qApp->removeTranslator(translator);//如果之前加载过翻译文件，则移除之前的翻译文件。
        delete  translator;
        translator  =  nullptr;
        qDebug() << "???";
    }
    qApp->installTranslator(nullptr);

    ui->retranslateUi(this);
}
```

### 2-3、文本内容换行翻译
```
mRadioButton->setToolTip(tr("No running virtual application detected, the USB management\n"
                            "feature for virtual applications is currently unavailable."));

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh">
<context>
    <name>BindTargetSelectPanel</name>
    <message>
        <location filename="Systemtray.cpp" line="846"/>
        <source>No running virtual application detected, the USB management
feature for virtual applications is currently unavailable.</source>
        <translation>未检测到运行的虚拟应用，虚拟
应用USB管理功能暂不可用。</translation>
    </message>
</context>
</TS>
```

## 3、点击事件实现（按钮）

```
QPushButton *testButton = new QPushButton(this);
testButton->setText(QStringLiteral("打开网页"));
testButton->move(50, 50);
testButton->setAutoDefault(true);
(void)connect(testButton, SIGNAL(clicked()), this, SLOT(testButtonClickedSlot()));  //插槽函数需要声明在slots下面

public slots:  //注意slots声明需要修饰符private或其他
    void testButtonClickedSlot();
```

对于添加参数

## 4、字体大小加粗

```
QLabel *label = new QLabel(tr("Current page cannot be accessed"), this);
//label->setFont(QFont(NULL, 24, 75));  //中文字体大小未生效，但下面的方法可以
QFont font;
font.setPointSize(24);
font.setBold(true);
label->setFont(font);
```

QFont font ( “Microsoft YaHei”, 10, 75); //第一个属性是字体（微软雅黑），第二个是大小，第三个是加粗（权重是75）
ui->label->setFont(font);

常见权重
QFont::Light - 25 高亮
QFont::Normal - 50 正常
QFont::DemiBold - 63 半粗体
QFont::Bold - 75 粗体
QFont::Black - 87 黑体

```
QApplication a(argc, argv);
//中文支持
QTextCodec::setCodecForLocale(QTextCodec::codecForName("UTF-8"));
QTextCodec::setCodecForTr(QTextCodec::codecForName("UTF-8"));        //支持Tr中文
QTextCodec::setCodecForCStrings(QTextCodec::codecForName("UTF-8")); //支持中文文件名显示
QFont font;
font.setPointSize(160); //实际上是16的字号，但设成16却不行
font.setFamily(("wenquanyi"));
font.setBold(false);

a.setFont(font);
```

[QT字体的设置](https://www.cnblogs.com/findumars/p/4966027.html)

## 5、判断指针是否实例化

首先声明的时候需要初始化为空指针。

未实例化的指针为野指针，不是空指针。

```
QPushButton *btn = NULL;

btn = new QPushButton();  //有没有这句结果不同
if (btn != NULL) {
	QMessageBox::information(NULL,NULL,"1",NULL);
}
else {
	QMessageBox::information(NULL,NULL,"2",NULL);
}
```

## 6、void QTimer::timeout()’ is protected

神奇的错误。

```
selfSeriveTimer = new QTimer();
selfSeriveTimer->setInterval(10000);    // 设置超时时间5秒，测试使用
selfSeriveTimer->setSingleShot(true);  // 单次触发

connect(selfSeriveTimer, &QTimer::timeout, &selfSeriveLoop, &QEventLoop::quit);
connect(selfServiceReply, &QNetworkReply::finished, &selfSeriveLoop, &QEventLoop::quit);
selfSeriveTimer->start();
selfSeriveLoop.exec();  //启动事件循环

//应该写成这样
connect(selfSeriveTimer, SIGNAL(timeout()), selfSeriveLoop, SLOT(quit()));
connect(selfServiceReply, SIGNAL(finished()), selfSeriveLoop, SLOT(quit()))
```

## 7、qwebview清理缓存

[QWebView加载html，程序退出时提示内存泄漏]( https://blog.csdn.net/jigetage/article/details/79548856 )

	selfServiceWebView->settings()->clearMemoryCaches();
	selfServiceWebView->stop();
	selfServiceWebView->close();
	selfServiceWebView->deleteLater();
```
1. 需要给 QWebSettings 设置属性 QWebSettings::LocalStorageEnabled 为 true
2. 调用 QWebSettings 的 enablePersistentStorage 方法。
这个方法会同时开启很多设置：
This method will simultaneously set and enable the iconDatabasePath(), localStoragePath(), offlineStoragePath() and offlineWebApplicationCachePath().
其中最后一个已经提到了。
示例代码：
webView->settings()->setAttribute(QWebSettings::LocalStorageEnabled, true);
webView->settings()->enablePersistentStorage(QDir::homePath());
其他的设置，如 setOfflineStorageDefaultQuota 都是可选的。
```

```
QNetworkDiskCache *diskCache = new QNetworkDiskCache(this);
diskCache->setCacheDirectory("testpath");
ui->webView->page()->networkAccessManager()->setCache(diskCache);
ui->webView->page()->settings()->setMaximumPagesInCache(10);
```

## 8、按钮的三种状态
```
reloadButton->setStyleSheet("QPushButton{background-color:#17C1C5;border-radius:2px;color:#FFFFFF;}"
		"QPushButton:hover{background-color:#17C1C5;border-radius:2px;color:#FFFFFF;}"
		"QPushButton:pressed{background-color:#17C1E5;border-radius:2px;color:#FFFFFF;}"
		"QPushButton::focus{outline: none;}");
```

background-color:#17C1C5  背景色

color:#FFFFFF  字体颜色

border-radius:2px  圆角

注意：共有属性只在第一个框里设置即可，并不需要所有都进行设置。


## 9、QLatin1String类的说明
https://blog.csdn.net/qq_33266987/article/details/72843578 

 QLatin1String类对US-ASCII/Latin-1编码的字符串进行了简单封装，可理解为关于const char*的一个浅封装。 

QLatin1String("")比QString("")转换更快。

在程序中定义了QT_NO_CAST_FROM_ASCII的应用程序是无法使用QString的const char*相关的API函数，因此Qt提供了QLatin1String类来更高效的利用const char*的类型，它就是一个关于const char*的一个浅封装。

只要在 .pro文件里面

```cpp
DEFINES += \    QT_NO_CAST_FROM_ASCII
```

char*就不能转换成QString，这时候就可以用 QLatin1String来代替在所有需要QString的地方。

## 10、qwebview访问https网页

- 需要安装openssl环境
- 如果遇到一些网站需要安装证书会报ssl握手失败
- [QWebview Ssl 双向认证](http://www.softwareace.cn/?p=1318)

通过绕过ssl证书访问。

```
//忽略SSL错误，绕过SSL证书认证
void HankinPopDialog::ignoreNetworkReplySslErrors(QNetworkReply* reply, const QList<QSslError> &sslErrors)
{
	int i, sslCertificateCount;
	int sslErrorsCount = sslErrors.count();
	reply->ignoreSslErrors();
	if (sslErrorsCount == 0) {
		return;
	}
	for (i = 0; i < sslErrorsCount; i++) {
		MSG(MSG_DEBUG, "<selfservice> sslError = %s", sslErrors.at(i).errorString().toLatin1().data());
	}

	QSettings *settings = new QSettings(this);
	QByteArray keyValue = settings->value(QLatin1String("CaCertificates")).toByteArray();
	QList<QSslCertificate> sslCertificate = QSslCertificate::fromData(keyValue);

	//为每一个SSL错误添加证书
	QList<QSslCertificate> newSslCertificate;
	QStringList sslErrorsStringList;
	for (i = 0; i < sslErrorsCount; i++) {
		//过滤掉重复的错误
		if (newSslCertificate.contains((sslErrors.at(i).certificate()))) {
			continue;
		}
		sslErrorsStringList += sslErrors.at(i).errorString();
		if (!sslErrors.at(i).certificate().isNull()) {
			newSslCertific
```

## 11、QT给QWebView设置自定义cookie

头文件中定义：

```
QWebView *m_pWebView;
QNetworkCookieJar *m_pCookieJar;
```

调用：

```
QString strUrl = "www.maben.com.cn";
m_pWebView = new QWebView();
m_pCookieJar = new QNetworkCookieJar();
m_pWebView->page()->networkAccessManager()->setCookieJar(m_pCookieJar);
QList cookies;
cookies.append(QNetworkCookie("key1", "value1"));
cookies.append(QNetworkCookie("key2", "value2"));
//更多cookie按照上面的方法依次添加...
m_pCookieJar->setCookiesFromUrl(cookies, strUrl);
m_pWebView->load(strUrl);
```

使用QNetworkCookieJar类需要包含头文件#include <QtNetwork/QNetworkCookieJar>

## 12、中文乱码

### qt4方式

```
QTextCodec *codec = QTextCodec::codecForName("gbk");　
QTextCodec::setCodecForLocale(codec);
QTextCodec::setCodecForCStrings(codec);
QTextCodec::setCodecForTr(codec);
```

### qt5方式

## 13、查看qt源代码

首先要保证在安装Qt时勾选了安装源码，如果没有安装源码，可以参考http://blog.csdn.net/xiaoyink/article/details/79384876 安装组件的方式安装源码，或者卸载Qt再重新安装，安装时勾选安装源码选项，或者在Qt官网下载源码，下载好的源码如何与Qt Creator相关联待研究。

其次，要保证已安装调试器，MinGW 中附带了 GCC、GDB 等工具。所以如果安装 MinGW 版，可以使用 GDB 作为 Qt Creator 中的默认调试器；如果安装 MSVC 版，需要去微软官网额外下载 CDB 调试器。

还有有时候下载也会下载了所有源代码，使用everything查询cpp文件有可能查找到。

```
inputMenu->setWindowFlags(Qt::Popup | Qt::FramelessWindowHint);
inputMenu->setAttribute(Qt::WA_TranslucentBackground);
inputMenu->setStyleSheet("QMenu{background-color: #FFFFFF;border-radius:2px;}"
"QMenu::item{color:#495060;padding:5px 20px;}"
"QMenu::item:selected{background-color:#E7F8F9}");
```

## 14、获取屏幕分辨率

```
QDesktopWidget* desktopWidget = QApplication::desktop();

//获取可用桌面大小
QRect deskRect = desktopWidget->availableGeometry();

//获取设备屏幕大小
QRect screenRect = desktopWidget->screenGeometry();
```

## 15、获取时间

1 使用QDateTime类（毫秒精度）

```
QDateTime current_date_time = QDateTime::currentDateTime();
QString current_date = current_date_time.toString("yyyy-MM-dd hh:mm::ss.zzz");
```

2 使用QTime类

```
QTime current_time = QTime::currentTime();
int hour = current_time.hour();        //当前的小时
int minute = current_time.minute();    //当前的分
int second = current_time.second();    //当前的秒
int msec = current_time.msec();        //当前的毫秒
```

```
QDateTime qDateTime = QDateTime::fromTime_t(timestamp.toInt());
QLabel* timestampLabel = new QLabel(qDateTime.toString(tr("Ti'm'e:yy-MM-dd hh:mm")), this);
```

 https://blog.csdn.net/yangxiao_0203/article/details/6876589 

 All other input characters will be ignored. Any sequence of characters that are enclosed in singlequotes will be treated as text and not be used as an expression. Two consecutive singlequotes ("''") are replaced by a singlequote in the output. 

注意：转换的时候，如果要显示m、d、M、y等的时候需要使用单引号。

## 16、隐藏最大化和最小化按钮

```
MainWindow w;
w.setWindowFlags(w.windowFlags()&~Qt::WindowMinMaxButtonsHint);
w.setWindowFlags(w.windowFlags()&~Qt::WindowMinMaxButtonsHint|Qt::WindowMaxmizeButtonHint);

在ubuntu16上，最大化按钮始终没有被隐藏，无从考证。
```

## 17、关闭webview滚动条

关闭了有问题，无法进行鼠标滚轮滚动。

头文件：#include <QWebFrame>

```
    view->page()->mainFrame()->setScrollBarPolicy(Qt::Vertical, Qt::ScrollBarAlwaysOff);
    view->page()->mainFrame()->setScrollBarPolicy(Qt::Horizontal, Qt::ScrollBarAlwaysOff);
    view->page()->mainFrame()->setScrollBarValue(Qt::Vertical, 100);
    view->page()->mainFrame()->scrollBarValue(Qt::Vertical);
```

wheelevent函数是鼠标滚轮事件。

结论：无法修改样式，并且导航栏是向内占据一定的宽度。

改变QWebView的滚动条样式。找了很多资料，并没有找到合适的方法。网上有个在网页中css修改，不太实际。

对于 QWebView 控件来说，直接设置滚动条无效。

QWebView 基于 Webkit，Webkit 则可以通过 CSS3 来修改浏览器的滚动条样式的。

将样式写到 CSS 中，在 HTML 中引用它，然后用 QWebView::setHtml() 调用，就可以了。

```
通过QT端没有找到方法。
最后只有在网页中设置添加样式

html.append("<style>");
html.append(" ::-webkit-scrollbar{width:0.8em;}");
html.append(" ::-webkit-scrollbar-track{background:rgb(241,241,241);}");
html.append(" ::-webkit-scrollbar-thumb{background:rgb(188,188,188);}");
html.append("</style>");
```

## 18、注销登录按钮样式非常棒

圆角、颜色透明、内间距、字体

```
void MyPopDialog::initLogoutPushButton(){
	QButton *logoutPushButton = new QButton(tr("Log Out"), this);
	QIcon logoutPushButtonIcon(":/png/logout.png");
	logoutPushButton->setNormalStyle("background-color:rgba(231, 231, 231, 25);"
		"border:1px solid rgba(231, 231, 231, 51);font-size: 18px;color:white;");
	logoutPushButton->setHoverStyle("background-color:rgba(231, 231, 231, 89);"
		"border:1px solid rgba(231, 231, 231, 204);font-size: 18px;color:white;");
	logoutPushButton->resize(136, 48);
	logoutPushButton->setIcon(logoutPushButtonIcon);
	logoutPushButton->setIconSize(QSize(24, 24));
	logoutPushButton->setAutoDefault(true);
	logoutPushButton->setVisible(true);
	connect(logoutPushButton, SIGNAL(clicked()), this, SLOT(logoutPushButtonSlot()));
}
```

## 19、给窗体加边框

父窗口加边框后子窗口也会有。

```
border: 1px solid #A3A3A3;
border: none;
border-radius:5px;
```

## 20、禁止右键
setContextMenuPolicy (Qt::NoContextMenu); //屏蔽默认鼠标右键功能

## 21、QT判断鼠标是否在某子窗口控件上方

需要注意的是，子窗口获取geometry，是相对于父窗口的相对位置，QCursor::pos()获取的是鼠标绝对位置，要不将父窗口的相对位置进行换算，要不将鼠标的绝对位置进行换算，这里本文采用将鼠标绝对位置换算到控件上，示例代码如下：

```
if(ui->groupBox->geometry().contains(this->mapFromGlobal(QCursor::pos())))
```

## 22、QPoint和SpicePoint类相像，都包含x和y值

## 23、模态和非模态

**1、主要讲的是对QWidget设置模态窗口**

第一种方法：是在构造函数中写上：

```cpp
setWindowFlags(Qt::FramelessWindowHint);



setAttribute(Qt::WA_showModal, true);    
```



但这种方法已经在Qt4.5中被摒弃了，因为按照这样设置，对话框是无法使用触摸屏输入法的，只能用按键输入；

**第二种方法：是在构造函数中写上：**

```cpp
setWindowFlags(Qt::FramelessWindowHint | Qt::Dialog);



setWindowModality(Qt::WindowModal);   
```

 其中Qt::Dialog这个属性是要加的，因为这个属性会告诉Qt这个窗口是要被当做对话框对待的，从而实现预期的效果。而下面那个函数的参数有3种：Qt::NonModal ：该窗口不是模态，不会阻塞其它界面接受输入信息；Qt::WindowModal：该窗口是一个当以层次的模态窗口，会阻塞它的父窗口、祖父窗口和各个兄弟窗口接受输入信息；Qt::ApplicationModal：该窗口是应用模态窗口，会阻塞所有窗口接受输入信息。用第二种就能够在弹出来的对话框中接收输入法信息。

**2、但是用了上面第二种方法设置了模态，还是没用的原因：**

答案：因为你没设置父窗口，qt帮助文档原文是：

  The window is modal to a single window hierarchy and blocks input to its parent window, all grandparent windows, and all siblings of its parent and grandparent window



  因为设置模态会的时候，Qt会根据当前窗口的父窗口是哪个，递归往上层找，然后将应该阻塞的全部阻塞，故没有效果的原因是该Widget没有父窗口。



  或许有些人说在new widget的时候，将父窗口的this指针传进去了，但是模态窗口的属性是在对话框创建的时候确定的，可若是父窗口QWidget根本就还没有完全创建完，因此parent还是0，故设置对话框失效！

  **解决办法就是自定义一个槽函数，当按键按下时才在槽函数里面创建对话框，此时QWidget已经创建完成，可以将this传入，这样就能够获得预想的结果。**

## 24、QString和string之间的转换
```
string str;
QString qstr;

qstr = QString::fromStdString(str);
str = qstr.toStdString();
```

## 25、size_t和int之间的转换
```
vector<int> vec;
size_t cnt = vec.size();
int i = static_cast<int>(cnt);
```
## 26、中文乱码
qt中使用的是unicode编码或者utf8编码。注意转换。
return QString::fromLocal8Bit(str.c_str());
并且可以使用base64编码进行转码保存，然后再解码读取。安全可靠。

## 27、QStandardItemModel 
QStandardItemModel 是标准的以项数据（item data）为基础的标准数据模型类，通常与 QTableView 组合成 Model/View 结构，实现通用的二维数据的管理功能。 

## 28、Qt中通过ui怎么引用不了pushbutton呢？ 原来是这样…
可能是博主在创建ui时，使用可视化设计，用拖拽的方式进行布置按钮的。

## 29、qt的相对路径
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

## 30、Qt休眠函数
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

## 31、QAbstractButton
在 Qt 框架中，QAbstractButton 是一个抽象基类，代表所有按钮类的公共接口。它是 Qt GUI 模块中用于创建按钮的基础类，提供了按钮的基本功能和属性。QAbstractButton 主要用于定义按钮的行为和外观，而具体的按钮类型（如 QPushButton、QRadioButton、QCheckBox 等）则继承自这个类。

- QAbstractButton 提供了按钮的状态管理功能，包括按下、释放、选中和未选中等状态。可以通过 isChecked() 和 setChecked(bool) 方法来获取和设置按钮的选中状态。
- QAbstractButton 定义了一些信号，例如 clicked() 和 toggled(bool)。

## 32、QListWidgetItem
QListWidgetItem 是 Qt 中用于处理列表项的类。用于在 QListWidget 中表示单个列表项。它是 QListWidget 的一部分，提供了基本的功能来管理列表项的显示和行为。

适用于一般的列表项管理，适合大多数需要在列表中显示数据的场景。

- 对于不可用且不可选中的项，使用 item->setFlags(Qt::ItemIsEnabled);，这将使项不可选中且不可用。
- 对于可选中的项，使用 item->setFlags(Qt::ItemIsSelectable | Qt::ItemIsEnabled);，这将使项可选中。

去掉虚框：
```
"QListWidget::item:selected {"
"   background-color: #A6BFFF;" // 选中项的背景色
"   color: white;" // 选中项的文字颜色
"   outline: none;" // 去掉选中项的虚框
"}"

button->setStyleSheet("QPushButton:focus { outline: none; }");
```

## 33、托盘
```
QSystemTrayIcon *mSystemTray = new QSystemTrayIcon(this);
mSystemTray->setIcon(QIcon(QString::fromStdString(".\\images\\logo.png")));
mSystemTray->setToolTip(QString::fromLocal8Bit("VDI Client"));
mSystemTray->setVisible(true); // 显示图标
mSystemTray->setContextMenu(mMenu); /* 设置系统托盘的上下文菜单 */
connect(mSystemTray, SIGNAL(activated(QSystemTrayIcon::ActivationReason)), this, SLOT(ActiveTray(QSystemTrayIcon::ActivationReason)));
```

## 34、低版本Qmenu组件中QAction无法显示tooltip
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

## 35、信号和槽机制
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

### 35-1、Q_OBJECT
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

### 35-2、发现在mainwindow.cpp文件中QMenu正常调用，但是在mainwindow.h文件中则缺头文件
另外一个问题就是Q_OBJECT定义的类基本上一定要在mainwindow.h文件中，否则就报错debug/mainwindow.o:mainwindow.cpp:(.rdata$.refptr._ZTV10CustomMenu[.refptr._ZTV10CustomMenu]+0x0): undefined reference to `vtable for CustomMenu'。
常表示 C++ 中的虚拟表（vtable）未能正确生成。主要是因为 C++ 的编译和链接机制以及 Qt 的元对象编译器（MOC）工作原理。

## 36、不要依赖于文本内容去比较组件
使用 tr("SBC Peripheral Manage") 进行比较时，如果存在中文翻译，可能会导致比较不匹配的问题。为了确保比较的准确性，您可以使用 QAction 的 objectName 或者直接使用 QAction 的指针进行比较，而不是依赖于文本内容。

## 37、menu->menuAction()->setVisible(true);
设置与 QMenu 相关联的 QAction 的可见性，直接也把自身给隐藏了。

## 38、窗口属性
在 Qt 中，窗口属性是指用于控制窗口行为和外观的各种设置。

### 38-1、窗口类型（Window Type）
```
Qt::Widget               //是一个窗口或部件，有父窗口就是部件，没有就是窗口，普通窗口
Qt::Window               //是一个窗口，有窗口边框和标题
Qt::Dialog               //是一个对话框窗口，通常用于获取用户输入
Qt::Sheet                //是一个窗口或部件Macintosh表单
Qt::Drawer               //是一个窗口或部件Macintosh抽屉，去掉窗口左上角的图标
Qt::Popup                //是一个弹出式顶层窗口，通常用于上下文菜单或提示
Qt::Tool                 //是一个工具窗口，通常用于辅助主窗口。
Qt::ToolTip              //是一个提示窗口，没有标题栏和窗口边框
Qt::SplashScreen         //是一个欢迎窗口，启动画面，通常在应用程序启动时显示
Qt::Desktop              //是一个桌面窗口或部件
Qt::SubWindow            //是一个子窗口
Qt::ForeignWindow
Qt::ForeignWindow
```

### 38-2、窗口状态（Window State）
```
Qt::WindowNoState：窗口没有状态。
Qt::WindowMinimized：窗口最小化。
Qt::WindowMaximized：窗口最大化。
Qt::WindowFullScreen：窗口全屏显示。
```
### 38-3、窗口标志（Window Flags）
窗口标志用于控制窗口的外观和行为。常用的标志包括：
```
Qt::X11BypassWindowManagerHint = Qt::BypassWindowManagerHint 
X11BypassWindowManagerHint用于指示窗口管理器忽略该窗口的管理，窗口将不会被窗口管理器控制，窗口管理器将不会对其进行任何操作（如移动、调整大小、显示等）
BypassWindowManagerHint与 X11BypassWindowManagerHint 类似，也用于指示窗口管理器忽略该窗口的管理。这个属性在不同的窗口系统中可能有不同的实现，但其核心功能是相同的

Qt::FramelessWindowHint：无边框窗口。
Qt::WindowTitleHint：显示窗口标题。
Qt::WindowSystemMenuHint：显示系统菜单。
Qt::WindowMinimizeButtonHint 显示最小化按钮。
Qt::WindowMaximizeButtonHint 显示最大化按钮。
Qt::WindowMinMaxButtonsHint = Qt::WindowMinimizeButtonHint | Qt::WindowMaximizeButtonHint
Qt::WindowContextHelpButtonHint
Qt::WindowShadeButtonHint
Qt::WindowStaysOnTopHint	//总在最上面的窗口,置前
Qt::WindowTransparentForInput   用于指示窗口对输入事件透明。设置此属性后，窗口将不会接收任何输入事件（如鼠标点击、键盘输入等），输入事件将直接传递给下面的窗口，通常用于创建透明窗口或覆盖窗口

Qt::CustomizeWindowHint          //关闭默认窗口标题提示
Qt::WindowStaysOnBottomHint
Qt::WindowCloseButtonHint：显示关闭按钮。
Qt::MacWindowToolBarButtonHint
Qt::BypassGraphicsProxyWidget
Qt::WindowFullscreenButtonHint
```

### 38-4、窗口尺寸策略（Size Policy）
窗口的尺寸策略决定了窗口在布局中的行为。常用的尺寸策略包括：
```
QSizePolicy::Fixed：固定大小。
QSizePolicy::Minimum：最小大小。
QSizePolicy::Maximum：最大大小。
QSizePolicy::Preferred：首选大小。
QSizePolicy::Expanding：可扩展大小。
```

## 39、QLabel的文字内容分为中文和英文两种显示，怎么才能让文字自适应长度
```
#MyLabel
{
    min-width: 64px;
    min-height: 18px;
    max-width: 96px;
    max-height: 18px;
    background: #E5EDFF;
    margin-right: 5px;
    font-size: 12px;
    border: 1px solid #A6BFFF;
}
```
去掉width和height属性，这样QLabel就会根据文字内容进行匹配，注意最小长度倒是会生效，如果文字内容小于最大长度，则取文字内容长度，如果大于最大长度，则取最大长度。似乎没有完美的答案。

## 40、QFrame
QFrame 是 Qt 框架中的一个重要类，主要用于创建具有边框和背景的矩形区域。它可以用作其他小部件的容器，或者作为独立的界面元素。以下是对 QFrame 的详细介绍，包括其特性、用法和常见示例。

1. 基本概念
- 类定义：QFrame 是 QWidget 的子类，提供了一个可以显示边框和背景的矩形区域。
- 用途：常用于创建分隔线、面板、容器等，可以包含其他小部件。

2. 主要特性
- 边框样式：可以设置不同的边框样式，如无边框、单线边框、双线边框等。
- 背景颜色：可以设置背景颜色和样式。
- 布局管理：可以使用布局管理器（如 QVBoxLayout、QHBoxLayout 等）来管理内部小部件的布局。
- 可扩展性：可以通过继承 QFrame 来创建自定义的框架。

## 41、伸缩因子
在 Qt 中，使用 QHBoxLayout 布局可以方便地将多个组件水平排列。要实现左对齐的组件之间间隔 8 像素，以及右对齐的组件之间间隔 5 像素。
使用 addStretch()：在左对齐和右对齐的组件之间添加伸缩因子，以便将它们分开。

## 42、width、height、min-width、min-height、max-width 和 max-heightwidth 和 height、
如果元素的内容（如文本、图片等）超出了 width 和 height 的限制，浏览器可能会根据内容的大小调整元素的实际尺寸。
通过同时设置 min-width 和 max-width，你可以确保元素的宽度始终保持在设置的值，不会因为内容的变化而改变。

## 43、关闭setToolTip功能
```
yourWidget->setToolTip(""); // 设置空的工具提示

yourWidget->setAttribute(Qt::WA_NoToolTips);

#include <QWidget>
#include <QToolTip>

// 继承并重写 event 方法
class NoToolTipWidget : public QWidget {
public:
    NoToolTipWidget(QWidget *parent = nullptr) : QWidget(parent) {}

protected:
    bool event(QEvent *event) override {
        if (event->type() == QEvent::ToolTip) {
            // 不处理工具提示事件
            return true; // 返回 true 表示事件已处理，不再显示工具提示
        }
        return QWidget::event(event); // 处理其他事件
    }
};
```










