# shell 字符串和数字比较
二元比较操作符,比较变量或者比较数字.注意数字与字符串的区别.

## 1、整数比较

-eq       等于,如:if [ "$a" -eq "$b" ]
-ne       不等于,如:if [ "$a" -ne "$b" ]
-gt       大于,如:if [ "$a" -gt "$b" ]
-ge       大于等于,如:if [ "$a" -ge "$b" ]
-lt       小于,如:if [ "$a" -lt "$b" ]
-le       小于等于,如:if [ "$a" -le "$b" ]
<       小于(需要双括号),如:(("$a" < "$b"))
<=       小于等于(需要双括号),如:(("$a" <= "$b"))
>       大于(需要双括号),如:(("$a" > "$b"))
>=       大于等于(需要双括号),如:(("$a" >= "$b"))

## 2、字符串比较
=       等于,如:if [ "$a" = "$b" ]
==       等于,如:if [ "$a" == "$b" ],与=等价
       注意:==的功能在[[]]和[]中的行为是不同的,如下:
       1 [[ $a == z* ]]    # 如果$a以"z"开头(模式匹配)那么将为true
       2 [[ $a == "z*" ]] # 如果$a等于z*(字符匹配),那么结果为true
       3
       4 [ $a == z* ]      # File globbing 和word splitting将会发生
       5 [ "$a" == "z*" ] # 如果$a等于z*(字符匹配),那么结果为true
       一点解释,关于File globbing是一种关于文件的速记法,比如"*.c"就是,再如~也是.
       但是file globbing并不是严格的正则表达式,虽然绝大多数情况下结构比较像.
!=       不等于,如:if [ "$a" != "$b" ]
       这个操作符将在[[]]结构中使用模式匹配.
<       小于,在ASCII字母顺序下.如:
       if [[ "$a" < "$b" ]]
       if [ "$a" \< "$b" ]
       注意:在[]结构中"<"需要被转义.
>       大于,在ASCII字母顺序下.如:
       if [[ "$a" > "$b" ]]
       if [ "$a" \> "$b" ]
       注意:在[]结构中">"需要被转义.
       具体参考Example 26-11来查看这个操作符应用的例子.
-z       字符串为"null".就是长度为0.
-n       字符串不为"null"
       注意:
       使用-n在[]结构中测试必须要用""把变量引起来.使用一个未被""的字符串来使用! -z
       或者就是未用""引用的字符串本身,放到[]结构中。虽然一般情况下可
       以工作,但这是不安全的.习惯于使用""来测试字符串是一种好习惯.

 

## 3、SHELL下的数字比较及计算举例

比较：
方法一： if [ ${A} -lt ${B} ]; then ...
这是最基本的比较方法，使用lt(小于),gt(大于),le(小于等于),ge(大于等于)，优点：还没发现；缺点：只能比较整数，使用lt,gt等不直观
方法二： if ((${A} < ${B})) then ...
这是CShell风格比较，优点：不用使用lt,gt等难记的字符串；缺点：还是只能比较整数
方法三： if (echo ${A} ${B} | awk '!($1>$2){exit 1}') then ...
这是使用awk比较，优点：可以比较小数；缺点：表达式太复杂，难记
方法四： if (echo ${A} - ${B} | bc -q | grep -q "^-"); then ...
这是使用bc计算比较，优点：可以比较小数；缺点：表达式更复杂，难记

计算：
方法一：typeset C=$(expr ${A} + ${B});
SHELL中的基本工具，优点：方便检测变量是否为数字；缺点：只能计算整数，且只能计算加减法，不能计算乘除法
方法二：let "C=${A}+${B}"; 或 let "C=A+B"
内嵌命令计算，优点：能计算乘除法及位运算等；缺点：只能计算整数
方法三：typeset C=$((A+B))
CShell风格的计算，优点：能计算乘除法及位运算等，简介，编写方便；缺点：不能计算小数
方法四：typeset C=${echo ${A} ${B} | awk '{print $1+$2}')
使用awk计算，优点：能计算小数，可以实现多种计算方式，计算灵活；缺点：表达式太复杂
方法五：typeset C=${echo ${A} + ${B} | bc -q)
使用awk计算，优点：能计算小数，计算方式比awk还多，计算灵活；缺点：表达式太复杂，小数点后面的位数必须使用scale=N来设置，否则可能会将结果截断为整数