# 构建日志系统

## 1、获取当前进程线程id
https://www.zhihu.com/question/47384794
```
// 进程id
int cpp_pid = getpid();
// 线程id
int cpp_tid = QString::number(quintptr(QThread::currentThreadId())).toInt();
```

## 2、QMessageLogContext内容为空
原因是：文件信息、行数等信息在Release版本默认舍弃。我们只要在.pro文件定义一个宏

DEFINES += QT_MESSAGELOGCONTEXT

然后，重新qmake，编译（有可能要删除掉之前编译的中间文件），就可以在Release版本中正确输出日志信息。

## 3、qmake点击成了重新构建
出现如下错误： error: invalid use of incomplete type 'class Ui::ConclisionDetect'。

原因是没有更改ＵＩ中的objectName。
点击ui后缀的文件，在objectName栏修改，一般来说是字母大小写问题。

## 4、QT中 default label in switch which covers all enumeration values
由于switch时case已经举例所有结果，最后再default就会出这个警告。

## 5、 QT中QString类的使用
### 5-1、字符串连接函数
1、QString也重载的+和+=运算符。这两个运算符可以把两个字符串连接到一起。
2、QString的append()函数则提供了类似的操作，例如：

   str = "User: ";  
   str.append(userName);  
   str.append("\n");


### 5-2、获取字符串某位置的值
QString中有没有函数能截取出两个指定位置之间的字符串？
    QString x = "Nine pineapples";  
    QString y = x.mid(5, 4);            // y == "pine"  
    QString z = x.mid(5);               // z == "pineapples"
1、mid()函数接受两个参数，第一个是起始位置，第二个是取串的长度。如果省略第二个参数，则会从起始位置截取到末尾。正如上面的例子显示的那样

2、函数left()和rigt()类似，都接受一个int类型的参数n，都是对字符串进行截取。不同之处在于，left()函数从左侧截取n个字符，而right()从右侧开始截取。下面是left()的例子：

   1. QString x = "Pineapple";  
   2. QString y = x.left(4);      // y == "Pine"

### 5-3、获取字符在字符中的位置
     indexOf()
   //存在lastIndexOf（）函数，返回字符串的最后一次出现的索引?  
   QString x = "sticky question";  
   QString y = "sti";  
   x.indexOf(y);               // returns 0  
   x.indexOf(y, 1);            // returns 10  
   x.indexOf(y, 10);           // returns 10  
   x.indexOf(y, 11);           // returns -1

### 5-4、可以检测字符串是不是以某个特定的串开始或结尾。
    startsWith()    endsWith()
    
    
    if (url.startsWith("http:") && url.endsWith(".png"))  
         {  }

    这段代码等价于

   if (url.left(5) == "http:" && url.right(4) == ".png") 
         {  }

### 5-5、其他函数
字符串替换函数replace();
trimmed()函数去除字符串两侧的空白字符(注意，空白字符包括空格、Tab以及换行符，而不仅仅是空格);
toLower()和toUpper()函数会将字符串转换成小写大写字符串；
remove()和 insert()函数提供了删除和插入字符串的能力;
simplified()函数可以将串中的所有连续的空白字符替换成一个，并且把两端的空白字符去除，例如"   \t   ”会返回一个空格" "。


```
void MessageOutPut(QtMsgType type, const QMessageLogContext &context, const QString &msg)
{
    static QMutex mutex;
    mutex.lock();
    QString log_type;
    switch(type) {
        case QtDebugMsg:
            log_type = QString("DEBUG");
            break;

        case QtWarningMsg:
            log_type = QString("WARNING");
            break;

        case QtCriticalMsg:
            log_type = QString("CRITICAL");
            break;

        case QtFatalMsg:
            log_type = QString("FATAL");
            break;
        case QtInfoMsg:
            log_type = QString("INFO");
            break;
//        case QtSystemMsg:
//            break;
        default:
            log_type = QString("");
            break;
    }

    // 由于默认的文件名和函数名显示过长，特此截取处理
    int index = 0;

    // cpp文件名
    QString cpp_file = context.file;
    index = cpp_file.lastIndexOf("\\") + 1;
    cpp_file = cpp_file.mid(index);
    // cpp函数名
    QString cpp_func = context.function;
    index = cpp_func.lastIndexOf(":");
    if (index == -1) {   // 未找到,可能不是类函数
        index = cpp_func.indexOf(" ");
    }
    index++;
    cpp_func = cpp_func.mid(index, cpp_func.indexOf("(") - index);
    // 进程id
    int cpp_pid = getpid();
    // 线程id
    int cpp_tid = QString::number(quintptr(QThread::currentThreadId())).toInt();

    // 日志写到文件
    QString current_date_time = QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss");
    QString message = QString("%1 %2 [%3:%4] [%5:%6::%7] %8").arg(current_date_time).arg(log_type)
            .arg(cpp_pid).arg(cpp_tid).arg(cpp_file).arg(cpp_func).arg(context.line).arg(msg);
    QFile file(LOG_FILE_PATH);
    file.open(QIODevice::WriteOnly | QIODevice::Append);
    QTextStream text_stream(&file);
    text_stream << message << "\r\n";
    file.flush();
    file.close();
    mutex.unlock();
}
```