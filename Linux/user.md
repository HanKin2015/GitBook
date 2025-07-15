# 用户管理

## 1、修改用户密码
```
sudo -i		切换root用户
passwd hj	修改hj用户密码
passwd		修改root用户密码
su命令需要给root用户增加密码后使用，即需要执行passwd

虽然Ubuntu操作系统有提示，但是设置密码为1还是成功了！
hankin@hankin:~/桌面$ sudo -i
[sudo] hankin 的密码： 
root@hankin:~# passwd
新的 密码： 
无效的密码： 密码少于 8 个字符
重新输入新的 密码： 
passwd：已成功更新密码
root@hankin:~# exit
注销
hankin@hankin:~/桌面$ su
密码： 
root@hankin:/home/hankin/桌面# 
```

- sudo su
- 输入当前用户密码进入root账户

普通用户设置密码提示不能太短（弱）：
- sudo passwd 用户名（管理员权限可以设置短密码）

## 2、删除用户
```
userdel hj
```

## 3、增加用户
使用useradd指令所建立的帐号，实际上是保存在/etc/passwd文本文件中。
```
useradd userA					创建用户userA
useradd –e 12/30/2017 userB		创建userB,指定有效期2017-12-30到期
useradd –u 600 userC			创建userC指定用户id为600
```

## 4、其他相关操作
id 用户名			查看用户UID和GID信息
cat -n /etc/passwd	查看用户详细信息,参数-n显示行号
cat -n /etc/group	查看组详细信息
who					查看当前所有登录的用户列表
whoami				查看当前登录用户的账户名
getent passwd		类似于cat /etc/passwd
compgen -u			
compgen 是 bash 的内置命令，它将显示所有可用的命令，别名和函数。

## 5、用户信息文件
* `/etc/passwd`： 用户账户的详细信息在此文件中更新。
* `/etc/shadow`： 用户账户密码在此文件中更新。
* `/etc/group`： 新用户群组的详细信息在此文件中更新。
* `/etc/gshadow`： 新用户群组密码在此文件中更新。
/etc/passwd 文件将每个用户的基本信息记录为文件中的一行，一行中包含 7 个字段。
7 个字段的详细信息如下。

用户名 （magesh）： 已创建用户的用户名，字符长度 1 个到 12 个字符。
密码（x）：代表加密密码保存在 `/etc/shadow 文件中。
**用户 ID（506）：代表用户的 ID 号，每个用户都要有一个唯一的 ID 。UID 号为 0 的是为 root 用户保留的，UID 号 1 到 99 是为系统用户保留的，UID 号 100-999 是为系统账户和群组保留的。
**群组 ID （507）：代表群组的 ID 号，每个群组都要有一个唯一的 GID ，保存在 /etc/group文件中。
**用户信息（2g Admin - Magesh M）：代表描述字段，可以用来描述用户的信息（LCTT 译注：此处原文疑有误）。
**家目录（/home/mageshm）：代表用户的家目录。
**Shell（/bin/bash）：代表用户使用的 shell 类型。

## 6、su和sudo，权限管理的终极对决
su 是 "切换用户"（Switch User）的缩写，它允许切换到其他用户账户，通常是超级用户（root）。
su username     切换到其他普通用户，这将要求输入目标用户的密码。
su - username   切换到目标用户的环境，包括其工作目录和环境变量。
要退出 su 会话，只需输入 exit 或按下 Ctrl+D。

sudo 是 "以超级用户权限执行"（Super User Do）的缩写，它允许普通用户以特定命令的超级用户权限执行命令。
sudo -u username command        除了超级用户权限，sudo 还可以用于以其他用户权限执行命令，前提是具有适当的权限。
sudo -l                         使用 -l 或 --list 选项，可以查看当前用户的 sudo 权限。

- su 用于完全切换到其他用户账户，通常是超级用户，而 sudo 用于以特定命令的超级用户权限执行命令。
- su 需要输入目标用户的密码，而 sudo 需要输入当前用户的密码。
- su 切换到目标用户的环境，而 sudo 默认情况下不会更改环境。
- sudo 允许系统管理员更精细地配置权限，以允许或限制用户执行特定命令。