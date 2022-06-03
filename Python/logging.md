# 日志：logging

## 1、简介
logging.basicConfig函数各参数:
filename: 指定日志文件名
filemode: 和file函数意义相同，指定日志文件的打开模式，'w'或'a'
format: 指定输出的格式和内容，format可以输出很多有用信息，如上例所示:
 %(levelno)s: 打印日志级别的数值
 %(levelname)s: 打印日志级别名称
 %(pathname)s: 打印当前执行程序的路径，其实就是sys.argv[0]
 %(filename)s: 打印当前执行程序名
 %(funcName)s: 打印日志的当前函数
 %(lineno)d: 打印日志的当前行号
 %(asctime)s: 打印日志的时间
 %(thread)d: 打印线程ID
 %(threadName)s: 打印线程名称
 %(process)d: 打印进程ID
 %(message)s: 打印日志信息
datefmt: 指定时间格式，同time.strftime()
level: 设置日志级别，默认为logging.WARNING
stream: 指定将日志的输出流，可以指定输出到sys.stderr,sys.stdout或者文件，默认输出到sys.stderr，当stream和filename同时指定时，stream被忽略

## 2、模板
使用的时候只需要修改filename即可。
```
import logging

#日志文件
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(filename)s[%(funcName)s line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S',
                    filename='./crawler.log',
                    filemode='a')

var = 'hello'
logging.info('{}'.format(var))
logging.error('{}'.format(var))
logging.warning('{}'.format(var))
```

## 3、文件和控制台都打印
```
logger = logging.getLogger()
logger.setLevel(logging.INFO)  # Log等级总开关
log_file_abs = "/tmp/flask.log"
 
stream_handler = logging.StreamHandler()  # 日志控制台输出
 
handler = logging.FileHandler(log_file_abs, mode='w', encoding='UTF-8')  # 日志文件输出
handler.setLevel(logging.DEBUG)
 
# 控制台输出格式
stream_format = logging.Formatter("%(asctime)s - %(pathname)s[line:%(lineno)d] - %(levelname)s: %(message)s")
 
# 文件输出格式
logging_format = logging.Formatter(
    '%(asctime)s - %(pathname)s - %(funcName)s - %(lineno)s - %(levelname)s: %(message)s')
 
handler.setFormatter(logging_format)  # 为改处理器handler 选择一个格式化器
stream_handler.setFormatter(stream_format)
 
logger.addHandler(handler)  # 为记录器添加 处理方式Handler
logger.addHandler(stream_handler)
 
logger.info("|------logger.info-----")
```





