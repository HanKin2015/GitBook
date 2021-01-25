# linux的主机名

有时候默认主机名过于长，操作很别扭。

$之前@之后是[linux系统](https://www.baidu.com/s?wd=linux系统&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的主机名。
查看主机名命令：

> uname -n

> hostname

# 修改主机名

1、通过hostname命令。
命令格式：hostname newhostname
此命令的作用是暂时的修改linux的主机名，存活时间linux当前的运行时间，即在重启前的运行时间内。一般修改以后就生效，但是不能永久修改。

PS:重启终端生效。

2、 通过配置文件/etc/sysconfig/network修改。

cat /etc/sysconfig/network

```
NETWORKING=yes
HOSTNAME=yourname //在这修改hostname
GATEWAY=192.168.1.1
```

通过修改此文件的内容，它能够实现永久修改linux的主机名，不会立即生效，即有可能不在当前运行时间生效，即在从下次重启后才开始生效，至少是不在当前session生效，需要用户退出以后才生效。通过修改此配置文件，再配合hostname命令，可实现立即永久修改linux的主机名。

systemd

3、修改配置文件 /etc/hosts

 需要把主机名和ip绑定在一起时，才需要修改这个hosts文件 。

> vi /etc/hosts

```
127.0.0.1 localhost.localdomain localhost
192.168.1.121 yourname //在这修改hostname
//有时候只有这一行
127.0.0.1 yourname localhost.localdomain localhost
```

# 注意

/etc/sysconfig/*是红帽系统下服务初始化环境配置文件，ubuntu就没有这个文件夹，只能对各个服务的存放位置分别寻找，比如centos里的/etc/sysconfig/network对应ubuntu里的/etc/network/interfaces文件。



# 修改linux命令行提示符路径显示

修改环境变量PS1（命令行提示符）

vi编辑~/.bashrc文件（个人的配置文件）

root权限 vi编辑/etc/profile文件在最后加上一行语句

> export PS1=’[\u@\h $PWD]\\$ ‘

修改完成后，执行: source /etc/profile 使配置生效即可。 

- 最后的地方需要留有一个空格，使用符号和命令中间有隔开
- 最后的$和\\$有区别，最好\\$，\\$会根据root用户和普通用户转换
- $PWD和\\W区别：前者显示完整路径，后者只显示当前的路径，及文件夹名。注意使用\\w可以显示当前完整的工作路径
- 其中\u显示当前用户账号，\h显示当前主机名，\w显示当前完整工作路径（**\W显示当前工作路径**），\\$显示对应的符号。

