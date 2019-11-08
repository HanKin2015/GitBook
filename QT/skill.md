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























































