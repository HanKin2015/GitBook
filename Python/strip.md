# strip、lstrip和rstrip函数

## 1、strip函数


## 2、lstrip函数
Python lstrip() 方法用于截掉字符串左边的空格或指定字符。
截掉 string 左边的空格(默认)，可以指定字符串，字符串可以是一个字符，或者多个字符，匹配时不是按照整个字符串匹配的，而是一个个匹配的。


## 3、rstrip函数


## 4、示例
```
import time

def main():
    s = "$$$##what##$$$"
    print(s)
    print(s.strip('$'))
    print(s.lstrip('$'))
    print(s.rstrip('$'))
    print(s.strip('$#'))
    print(s.strip('#$'))

if __name__ == '__main__':
    start_time = time.time()

    main()

    end_time = time.time()
    print('process spend {} s.'.format(round(end_time - start_time, 3)))

"""
(base) D:\Users\User\Desktop>python get_upan_rw_data.py
$$$##what##$$$
##what##
##what##$$$
$$$##what##
what
what
process spend 0.005 s.
"""
```







