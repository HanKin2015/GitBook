# 用户管理

## 1、修改用户密码
```
sudo -i		切换root用户
passwd hj	修改hj用户密码
passwd		修改root用户密码
su命令需要给root用户增加密码后使用，即需要执行passwd
```

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




