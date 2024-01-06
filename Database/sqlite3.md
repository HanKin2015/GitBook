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
sqlite>.mode column 以列显示数据表，默认是list，显示不规整；还有line
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
上面执行之后会导致其他语句显示不全，SELECT sql FROM sqlite_master WHERE type = 'table' AND tbl_name = 'COMPANY';
解决方式：.width on

## 13、SQLite 运算符是什么？
运算符是一个保留字或字符，主要用于 SQLite 语句的 WHERE 子句中执行操作，如比较和算术运算。

运算符用于指定 SQLite 语句中的条件，并在语句中连接多个条件。
```
SELECT * FROM COMPANY WHERE SALARY > 50000;
SELECT * FROM COMPANY WHERE AGE >= 25 AND SALARY >= 65000;
SELECT * FROM COMPANY WHERE NAME LIKE 'Ki%';
SELECT * FROM COMPANY WHERE NAME GLOB 'Ki*';
SELECT * FROM COMPANY WHERE AGE NOT IN ( 25, 27 );
```

LIKE 运算符用于把某个值与使用通配符运算符的相似值进行比较。
GLOB 运算符用于把某个值与使用通配符运算符的相似值进行比较。GLOB 与 LIKE 不同之处在于，它是大小写敏感的。

## 14、SQLite 表达式
表达式是一个或多个值、运算符和计算值的SQL函数的组合。

SQL 表达式与公式类似，都写在查询语言中。您还可以使用特定的数据集来查询数据库。
```
SELECT (15 + 6) AS ADDITION
有几个内置的函数，比如 avg()、sum()、count()，等等，执行被称为对一个表或一个特定的表列的汇总数据计算。
SELECT COUNT(*) AS "RECORDS" FROM COMPANY; 
SELECT CURRENT_TIMESTAMP;    日期表达式返回当前系统日期和时间值，这些表达式将被用于各种数据操作。
```

current_timestamp 得到的时间，时区不对，要想得到本地时间，试试下面这个：
```
select datetime('now','localtime');
```

## 15、SQLite Update 语句
SQLite 的 UPDATE 查询用于修改表中已有的记录。可以使用带有 WHERE 子句的 UPDATE 查询来更新选定行，否则所有的行都会被更新。
```
UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;
UPDATE COMPANY SET ADDRESS = 'Texas', SALARY = 20000.00;

DELETE FROM COMPANY WHERE ID = 7;
DELETE FROM COMPANY;
```

## 16、SQLite Like 子句
SQLite 的 LIKE 运算符是用来匹配通配符指定模式的文本值。如果搜索表达式与模式表达式匹配，LIKE 运算符将返回真（true），也就是 1。这里有两个通配符与 LIKE 运算符一起使用：
百分号 （%）
下划线 （_）

百分号（%）代表零个、一个或多个数字或字符。下划线（_）代表一个单一的数字或字符。这些符号可以被组合使用。

## 17、SQLite Glob 子句
SQLite 的 GLOB 运算符是用来匹配通配符指定模式的文本值。如果搜索表达式与模式表达式匹配，GLOB 运算符将返回真（true），也就是 1。与 LIKE 运算符不同的是，GLOB 是大小写敏感的，对于下面的通配符，它遵循 UNIX 的语法。
星号 （*）
问号 （?）

星号（*）代表零个、一个或多个数字或字符。问号（?）代表一个单一的数字或字符。这些符号可以被组合使用。

## 18、SQLite Limit 子句
SQLite 的 LIMIT 子句用于限制由 SELECT 语句返回的数据数量。

但是，在某些情况下，可能需要从一个特定的偏移开始提取记录。下面是一个实例，从第三位开始提取 3 个记录：
```
SELECT * FROM COMPANY LIMIT 3 OFFSET 2;
```

## 19、SQLite Order By
SQLite 的 ORDER BY 子句是用来基于一个或多个列按升序或降序顺序排列数据。
- ASC 默认值，从小到大，升序排列
- DESC 从大到小，降序排列
```
SELECT * FROM COMPANY ORDER BY NAME, SALARY ASC;
SELECT * FROM COMPANY ORDER BY NAME ASC, SALARY ASC;
```
有多个排序字段时，优先按照前面的排序，如果前面的排序中有值相同的，后面的字段才起作用，在这些值相同的记录中，按照后续字段排序！

## 20、SQLite Group By
SQLite 的 GROUP BY 子句用于与 SELECT 语句一起使用，来对相同的数据进行分组。
在 SELECT 语句中，GROUP BY 子句放在 WHERE 子句之后，放在 ORDER BY 子句之前。
```
SELECT NAME, SUM(SALARY) FROM COMPANY GROUP BY NAME ORDER BY NAME DESC;
```
表需要具有重复名称的记录，对所有记录按 NAME 列进行分组，了解每个客户的工资总额。

## 21、SQLite Having 子句
HAVING 子句允许指定条件来过滤将出现在最终结果中的分组结果。
WHERE 子句在所选列上设置条件，而 HAVING 子句则在由 GROUP BY 子句创建的分组上设置条件。

在一个查询中，HAVING 子句必须放在 GROUP BY 子句之后，必须放在 ORDER BY 子句之前。
```
SELECT * FROM COMPANY GROUP BY name HAVING count(name) < 2;
```

## 22、SQLite Distinct 关键字
SQLite 的 DISTINCT 关键字与 SELECT 语句一起使用，来消除所有重复的记录，并只获取唯一一次记录。
有可能出现一种情况，在一个表中有多个重复的记录。当提取这样的记录时，DISTINCT 关键字就显得特别有意义，它只获取唯一一次记录，而不是获取重复记录。

DISTINCT取消重复行;消除重复行;查询不重复的字段记录;关键字;相异
不同的;明显的;清晰的;清楚的;明白的;有区别的;不同种类的;确定无疑的;确切的
```
SELECT name FROM COMPANY;
SELECT DISTINCT name FROM COMPANY;
```

## 23、SQLite PRAGMA
SQLite 的 PRAGMA 命令是一个特殊的命令，可以用在 SQLite 环境内控制各种环境变量和状态标志。一个 PRAGMA 值可以被读取，也可以根据需求进行设置。

不是很清楚这个命令干啥的：https://www.runoob.com/sqlite/sqlite-pragma.html

## 24、PRIMARY KEY 约束
PRIMARY KEY 约束唯一标识数据库表中的每个记录。在一个表中可以有多个 UNIQUE 列，但只能有一个主键。在设计数据库表时，主键是很重要的。主键是唯一的 ID。
我们使用主键来引用表中的行。可通过把主键设置为其他表的外键，来创建表之间的关系。由于"长期存在编码监督"，在 SQLite 中，主键可以是 NULL，这是与其他数据库不同的地方。
主键是表中的一个字段，唯一标识数据库表中的各行/记录。主键必须包含唯一值。主键列不能有 NULL 值。
一个表只能有一个主键，它可以由一个或多个字段组成。当多个字段作为主键，它们被称为复合键。
如果一个表在任何字段上定义了一个主键，那么在这些字段上不能有两个记录具有相同的值。

看了一半天，到底主键能不能为NULL？？？

## 25、SQLite Join
SQLite 的 Join 子句用于结合两个或多个数据库中表的记录。JOIN 是一种通过共同值来结合两个表中字段的手段。
SQL 定义了三种主要类型的连接：
- 交叉连接 - CROSS JOIN
- 内连接 - INNER JOIN
- 外连接 - OUTER JOIN

### 25-1、交叉连接 - CROSS JOIN
交叉连接（CROSS JOIN）把第一个表的每一行与第二个表的每一行进行匹配。如果两个输入表分别有 x 和 y 行，则结果表有 x*y 行。由于交叉连接（CROSS JOIN）有可能产生非常大的表，使用时必须谨慎，只在适当的时候使用它们。

交叉连接的操作，它们都返回被连接的两个表所有数据行的笛卡尔积，返回到的数据行数等于第一个表中符合查询条件的数据行数乘以第二个表中符合查询条件的数据行数。
```
SELECT EMP_ID, NAME, DEPT FROM COMPANY CROSS JOIN DEPARTMENT;
SELECT * FROM COMPANY CROSS JOIN DEPARTMENT;

由于有两个ID，所以不能选择ID这列显示，否则报错：
ambiguous模棱两可的;含混不清的;不明确的
```

### 25-2、内连接 - INNER JOIN
内连接（INNER JOIN）根据连接谓词结合两个表（table1 和 table2）的列值来创建一个新的结果表。查询会把 table1 中的每一行与 table2 中的每一行进行比较，找到所有满足连接谓词的行的匹配对。当满足连接谓词时，A 和 B 行的每个匹配对的列值会合并成一个结果行。

内连接（INNER JOIN）是最常见的连接类型，是默认的连接类型。INNER 关键字是可选的。
```
SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
```

### 25-3、外连接 - OUTER JOIN
外连接（OUTER JOIN）是内连接（INNER JOIN）的扩展。虽然 SQL 标准定义了三种类型的外连接：LEFT、RIGHT、FULL，但 SQLite 只支持 左外连接（LEFT OUTER JOIN）。

外连接（OUTER JOIN）声明条件的方法与内连接（INNER JOIN）是相同的，使用 ON、USING 或 NATURAL 关键字来表达。最初的结果表以相同的方式进行计算。一旦主连接计算完成，外连接（OUTER JOIN）将从一个或两个表中任何未连接的行合并进来，外连接的列使用 NULL 值，将它们附加到结果表中。

为了避免冗余，并保持较短的措辞，可以使用 USING 表达式声明外连接（OUTER JOIN）条件。这个表达式指定一个或多个列的列表。
```
SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
```

内连接就是把外连接的结果挑选出来，外连接就是全部匹配。

## 26、SQLite Unions 子句
SQLite的 UNION 子句/运算符用于合并两个或多个 SELECT 语句的结果，不返回任何重复的行。
为了使用 UNION，每个 SELECT 被选择的列数必须是相同的，相同数目的列表达式，相同的数据类型，并确保它们有相同的顺序，但它们不必具有相同的长度。
```
INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID) VALUES (4, 'Engineering', 3 );
INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID) VALUES (5, 'Finance', 4 );
INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID) VALUES (6, 'Engineering', 5 );
INSERT INTO DEPARTMENT (ID, DEPT, EMP_ID) VALUES (7, 'Finance', 6 );

SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID UNION SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
```

### 26-1、UNION ALL 子句
UNION ALL 运算符用于结合两个 SELECT 语句的结果，包括重复行。
适用于 UNION 的规则同样适用于 UNION ALL 运算符。
```
SELECT EMP_ID, NAME, DEPT FROM COMPANY INNER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID UNION ALL SELECT EMP_ID, NAME, DEPT FROM COMPANY LEFT OUTER JOIN DEPARTMENT ON COMPANY.ID = DEPARTMENT.EMP_ID;
```

## 27、SQLite NULL 值
SQLite 的 NULL 是用来表示一个缺失值的项。表中的一个 NULL 值是在字段中显示为空白的一个值。
带有 NULL 值的字段是一个不带有值的字段。NULL 值与零值或包含空格的字段是不同的，理解这点是非常重要的。

NULL 值在选择数据时会引起问题，因为当把一个未知的值与另一个值进行比较时，结果总是未知的，且不会包含在最后的结果中。
```
UPDATE COMPANY SET ADDRESS = NULL, SALARY = NULL where ID IN(6,7);
SELECT ID, NAME, AGE, ADDRESS, SALARY FROM COMPANY WHERE SALARY IS NOT NULL;
SELECT  ID, NAME, AGE, ADDRESS, SALARY FROM COMPANY WHERE SALARY IS NULL;
```

## 28、SQLite 别名
您可以暂时把表或列重命名为另一个名字，这被称为别名。使用表别名是指在一个特定的 SQLite 语句中重命名表。重命名是临时的改变，在数据库中实际的表的名称不会改变。

列别名用来为某个特定的 SQLite 语句重命名表中的列。
```
SELECT C.ID, C.NAME, C.AGE, D.DEPT FROM COMPANY AS C, DEPARTMENT AS D WHERE C.ID = D.EMP_ID;
SELECT C.ID AS COMPANY_ID, C.NAME AS COMPANY_NAME, C.AGE, D.DEPT FROM COMPANY AS C, DEPARTMENT AS D WHERE  C.ID = D.EMP_ID;
```

和其他数据库类似，别名的关键字 as 可以被省略，结果是完全一样的。
```
SELECT id AS identification, name AS nickname FROM company;
SELECT id identification, name nickname FROM company;
```

## 29、SQLite 触发器（Trigger）
SQLite 触发器（Trigger）是数据库的回调函数，它会在指定的数据库事件发生时自动执行/调用。以下是关于 SQLite 的触发器（Trigger）的要点：

SQLite 的触发器（Trigger）可以指定在特定的数据库表发生 DELETE、INSERT 或 UPDATE 时触发，或在一个或多个指定表的列发生更新时触发。
SQLite 只支持 FOR EACH ROW 触发器（Trigger），没有 FOR EACH STATEMENT 触发器（Trigger）。因此，明确指定 FOR EACH ROW 是可选的。
WHEN 子句和触发器（Trigger）动作可能访问使用表单 NEW.column-name 和 OLD.column-name 的引用插入、删除或更新的行元素，其中 column-name 是从与触发器关联的表的列的名称。
如果提供 WHEN 子句，则只针对 WHEN 子句为真的指定行执行 SQL 语句。如果没有提供 WHEN 子句，则针对所有行执行 SQL 语句。
BEFORE 或 AFTER 关键字决定何时执行触发器动作，决定是在关联行的插入、修改或删除之前或者之后执行触发器动作。
当触发器相关联的表删除时，自动删除触发器（Trigger）。
要修改的表必须存在于同一数据库中，作为触发器被附加的表或视图，且必须只使用 tablename，而不是 database.tablename。
一个特殊的 SQL 函数 RAISE() 可用于触发器程序内抛出异常。

### 29-1、举栗子
让我们假设一个情况，我们要为被插入到新创建的 COMPANY 表（如果已经存在，则删除重新创建）中的每一个记录保持审计试验。如果我使用老表呢，即不删除重建，并不影响。
```
-- 创建日志表，每当 COMPANY 表中有一个新的记录项时，日志消息将被插入其中：
CREATE TABLE AUDIT(
    EMP_ID INT NOT NULL,
    ENTRY_DATE TEXT NOT NULL
);

-- 创建触发器
CREATE TRIGGER audit_log AFTER INSERT 
ON COMPANY
BEGIN
   INSERT INTO AUDIT(EMP_ID, ENTRY_DATE) VALUES (new.ID, datetime('now'));
END;

-- 插入新纪录并查看审计表
SELECT * FROM AUDIT;
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) VALUES (11, 'Paul', 32, 'California', 20000.00 );
SELECT * FROM AUDIT;

-- 列出所有触发器
SELECT name FROM sqlite_master WHERE type = 'trigger';

-- 列出特定表上的触发器，则使用 AND 子句连接表名
SELECT name FROM sqlite_master WHERE type = 'trigger' AND tbl_name = 'COMPANY';

-- 删除触发器
DROP TRIGGER trigger_name;
```

### 29-2、关于 for each row 和 when 的实例
for each row 是操作语句每影响到一行的时候就触发一次，也就是删了 10 行就触发 10 次，而 for each state 一条操作语句就触发一次，有时没有被影响的行也执行。sqlite 只实现了 for each row 的触发。when 和 for each row 用法是这样的：
```
CREATE TRIGGER trigger_name 
AFTER UPDATE OF id ON table_1 
FOR EACH ROW 
WHEN new.id>30 
BEGIN 
UPDATE table_2 SET id=new.id WHERE table_2.id=old.id;
END;
```
上面的触发器在 table_1 改 id 的时候如果新的 id>30 就把 表table_2 中和表table_1 id 相等的行一起改为新的 id

## 30、SQLite 索引（Index）
索引（Index）是一种特殊的查找表，数据库搜索引擎用来加快数据检索。简单地说，索引是一个指向表中数据的指针。一个数据库中的索引与一本书的索引目录是非常相似的。
拿汉语字典的目录页（索引）打比方，我们可以按拼音、笔画、偏旁部首等排序的目录（索引）快速查找到需要的字。
索引有助于加快 SELECT 查询和 WHERE 子句，但它会减慢使用 UPDATE 和 INSERT 语句时的数据输入。索引可以创建或删除，但不会影响数据。
使用 CREATE INDEX 语句创建索引，它允许命名索引，指定表及要索引的一列或多列，并指示索引是升序排列还是降序排列。
索引也可以是唯一的，与 UNIQUE 约束类似，在列上或列组合上防止重复条目。（到底是不是一定要是唯一的呢？？？）

## 附录实战
```

```






























