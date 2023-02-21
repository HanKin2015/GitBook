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

## 4、进一步理解
打印九九乘法表：seq 9 | sed 'H;g' | awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'

默认为1开始
```
[root@ubuntu0006:/media] #seq 5
1
2
3
4
5
[root@ubuntu0006:/media] #seq 3 5
3
4
5
[root@ubuntu0006:/media] #seq -3 5
-3
-2
-1
0
1
2
3
4
5
```

sed 'H;g'
```
[root@ubuntu0006:/media] #seq 3 | sed 'H'
1
2
3
[root@ubuntu0006:/media] #seq 3 | sed 'H;'
1
2
3
[root@ubuntu0006:/media] #seq 3 | sed 'H;g'

1

1
2

1
2
3
[root@ubuntu0006:/media] #seq 3 | sed 'g'



[root@ubuntu0006:/media] #seq 3 | sed ';g'



```
g：[address[,address]]g 将hold space中的内容拷贝到pattern space中，原来pattern space里的内容清除
H：[address[,address]]H 将pattern space中的内容append到hold space\n后


awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'

NF	一条记录的字段的数目
NR	已经读出的记录数，就是行号，从1开始
RS	记录分隔符(默认是一个换行符)
```
[root@ubuntu0006:/media] #101111111011'H;g' | awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'
1x1=1
1x2=2   2x2=4
1x3=3   2x3=6   3x3=9
1x4=4   2x4=8   3x4=12  4x4=16
1x5=5   2x5=10  3x5=15  4x5=20  5x5=25
1x6=6   2x6=12  3x6=18  4x6=24  5x6=30  6x6=36
1x7=7   2x7=14  3x7=21  4x7=28  5x7=35  6x7=42  7x7=49
1x8=8   2x8=16  3x8=24  4x8=32  5x8=40  6x8=48  7x8=56  8x8=64
1x9=9   2x9=18  3x9=27  4x9=36  5x9=45  6x9=54  7x9=63  8x9=72  9x9=81
[root@ubuntu0006:/media] #seq 9 | sed "H;g" | awk '{printf NF}'
010110111011110111110111111011111110111111110111111111
[root@ubuntu0006:/media] #seq 9 | sed "H;g" | awk -v RS='' '{printf NF}'
123456789
```