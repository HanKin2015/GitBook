[TOC]

# 1、头文件

```
#include <QMainWindow>
#include <QLabel>
#include <QPushButton>
#include <QTranslator>
#include <QAction>
#include <QMenu>
#include <QProgressBar>
#include <QPushButton>
#include <QMessageBox>
#include <QtWebKitWidgets/QWebView>
#include <QDesktopServices>
#include <QDialog>
#include <QLineEdit>
#include <QWebInspector>
#include <QTranslator>
#include <QFont>
#include <QString>
#include <QLabel>
#include <QMenuBar>
#include <QToolBar>
#include <QPixmap>
#include <QWebPage>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QTimer>
#include <QEventLoop>
#include <QtNetwork/QNetworkCookieJar>
#include <QList>
#include <QtNetwork/QNetworkCookie>
#include <QVBoxLayout>
#include <QGridLayout>
#include <QHBoxLayout>
#include <QFile>
#include <QSslKey>
#include <QSettings>
```



# 2、中英文国际版

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

QString title, vmid, hide, vdiuname, shutdown, snap_enflag = "0",
    rcid = "", rcs_length = "", vmp_host = ADESK_BAR_INVALID_HOST,
    self_service;
QStringList arglists = app.arguments();
//加载语言
QTranslator qtTranslator; 
QSettings settings(LANGCONFIG_INI,QSettings::IniFormat);
QString lang = settings.value(LANG_SCTION).toString();
setLangBar(qtTranslator,lang);
app.installTranslator( &qtTranslator );

	/* 日志初始化函数 */
if (logs_init(PROGRAM_NAME) < 0) {
	fprintf(stderr, "logs_init failed\n");
	return -1;
}

for(int i = 0; i < argc; i++){
    if(arglists[i].compare("--vmid") == 0){
        vmid = arglists[i+1];
    }else if(arglists[i].compare("--title") == 0){
        title = arglists[i+1];
```





# 3、点击事件实现（按钮）

```
QPushButton *testButton = new QPushButton(this);
testButton->setText(QStringLiteral("打开网页"));
testButton->move(50, 50);
testButton->setAutoDefault(true);
(void)connect(testButton, SIGNAL(clicked()), this, SLOT(testButtonClickedSlot()));  //插槽函数需要声明在slots下面

public slots:  //注意slots声明需要修饰符private或其他
    void testButtonClickedSlot();
```



# 4、字体大小加粗

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

# [QT字体的设置](https://www.cnblogs.com/findumars/p/4966027.html)



# 5、判断指针是否实例化

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



# 6、void QTimer::timeout()’ is protected

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



# 7、qwebview清理缓存

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

# 8、按钮的三种状态

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



# 9、QLatin1String类的说明

 https://blog.csdn.net/qq_33266987/article/details/72843578 

 QLatin1String类对US-ASCII/Latin-1编码的字符串进行了简单封装，可理解为关于const char*的一个浅封装。 

QLatin1String("")比QString("")转换更快。

在程序中定义了QT_NO_CAST_FROM_ASCII的应用程序是无法使用QString的const char*相关的API函数，因此Qt提供了QLatin1String类来更高效的利用const char*的类型，它就是一个关于const char*的一个浅封装。

只要在 .pro文件里面



```cpp
DEFINES += \    QT_NO_CAST_FROM_ASCII
```

char*就不能转换成QString，这时候就可以用 QLatin1String来代替在所有需要QString的地方。


# 10、qwebview访问https网页

- 需要安装openssl环境
- 如果遇到一些网站需要安装证书会报ssl握手失败
- [QWebview Ssl 双向认证](http://www.softwareace.cn/?p=1318)

通过绕过ssl证书访问。

```
//忽略SSL错误，绕过SSL证书认证
void AdeskPopDialog::ignoreNetworkReplySslErrors(QNetworkReply* reply, const QList<QSslError> &sslErrors)
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



# 11、QT给QWebView设置自定义cookie

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

# 12、中文乱码

## qt4方式

```
QTextCodec *codec = QTextCodec::codecForName("gbk");　
QTextCodec::setCodecForLocale(codec);
QTextCodec::setCodecForCStrings(codec);
QTextCodec::setCodecForTr(codec);
```

## qt5方式

# 13、查看qt源代码

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

# 14、获取屏幕分辨率

```
QDesktopWidget* desktopWidget = QApplication::desktop();

//获取可用桌面大小
QRect deskRect = desktopWidget->availableGeometry();

//获取设备屏幕大小
QRect screenRect = desktopWidget->screenGeometry();
```

# 15、获取时间

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

# 16、隐藏最大化和最小化按钮

```
MainWindow w;
w.setWindowFlags(w.windowFlags()&~Qt::WindowMinMaxButtonsHint);
w.setWindowFlags(w.windowFlags()&~Qt::WindowMinMaxButtonsHint|Qt::WindowMaxmizeButtonHint);

在ubuntu16上，最大化按钮始终没有被隐藏，无从考证。
```



# 17、关闭webview滚动条

关闭了有问题，无法进行鼠标滚轮滚动。

头文件：#include <QWebFrame>

```
    view->page()->mainFrame()->setScrollBarPolicy(Qt::Vertical, Qt::ScrollBarAlwaysOff);
    view->page()->mainFrame()->setScrollBarPolicy(Qt::Horizontal, Qt::ScrollBarAlwaysOff);
    view->page()->mainFrame()->setScrollBarValue(Qt::Vertical, 100);
    view->page()->mainFrame()->scrollBarValue(Qt::Vertical);
```

wheelevent函数是鼠标滚轮事件。



# 18、注销登录按钮样式非常棒

圆角、颜色透明、内间距、字体





































