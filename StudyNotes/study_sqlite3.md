# 学习sqlite3

关系数据库管理系统（Relational Database Management System：RDBMS）是指包括相互联系的逻辑组织和存取这些数据的一套程序 (数据库管理系统软件)。关系数据库管理系统就是管理关系数据库，并将数据逻辑组织的系统。

## 1、资料
学习网站：https://www.runoob.com/sqlite/sqlite-tutorial.html
在线编译执行：https://www.tutorialspoint.com/execute_sql_online.php
函数参考手册：https://www.runoob.com/sqlite/sqlite-functions.html

## 2、简介
SQLite是一个进程内的库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。它是一个零配置的数据库，这意味着与其他数据库不一样，您不需要在系统中配置。

就像其他数据库，SQLite 引擎不是一个独立的进程，可以按应用程序需求进行静态或动态连接。SQLite 直接访问其存储文件。

## 3、安装
- 请访问 SQLite 下载页面，从 Windows 区下载预编译的二进制文件。（Storage里面有）
- 您需要下载 sqlite-tools-win32-*.zip 和 sqlite-dll-win32-*.zip 压缩文件。
- 创建文件夹 C:\sqlite，并在此文件夹下解压上面两个压缩文件，将得到 sqlite3.def、sqlite3.dll 和 sqlite3.exe 文件。
- 添加 C:\sqlite 到 PATH 环境变量，最后在命令提示符下，使用 sqlite3 命令，将显示如下结果。

## 4、SQLite命令
详细参考：https://www.runoob.com/sqlite/sqlite-commands.html
区别于其他语言在于以.开头。
```
.help
.show

sqlite>.header on
sqlite>.mode column
sqlite>.timer on

sqlite>.schema sqlite_master
```

## 5、语法
行注释：以两个连续的 "-" 字符（ASCII 0x2d）开始
多行注释：以 "/*" 开始，并扩展至下一个 "*/" 字符对或直到输入结束

SQLite 是不区分大小写的，但也有一些命令是大小写敏感的，比如 GLOB 和 glob 在 SQLite 的语句中有不同的含义

语句简易格式参考：https://www.runoob.com/sqlite/sqlite-syntax.html

## 6、数据类型
实战中在看吧，孰能生巧。
https://www.runoob.com/sqlite/sqlite-data-types.html

## 7、创建数据库
```
sqlite3 dbName.pb
.open dbName.pb

发现sqlite3是可以简写命令的，如：
.database
.databases
.dat

.h on
.he off

.quit

$sqlite3 testDB.db .dump > testDB.sql
$sqlite3 testDB.db < testDB.sql
```
## 8、附加数据库
个人认为是数据库别名。
```
ATTACH DATABASE 'test.db' as 'test';

默认是别名是main，现在多加一个别名test。
```

## 9、分离数据库
如果同一个数据库文件已经被附加上多个别名，DETACH 命令将只断开给定名称的连接，而其余的仍然有效。您无法分离 main 或 temp 数据库。

```
DETACH DATABASE 'test';
```

注意分号和引号。

## 10、创建表
```
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);


.tables
.schema company
```

虽然教程中是大写字母，但是使用小写字母不影响。
























