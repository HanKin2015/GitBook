# 使用FUNCNAME和BASH_LINENO实现shell脚本中定位函数错误在代码中的位置
```
#!/bin/bash

# 日志打印
LOG()
{
    # 这就是教训，单引号无法进行解析变量值，需要双引号
    echo 'BASH_LINENO: ${BASH_LINENO}'
    echo '${BASH_LINENO}'
    echo ${BASH_LINENO}

    echo '~~~~~~~~~~~~~~~~~~~~~~~~~~'

    echo "BASH_LINENO: ${BASH_LINENO}"
    echo "FUNCNAME   : ${FUNCNAME}"
    echo "MODULE_PID : ${MODULE_PID}"
    echo "MODULE_NAME: ${MODULE_NAME}"
    echo "@          : $@"

    echo '--------------------------'

    echo "${BASH_LINENO[0]}:${FUNCNAME[1]} $@" | logger -t "${MODULE_NAME}(${MODULE_PID})"

    echo '##########################'
}

LOG 'xinput map-to-output device to hdmi'

echo "BASH_LINENO: ${BASH_LINENO[0]}"
echo "FUNCNAME   : ${FUNCNAME[0]}"
echo "MODULE_PID : ${MODULE_PID}"
echo "MODULE_NAME: ${MODULE_NAME}"
echo "@          : $@"



test_log()
{
    echo "BASH_LINENO: ${BASH_LINENO}"
    echo "FUNCNAME   : ${FUNCNAME}"
    echo "MODULE_PID : ${MODULE_PID}"
    echo "MODULE_NAME: ${MODULE_NAME}"
    echo "@          : $@"

    echo "总共有 ${#FUNCNAME[@]} 个函数调用."
    echo "总共有 ${#BASH_LINENO[@]} 个不同的行数."

    func_cnt=${#FUNCNAME[@]}
    for((i=0; i<func_cnt; i++)); do
        echo ${FUNCNAME[$i]} ${BASH_LINENO[$i]}
    done
}

func1()
{
    echo "I am func1"
    test_log
}

func2()
{
    echo "I am func2"
    func1
    test_log
}

func2 "arg1" "arg2"

输出结果：
BASH_LINENO: ${BASH_LINENO}
${BASH_LINENO}
26
~~~~~~~~~~~~~~~~~~~~~~~~~~
BASH_LINENO: 26
FUNCNAME   : LOG
MODULE_PID :
MODULE_NAME:
@          : xinput map-to-output device to hdmi
--------------------------
##########################
BASH_LINENO: 0
FUNCNAME   : main
MODULE_PID :
MODULE_NAME:
@          :
I am func2
I am func1
BASH_LINENO: 56
FUNCNAME   : test_log
MODULE_PID :
MODULE_NAME:
@          :
总共有 4 个函数调用.
总共有 4 个不同的行数.
test_log 56
func1 62
func2 66
main 0
BASH_LINENO: 63
FUNCNAME   : test_log
MODULE_PID :
MODULE_NAME:
@          :
总共有 3 个函数调用.
总共有 3 个不同的行数.
test_log 63
func2 66
main 0

```

终于明白logger命令使用后为啥什么都没有，原来是日志输出到vim /var/log/syslog文件中去了。

## 特点
BASH_LINENO显示函数调用的位置行数

##logger
logger是一个shell命令接口，可以通过该接口使用Syslog的系统日志模块，还可以从命令行直接向系统日志文件写入一行信息。

```
**options (选项)：**
   -d, --udp 
       使用数据报(UDP)而不是使用默认的流连接(TCP)
   -i, --id  
       逐行记录每一次logger的进程ID
   -f, --file file_name
       记录特定的文件
   -h, --help
       显示帮助文本并退出
   -n， --server
       写入指定的远程syslog服务器，使用UDP代替内装式syslog的例程
   -s， --stderr
       输出标准错误到系统日志。
   -t， --tag tag
       指定标记记录
   -u， --socket socket
       写入指定的socket，而不是到内置系统日志例程。
   -V, --version
        显示版本信息并退出
   -P， --port port_num
       使用指定的UDP端口。默认的端口号是514
   -p， --priority priority_level
       指定输入消息日志级别，优先级可以是数字或者指定为 " facility.level" 的格式。　　
```

## 日志成型
```
#!/bin/bash

# 日志打印
LOG()
{
    echo "`date` ${FUNCNAME[1]}:${BASH_LINENO[0]} $@"
}

LOG "hello world!"
```

