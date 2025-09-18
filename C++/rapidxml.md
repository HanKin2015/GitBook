# RapidXml

## 1、简介
RapidXml是指 XML DOM解析工具包。
RapidXml 试图成为最快的 XML DOM 解析工具包，同时保证解析结果的可用性、可移植性以及与 W3C 标准的兼容性。RapidXml 使用 C++ 编写，因此在操作同一数据时，其解析速度接近于 strlen() 函数。
整个解析工具包包含在一个头文件中，所以使用时不用编译也不用连接。要想使用 RapidXml 只要包含 rapidxml.hpp 即可，当然如果要用附加功能（如打印函数），你可以包含 rapidxml_print.hpp 文件。
RapidXml 为采用C++语言操作XML提供了机遇，同时结合XMPP协议也开启了诸如Wt、CxServer等基于C++的网络应用在即时通讯领域的更宽广的发展空间。

## 2、安装
官网：http://rapidxml.sourceforge.net/index.htm

## 3、疑问
https://blog.csdn.net/ljd680/article/details/104059667

```
doc.parse<0>();

//! Parses zero-terminated XML string according to given flags.
//! Passed string will be modified by the parser, unless rapidxml::parse_non_destructive flag is used.
//! The string must persist for the lifetime of the document.
//! In case of error, rapidxml::parse_error exception will be thrown.
//! <br><br>
//! If you want to parse contents of a file, you must first load the file into the memory, and pass pointer to its beginning.
//! Make sure that data is zero-terminated.
//! <br><br>
//! Document can be parsed into multiple times. 
//! Each new call to parse removes previous nodes and attributes (if any), but does not clear memory pool.
//! \param text XML data to parse; pointer is non-const to denote fact that this data may be modified by the parser.
```










