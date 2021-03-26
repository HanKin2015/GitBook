[TOC]
# shell脚本模板

# 1、目标
- 帮助参数说明
- 判断脚本运行时输入参数，包括切割
- Linux命令执行
- 命令执行是否成功判断
- Linux命令执行后对结果进行切割
- 函数的使用
- 输入输出
- 调用其他shell脚本


# 2、容易犯的错

- 等号左右两边不能有空格
- 中括号左右两边要有空格
- 字符串中使用变量值时必须使用双引号
- 变量调用时建议使用大括号圈起来

# 3、题目要求
要写一个神马脚本呢？？？
先把基本功能实现了，再来进行完善。

帮助参数说明：usage()
输入参数：是否从文件读取ip还是手动输入ip（-f ip_addr_filename）


## 文件
- ip_addr.txt
- result.txt
- ping_ip.sh


```
#!/bin/bash

# 变量定义
path=`pwd`
echo $path

# 版本信息
version()
{
	echo "version: 1.0"
}

# 用法说明
usage()
{
	cat << EOF
		Usage: $0 [options] [directroy]
		Options:
			-h, 	显示帮助信息
			-V,	显示当前脚本版本信息
			-f file,	从文件读取ip地址
		Examples:
			$0 -f ip_addr.txt
	EOF
}



```
























# 读取文件
```
#!/bin/bash

while read line
do
    echo $line
done < test.txt

cat test.txt | while read line
do
    echo $line
done

for line in `cat  test.txt`
do
    echo $line
done
```

# 保存文件
使用>是覆盖保存到文件
使用>>是追加保存到文件

# 注释或者cat输出重定向
EOF或者EOT都可以，并不是需要指定什么字符串。
注意：最后的结束字符一定要在最左边，能缩进。

# set命令
set -x与set +x指令用于脚本调试
set -x 开启 
set +x关闭（默认）

你写的每个脚本都应该在文件开头加上set -e,这句语句告诉bash如果任何语句的执行结果不是true则应该退出。
这样的好处是防止错误像滚雪球般变大导致一个致命的错误，而这些错误本应该在之前就被处理掉。如果要增加可读性，可以使用set -o errexit，它的作用与set -e相同。
set -e
set +e

# shell

printf输出

echo输出

变量不加引号、加单引号、双引号

REPOPATH=git@github.com:github/test.git

REPOPATH = git@github.com:github/test.git  (错误，等号两边不能有空格，系统会把变量当作命令，提示REPOPATH未找到)

# 脚本的编写

#!/bin/bash

变量定义(目录、路径、flag...)

usage(){}

```
usage()
{
	cat << EOT
		Usage: $0 [options] [directroy]
		Options:
			-i	install
			-u	update
			-h	help(usage) and exit
		Examples:
			$0 -i dir
	EOT
}
```

各种函数

cd $(dirname $0)    ===== cd \`dirname $0\`

参数判断

```
#!/bin/bash

if [ $# -lt 2]; then   # 必须至少两个
	echo "error.. need args"
	exit 1
fi

echo "command is $0"
for arg in "$@":
do 
	echo $arg
done
```



while getopts "" opt

```
while getopts ":i:u:h" opt    # 冒号表示安装目标的文件夹
do
	case ${opt} in
	i)
		
```

su （需要输入管理员密码）

sudo su(只需要输入当前用户的密码)

su root转换到root账户   =====  su （账户密码，及root）



内网wifi：TP未限速

桌面巡检工具

---

$？获取上一个命令的退出状态

```

function kill_lock_process()
{
	local lock_pid=$(lsof /var/lib/dpkg/lock | grep /var/lib/dpkg/lock | awk '{print $2}')
	if [ -n "${lock_pid}" ]; then
		kill -9 ${lock_pid}
		dpkg --configure -a
	fi
}

# 等于0执行成功，不等于0执行失败
kill_lock_process
if [ $? -ne 0 ]; then # 执行失败
	kill_lock_process
fi
```

