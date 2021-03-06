# python之argparse模块


# python标准库sys模块
```
sys.argv           #命令行参数List，第一个元素是程序本身路径
sys.exit(n)        #退出程序，正常退出时exit(0)
sys.version        #获取Python解释程序的版本信息
sys.maxint       #  最大的Int值
sys.path           #返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值
sys.platform       #返回操作系统平台名称
sys.stdin          #输入相关
sys.stdout         #输出相关
sys.stderror       #错误相关
```

# argparse模块
https://zhuanlan.zhihu.com/p/56922793

## 简单使用
```
import argparse

parser = argparse.ArgumentParser(description='命令行中传入一个数字')
#type是要传入的参数的数据类型  help是该参数的提示信息
parser.add_argument('integers', type=str, help='传入的数字')

args = parser.parse_args()

#获得传入的参数
print(args)
```

usage: demo.py [-h] integers

命令行中传入数字

positional arguments:
  integers    传入的数字

optional arguments:
  -h, --help  show this help message and exit

## 不定参数
nargs是用来说明传入的参数个数，'+' 表示传入至少一个参数。

## 数据类型
add_argument中有type参数可以设置传入参数的数据类型。该关键词可以传入list, str, tuple, set, dict, int等。

## 可选参数
使用可选参数，这个有点像关键词传参，但是需要在关键词前面加--

## 默认值
add_argument中有一个default参数。有的时候需要对某个参数设置默认值，即如果命令行中没有传入该参数的值，程序使用默认值。如果命令行传入该参数，则程序使用传入的值。

## 必需参数
add_argument有一个required参数可以设置该参数是否必需。









