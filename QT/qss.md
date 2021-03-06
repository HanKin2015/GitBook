[TOC]
# QT之Qss

# 1、Qt 的一些心得]( https://blog.csdn.net/lpt19832003/article/details/5381095 )

圆角控件 用stylesheet方式

setStyleSheet ("border:2px groove gray;border-radius:10px;padding:2px 4px;");

# 2、QT去除控件被选中后的焦点虚线框

1.用qss,一句话搞定

在qss文件中加上下面这行代码(下面号外里有怎么新建qss文件并调用)

QWidget:focus{outline: none;}  /*remove all  QWidget's focus border*/
1
只有一行,感觉很神奇,上面是对QWidget做的限制,如果你想对按钮或者输入框做限制,换成相应的QPushButton,QLineEdit即可.

或者用下面的这行也可以

QPushButton:focus{padding: -1;} // 具体负多少可以调节 

# 3、[Qt样式表之三：实现按钮三态效果的三种方法](https://www.cnblogs.com/linuxAndMcu/p/11039814.html)

```
ui->pbut_boardimg_reset->setStyleSheet("QPushButton{border-image: url(:/new/prefix1/image/showmodeimag/ok.png);}"
"QPushButton:hover{border-image: url(:/new/prefix1/image/showmodeimag/ok.png);}"
"QPushButton:pressed{border-image: url(:/new/prefix1/image/showmodeimag/ok1.png);}");
```

## qss的使用

```
/*按钮普通态*/
QPushButton
{
    /*字体为微软雅黑*/
    font-family:Microsoft Yahei;
    /*字体大小为20点*/
    font-size:20pt;
    /*字体颜色为白色*/    
    color:white;
    /*背景颜色*/  
    background-color:rgb(14 , 150 , 254);
    /*边框圆角半径为8像素*/ 
    border-radius:8px;
}

/*按钮停留态*/
QPushButton:hover
{
    /*背景颜色*/  
    background-color:rgb(44 , 137 , 255);
}

/*按钮按下态*/
QPushButton:pressed
{
    /*背景颜色*/  
    background-color:rgb(14 , 135 , 228);
    /*左内边距为3像素，让按下时字向右移动3像素*/  
    padding-left:3px;
    /*上内边距为3像素，让按下时字向下移动3像素*/  
    padding-top:3px;
}
```

```
//这是在Qt的资源下的文件,可以不用在资源下
QFile file(":/qss/myStyleSheet.qss");
//只读方式打开文件
file.open(QFile::ReadOnly);
//读取文件的所有内容，并转换成QString类型
QString styleSheet = tr(file.readAll());
//当前窗口设置样式表
//this->setStyleSheet(styleSheet);
//指定按钮设置样式表
ui->pushButton->setStyleSheet(styleSheet);
ui->pushButton_2->setStyleSheet(styleSheet);
```

# 3、Qt为控件添加图片的几种方法

qt显示图片，可以添加到QLabel和QPushButton上。

```
//1、使用QIcon类，例
    QIcon icon1;
    icon1.addFile(tr("./icon.png");
    toolButton->setICon(icon1);
 
//2、使用QPixmap类与QBitmap类：
    QPixmap icon2(tr("./icon.png"));
    toolButton->setIcon(icon2);
    toolButton->setFixedSize(icon2.size());
    
    QPixmap icon3("./icon.png");  
    icon3 = icon3.scaled(label->width(),label->height());    //将图片缩放储存
    label->setPixmap(icon3);     //显示出缩放后的图片
 
//3、使用样式表，需要创建一个qrc文件到工程，再把文件添加到里面，
    toolButton->setStyleSheet(tr("background-image: url(:/icon/icon.png);“));

```

# 4、语言国际化

 https://www.oschina.net/question/3193696_2232259?_t=t 

# 5、去掉按钮上凹凸效果

 ui->f_du_btn->setAutoFillBackground(true);
ui->f_du_btn->setFlat(true); 

# 6、去掉按钮菜单的下拉箭头

 menuButton->setStyleSheet("QPushButton::menu-indicator{image:none}"); 



```
statusputton=new QPushButton();
statusmenu =new QMenu();
QAction *online=new QAction(statusmenu);
QAction *chatme=new QAction(statusmenu);
 
//设置
online->setIcon(icon:/img/online.png);
chatme->setIcon(icon:/img/chatme.png);

statusmenu->addAction(online);
statusmenu->addAction(chatme);
 
statusputton->setMenu(statusmenu);
```

# 7、菜单栏的菜单图标大小修改icon

挺麻烦的，重新定义icon样式

```
fileMenu    = new QMenu(QObject::tr("File"),parent);
 4     newAction    = new QAction(QObject::tr("New"),parent);
 5     newAction->setIcon(QIcon("images/new.png"));//添加图标
 6     newAction->setShortcut(QKeySequence::New);//添加快捷键
 7     newAction->setStatusTip(tr("create a new file"));//添加任务栏提示
```



# 8、字体

 https://blog.csdn.net/Carry_Qt/article/details/88866530 

```

//    qApp->setFont(QFont("宋体",20,QFont::Bold));
    QFont font;
    //设置文字字体
    font.setFamily("宋体");
    //设置文字大小为50像素
    font.setPixelSize(50);
    //设置文字为粗体
    font.setBold(true);             //封装的setWeight函数
    //设置文字为斜体
    font.setItalic(true);           //封装的setStyle函数
    //设置文字大小
    font.setPointSize(20);
    //设置文字倾斜
    font.setStyle(QFont::StyleItalic);
    //设置文字粗细//enum Weight 存在5个值
    font.setWeight(QFont::Light);
    //设置文字上划线
    font.setOverline(true);
    //设置文字下划线
    font.setUnderline(true);
    //设置文字中划线
    font.setStrikeOut(true);
 
    //设置字间距%
    font.setLetterSpacing(QFont::PercentageSpacing,300);          //300%,100为默认
    //设置字间距像素值
    font.setLetterSpacing(QFont::AbsoluteSpacing,20);             //设置字间距为100像素
    //设置首个字母大写（跟参数有关，也可以设置全部大写AllUppercase）
    font.setCapitalization(QFont::Capitalize);
 
 
    //通过QFontMetrics获取字体的值
    QFontMetrics fm(font);
    qDebug() << fm.height();            //获取文字高度
    qDebug() << fm.maxWidth();          //获取文字宽度
 
    //通过QFontInfo获取也能获取字体信息
 
    QFontInfo fInfo(font);
    qDebug() << fInfo.family() <<"  "<<fInfo.style() << fInfo.pixelSize() << fInfo.overline();
 
 
    //设可以单独置QPlainTextEdit字体
    //ui->plainTextEdit->setFont(font);
 
    //将当前设置的字体设置为默认字体
    qApp->setFont(font);
```

## 字体对齐

```
Qt::Alignment alignment() const;    // 获取对齐方式  
void setAlignment(Qt::Alignment align);    // 设置对齐方式  

        这里的 Qt::Alignment 类型有以下取值。
        1）Qt::AlignLeft:：水平方向靠左。

        2）Qt::AlignRight：水平方向靠右。

        3）Qt::AlignHCenter：水平方向居中。

        4）Qt::AlignJustify：水平方向调整间距两端对齐。

        5）Qt::AlignTop：垂直方向靠上。

        6）Qt::AlignButton：垂直方向靠下。

        7）Qt::AlignVCenter：垂直方向居中。

        8）Qt::AlignCenter：等价于 Qt::AlignHCenter | Qt::AlignVCenter。
```

# 9、qwebview禁用右键

selfServiceWebView->setContextMenuPolicy(Qt::NoContextMenu);

# 10、QLabel设置底色

画直线：其中有QPrinter.drawline

但是也可以使用QLabel，然后设置大小和背景颜色。

# 11、获取http状态码

 https://cloud.tencent.com/developer/ask/178008 



又是花了大半天没有解决问题，看见一份代码博客。[Qt 之处理 QNetworkAccessManager 网络连接超时]( https://blog.csdn.net/liang19890820/article/details/53204396 )

    QVariant httpStatus = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute);
    QVariant httpStatusMessage = reply->attribute(QNetworkRequest::HttpReasonPhraseAttribute);
上面在reply->error()不等于200（不正常）时总是输出0和空值“”。然后在博客 https://blog.csdn.net/weixin_43866120/article/details/88016219 同道中人。

```
if (timer.isActive()) {  // 处理响应
    timer.stop();
    if (pReply->error() != QNetworkReply::NoError) {
        // 错误处理
        qDebug() << "Error String : " << pReply->errorString();
    } else {
        QVariant variant = pReply->attribute(QNetworkRequest::HttpStatusCodeAttribute);
        int nStatusCode = variant.toInt();
        // 根据状态码做进一步数据处理
        //QByteArray bytes = pReply->readAll();
        qDebug() << "Status Code : " << nStatusCode;
    }
} else {  // 处理超时
    disconnect(pReply, &QNetworkReply::finished, &loop, &QEventLoop::quit);
    pReply->abort();
    pReply->deleteLater();
    qDebug() << "Timeout";
}
————————————————
版权声明：本文为CSDN博主「一去丶二三里」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/liang19890820/article/details/53204396
```

然后就发现上面这段代码，发现应该在200的情况下才能获取http状态码？？？

