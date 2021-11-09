# seq命令

## 1、简介
seq命令用于产生从某个数到另外一个数之间的所有整数。

## 2、参数
```
-f, --format=格式 使用printf 样式的浮点格式
-s, --separator=字符串 使用指定字符串分隔数字（默认使用：\n）
-w, --equal-width 在列前添加0 使得宽度相同
```

## 3、实例
```
[root@ubuntu0006:/media/hankin/vdb/study] #seq -f "str%3g" 9 11   %后面指定数字的位数 默认是%g，%3g那么数字位数不足部分是空格。
str  9
str 10
str 11
[root@ubuntu0006:/media/hankin/vdb/study] #seq -f "str%03g" 9 11  这样的话数字位数不足部分是0，%前面制定字符串。
str009
str010
str011
[root@ubuntu0006:/media/hankin/vdb/study] #seq -w 98 101          不能和-f一起用，输出是同宽的。
098
099
100
101
[root@ubuntu0006:/media/hankin/vdb/study] #seq -s" " -f"str%03g" 9 11    指定空格做为分隔符号
str009 str010 str011
[root@ubuntu0006:/media/hankin/vdb/study] #echo -e "/t"
/t
[root@ubuntu0006:/media/hankin/vdb/study] #seq -s"`echo -e "/t"`" 9 11   指定/t做为分隔符号
9/t10/t11
[root@ubuntu0006:/media/hankin/vdb/study] #seq -s '=' 1 5                指定=做为分隔符号
1=2=3=4=5
```