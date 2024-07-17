# shell函数

## 1、shell中函数的定义格式
```
[ function ] funname [()]	#这里对括号加的中括号难道指参数???
{
    action;
    [return int;]
}
```
说明：
1、可以带function fun() 定义，也可以直接fun() 定义,不带任何参数。
2、参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return后跟数值n(0-255)

## 2、理解函数只需要一个名字即可?
```
#!/bin/bash

function func1()	#确认必须要加上括号
{
    echo 'I am function 1'
    return
}
func2()
{
    echo 'I am function 2'
    return
}

echo 'start'

func1
func2

echo 'end'
```

## 3、理解不显示return,会以最后一个运行结果返回?

## 4、函数的调用
不需要使用括号，参数在函数名后跟着，以空格隔开即可。






