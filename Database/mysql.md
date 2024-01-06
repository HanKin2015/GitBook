# mysql

## 1、MariaDB
MariaDB是一个开源的关系型数据库管理系统，它是MySQL数据库的一个分支。它由MySQL的原始开发者之一Michael Widenius创立，旨在提供一个自由、开放和高性能的数据库解决方案。

MariaDB与MySQL非常相似，因为它们共享相同的起源和许多相同的特性。然而，MariaDB在某些方面进行了改进和增强，以提供更好的性能、可靠性和扩展性。

MariaDB的目标是成为一个完全兼容MySQL的替代品，它支持与MySQL相同的API和命令，可以无缝地替换MySQL而不需要进行任何修改。此外，MariaDB还引入了一些新的功能和优化，例如更好的查询优化器、更快的执行速度和更好的存储引擎支持。

由于其开源的特性，MariaDB受到了广泛的支持和社区参与，许多大型组织和企业选择使用MariaDB作为他们的数据库解决方案。

## 2、常用基础命令
进入数据库管理系统：mysql -u root -p
显示数据库：show databases;
进入数据库：use database_name;
显示表格：show tables;
显示表格内容：select * from table_name;
显示表格结构：describe table_name; 或者 show columns from table_name;
显示表格后5行：select * from total order by id desc limit 5;
显示表格前5行：select * from total limit 5;
统计date_time字段从2023-11-24到2023-12-25范围内device字段的总和：SELECT SUM(device) AS total_device FROM your_table_name WHERE date_time >= '2023-11-24' AND date_time <= '2023-12-25';
计算数量：SELECT COUNT(device) AS device_count FROM your_table_name WHERE date_time >= '2023-11-24' AND date_time <= '2023-12-25';

