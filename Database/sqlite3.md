# 学习sqlite3

关系数据库管理系统（Relational Database Management System：RDBMS）是指包括相互联系的逻辑组织和存取这些数据的一套程序 (数据库管理系统软件)。关系数据库管理系统就是管理关系数据库，并将数据逻辑组织的系统。

## 1、资料
学习网站：https://www.runoob.com/sqlite/sqlite-tutorial.html
在线编译执行：https://www.tutorialspoint.com/execute_sql_online.php
函数参考手册：https://www.runoob.com/sqlite/sqlite-functions.html

## 2、简介
SQLite是一个进程内的库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。它是一个零配置的数据库，这意味着与其他数据库不一样，您不需要在系统中配置。

就像其他数据库，SQLite 引擎不是一个独立的进程，可以按应用程序需求进行静态或动态连接。SQLite 直接访问其存储文件。

## 3、安装与使用
- 请访问 SQLite 下载页面，从 Windows 区下载预编译的二进制文件。（D:\Github\Storage\sqlite3\安装包 里面有）
- 您需要下载 sqlite-tools-win32-*.zip 和 sqlite-dll-win32-*.zip 压缩文件。
- 创建文件夹 C:\sqlite，并在此文件夹下解压上面两个压缩文件，将得到 sqlite3.def、sqlite3.dll 和 sqlite3.exe 文件。
- 添加 C:\sqlite 到 PATH 环境变量，最后在dos命令提示符下，使用 sqlite3 命令，将进入sqlite3操作界面。

## 4、SQLite命令
详细参考：https://www.runoob.com/sqlite/sqlite-commands.html
区别于其他语言在于以.开头。
```
.help 查看帮助
.show 查看当前配置

sqlite>.header on   显示数据表列名
sqlite>.mode column 以列显示数据表，默认是list，显示不规整
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

在命令提示符中使用 SQLite .dump 点命令来导出完整的数据库在一个文本文件中
$sqlite3 testDB.db .dump > testDB.sql
可以通过简单的方式从生成的 testDB.sql 恢复
$sqlite3 testDB.db < testDB.sql
```
## 8、附加数据库
个人认为是数据库别名。
```
ATTACH DATABASE 'testDB.db' as 'test';

默认别名是main，现在多加一个别名test。
```
数据库名称 main 和 temp 被保留用于主数据库和存储临时表及其他临时数据对象的数据库。这两个数据库名称可用于每个数据库连接，且不应该被用于附加，否则将得到一个警告消息。

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

可以使用 SQLite .schema 命令得到表的完整信息
.schema COMPANY
```
虽然教程中是大写字母，但是使用小写字母不影响，即对大小写不敏感。

SQLite 的 DROP TABLE 语句用来删除表定义及其所有相关数据、索引、触发器、约束和该表的权限规范。

## 11、SQLite Insert 语句
SQLite 的 INSERT INTO 语句用于向数据库的某个表中添加新的数据行。
```
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (6, 'Kim', 22, 'South-Hall', 45000.00 );

INSERT INTO COMPANY VALUES (7, 'James', 24, 'Houston', 10000.00 );
```

## 12、SQLite Select 语句
SQLite 的 SELECT 语句用于从 SQLite 数据库表中获取数据，以结果表的形式返回数据。这些结果表也被称为结果集。

有时，由于要显示的列的默认宽度导致 .mode column，这种情况下，输出被截断。此时，您可以使用 .width num, num.... 命令设置显示列的宽度。
```
sqlite>.width 10, 20, 10
sqlite>SELECT * FROM COMPANY;
```














## 附录实战
```

```






























