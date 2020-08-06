[TOC]
# shell脚本模板

# 1、容易犯的错

- 等号左右两边不能有空格
- 中括号左右两边要有空格







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

kill_lock_process
if [ $? -ne 0 ]; then
	kill_lock_process
fi
```

