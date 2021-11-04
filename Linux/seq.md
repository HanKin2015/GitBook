# seq命令

```
[root@ubuntu0006:/media/hankin/vdb/study] #seq -f "str%3g" 9 11
str  9
str 10
str 11
[root@ubuntu0006:/media/hankin/vdb/study] #seq -f "str%03g" 9 11
str009
str010
str011
[root@ubuntu0006:/media/hankin/vdb/study] #seq -w 98 101
098
099
100
101
[root@ubuntu0006:/media/hankin/vdb/study] #seq -s" " -f"str%03g" 9 11
str009 str010 str011
[root@ubuntu0006:/media/hankin/vdb/study] #echo -e "/t"
/t
[root@ubuntu0006:/media/hankin/vdb/study] #seq -s"`echo -e "/t"`" 9 11
9/t10/t11
[root@ubuntu0006:/media/hankin/vdb/study] #seq -s '=' 1 5
1=2=3=4=5
```