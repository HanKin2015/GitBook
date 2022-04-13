# python之argparse模块

argparse 模块可以让人轻松编写用户友好的命令行接口。程序定义它需要的参数，然后 argparse 将弄清如何从 sys.argv 解析出那些参数。 argparse 模块还会自动生成帮助和使用手册，并在用户给程序传入无效参数时报出错误信息。

## 1、python标准库sys模块
```
sys.argv           #命令行参数List，第一个元素是程序本身路径
sys.exit(n)        #退出程序，正常退出时exit(0)
sys.version        #获取Python解释程序的版本信息
sys.maxint         #最大的Int值
sys.path           #返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值
sys.platform       #返回操作系统平台名称
sys.stdin          #输入相关
sys.stdout         #输出相关
sys.stderror       #错误相关
```

## 2、argparse模块
https://zhuanlan.zhihu.com/p/56922793

### 2-1、简单使用
```
import argparse

parser = argparse.ArgumentParser(description='命令行中传入一个数字')
#type是要传入的参数的数据类型  help是该参数的提示信息
parser.add_argument('integers', type=str, help='传入的数字')

args = parser.parse_args()

#获得传入的参数
print(args)
```

运行结果：
```
usage: demo.py [-h] integers

命令行中传入数字

positional arguments:
  integers    传入的数字

optional arguments:
  -h, --help  show this help message and exit
```
### 不定参数
nargs是用来说明传入的参数个数，'+' 表示传入至少一个参数。

### 数据类型
add_argument中有type参数可以设置传入参数的数据类型。该关键词可以传入list, str, tuple, set, dict, int等。

### 可选参数
使用可选参数，这个有点像关键词传参，但是需要在关键词前面加--

### 默认值
add_argument中有一个default参数。有的时候需要对某个参数设置默认值，即如果命令行中没有传入该参数的值，程序使用默认值。如果命令行传入该参数，则程序使用传入的值。

### 必需参数
add_argument有一个required参数可以设置该参数是否必需。

## 3、参数中有空格
```
hejian@hejian-C31M:~/test$ python3 solve_space_arg.py -u 'h j'
Namespace(data_path='./data/', upan_path='h j')
cmd: cd h j
sh: 1: cd: can't cd to h
失败
hejian@hejian-C31M:~/test$ python3 solve_space_arg.py -u "h j"
Namespace(data_path='./data/', upan_path='h j')
cmd: cd h j
sh: 1: cd: can't cd to h
失败
hejian@hejian-C31M:~/test$ python3 solve_space_arg.py -u h\ j/
Namespace(data_path='./data/', upan_path='h j/')
cmd: cd h j/
sh: 1: cd: can't cd to h
失败
hejian@hejian-C31M:~/test$ python3 solve_space_arg.py -u h\ j
Namespace(data_path='./data/', upan_path='h j')
cmd: cd h j
sh: 1: cd: can't cd to h
失败

windows只能是双引号才能失败，并且能成功进入。
(base) D:\Github\Storage\python\U盘自动拷贝>python solve_space_arg.py -u "h j"
Namespace(data_path='./data/', upan_path='h j')
cmd: cd h j
成功

(base) D:\Github\Storage\python\U盘自动拷贝>python solve_space_arg.py -u 'h j'
usage: solve_space_arg.py [-h] [-u UPAN_PATH] [-d DATA_PATH]
solve_space_arg.py: error: unrecognized arguments: j'

(base) D:\Github\Storage\python\U盘自动拷贝>python solve_space_arg.py -u h j
usage: solve_space_arg.py [-h] [-u UPAN_PATH] [-d DATA_PATH]
solve_space_arg.py: error: unrecognized arguments: j

(base) D:\Github\Storage\python\U盘自动拷贝>python solve_space_arg.py -u h\ j
usage: solve_space_arg.py [-h] [-u UPAN_PATH] [-d DATA_PATH]
solve_space_arg.py: error: unrecognized arguments: j

(base) D:\Github\Storage\python\U盘自动拷贝>python solve_space_arg.py -u h\\ j
usage: solve_space_arg.py [-h] [-u UPAN_PATH] [-d DATA_PATH]
solve_space_arg.py: error: unrecognized arguments: j
```

暂时没有想到解决办法，后续有时间研究研究。。。
文件路径：D:\Github\Storage\python\U盘自动拷贝\solve_space_arg.py






