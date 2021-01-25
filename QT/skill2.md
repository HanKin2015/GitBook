[TOC]
# QT学习笔记2

接skill1.md文件内容




# 1、QString和string之间的转换
```
string str;
QString qstr;

qstr = QString::fromStdString(str);
str = qstr.toStdString();
```

# 2、size_t和int之间的转换
```
vector<int> vec;
size_t cnt = vec.size();
int i = static_cast<int>(cnt);
```
# 3、中文乱码
qt中使用的是unicode编码或者utf8编码。注意转换。
return QString::fromLocal8Bit(str.c_str());
并且可以使用base64编码进行转码保存，然后再解码读取。安全可靠。

# 4、





















