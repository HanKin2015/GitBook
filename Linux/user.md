# 用户管理

帐号建好之后，可以用passwd设定帐号的密码。
修改root账户亦可。

可用userdel删除此命令建立的帐号。
使用useradd指令所建立的帐号，实际上是保存在/etc/passwd文本文件中。

```
useradd userA——创建用户userA
useradd –e 12/30/2017 userB——创建userB,指定有效期2017-12-30到期
useradd –u 600 userC——创建userC指定用户id为600
```

id 用户名	查看用户UID和GID信息
cat -n /etc/passwd	查看用户详细信息,参数-n显示行号
cat -n /etc/group	查看组详细信息
who	查看当前所有登录的用户列表
whoami	查看当前登录用户的账户名







